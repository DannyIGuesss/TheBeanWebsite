const FoodItem = require('../models/foodItem.model')



module.exports = {
  createItem: (req,res) => {
    FoodItem.create(req.body)
        .then(newItem => {
            res.json(newItem)
        })
        .catch(err => {
            res.json(err)
        })
},
  getItems: (req,res) => {
    FoodItem.find({})
      .then( allItems => {
        res.json(allItems)
      })
      .catch((err) => {
        console.log(err);
      })
  },
  getOneItem: (req,res) => {
    FoodItem.findOne({_id: req.params.id})
    .then(oneItem => {
      res.json(oneItem)
    })
    .catch(err => {
      res.json(err)
    })
  }
}
