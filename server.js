const express = require('express') 
const app = express()
const passport = require('passport')
//passport has strategies to do diff log in access
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
//morgan is the log that keeps the events written down 
const logger = require('morgan')
const connectDB = require('./config/database')
//require the routes created
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

//require the model created
const Todo = require('./models/Todo')
const Destination = require('./models/Destination')

//Load config/ use the environment variables
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)


app.set('view engine', 'ejs')
//app.use(express.static('public'))
//app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

// Sessions
/*used for authentication when user signs in  and using cookies
to store user information 
*/
app.use(
    session({
      secret: process.env.SESH_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_DEV === 'PROUCTION'
      },
      store: MongoStore.create({ 
        mongoUrl: process.env.DB_STRING }),
    })
  );
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Flash is for errors with password
app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)

//Connecting to DB
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    


