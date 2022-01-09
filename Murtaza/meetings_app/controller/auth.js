const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token = req.cookies["auth-token"];
    if (token == undefined) 
        throw new Error("Auth token missing");

    const authenticatedUser = jwt.verify(token, config.get('app.secret'));
    console.log(authenticatedUser);
    if (authenticatedUser) {
        res.locals.userId = authenticatedUser.id;
        next();
    } else
        throw new Error("Invalid auth token");
}