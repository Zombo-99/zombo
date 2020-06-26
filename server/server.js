const express = require('express')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
// Config dotev
require('dotenv').config({
    path: './config/config.env'
})



const app = express();

// Connect to database
connectDB();

// body parser
app.use(bodyParser.json());






// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}

// Load routes
const authRouter = require('./routes/auth.route')
const DéclarationRouter = require('./routes/Déclaration.route')
const rapportRouter = require('./routes/rapport.route')
const annonceRouter = require('./routes/annonce.route')
// Use Routes
app.use('/api', authRouter);
app.use('/api',DéclarationRouter);
app.use('/api', annonceRouter);
app.use('/api', rapportRouter);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not found"
    })
})
const PORT = process.env.PORT || 4002

app.param('user', function (req, res, next, id) {
  // try to get the user details from the User model and attach it to the request object
  User.find(id, function (err, user) {
    if (err) {
      next(err)
    } else if (user) {
      req.user = user
      next()
    } else {
      next(new Error('failed to load user'))
    }
  })
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});