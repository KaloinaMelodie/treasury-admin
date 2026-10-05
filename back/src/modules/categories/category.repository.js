const db = require("../../database/connection");


async function findAll(filters = {}) {

    let query = `
        SELECT *
        FROM categories
        WHERE deleted_at IS NULL
    `;

    const params = [];


    if(filters.type){

        params.push(filters.type);

        query += `
            AND type = $${params.length}
        `;
    }


    if(filters.isActive !== undefined){

        params.push(filters.isActive);

        query += `
            AND is_active = $${params.length}
        `;
    }


    query += `
        ORDER BY created_at DESC
    `;


    const result = await db.query(query, params);

    return result.rows;
}



async function findById(id){

    const result = await db.query(
        `
        SELECT *
        FROM categories
        WHERE id = $1
        AND deleted_at IS NULL
        `,
        [id]
    );


    return result.rows[0];
}



async function create(data){

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
        [
            data.name,
            data.type,
            data.description
        ]
    );


    return result.rows[0];
}



async function update(id,data){

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
        [
            data.name,
            data.type,
            data.description,
            id
        ]
    );


    return result.rows[0];
}



async function changeStatus(id,status){

    const result = await db.query(
        `
        UPDATE categories

        SET
            is_active=$1,
            updated_at=CURRENT_TIMESTAMP

        WHERE id=$2

        RETURNING *
        `,
        [
            status,
            id
        ]
    );


    return result.rows[0];
}


module.exports = {

    findAll,
    findById,
    create,
    update,
    changeStatus

};