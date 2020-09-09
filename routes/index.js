const restController = require('../controllers/restController')
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')
const user = require('../models/user')

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  }
  const authenticatedAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        return next()
      }
      return res.redirect('/')
    }
    return res.redirect('/signin')
  }

  app.get('/', authenticated, (req, res) => {
    res.redirect('/restaurants')
  })
  app.get('/restaurants', authenticated, restController.getRestaurants)

  app.get('/admin', authenticatedAdmin, (req, res) => {
    res.redirect('/admin/restaurants')
  })
  app.get('/admin/restaurants/create', (req, res) => {

  })
  app.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)
  app.get('/admin/restaurant/:id', (req, res) => {

  })
  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)

  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.post('/admin/restaurants', (req, res) => {

  })
  app.get('/admin/restaurants/:id/edit', (req, res) => {

  })
  app.put('/admin/restaurants/:id', (req, res) => {

  })
  app.delete('/admin/restaurants/:id', (req, res) => {

  })
  app.get('/logout', userController.logout)
}