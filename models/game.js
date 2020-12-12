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
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
})

gameSchema.virtual('cover').get(function () {
	if(this.coverImageMimeType == null || this.coverImage == null)
		return ''

	return `data:${this.coverImageMimeType};base64,${this.coverImage.toString('base64')}`
})

gameSchema.pre('save', function (next) {
	this.updatedAt = Date.now()
	next()
})

module.exports = mongoose.model('Game', gameSchema)