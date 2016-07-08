'use strict';

var path = process.cwd();

var UrlHandler = require(path + '/app/controllers/urlHandler.server.js');

module.exports = function (app) {

	var urlHandler = new UrlHandler();

	app.route('/new/:url*')
		.get(urlHandler.addUrl);

	app.route('/:url_id')
		.get(urlHandler.accessUrl);


	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

};
