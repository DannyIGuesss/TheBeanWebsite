const Order = require('../models/order.model')
const jwt = require('jsonwebtoken')

module.exports = {
    createOrder: async (req, res) => {
        try{
            // console.log('above');
            const decodedJwt = jwt.decode(req.cookies.customerToken, {complete:true})
            // console.log('decodedjwt',decodedJwt);
            const user_id = decodedJwt.payload._id
            // console.log('USER ID', user_id);
            const customer = req.body
            // console.log('line 13', customer);
            customer['customer_id'] = user_id
            // console.log('line 15');
            const completedOrder = Order.create(customer)
            // console.log(order.create(customer));
            // console.log(completedOrder);
            res.json(completedOrder)
        }
        catch(err){res.status(500).json({ message: "Oh no! Something went wrong!", error: err })}
    },
    getOrders: async (req,res) => {
        try{
                // console.log('USER ID FROM AUTHENTICATE',req.user);
                const idFromAuthenticate = req.user
                // const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true})
                // const user_id = decodedJwt.payload._id
                const allOrdersByLoggedInUser = await Order.find({customer_id: idFromAuthenticate})
                // console.log(allAlbumsByLoggedInUser);
                res.json(allOrdersByLoggedInUser)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    getOneOrder: (req,res) => {
        Order.findOne({_id: req.params.id})
        .then(oneOrder => {
            res.json(oneOrder)
        })
        .catch(err => {
            res.json(err)
        })
    }
}