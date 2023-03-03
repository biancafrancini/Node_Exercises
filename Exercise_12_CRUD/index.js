require("dotenv").config();
const express = require("express");
const Joi = require("joi");
const morgan = require("morgan");
const app = express();

const { SERVER_PORT } = process.env;

app.use(express.json());

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

app.use(morgan("dev"));

/**
 * @path api/planets
 */
app.get("/api/planets", (req, res) => {
  console.log(planets);
  return res.status(200).json(planets);
});

/**
 * @path api/planets/:id
 */
app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;

  const planet_by_id = planets.find((planet) => planet.id === Number(id));
  //console.log(planet_by_id);

  return res.status(200).json(planet_by_id);
});

app.post("/api/planets", (req, res) => {
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
  console.log(planets);

  return res.status(201).json({ msg: "The new planet has been successfully created" });
});

app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const {name} = req.body;

  planets = planets.map((planet) =>
    planet.id === Number(id) ? { ...planet, name} : planet);
    console.log(planets)

  return res.status(200).json({ msg: "Planet has been successfully updated by ID", planets});
});


app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = planets.filter((planet) => planet.id !== Number(id));
    
    console.log(planets)

  return res.status(200).json({ msg: `Planet with id:${id} was deleted`, planets});
});



app.listen(SERVER_PORT, () => {
  console.log(`The server listen at port ${SERVER_PORT}`);
});

module.exports = app;
