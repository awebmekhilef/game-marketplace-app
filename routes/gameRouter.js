const router = require('express').Router()

router.get('/new', (req, res) => {
	res.render('game/new')
})

router.get('/edit/:id', (req, res) => {
	res.render('game/edit')
})

router.get('/:id', (req, res) => {
	res.render('game')
})

module.exports = router