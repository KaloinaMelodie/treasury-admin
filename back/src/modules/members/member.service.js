const repository = require("./member.repository");
const { beginTransaction } = require("../../database/transaction");

async function getMembers(filters) {
  const result = await repository.findAll(filters);

  const page = Number(filters.page) || 1;

  const limit = Number(filters.limit) || 10;

  return {
    data: result.rows.map(member => ({

    id: member.id,

    first_name: member.first_name,

    last_name: member.last_name,

    phone: member.phone,

    email: member.email,

    entry_date: member.entry_date,

    exit_date: member.exit_date,

    user_id: member.user_id,

    created_at: member.created_at,
    created_by: member.created_by,
    updated_at: member.updated_at,
    updated_by: member.updated_by,
    deleted_at: member.deleted_at,
    deleted_by: member.deleted_by,

    status_code: member.status_code,

    status_label: member.status_label,


    group_name: member.group_name,


    subscription:
        member.subscription_amount
        ?
        {

            amount:
            member.subscription_amount,

            frequency:
            member.subscription_frequency,

            start_date:
            member.subscription_start_date

        }
        :
        null

})),

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

  return {

    id: member.id,

    first_name: member.first_name,

    last_name: member.last_name,

    phone: member.phone,

    email: member.email,

    entry_date: member.entry_date,

    exit_date: member.exit_date,

    user_id: member.user_id,

    created_at: member.created_at,
    created_by: member.created_by,
    updated_at: member.updated_at,
    updated_by: member.updated_by,
    deleted_at: member.deleted_at,
    deleted_by: member.deleted_by,

    status_code: member.status_code,

    status_label: member.status_label,


    group_name: member.group_name,


    subscription:
        member.subscription_amount
        ?
        {

            amount:
            member.subscription_amount,

            frequency:
            member.subscription_frequency,

            start_date:
            member.subscription_start_date

        }
        :
        null

};
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

    return member;
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

module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
};
