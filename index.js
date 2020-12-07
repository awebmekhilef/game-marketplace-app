if(process.env.NODE_ENV === 'development')
	require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const path = require('path')

const indexRouter = require('./routes/indexRoute')
const gameRouter = require('./routes/gameRouter')

const app = express()

// --------------- VIEW ENGINE ---------------
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.engine('hbs', handlebars({
	layoutsDir: path.join(__dirname, 'views', 'layouts'),
	defaultLayout: 'main',
	extname: '.hbs'
}))

// --------------- DATABASE ---------------
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('open', () => console.log('Connected to database'))
db.on('error', () => console.error('Error connecting to database'))

app.use('/', indexRouter)
app.use('/game', gameRouter)

app.get('*', (req, res) => {
	res.end("Page not found")
})

app.listen(process.env.PORT || 3000, () => console.log("Server started"))