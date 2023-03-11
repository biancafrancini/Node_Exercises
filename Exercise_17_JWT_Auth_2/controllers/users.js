require("dotenv").config();
const { db } = require("../db");
const jwt = require("jsonwebtoken");

const logIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.one(`SELECT * FROM users where username=$1;`, username);

  if (user && user.password === password) {
    const payload = {
      id: user.id,
      username,
    };

    const { SECRET= "" } = process.env;

    const token = jwt.sign(payload, SECRET);

    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);

    return res.status(200).json({id: user.id, username, token});
  } else {
    return res.status(400).json({ msg: "Username or password not valid" });
  }
};

module.exports = {logIn};
