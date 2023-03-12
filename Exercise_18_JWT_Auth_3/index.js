require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const { authorize } = require("./middleware/authorize.js");
const passport = require("./passport.js");
const app = express();

const {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  uploadImage,
} = require("./controllers/planetsController");

const { 
  logIn,
  signUp,
  logOut,
 } = require("./controllers/users");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage });

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

/**
 * @path api/planets/:id/image
 * @request post
 */
app.post("/api/planets/:id/image", upload.single("image"), uploadImage);

/**
 * @path api/users/login
 * @request post
 */
app.post("/api/users/login", logIn);

/**
 * @path api/users/signup
 * @request post
 */
app.post("/api/users/signup", signUp);

/**
 * @path api/users/logout
 * @request get
 */
app.get("/api/users/logout", authorize, logOut);

app.listen(SERVER_PORT, () => {
  console.log(`The server listen at port ${SERVER_PORT}`);
});

module.exports = app;
