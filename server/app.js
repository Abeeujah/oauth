// Require Express, Router..
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const secretRouter = require('./routes/secret/secret.route');
const authRouter = require('./routes/auth/auth');
const authCheck = require('./middleware/auth.middleware');
require('dotenv').config();

// Passport Config and AUTH_OPTIONS..
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    SECRET_KEY: process.env.SECRET_KEY,
    SECRET_KEYED: process.env.SECRET_KEYED,
};

const AUTH_OPTIONS = {
    callbackURL: 'auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
};

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Passport Config..
function verifyCallback(accesToken, refreshToken, profile, done) {
    console.log(profile);
    done();
}
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Init app..
const app = express();
app.use(helmet());

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.SECRET_KEY, config.SECRET_KEYED],
}));

app.use(passport.initialize());
app.use(passport.session());

// Attach Routes to App..
// app.use('/auth', authRouter);
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email'],
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failure',
        successRedirect: '/',
        session: true,
    }),
    (req, res) => {
        console.log('Google called us back!');
    }
);
app.get('/secret', authCheck, secretRouter);
app.get('/failure', (req, res) => res.send('Omoo...'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html')));

// Export App..
module.exports = app;