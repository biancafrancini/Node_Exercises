const Joi = require("joi");
const pgPromise = require("pg-promise");

const db = pgPromise({})("postgres://biancafrancini:admin92@localhost:5432/biancafrancini");

const setupDb = async() => {
  await db.none(`
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
  );`
  )

  await db.none(
    `INSERT INTO planets (name) VALUES ('Earth');`
  )
  await db.none(
    `INSERT INTO planets (name) VALUES ('Mars');`
  )

}

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

  if(validatedNewPlanet.error){
    return res.status(400).json({msg: "Some data are not valid"});
  } else{
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
    return res.status(201).json({ msg: "The new planet has been successfully created" });
  }
};

const updateById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  //planets = planets.map((planet) => planet.id === Number(id) ? { ...planet, name } : planet);
  //console.log(planets);

  return res.status(200).json({ msg: "Planet has been successfully updated by ID"});
};

const deleteById = (req, res) => {
  const { id } = req.params;
  planets = planets.filter((planet) => planet.id !== Number(id));

  //console.log(planets);

  return res.status(200).json({ msg: `Planet with id:${id} was deleted`});
};



module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
};
