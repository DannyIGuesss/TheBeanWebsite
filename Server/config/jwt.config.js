const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
jwt.verify(req.cookies.customerToken, secret, (err, payload) => {
    if (err) { 
        console.log('here', req.cookies);
        res.status(401).json({verified: false});
    } else {
        // console.log('Authenticated')
        req.user = payload._id
        // console.log('PAYLOAD', payload);
        next()
    }
});
}

