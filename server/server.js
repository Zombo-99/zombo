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

// Use Routes
app.use('/api', authRouter);




const DéclarationRouter = require('./routes/Déclaration.route')
// Use Routes

app.use('/api',DéclarationRouter);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

const PORT = process.env.PORT || 4001

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});