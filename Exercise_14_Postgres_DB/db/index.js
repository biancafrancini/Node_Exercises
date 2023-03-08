const { Pool } = require("node-postgres");
const pool = new Pool({
  host: "localhost",
  user: "biancafrancini",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  port: 5432,
  database: "biancafrancini",
});

// async/await - check out a client
const query = async () => {
  const client = await pool.connect();
  try {
    //await client.query(`CREATE DATABASE planets`);
    await client.query(
      `DROP TABLE IF EXISTS planetstable;

        CREATE TABLE planetstable (
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
       );`
    );

    await client.query(
      `INSERT INTO planetstable (name) VALUES ('Earth');
        INSERT INTO planetstable (name) VALUES ('Mars');
        INSERT INTO planetstable (name) VALUES ('Venus');`
    );
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { query };
