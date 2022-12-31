// Require Express, Routers..
const express = require('express');
const {
    googleRouter,
    logoutRouter
} = require('./auth.route');

// Create auth router..
const authRouter = express.Router();

// Route Google and Logout..
authRouter.use('/google', googleRouter);
logoutRouter.use('/logout', logoutRouter);

// Export authRouter..
module.exports = authRouter;