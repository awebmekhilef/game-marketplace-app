const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		enum: ['Action', 'Fantasy', 'Puzzle', 'Strategy', 'Sports'],
		required: true,
		unique: true,
		trim: true,
	}
})

module.exports = mongoose.model('Genre', genreSchema)