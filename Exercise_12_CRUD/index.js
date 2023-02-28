require("dotenv").config();
const express = require("express");
const app = express();

const { SERVER_PORT } = process.env;







app.listen(SERVER_PORT, () => {
  console.log(`The server listen at port ${SERVER_PORT}`);
});

module.exports = app;
