'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	title: { type: String },
	excerpt: { type: String },
	content: { type: String },
	published: { type: Boolean },
	created: { type: Date , default: Date.now } 
};

var articleSchema = new Schema(fields);

module.exports = mongoose.model('Article', articleSchema);