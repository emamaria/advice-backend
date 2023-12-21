
const { response } = require('express');


const Advice = require('../models/advice');

const oneAdviceByUserId = async(req, res = response) =>{
    const {id} = req.params;

    try {
        
        const adviceDB = await Advice.find({userId: id})
                                     .populate('userId', 'name email')
        if(!adviceDB){
            return res.status(404).json({
                ok: false,
                msg: "doesnt exist advice with this Userid"
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


module.exports = {
    oneAdviceByUserId
}