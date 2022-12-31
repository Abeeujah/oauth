// Require Express, Routes..
const express = require('express');
const passport = require('passport');
const {
    httpGoogleCallback,
    httpLogout
} = require('./auth.controller');

// Create Router..
const googleRouter = express.Router();
const logoutRouter = express.Router();

// Route Endpoints..
googleRouter.get('/', passport.authenticate('google', {
    scope: ['email'],
}));

googleRouter.get('/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: 'https://localhost:3000',
    session: true,
}), httpGoogleCallback);
logoutRouter.get('/', httpLogout);

// Export Routers..
module.exports = {
    googleRouter,
    logoutRouter,
};