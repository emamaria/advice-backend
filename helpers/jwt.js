const jwt = require('jsonwebtoken')

const generateJWT = (uid, name, email) => {

    return new Promise((resolve, reject) => {

        const payload = {uid, name, email}

        jwt.sign(payload, process.env.JWT_SEED, {
            expiresIn: '10h'
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('cannot generate jwt')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJWT
}