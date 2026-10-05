const pool = require("./connection");

async function beginTransaction() {
  const client = await pool.connect();

  await client.query("BEGIN");

  return client;
}

module.exports = {
  beginTransaction,
};
