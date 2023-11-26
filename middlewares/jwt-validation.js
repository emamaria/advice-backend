const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
    
    const token = req.header('token')

    if(!token){
        return res.status(401).json({
            ok:false,
            msg: "No token in the request"
        })
    }

    try {

        const {uid, name, email} = jwt.verify(token, process.env.JWT_SEED)

        req.uid = uid;
        req.name = name;
        req.email = email;

        next()
        
    } catch (error) {
        
        return res.status(401).json({
            ok:false,
            msg: 'invalid token'
        })
    }
}


module.exports = {
    validateJWT
}