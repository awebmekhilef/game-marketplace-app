const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	tagline: {
		type: String,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	genre: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Genre',
		required: true
	}
})

module.exports = mongoose.model('Game', gameSchema)