const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/users')
const projects = require('./routes/projects')
const issues = require('./routes/issues')
const passport = require("passport")
const path = require('path')

const connectionString = require('config').get('Config.mongoURI')

const app = express()
app.use(express.json())

mongoose
  .connect(process.env.DB || connectionString, 
    { 
      useNewUrlParser: true, 
      useCreateIndex: true, 
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/dashboard', projects)
app.use('/api/issues', issues)

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server up and running on port ${port}`))