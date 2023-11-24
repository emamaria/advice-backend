const { response } = require('express');

const User = require('../models/user');


const getUsers = async(req, res = response) =>{


  try {

        const users = await User.find()
        res.status(200).json({
            ok: true,
            users
          })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "unexpected error"
         })
    }
     
}


const getUser =  async(req, res = response) =>{

    const {id} = req.params;

    try {
        
        const userDB = await User.findById(id)

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: "doesnt exist user with this id"
            })
        }
        res.status(200).json(userDB)
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "unexpected error"
         })
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




