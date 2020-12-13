const router = require('express').Router()

const Game = require('../models/game')
const Genre = require('../models/genre')

router.get('/', async (req, res) => {
	try {
		let query = Game.find()

		if (req.query.title != null && req.query.title.trim() !== '')
			query = query.regex('title', new RegExp(req.query.title, 'i'))
		if (req.query.genre != null && req.query.genre !== '')
			query = query.where({ genre: req.query.genre })

		const games = await query.exec()
		const genres = await Genre.find({})

		res.render('home', {
			games,
			genres,
			query: req.query
		})
	} catch (err) {
		res.redirect('/')
	}
})

module.exports = router