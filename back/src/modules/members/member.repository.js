const db = require("../../database/connection");

async function findAll(filters = {}) {
  let query = `

SELECT

m.id,

m.first_name,

m.last_name,

m.phone,

m.email,

m.entry_date,


ms.code AS status_code,

ms.label AS status_label,


mg.name AS group_name


FROM members m


INNER JOIN member_statuses ms

ON ms.id = m.status_id


LEFT JOIN member_groups mg

ON mg.id = m.group_id


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

  const allowedSort = ["first_name", "last_name", "entry_date", "created_at"];

  const sortBy = allowedSort.includes(filters.sortBy)
    ? filters.sortBy
    : "created_at";

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


mg.name AS group_name


FROM members m


JOIN member_statuses ms

ON ms.id=m.status_id


LEFT JOIN member_groups mg

ON mg.id=m.group_id


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

module.exports = {
  findAll,
  findById,
  create,
  createSubscription,
};
