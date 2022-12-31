// Require HTTPS and App..
const fs = require('fs');
const https = require('https');
const app = require('./app');
require('dotenv').config();

// Server Intricacies..
const PORT = process.env.PORT || 8000;
const server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
},app);

// Listen For Requests..
server.listen(PORT, () => {
    console.log(`Server is Listening at ${PORT}...`);
});