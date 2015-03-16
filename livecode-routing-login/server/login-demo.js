var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use('/', express.static(__dirname + '/../angular'));
app.use(bodyParser.json());

app.get('/api', function(req, res) {
	res.send('Hello, world');
});

app.get('/api/users', function(req, res) {
	res.json([
		{username: 'theneva', phone: '32478972'},
		{username: 'eivindveg', phone: '78493893'},
		{username: 'j0nas', phone: '37284923'}
	]);
});

var port = 6783;
app.listen(port);
console.log('app listening on port: ' + port);
