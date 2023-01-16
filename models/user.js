const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    custId: {
        type: String,
        required: true
    },
    custName: {
        type: String,
        required: true
    },
    accountPin: {
        type: Number,
        required: true
    },
    accountBalance: {
        type: Number,
        required: true,
        default: 0.00
    },
    amt: {
        type: Number
    }
})

module.exports = mongoose.model('User',userSchema)