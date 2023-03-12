const passport = require("passport");
require("dotenv").config();

const authorize = async (req, res, next) => {
  await passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
     return res.status(401).json({msg: "unathorized user"})
    } else {
        req.user = user;
        next();
    }
  })(req, res, next);
};

module.exports = { authorize };
