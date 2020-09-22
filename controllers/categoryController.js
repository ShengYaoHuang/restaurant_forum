const db = require('../models')
const adminService = require('../services/adminService')
const Category = db.Category
let categoryController = {
  getCategories: (req, res) => {
    adminService.getCategories(req, res, (data) => {
      return res.render('admin/categories', data)
    })
  },

  postCategories: (req, res) => {
    adminService.postCategories(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/categories')
    })
  },

  putCategory: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', '請輸入分類名稱。')
      return res.redirect('back')
    } else {
      return Category.findByPk(req.params.id)
        .then((category) => {
          category.update(req.body)
            .then((category) => {
              res.redirect('/admin/categories')
            })
        })
    }
  },

  deleteCategory: (req, res) => {
    return Category.findByPk(req.params.id)
      .then(category => {
        category.destroy()
          .then(category => {
            res.redirect('/admin/categories')
          })
      })
  }
}

module.exports = categoryController