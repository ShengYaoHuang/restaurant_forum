const db = require('../models')
const Category = db.Category
let categoryController = {
  getCategories: (req, res) => {
    return Category.findAll({
      raw: true,
      nest: true
    })
      .then(categories => {
        return res.render('admin/categories', { categories })
      })
  },
  postCategories: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', '請輸入分類名稱。')
      return res.redirect('back')
    } else {
      return Category.create({
        name: req.body.name
      })
        .then(categories => {
          res.redirect('/admin/categories')
        })
    }
  }
}

module.exports = categoryController