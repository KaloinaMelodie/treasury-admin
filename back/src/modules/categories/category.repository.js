const db = require("../../database/connection");

async function findAll(filters = {}) {
  let query = `
        SELECT *
        FROM categories
        WHERE deleted_at IS NULL
    `;

  let countQuery = `
        SELECT COUNT(*)
        FROM categories
        WHERE deleted_at IS NULL
    `;

  const params = [];
  const conditions = [];

  if (filters.search) {
    params.push(`%${filters.search}%`);

    conditions.push(
      `
            (
                name ILIKE $${params.length}
                OR description ILIKE $${params.length}
            )
            `,
    );
  }

  if (filters.type) {
    params.push(filters.type);

    conditions.push(`type = $${params.length}`);
  }

  if (filters.is_active !== undefined) {
    params.push(filters.is_active);

    conditions.push(`is_active = $${params.length}`);
  }

  if (conditions.length) {
    query += " AND " + conditions.join(" AND ");

    countQuery += " AND " + conditions.join(" AND ");
  }

  const page = Number(filters.page) || 1;

  const limit = Number(filters.limit) || 10;

  const offset = (page - 1) * limit;

  const allowedSort = ["name", "type", "created_at"];

  const sortBy = allowedSort.includes(filters.sortBy)
    ? filters.sortBy
    : "created_at";

  const sortOrder = filters.sortOrder === "asc" ? "ASC" : "DESC";

  query += `
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT $${params.length + 1}
        OFFSET $${params.length + 2}
    `;

  params.push(limit);
  params.push(offset);

  const data = await db.query(query, params);

  const count = await db.query(countQuery, params.slice(0, params.length - 2));

  return {
    rows: data.rows,

    total: Number(count.rows[0].count),
  };
}

async function findById(id) {
  const result = await db.query(
    `
        SELECT *
        FROM categories
        WHERE id = $1
        AND deleted_at IS NULL
        `,
    [id],
  );

  return result.rows[0];
}

async function create(data) {
  const result = await db.query(
    `
        INSERT INTO categories
        (
            name,
            type,
            description
        )
        VALUES
        (
            $1,
            $2,
            $3
        )
        RETURNING *
        `,
    [data.name, data.type, data.description],
  );

  return result.rows[0];
}

async function update(id, data) {
  const result = await db.query(
    `
        UPDATE categories

        SET
            name=$1,
            type=$2,
            description=$3,
            updated_at=CURRENT_TIMESTAMP

        WHERE id=$4

        RETURNING *
        `,
    [data.name, data.type, data.description, id],
  );

  return result.rows[0];
}

async function changeStatus(id, status) {
  const result = await db.query(
    `
        UPDATE categories

        SET
            is_active=$1,
            updated_at=CURRENT_TIMESTAMP

        WHERE id=$2

        RETURNING *
        `,
    [status, id],
  );

  return result.rows[0];
}

async function deleteCategory(id) {
  const result = await db.query(
    `
        DELETE FROM categories

        WHERE id=$1

        RETURNING *
        `,

    [id],
  );

  return result.rows[0];
}


module.exports = {
  findAll,
  findById,
  create,
  update,
  changeStatus,
  deleteCategory
};
