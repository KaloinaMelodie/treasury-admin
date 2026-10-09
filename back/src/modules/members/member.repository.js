const db = require("../../database/connection");

async function findAll(filters = {}) {
  let query = `

SELECT

m.*,

ms.code AS status_code,

ms.label AS status_label,


mg.name AS group_name,

msub.amount AS subscription_amount,

msub.frequency AS subscription_frequency,

msub.start_date AS subscription_start_date

FROM members m


INNER JOIN member_statuses ms

ON ms.id = m.status_id


LEFT JOIN member_groups mg

ON mg.id = m.group_id

LEFT JOIN member_subscription msub

ON msub.member_id = m.id

AND msub.end_date IS NULL


WHERE m.deleted_at IS NULL

`;

  let countQuery = `

SELECT COUNT(*)

FROM members m


INNER JOIN member_statuses ms

ON ms.id = m.status_id


LEFT JOIN member_groups mg

ON mg.id = m.group_id


WHERE m.deleted_at IS NULL

`;

  const params = [];

  const conditions = [];

  //
  // Recherche globale
  //

  if (filters.search) {
    params.push(`%${filters.search}%`);

    conditions.push(`

(

m.first_name ILIKE $${params.length}

OR

m.last_name ILIKE $${params.length}

OR

m.phone ILIKE $${params.length}

OR

m.email ILIKE $${params.length}

)

`);
  }

  //
  // Filtre statut
  //

  if (filters.status) {
    params.push(filters.status);

    conditions.push(`

ms.code = $${params.length}

`);
  }

  //
  // Filtre groupe
  //

  if (filters.group_id) {
    params.push(filters.group_id);

    conditions.push(`

m.group_id = $${params.length}

`);
  }

  if (conditions.length) {
    const conditionSQL = " AND " + conditions.join(" AND ");

    query += conditionSQL;

    countQuery += conditionSQL;
  }

  //
  // Tri
  //

  const allowedSort = {
    first_name: "m.first_name",

    last_name: "m.last_name",

    entry_date: "m.entry_date",

    created_at: "m.created_at",
  };

  const sortBy = allowedSort[filters.sortBy] || "m.created_at";

  const sortOrder = filters.sortOrder === "asc" ? "ASC" : "DESC";

  query += `

ORDER BY ${sortBy} ${sortOrder}

`;

  //
  // Pagination
  //

  const page = Number(filters.page) || 1;

  const limit = Number(filters.limit) || 10;

  const offset = (page - 1) * limit;

  query += `

LIMIT $${params.length + 1}

OFFSET $${params.length + 2}

`;

  params.push(limit);

  params.push(offset);

  const data = await db.query(query, params);

  const count = await db.query(
    countQuery,

    params.slice(0, params.length - 2),
  );

  return {
    rows: data.rows,

    total: Number(count.rows[0].count),
  };
}

async function findById(id) {
  const result = await db.query(
    `

SELECT

m.*,


ms.code AS status_code,

ms.label AS status_label,


mg.name AS group_name,

msub.amount AS subscription_amount,

msub.frequency AS subscription_frequency,

msub.start_date AS subscription_start_date


FROM members m


JOIN member_statuses ms

ON ms.id=m.status_id


LEFT JOIN member_groups mg

ON mg.id=m.group_id

LEFT JOIN member_subscription msub

ON msub.member_id = m.id

AND msub.end_date IS NULL


WHERE m.id=$1

AND m.deleted_at IS NULL

`,

    [id],
  );

  return result.rows[0];
}

async function create(client, data) {
  const result = await client.query(
    `

INSERT INTO members

(

first_name,

last_name,

phone,

email,

status_id,

group_id,

entry_date

)


VALUES

(

$1,

$2,

$3,

$4,

$5,

$6,

$7

)


RETURNING *

`,

    [
      data.first_name,

      data.last_name,

      data.phone,

      data.email,

      data.status_id,

      data.group_id,

      data.entry_date,
    ],
  );

  return result.rows[0];
}

async function createSubscription(
  client,

  data,
) {
  const result = await client.query(
    `

INSERT INTO member_subscription

(

member_id,

amount,

frequency,

start_date

)


VALUES

(

$1,

$2,

$3,

$4

)


RETURNING *

`,

    [data.member_id, data.amount, data.frequency, data.start_date],
  );

  return result.rows[0];
}

async function update(client, id, data) {
  const fields = [];
  const values = [];

  if (data.first_name) {
    fields.push(`first_name=$${values.length + 1}`);

    values.push(data.first_name);
  }

  if (data.last_name) {
    fields.push(`last_name=$${values.length + 1}`);

    values.push(data.last_name);
  }

  if (data.phone) {
    fields.push(`phone=$${values.length + 1}`);

    values.push(data.phone);
  }

  if (data.email) {
    fields.push(`email=$${values.length + 1}`);

    values.push(data.email);
  }

  if (data.status_id) {
    fields.push(`status_id=$${values.length + 1}`);

    values.push(data.status_id);
  }

  if (data.group_id) {
    fields.push(`group_id=$${values.length + 1}`);

    values.push(data.group_id);
  }

  if (data.entry_date) {
    fields.push(`entry_date=$${values.length + 1}`);

    values.push(data.entry_date);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(id);

  const result = await client.query(
    `

UPDATE members

SET

${fields.join(",")},

updated_at=CURRENT_TIMESTAMP


WHERE id=$${values.length}


RETURNING *

`,

    values,
  );

  return result.rows[0];
}

async function findActiveSubscription(client, memberId) {
  const result = await client.query(
    `

SELECT *

FROM member_subscription

WHERE member_id=$1

AND end_date IS NULL

ORDER BY start_date DESC

LIMIT 1

`,

    [memberId],
  );

  return result.rows[0];
}

async function closeSubscription(client, id, endDate) {
  await client.query(
    `

UPDATE member_subscription

SET

end_date=$1,

updated_at=CURRENT_TIMESTAMP


WHERE id=$2

`,

    [endDate, id],
  );
}

async function updateSubscription(client, id, data) {
  const fields = [];
  const values = [];

  if (data.amount !== undefined) {
    fields.push(`amount=$${values.length + 1}`);

    values.push(data.amount);
  }

  if (data.frequency !== undefined) {
    fields.push(`frequency=$${values.length + 1}`);

    values.push(data.frequency);
  }

  values.push(id);

  const result = await client.query(
    `

UPDATE member_subscription

SET

${fields.join(",")},

updated_at=CURRENT_TIMESTAMP


WHERE id=$${values.length}


RETURNING *

`,

    values,
  );

  return result.rows[0];
}

async function deleteMember(id) {
  const result = await db.query(
    `
        DELETE FROM members

        WHERE id=$1

        RETURNING *
        `,

    [id],
  );

  return result.rows[0];
}

async function updateStatus(client, id, statusId, exitDate = null) {
  const result = await client.query(
    `

UPDATE members

SET

status_id=$1,

exit_date=$2,

updated_at=CURRENT_TIMESTAMP


WHERE id=$3


RETURNING *

`,

    [statusId, exitDate, id],
  );

  return result.rows[0];
}

async function findStatusByCode(client, code) {
  const result = await client.query(
    `

SELECT *

FROM member_statuses

WHERE code=$1

AND is_active=true

`,

    [code],
  );

  return result.rows[0];
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  createSubscription,
  findActiveSubscription,
  closeSubscription,
  updateSubscription,
  deleteMember,
  updateStatus,
  findStatusByCode
};
