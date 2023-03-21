const foodItemController = require('../controllers/foodItem.controller')


module.exports = app => {
    app.post('/api/newItem', foodItemController.createItem)
    app.get('/api/getItems', foodItemController.getItems)
    app.get('/api/oneItem/:id', foodItemController.getOneItem)
}