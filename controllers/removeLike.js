const { response } = require('express');
const Advice = require('../models/advice');




const removeLike = async(req, res = response) => {
    
    //id del advice al que quito like
    const {id} = req.params
    //mando del req.body el id del usuario que quito el like

    const removelikeUserId = req.body.removelikeUsersId

    const adviceDB = await Advice.findById(id)

    
    if(!adviceDB.likedUsersId.includes(removelikeUserId)){
        return res.status(404).json({
            ok: false,
            msg: 'You did not give like to this advice'
         })
    }

    
         adviceDB.likedUsersId.pull(removelikeUserId)
         adviceDB.like -= 1
         await adviceDB.save()

    res.status(200).json({
        ok:true,
        mag: "Ok removed your like",
        adviceDB
    })

    
}

module.exports = {
    removeLike
}