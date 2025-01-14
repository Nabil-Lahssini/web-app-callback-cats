const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers.cookie ? req.headers.cookie.split('token=')[1]:'';

    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication', errorCode: 403 });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token', errorCode: 401 });
    }

    return next();
};

module.exports = verifyToken;