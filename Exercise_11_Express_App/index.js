require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();

const { SERVER_PORT } = process.env;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("hello hellooo!!");
  return res.status(200).json({
    status: "online",
  });
});

app.listen(SERVER_PORT, () =>
  console.log(`My server listen on port ${SERVER_PORT}`)
);
