const restController = require('../controllers/restController')
module.exports = app => {
  app.get('/', (req, res) => {
    res.redirect('/estaurants')
  })
  app.get('/restaurants', restController.getRestaurants)
}