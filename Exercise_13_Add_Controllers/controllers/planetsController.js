const Joi = require("joi");

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const getAll = (req, res) => {
  //console.log(planets);
  return res.status(200).json(planets);
};

const getOneById = (req, res) => {
  const { id } = req.params;

  const planet_by_id = planets.find((planet) => planet.id === Number(id));
  //console.log(planet_by_id);

  return res.status(200).json(planet_by_id);
};

const create = (req, res) => {
  const newPlanet = req.body;
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
  });

  const validatedNewPlanet = schema.validate(newPlanet);

  if(validatedNewPlanet.error){
    return res.status(400).json({msg: "Some data are not valid"});
  }

  planets = [...planets, newPlanet];

  return res.status(201).json({ msg: "The new planet has been successfully created" });
};

const updateById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  planets = planets.map((planet) => planet.id === Number(id) ? { ...planet, name } : planet);

  return res.status(200).json({ msg: "Planet has been successfully updated by ID", planets });
};

const deleteById = (req, res) => {
  const { id } = req.params;
  planets = planets.filter((planet) => planet.id !== Number(id));

  return res.status(200).json({ msg: `Planet with id:${id} was deleted`, planets });
};


module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
};
