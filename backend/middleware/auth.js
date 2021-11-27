const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers.cookie ? req.headers.cookie.split('token=')[1]:'';
    
    //console.log('This token will be verified: ');
    //console.log(token);

    // TODO: get token from cookie
    // set 'Bearer: ...'

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    
    let decoded;
    try {
        decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }

    return next();
};

module.exports = verifyToken;