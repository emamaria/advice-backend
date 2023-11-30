const { response } = require('express');

const bcrypt = require('bcrypt')

const User = require('../models/user');

const Advice = require('../models/advice');

const { generateJWT } = require('../helpers/jwt');




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

        //encriptar contraseña

        const salt = bcrypt.genSaltSync()

        
        user.password = bcrypt.hashSync(password, salt)
 
        await user.save()

        const token = await generateJWT(user.id, name, email)

        res.json({
            ok: true,
            user,
            token
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


        // check('email', 'Email is required with correct format').optional().isEmail(),
        // check('password', 'Password requires at least 8 characters that contains 1 number, 1 special character, 1 uppercase and 1 lowercase').optional().isStrongPassword(),
    

   
    try {

        const userDB = await User.findById(id)

        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: "does not exist user with this id"
            })
        }

        // const {email, password, name} = req.body
      
        
        if(req.body.email && userDB.email !== req.body.email){
            const emailExists = await User.findOne({email: req.body.email})

            if(emailExists){
                return res.status(400).json({
                    ok: false,
                    msg:'already exists user with this email'
                })
            }
        }

        if(req.body.password){
            const salt = bcrypt.genSaltSync()
            req.body.password = bcrypt.hashSync(req.body.password, salt)
    
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


 let userLikedAdviseIdList = []



    try {

        const {id} = req.params

        console.log(id)

       // const userDB = await User.findById(id)
       const adviseDocs = await Advice.find()

       console.log("advise db", adviseDocs)


       //almaceno los ids de advise donde este usuario hizo like
       adviseDocs.forEach(advise => {

        if(advise.likedUsersId !== null){
            if(advise.likedUsersId.includes(id)){
                userLikedAdviseIdList.push(advise.id)  
            }
        }
       
       })

       console.log(userLikedAdviseIdList)

    //    console.log("advisedocs", adviseDocs)

       //eliminar de cada advice que tiene like de ese usuario
       //el id de ese usuario

       for(let i = 0; i < userLikedAdviseIdList.length; i++){
        const advice = await Advice.findByIdAndUpdate(userLikedAdviseIdList[i],{$pull:{likedUsersId:id}},{new:true})
        console.log(advice)
      }
     
     
     
       
      
    //al eliminar usuario tb eliminar su advice si tiene
       const [userDB, adviceDB] = await Promise.all([
        User.findById(id),
        Advice.findOne({userId:id})
       ])

        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: "user with this id not exists"
            })
        }

        await User.findByIdAndDelete(id)

        if(adviceDB){
            await Advice.findByIdAndDelete(adviceDB.id)
        }
      

        res.status(200).json({
            ok:true,
            msg: "deleted user"
          })
    } catch (error) {
           console.log(error)
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




