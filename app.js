const express = require('express')
const exphbs = require('express-handlebars')
const db = require('./models')

const app = express()

const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`App is running on http://localhost:${port}`)
})

require('./routes')(app)