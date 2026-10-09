const repository = require("./member.repository");
const { beginTransaction } = require("../../database/transaction");
mapMember = require("./member.mapper");

async function getMembers(filters) {
  const result = await repository.findAll(filters);

  const page = Number(filters.page) || 1;

  const limit = Number(filters.limit) || 10;

  return {
    data: result.rows.map((member) => mapMember(member)),

    pagination: {
      page,

      limit,

      total: result.total,

      totalPages: Math.ceil(result.total / limit),
    },
  };
}

async function getMember(id) {
  const member = await repository.findById(id);

  if (!member) {
    throw new Error("Member not found");
  }

  return mapMember(member);
}

async function createMember(data) {
  const client = await beginTransaction();

  try {
    // 1 - Création membre

    const member = await repository.create(
      client,

      data,
    );

    // 2 - Création cotisation

    if (data.subscription) {
      await repository.createSubscription(
        client,

        {
          member_id: member.id,

          amount: data.subscription.amount,

          frequency: data.subscription.frequency,

          start_date: data.subscription.start_date,
        },
      );
    }

    // validation transaction

    await client.query("COMMIT");

    return await getMember(id);
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
}
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-CA");
};

async function updateMemberSubscription(client, memberId, subscription) {
  const current = await repository.findActiveSubscription(client, memberId);

  if (!current) {
    return repository.createSubscription(client, {
      member_id: memberId,
      ...subscription,
    });
  }

  //
  // Cas 1 : même période
  //
  if (formatDate(subscription.start_date) === formatDate(current.start_date)) {
    return repository.updateSubscription(
      client,

      current.id,

      subscription,
    );
  }

  //
  // Cas 2 : nouvelle période
  //

  if (formatDate(subscription.start_date) > formatDate(current.start_date)) {
    const endDate = new Date(subscription.start_date);

    endDate.setDate(endDate.getDate() - 1);

    await repository.closeSubscription(
      client,

      current.id,

      endDate,
    );

    return repository.createSubscription(
      client,

      {
        member_id: memberId,

        amount: subscription.amount ?? current.amount,

        frequency: subscription.frequency ?? current.frequency,

        start_date: subscription.start_date,
      },
    );
  }
}

async function updateMember(id, data) {
  const client = await beginTransaction();

  try {
    // 1 modification membre

    let member = null;

    if (
      data.first_name ||
      data.last_name ||
      data.phone ||
      data.email ||
      data.status_id ||
      data.group_id ||
      data.entry_date
    ) {
      member = await repository.update(client, id, data);
    }

    // 2 gestion cotisation

    if (data.subscription) {
      await updateMemberSubscription(client, id, data.subscription);
    }

    await client.query("COMMIT");

    return getMember(id);
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
}

async function removeMember(id) {
  const member = await repository.findById(id);

  if (!member) {
    throw new Error("Member not found");
  }

  return repository.deleteMember(id);
}

async function changeMemberStatus(id, statusCode) {
  const client = await beginTransaction();

  try {
    const status = await repository.findStatusByCode(
      client,

      statusCode,
    );

    if (!status) {
      throw new Error("Invalid member status");
    }

    let exitDate = null;

    if (status.code === "EXITED") {
      exitDate = new Date();
    }

    const member = await repository.updateStatus(
      client,

      id,

      status.id,

      exitDate,
    );

    await client.query("COMMIT");

    return await getMember(id);
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
  removeMember,
  changeMemberStatus,
};
