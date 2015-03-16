var express = require('express');

var app = express();

app.get('/api', function(req, res) {
	res.send('Hello, world');
});

var port = 6783;
app.listen(port);
console.log('app listening on port: ' + port);
