const router = require('express').Router()

const Game = require('../models/game')
const Genre = require('../models/genre')

// NEW GAME PAGE
router.get('/new', async (req, res) => {
	renderNewPage(res, new Game({}), false)
})

// EDIT GAME PAGE
router.get('/edit/:id', (req, res) => {
	res.render('game/edit')
})

// VIEW GAME PAGE
router.get('/:id', async (req, res) => {
	try {
		const game = await Game.findById(req.params.id)
			.populate('genre')

		res.render('game', {
			game
		})
	} catch (err) {
		res.redirect('/')
	}
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
		const genres = await Genre.find({})

		const params = {
			genres,
			game,
			errMsg: hasError ? 'An error occurred' : ''
		}

		res.render('game/new', params)
	} catch (err) {
		res.redirect('/')
	}
}

module.exports = router