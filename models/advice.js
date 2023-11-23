const {Schema, model} = require('mongoose');

const AdviceSchema = Schema({
    advice: {
        type: String,
        required: true
    },
    img: {
        type:String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    like: {
        type: Number,
        default: 0
    }
})

AdviceSchema.method('toJSON', function(){
  const {__v,...object } = this.toObject()
  return object;
})

module.exports = model('Advice', AdviceSchema)