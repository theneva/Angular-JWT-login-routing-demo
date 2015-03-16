var express = require('express'),
	jwt = require('jwt-simple'),
	bcrypt = require('bcrypt'),
	mongoose = require('mongoose');
    bodyParser = require('body-parser');

var app = express();
var secret = 'some long secret';

mongoose.connect('mongodb://localhost/routingLoginDemo', function() {
	console.log('connected to mongodb');
});

var Person = mongoose.model('Person', {
	username: String,
	passwordHash: String
});

app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/../angular'));

app.get('/api', function(req, res) {
    res.send('Hello, world!');
});

app.post('/sessions', function(req, res) {
	var loginAttempt = req.body;

	if (!loginAttempt || !loginAttempt.username || !loginAttempt.password) {
		return res.status(401).send('Request must contain {username, password}');
	}

	Person.findOne({username: loginAttempt.username}, function(err, person) {
		if (!person) {
			return res.status(401).send('Invalid username or password');
		}

		console.log(person);

		console.log('password hash:');
		console.log(person['passwordHash']);

		if (!bcrypt.compareSync(
				loginAttempt.password,
				person.passwordHash)) {
			return res.status(401).send('Invalid username or password');
		}

		var token = jwt.encode({username: loginAttempt.username}, secret);
		res.status(201).send(token);
	});
});

app.get('/user', function(req, res) {
	var token = req.header('authorization');

	if (!token) {
		return res.status(401).send('No token supplied');
	}

	var payload = jwt.decode(token, secret);

	if (payload.username !== 'theneva') {
		return res.status(401).send('No such user');
	}

	return res.json({username: 'theneva'});
});

app.get('/api/people', function(req, res) {
	var token = req.header('authorization');

	if (!token) {
		return res.status(401).send('No token supplied');
	}

	var payload = jwt.decode(token, secret);

	res.json([
		{username: 'Theneva'},
		{username: 'theknarf'},
		{username: 'j0nas'}
	]);
});

var port = 7894;
app.listen(port);
console.log('routing-login-server listening on port ' + port);
