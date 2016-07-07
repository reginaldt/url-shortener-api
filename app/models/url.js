'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
	original_url: String,
	url_id: Number	
});

module.exports = mongoose.model('Url', Url);
