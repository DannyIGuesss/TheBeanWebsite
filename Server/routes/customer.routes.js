const customerController = require('../controllers/customer.controllers')

module.exports= app => {
    app.post('/api/register', customerController.registeredCustomer)
    app.post('/api/login', customerController.login)
}