require("dotenv").config();
const express = require("express");
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
  return res.status(200).json(planets);
});


/**
 * @path api/planets/:id
 */
app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet_by_id = planets.find((planet) => planet.id === Number(id));
  return res.status(200).json(planet_by_id);
});


app.post("/api/planets", (req, res) => {
  const { id, name } = req.body;
  const newPlanet = {id, name};
  planets = [...planets, newPlanet];
  console.log(req.body);
  res.status(201).json({msg: "The new planet has been successfully created"});
});



app.listen(SERVER_PORT, () => {
  console.log(`The server listen at port ${SERVER_PORT}`);
});

module.exports = app;
