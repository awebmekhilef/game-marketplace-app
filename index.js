if (process.env.NODE_ENV === 'development')
	require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/indexRouter')
const gameRouter = require('./routes/gameRouter')

const app = express()

// --------------- BODY PARSER ---------------
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// --------------- VIEW ENGINE ---------------
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/main')

app.use(ejsLayouts)

// --------------- DATABASE ---------------
mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const db = mongoose.connection
db.on('open', () => console.log('Connected to database'))
db.on('error', () => console.error('Error connecting to database'))

// --------------- ROUTES ---------------
app.use('/', indexRouter)
app.use('/game', gameRouter)

app.get('*', (req, res) => {
	res.end("Page not found")
})

app.listen(process.env.PORT || 3000, () => console.log("Server started"))