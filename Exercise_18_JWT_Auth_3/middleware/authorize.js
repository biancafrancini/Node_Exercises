const passport = require("passport");
require("dotenv").config();

const authorize = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      res.status(401).json({ msg: "unathorized user", user: user });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

module.exports = { authorize };
