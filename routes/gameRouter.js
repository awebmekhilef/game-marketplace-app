const router = require('express').Router()

const Game = require('../models/game')
const Genre = require('../models/genre')

// NEW GAME PAGE
router.get('/new', async (req, res) => {
	renderNewPage(res, new Game({}), false)
})

// EDIT GAME PAGE
router.get('/:slug/edit', async (req, res) => {
	try {
		const game = await Game
			.findOne({ slug: req.params.slug })
			.orFail()

		renderEditPage(res, game, false)
	} catch (err) {
		res.redirect(`/game/${req.params.slug}`)
	}
})

// VIEW GAME PAGE
router.get('/:slug', async (req, res) => {
	try {
		const game = await Game
			.findOne({ slug: req.params.slug })
			.populate('genre')
			.orFail()

		const todayDate = Date.now()

		res.render('game', {
			game,
			daysSincePublished: Math.floor((todayDate - game.createdAt) / (1000 * 3600 * 24)),
			daysSinceUpdated: Math.floor((todayDate - game.updatedAt) / (1000 * 3600 * 24))
		})
	} catch (err) {
		res.redirect('/')
	}
})

// CREATE NEW GAME
router.post('/new', async (req, res) => {
	const newGame = new Game({
		title: req.body.title,
		tagline: req.body.tagline,
		genre: req.body.genre,
		description: req.body.description,
	})

	trySaveCoverImage(newGame, req.body.cover)

	try {
		await newGame.save()

		res.redirect(`/game/${newGame.slug}`)
	} catch (err) {
		renderNewPage(res, newGame, true)
	}
})

// EDIT GAME
router.patch('/:slug/edit', async (req, res) => {
	let game

	try {
		game = await Game.findOne({ slug: req.params.slug })

		game.title = req.body.title
		game.tagline = req.body.tagline
		game.description = req.body.description
		game.genre = req.body.genre

		trySaveCoverImage(game, req.body.cover)

		await game.save()

		res.redirect(`/game/${game.slug}`)
	} catch (err) {
		if (game)
			renderEditPage(res, game, true)
		else
			res.redirect('/')
	}
})

// DELETE GAME
router.delete('/:slug', async (req, res) => {
	try {
		await Game.findOneAndDelete({ slug: req.params.slug })

		res.redirect(`/`)
	} catch (err) {
		res.redirect(`/game/${req.params.slug}/edit`)
	}
})

function trySaveCoverImage(game, encodedCover) {
	if (typeof encodedCover !== 'string' || encodedCover.trim() === '')
		return

	const cover = JSON.parse(encodedCover)

	if (cover == null)
		return

	game.coverImage = Buffer.from(cover.data, 'base64')
	game.coverImageMimeType = cover.type
}

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

async function renderEditPage(res, game, hasError) {
	try {
		const genres = await Genre.find({})

		const params = {
			genres,
			game,
			errMsg: hasError ? 'An error occurred' : ''
		}

		res.render('game/edit', params)
	} catch (err) {
		res.redirect(`/game/${game.slug}`)
	}
}

module.exports = router