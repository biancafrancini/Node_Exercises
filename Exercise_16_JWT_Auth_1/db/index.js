const pgPromise = require("pg-promise");

const db = pgPromise({})("postgres://biancafrancini:admin92@localhost:5432/biancafrancini");

const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT
  );`);

  await db.none(`INSERT INTO planets (name) VALUES ('Earth');`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars');`);
};

setupDb();

module.exports={db}