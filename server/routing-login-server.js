var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/../angular'));

app.get('/api', function(req, res) {
    res.send('Hello, world!');
});

app.get('/api/people', function(req, res) {
	res.json([
		{username: 'Theneva'},
		{username: 'theknarf'},
		{username: 'j0nas'}
	]);
});

var port = 7894;
app.listen(port);
console.log('routing-login-server listening on port ' + port);
