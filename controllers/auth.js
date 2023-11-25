const {response} = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')


const login = async(req, res = response) => {

    const {email, password} = req.body

    try {

        const userDB = await User.findOne({email})

        if(!userDB){
            res.status(404).json({
                ok:false,
                msg: 'this email does not exist'
            })
        }

        const correctPassword = bcrypt.compareSync(password, userDB.password)

        if(!correctPassword){
            return res.status(400).json({
                ok: false,
                msg: 'the password is not correct'
            })
        }
        
        res.json({
           ok: true,
           msg:"correct password" 
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "unexpected error"
        })
    }
}


module.exports = {
    login
}