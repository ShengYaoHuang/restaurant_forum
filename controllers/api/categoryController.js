const db = require('../../models')
const adminService = require('../../services/adminService')
const Category = db.Category

const categoryController = {
  getCategories: (req, res) => {
    adminService.getCategories(req, res, (data) => {
      return res.json(data)
    })
  },

  postCategories: (req, res) => {
    adminService.postCategories(req, res, (data) => {
      return res.json(data)
    })
  },

  putCategory: (req, res) => {
    adminService.putCategories(req, res, (data) => {
      return res.json(data)
    })
  },
}
module.exports = categoryController