const jwt = require("jsonwebtoken")
const SECRET_KEY_ADMIN = "masukadmin"

auth = (req, res, next) => {
    let header = req.headers.authorization
    let token = header && header.split(" ")[1]

    let jwtHeader = {
        algorithm: 'HS256'
    } 

    if(token == null){
        res.status(401).json({
            message: 'Unauthorized'
        })
    } else {
        jwt.verify(token, SECRET_KEY_ADMIN, jwtHeader, (err, user) => {
            if(err) {
                res
                .status(401)
                .json({
                    message: 'Invalid token'
                })
            } else {
                console.log(user);
                next()
            }
        })
    }
}

module.exports = auth