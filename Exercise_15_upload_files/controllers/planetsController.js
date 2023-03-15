const Joi = require("joi");
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

const getAll = async (req, res) => {
  const planets = await db.many('SELECT * FROM planets;');
  console.log(planets);
  return res.status(200).json(planets);
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const planets = await db.oneOrNone('SELECT * FROM planets WHERE id=$1;', Number(id));

  return res.status(200).json(planets);
};

const create = async (req, res) => {
  const { name } = req.body;
  const newPlanet = { name };
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const validatedNewPlanet = schema.validate(newPlanet);

  if (validatedNewPlanet.error) {
    return res.status(400).json({ msg: "Some data are not valid" });
  }
  
  await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
  
  return res.status(201).json({ msg: "The new planet has been successfully created" });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);

  return res.status(200).json({ msg: "Planet has been successfully updated by ID" });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
  //console.log(planets);

  return res.status(200).json({ msg: `Planet with id:${id} was deleted` });
};

const uploadImage = async (req, res) => {
  //console.log(req.file);
  const { id } = req.params;
  const fileName = req.file?.path;

  if(fileName){
    db.none('UPDATE planets SET image=$2 WHERE id=$1;', [id, fileName]);
    return res.status(201).json({ msg: "Your file has been uploaded" });
  } else {
    return res.status(400).json({ msg: "Somenthing went wrong during the uploading"});
}
}

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  uploadImage,
};
