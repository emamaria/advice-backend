const { response } = require('express');

const Advice = require('../models/advice');


const getAllAdvice =  async(req, res = response) =>{

  
    try {

        const advise = await Advice.find()
                                   .populate('userId', 'name email')
        res.status(200).json({
           ok: true,
           advise
          })
    } catch (error) {
         res.status(500).json({
            ok: false,
            msg: "unexpected error"
         })
         
    }
     
}


const getOneAdvice =  async(req, res = response) =>{


   
    const {id} = req.params;

    try {
        
        const adviceDB = await Advice.findById(id)
                                     .populate('userId', 'name email')
        if(!adviceDB){
            return res.status(404).json({
                ok: false,
                msg: "doesnt exist advice with this id"
            })
        }
        res.status(200).json(adviceDB)
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "unexpected error"
         })
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


    const {id} = req.params
    try {
     
        const adviceDB = await Advice.findById(id)
        //el userId no se debe cambiar

        const {userId, ...updateFields} = req.body

        if(!adviceDB){
            return res.status(404).json({
               ok: false,
               msg: 'advice with this  id not exists'
            })
         }

         const updatedAdvice = await Advice.findByIdAndUpdate(id, updateFields ,{new: true} );
   
        res.status(200).json({
            ok:true,
            updatedAdvice,
           
          })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
           })
    }
     
}



const deleteAdvice =  async(req, res = response) =>{

  const {id} = req.params

    try {

    const adviceDB = await Advice.findById(id)

    if(!adviceDB){
        return res.status(404).json({
           ok: false,
           msg: 'Does not exist advice with this id'
        })
     }
  
     await Advice.findByIdAndDelete(id)
        res.status(200).json({
            ok: false,
            msg: `deleted advice`
          })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "unexpected error"
          })
    }
     
}

module.exports = {
    getAllAdvice,
    getOneAdvice,
    createAdvice,
    deleteAdvice,
    updateAdvice
}




