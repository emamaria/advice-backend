const { response } = require('express');

const Advice = require('../models/advice');


const getAllAdvice =  async(req, res = response) =>{


    try {
        res.json({
            msg: "get Alladvice"
          })
    } catch (error) {
         console.log("get advice error")
    }
     
}


const getOneAdvice =  async(req, res = response) =>{


    try {
        res.json({
            msg: `get advice ${req.params.id}`
          })
    } catch (error) {
         console.log("get advice error")
    }
     
}



const createAdvice =  async(req, res = response) =>{

  
    
    try {
        res.json({
             ...req.body
          })
    } catch (error) {
         console.log("create advice error")
    }
     
}


const updateAdvice =  async(req, res = response) =>{


    try {
        res.json({
            msg: `upate ${req.params.id}`
          })
    } catch (error) {
         console.log("update advice error")
    }
     
}



const deleteAdvice =  async(req, res = response) =>{


    try {
        res.json({
            msg: `delete ${req.params.id}`
          })
    } catch (error) {
         console.log("delete advice error")
    }
     
}

module.exports = {
    getAllAdvice,
    getOneAdvice,
    createAdvice,
    deleteAdvice,
    updateAdvice
}




