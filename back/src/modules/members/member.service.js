const repository = require("./member.repository");
const { beginTransaction } = require("../../database/transaction");

async function getMembers(filters) {
  const result = await repository.findAll(filters);

  const page = Number(filters.page) || 1;

  const limit = Number(filters.limit) || 10;

  return {
    data: result.rows,

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

  return member;
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

module.exports = {
  getMembers,
  getMember,
  createMember,
};
