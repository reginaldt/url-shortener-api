'use strict';

var URL = require('../models/url.js');
var config = require('../config/settings.js');

function UrlHandler () {

	var that = this;
	this.isUrl = function(str){
		// Regex from https://gist.github.com/dperini/729294
	    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	    return regex.test(str);
	}
	this.addUrl = function(req,res){
		//control favicon

		if (req.url === '/favicon.ico') {
		    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
		    res.end();
		    console.log('favicon requested');
		    return;
		}

		var url_id;
		var url = req.url.slice(5);
		
		URL.count({},function(err,count){

			if(err) throw err;

			url_id = parseInt(count) + 1;

			if( that.isUrl(url) ){
				var insertData = new URL({
					'original_url' : url,
					'url_id' : url_id
				});
				
				insertData.save(function(err){
					if(err) throw err;

					res.json({
						'original-url' : url,
						'short_url' : config.domain + '/' + String(url_id)
					});
					res.end;
				});
			}
			else{
				res.json({
					'error' : 'invalid URL'
				});
				res.end;

			}

		});

		
		
	}

	this.accessUrl = function(req,res){
		//control favicon

		if (req.url === '/favicon.ico') {
		    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
		    res.end();
		    console.log('favicon requested');
		    return;
		}

		var url_id = req.params.url_id;

		URL.count({'url_id' : url_id},function(err,count){

			if(err) throw err;
			if(count == 0){

				res.json({
					'error' : 'This url is not on the database.'
				});
			}
			else{

				URL.find({'url_id' : url_id },function(err,data){
					if(err) throw err;

					res.redirect( data[0].original_url.toString()  );
				});
			}
		});
	}

	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

}

module.exports = UrlHandler;
