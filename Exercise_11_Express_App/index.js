require("dotenv").config();

const express = require("express");
const app = express();

app.use("/api", require("./planets"));

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () =>
  console.log(`My Server listen on port ${SERVER_PORT}`)
);
