const { response } = require('express');
const Advice = require('../models/advice');


const addLike = async(req, res = response) => {
    
    //id del advice al que le doy like
    const {id} = req.params
    //mando del req.body el id del usuario que da like

    const likedUserId = req.body.likedUsersId

    const adviceDB = await Advice.findById(id)
          adviceDB.likedUsersId.push(likedUserId)
          await adviceDB.save()

    res.json({
        adviceDB
    })

    
}

module.exports = {
    addLike
}