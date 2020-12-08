const router = require('express').Router()

const Game = require('../models/game')

router.get('/', async (req, res) => {
	try {
		const games = await Game.find({})

		res.render('home', {
			games
		})
	} catch (err) {
		res.redirect('/')
	}
})

module.exports = router