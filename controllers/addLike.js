const { response } = require('express');
const Advice = require('../models/advice');


const addLike = async(req, res = response) => {
    
    //id del advice al que le doy like
    const {id} = req.params
    //mando del req.body el id del usuario que da like

    const likedUserId = req.body.likedUsersId

    const adviceDB = await Advice.findById(id)

    if(adviceDB.likedUsersId !== null){

        if(adviceDB.likedUsersId.includes(likedUserId)){
            return res.status(404).json({
                ok: false,
                msg: 'You have alredy liked this advice'
             })
        }
    }
   

          adviceDB.likedUsersId.push(likedUserId)
          adviceDB.like += 1
          await adviceDB.save()

    res.status(200).json({
        ok:true,
        mag: "Ok Added like",
        adviceDB
    })

    
}



module.exports = {
    addLike
}