// Auth middleware to check if user is Authenticated..
function authCheck(req, res, next) {
    const isLoggedIn = true;
    if(!isLoggedIn) {
        return(res.status(401).json({ error: 'You must be Logged In!' }));
    }
    next();
}

// Export authCheck middleware..
module.exports = authCheck;