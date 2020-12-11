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
	coverImageMimeType: {
		type: String,
		required: true
	},
	coverImage: {
		type: Buffer,
		required: true
	},
	genre: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Genre',
		required: true
	}
})

gameSchema.virtual('cover').get(function () {
	if(this.coverImageMimeType == null || this.coverImage == null)
		return ''

	return `data:${this.coverImageMimeType};base64,${this.coverImage.toString('base64')}`
})

module.exports = mongoose.model('Game', gameSchema)