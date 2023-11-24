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

    const {id} = req.params

    try {

        const userDB = await User.findById(id)

        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: "does not exist user with this id"
            })
        }

        const {email, ...restFields} = req.body

        if(userDB.email !== email){
            const emailExists = await User.findOne({email})

            if(emailExists){
                return res.status(400).json({
                    ok: false,
                    msg:'already exists user with this email'
                })
            }
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true})

        res.status(200).json({
            ok: true,
            user: updatedUser
          })
    } catch (error) {
            
        res.status(500).json({
            ok:false,
            msg: "unexpected error"
        })
         
    }
     
}



const deleteUser =  async(req, res = response) =>{


    try {

        const {id} = req.params

        console.log(id)

        const userDB = await User.findById(id)

        

        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: "user with this id not exists"
            })
        }

        await User.findByIdAndDelete(id)

        res.status(200).json({
            ok:true,
            msg: "deleted user"
          })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "something went wrong"
          })
    }
     
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}




