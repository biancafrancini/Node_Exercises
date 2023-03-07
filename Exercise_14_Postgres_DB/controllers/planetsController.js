const Joi = require("joi");

const db = require("../db");


const getAll = async (req, res) => {
  const planets = await db.query("SELECT * FROM planets;");
  console.log(planets);
  return res.status(200).json(planets);
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const planet_by_id = await db.query("SELECT * FROM planets WHERE id=$1;", Number(id));
  console.log(planets);

  return res.status(200).json(planet_by_id);
};

const create = async (req, res) => {
  const newPlanet = req.body;
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
  });

  const validatedNewPlanet = schema.validate(newPlanet);

  if(validatedNewPlanet.error){
    return res.status(400).json({msg: "Some data are not valid"});
  }

  /*const planets = await db.many("SELECT * FROM planets;");

  planets = [...planets, newPlanet];
  //console.log(planets);*/

  return res.status(201).json({ msg: "The new planet has been successfully created" });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  /*const planets = await db.many("SELECT * FROM planets;");

  planets = planets.map((planet) => planet.id === Number(id) ? { ...planet, name } : planet);
  //console.log(planets);*/

  return res.status(200).json({ msg: "Planet has been successfully updated by ID"});
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  /*const planets = await db.query("SELECT * FROM planets;");
  planets = planets.filter((planet) => planet.id !== Number(id));

  //console.log(planets);*/

  return res.status(200).json({ msg: `Planet with id:${id} was deleted`});
};



module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
};
