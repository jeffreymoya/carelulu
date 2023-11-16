const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const knex = require('../knex');

const configurePassport = () => {
    passport.serializeUser(({id, username}, done) => {
        done(null, {id, username});
    });

    passport.deserializeUser(async ({id}, done) => {
        try {
            const user = await knex('users').where({ id }).first();
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await knex('users').where({ username }).first();
            if (!user) return done(null, false);

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) return done(null, false);

            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));

    const options = {
        jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            function(req) {
                let token = null;
                if (req && req.cookies) {
                    token = req.cookies['token'];
                }
                return token;
            }
        ]),
        secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const user = await knex('users').where({ id: jwtPayload.id }).first();
            if (!user) return done(null, false);

            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));
}

module.exports = configurePassport;