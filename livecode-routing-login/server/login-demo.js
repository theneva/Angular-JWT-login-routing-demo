var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');

var app = express();

var secret = 'westerdalsosloschoolofartscommunicationandtechnologyavdelingforteknologicampusgalleriet';

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

	if (loginAttempt.username !== 'theneva'
			|| loginAttempt.password !== 'ananas') {
		return res.status(401).send('Wrong username or password');
	}

	var payload = {};
	var token = jwt.encode(payload, secret);

	return res.status(201).send(token);
});

app.get('/api/users', function(req, res) {
	var token = req.header('authorization');

	if (!token) {
		return res.status(401).send('No token supplied');
	}

	var payload = jwt.decode(token, secret);

	res.json([
		{username: 'theneva', phone: '32478972'},
		{username: 'eivindveg', phone: '78493893'},
		{username: 'j0nas', phone: '37284923'}
	]);
});

var port = 6783;
app.listen(port);
console.log('app listening on port: ' + port);
