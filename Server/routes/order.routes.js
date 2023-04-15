const orderController = require('../controllers/order.controller')
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/get', authenticate, orderController.getOrders)
    app.post('/api/createOrder', orderController.createOrder)
    app.delete('/api/deleteOrder', orderController.deleteOrder)
}