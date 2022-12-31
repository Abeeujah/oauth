// Define HTTP Functions..
function httpSecret(req, res) {
    return (res.status(200).send('Your Secret is 42!'));
}

// Export HTTP Functions..
module.exports = {
    httpSecret,
};