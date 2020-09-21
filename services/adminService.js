const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurants => {
        callback({ restaurants })
      })
  },

  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id,
      {
        include: [Category]
      })
      .then(restaurant => {
        callback({ restaurant: restaurant.toJSON() })
      })
  },

  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        restaurant.destroy()
          .then(restaurant => {
            callback({ status: 'success', message: '' })
          })
      })
  },


  getCategories: (req, res, callback) => {
    return Category.findAll({
      raw: true,
      nest: true
    })
      .then(categories => {
        if (req.params.id) {
          Category.findByPk(req.params.id)
            .then((category) => {
              return res.render('admin/categories', {
                categories,
                category: category.toJSON()
              })
            })
        } else {
          callback({ categories })
        }
      })
  }
}

module.exports = adminService