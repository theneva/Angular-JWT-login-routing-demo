var express = require('express'),
	jwt = require('jwt-simple'),
    bodyParser = require('body-parser');

var app = express();
var secret = 'some long secret';

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

	if (loginAttempt.username !== 'theneva'
		|| loginAttempt.password !== 'ananas') {
		return res.status(401).send('Invalid username or password');
	}

	var token = jwt.encode({}, secret);
	res.status(201).send(token);
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
