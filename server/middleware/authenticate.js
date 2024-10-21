const jwt = require('jsonwebtoken');
const User = require('../model/user');

const Authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.token;
        const verifyToken = jwt.verify(token, process.env.SECRETKEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })

        if (!rootUser) { throw new Error('User not found') }

        req.token = token;
        req.rootUser = rootUser;

        next();

    } catch (error) {
        res.status(401).send("Unauthorized: No token Provided");
        console.log(error)
    }
};

module.exports = Authenticate;