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

  const {advice, img, userId, like} = req.body
    
    try {
       //si ya existe un advice de ese usuario, no debo crear mas, solo actualizar
       //en el front miro si existe un advice con ese id de usuario y si exite hago put en vez de post
        const userIdExists = await Advice.findOne({userId})

        console.log(userIdExists)

        if(userIdExists){
           return res.status(400).json({
            ok:false,
            msg: "already exist user with this id",
            adviceId: userIdExists.id
           })
        }

        const advice  = new Advice(req.body)

        await advice.save();

        res.status(200).json({
             ok: true,
             advice
          })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "unexpected error"
         })
    }
     
}


const updateAdvice = async(req, res = response) =>{


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




