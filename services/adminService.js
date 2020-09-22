const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

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

  postRestaurant: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "請輸入餐廳名稱" })
    }
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: file ? img.data.link : null,
          CategoryId: req.body.categoryId
        }).then((restaurant) => {
          callback({ status: 'success', message: '已成功建立餐廳資料' })
        })
      })
    } else {
      return Restaurant.create({
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        opening_hours: req.body.opening_hours,
        description: req.body.description,
        image: null,
        CategoryId: req.body.categoryId
      })
        .then((restaurant) => {
          callback({ status: 'success', message: '已成功建立餐廳資料' })
        })
    }
  },

  putRestaurant: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "請輸入餐廳名稱" })
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Restaurant.findByPk(req.params.id)
          .then((restaurant) => {
            restaurant.update({
              name: req.body.name,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: file ? img.data.link : restaurant.image,
              CategoryId: req.body.categoryId
            }).then((restaurant) => {
              callback({ status: 'success', message: '已成功建立餐廳資料' })
            })
          })
      })
    } else {
      return Restaurant.findByPk(req.params.id)
        .then((restaurant) => {
          restaurant.update({
            name: req.body.name,
            tel: req.body.tel,
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            description: req.body.description,
            image: restaurant.image,
            CategoryId: req.body.categoryId
          }).then((restaurant) => {
            callback({ status: 'success', message: '已成功建立餐廳資料' })
          })
        })
    }
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
  },

  postCategories: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "請輸入餐廳名稱" })
    } else {
      return Category.create({
        name: req.body.name
      })
        .then(categories => {
          callback({ status: 'success', message: '已成功建立餐廳類別資料' })
        })
    }
  },
}

module.exports = adminService