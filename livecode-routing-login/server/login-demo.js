var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');

var app = express();

var secret = 'westerdalsosloschoolofartscommunicationandtechnologyavdelingforteknologicampusgalleriet';

mongoose.connect('mongodb://localhost/loginDemo', function() {
	console.log('Connected to MongoDB');
});

var User = mongoose.model('User', {
	username: String,
	password: String
});

app.use('/', express.static(__dirname + '/../angular'));
app.use(bodyParser.json());

app.get('/api', function(req, res) {
	res.send('Hello, world');
});

app.post('/api/sessions', function(req, res) {
	var loginAttempt = req.body;

	if (!loginAttempt
			|| !loginAttempt.username
			|| !loginAttempt.password) {
		return res.status(401).send('Request must contain {username, password}');
	}

	// 1. hent ut bruker fra databasen
	User.findOne({username: loginAttempt.username}, function(err, user) {

		// 1.5 hvis den ikke finnes, unauth
		if (!user) {
			return res.status(401).send('Wrong username or password');
		}

		// 2. sammenlikn passord
		if (loginAttempt.password !== user.password) {
			return res.status(401).send('Wrong username or password');
		}

		// 3. bygg og returner token
		var payload = {username: loginAttempt.username};
		var token = jwt.encode(payload, secret);
		
		return res.status(201).send(token);
	});
});

app.get('/api/users', function(req, res) {
	var user = validateUser(req);

	res.json([
		{username: 'theneva', phone: '32478972'},
		{username: 'eivindveg', phone: '78493893'},
		{username: 'j0nas', phone: '37284923'}
	]);
});

function validateUser(req) {
	var token = req.header('authorization');

	if (!token) {
		return res.status(401).send('No token supplied');
	}

	var payload = jwt.decode(token, secret);
}

var port = 6783;
app.listen(port);
console.log('app listening on port: ' + port);
