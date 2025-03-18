const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userid:{
        type:String,
        requires:true
    },
    amount:{
        type:Number,
        requires:true,
    },
    type:{
        type:String,
        requires:true
    },
    category:{
        type:String,
        requires:true,
    },
    reference:{
        type:String,
        requires:true
    },
    desc:{
        type:String,
        requires:true
    },
    date:{
        type:Date,
        requires:true
    }
}, {timestamps:true})

module.exports = mongoose.model("transaction", transactionSchema)