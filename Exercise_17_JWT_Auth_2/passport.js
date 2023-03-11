require("dotenv").config();
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { db } = require("./db");

const { SECRET } = process.env.SECRET;

passport.use(
    new passportJWT.Strategy({
        secretOrKey: SECRET,
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken,
    }, async (payload, done) =>{
        const user = await db.one('SELECT * FROM users WHERE id=$1;', payload.id);

        try {
            return user ? done(null, user) : done(new Error("Sorry, user not found"));
        } catch (error) {
            done(error);
        }
    })
)
