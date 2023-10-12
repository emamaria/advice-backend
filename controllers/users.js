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

  
    
    try {
        res.json({
             ...req.body
          })
    } catch (error) {
         console.log("create user error")
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




