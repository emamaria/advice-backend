const { response } = require('express');

const User = require('../models/user');


const getUsers =  async(req, res = response) =>{


    try {
        res.json({
            msg: "get users"
          })
    } catch (error) {
         console.log("get users error")
    }
     
}


const getUser =  async(req, res = response) =>{


    try {
        res.json({
            msg: `get user ${req.params.id}`
          })
    } catch (error) {
         console.log("get users error")
    }
     
}



const createUser =  async(req, res = response) =>{

    const {email, password, name} = req.body
    
    try {

        const emailExists = await User.findOne({email})

        console.log(emailExists)
       
        if(emailExists){
            return res.status(400).json({
                ok:false,
                msg:'This email already exists'
            })
        }

        const user = new User(req.body)

        await user.save()

        res.json({
            ok: true,
            user
        })
    } catch (error) {
         console.log(error)
         res.status(500).json({
            ok:false,
            msg: "unexpected error"
         })
    }
     
}


const updateUser =  async(req, res = response) =>{


    try {
        res.json({
            msg: `upate ${req.params.id}`
          })
    } catch (error) {
         console.log("update user error")
    }
     
}



const deleteUser =  async(req, res = response) =>{


    try {
        res.json({
            msg: `delete ${req.params.id}`
          })
    } catch (error) {
         console.log("delete user error")
    }
     
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}




