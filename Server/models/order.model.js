const mongoose = require('mongoose')

const Order = new mongoose.Schema({

    customer_id:{
        type: String
    },

    orderItems:[{
        name: {
            type: String
        },
        meat:{
            type: String
        },
        toppings:[{
            type: String
        }]
    }]
},{timestamps: true})



module.exports = mongoose.model('Order', Order)