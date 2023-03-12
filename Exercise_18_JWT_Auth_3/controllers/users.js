require("dotenv").config();
const { db } = require("../db");
const jwt = require("jsonwebtoken");

const logIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.one(`SELECT * FROM users WHERE username=$1;`, username);

  if (user && user.password === password) {
    const payload = {
      id: user.id,
      username,
    };

    const { SECRET = "" } = process.env;

    const token = jwt.sign(payload, SECRET);

    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);

    return res.status(200).json({ id: user.id, username, token });
  } else {
    return res.status(400).json({ msg: "Username or password not valid" });
  }
};

const signUp = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.oneOrNone(`SELECT * FROM users WHERE username=$1;`, username);

  if(user){
    
    return res.status(409).json({msg: "Signup successful. Now you can log in"});
  
} else {
    
    const { id } = await db.one(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;`, [username, password]);

    return res.status(201).json({id, msg: "A new user has been successfully created"});
  }
};

const logOut = async (req, res) => {
  const user = req.user;
  await db.none(`UPDATE users SET token=NULL WHERE id=$1 RETURNING id;`, [user, id, null]);
  res.status(200).json({ msg: "Logout has been successfully processed"})
}



module.exports = { logIn, signUp, logOut };
