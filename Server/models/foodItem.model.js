const mongoose = require('mongoose')

const FoodItem = new mongoose.Schema({
    name:{
        type: String
    },
    image:{
        type: String
    },
    price:{
        type: Number
    }
}, {timestamps: true})

module.exports = mongoose.model("FoodItem", FoodItem)