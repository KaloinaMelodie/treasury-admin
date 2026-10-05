require("dotenv").config();

const pool = require("./connection");


async function test(){

    const result = await pool.query(
        "SELECT NOW()"
    );

    console.log(result.rows);

    process.exit();

}


test();