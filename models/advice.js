const {Schema, model} = require('mongoose');

const AdviceSchema = Schema({
    advice: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type:String,
        trim: true
    },
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        unique:true
    },
    like: {
        type: Number,
        default: 0,
        trim: true
    }
},{
    timestamps: true,
})

AdviceSchema.method('toJSON', function(){
  const {__v,...object } = this.toObject()
  return object;
})

module.exports = model('Advice', AdviceSchema)