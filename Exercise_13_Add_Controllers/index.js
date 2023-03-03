require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();

const {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} = require("./controllers/planetsController");

const { SERVER_PORT } = process.env;

app.use(express.json());

app.use(morgan("dev"));

/**
 * @path api/planets
 */
app.get("/api/planets", getAll);

/**
 * @path api/planets/:id
 */
app.get("/api/planets/:id", getOneById);

/**
 * @path api/planets
 * @request post
 */
app.post("/api/planets", create);

/**
 * @path api/planets/:id
 * @request put
 */
app.put("/api/planets/:id", updateById);

/**
 * @path api/planets/:id
 * @request delete
 */
app.delete("/api/planets/:id", deleteById);



app.listen(SERVER_PORT, () => {
  console.log(`The server listen at port ${SERVER_PORT}`);
});

module.exports = app;
