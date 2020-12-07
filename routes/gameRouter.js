const router = require('express').Router()

const Game = require('../models/game')
const Genre = require('../models/genre')

router.get('/new', async (req, res) => {
	renderNewPage(res, new Game(), false)
})

router.get('/edit/:id', (req, res) => {
	res.render('game/edit')
})

router.get('/:id', (req, res) => {
	res.render('game')
})

router.post('/', async (req, res) => {
	const newGame = new Game({
		title: req.body.title,
		tagline: req.body.tagline,
		genre: req.body.genre,
		description: req.body.description,
	})

	try {
		await newGame.save()

		res.redirect(`/game/${newGame.id}`)
	} catch (err) {
		renderNewPage(res, newGame, true)
	}
})

async function renderNewPage(res, game, hasError) {
	try {
		const genres = await Genre.find({}).lean()

		const params = {
			genres,
			game: game.toObject(),
			errMsg: hasError ? 'An error occurred' : ''
		}

		res.render('game/new', params)
	} catch (err) {
		res.redirect('/')
	}
}

module.exports = router