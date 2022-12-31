// Define Auth Routes..
function httpGoogleCallback(req, res) {
    (console.log('Google Called Back!'));
}

function httpLogout(req, res) {
    return(res.status(200).json({ auth: false }));
}

// Export HTTP functions..
module.exports = {
    httpGoogleCallback,
    httpLogout,
};