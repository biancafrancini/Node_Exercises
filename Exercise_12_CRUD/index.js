require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const planets = require("./api/planets");
const app = express();

const { SERVER_PORT } = process.env;

app.use(morgan("dev"));

/**
 * @path api/planets
 */
app.get("/api/planets", (req, res) => {
  //console.log(JSON.stringify(planets));
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





app.listen(SERVER_PORT, () => {
  console.log(`The server listen at port ${SERVER_PORT}`);
});

module.exports = app;
