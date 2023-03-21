const customerController = require('../controllers/customer.controllers')
const {authenticate} = require('../config/jwt.config')

module.exports= app => {
    app.post('/api/register', customerController.registeredCustomer)
    app.post('/api/login', customerController.login)
    app.post('/api/logout', customerController.logout)
}