// Require Express, Controllers..
const express = require('express');
const { httpSecret } = require('./secrets.controller');

// Init Router..
const secretRouter = express.Router();

// Route Controllers..
secretRouter.get('/', httpSecret);

// Export Router..
module.exports = secretRouter;