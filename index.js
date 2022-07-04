var express = require('express');
var app = express();
var shortid = require('shortid');
var port = 3000;

var db = require('./db');
var router = require('./routers/user.router');
app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.get('/', function(req, res) {
	res.render('index')
})

app.use('/users', router);
app.listen(port, function() {
	console.log('stated server' + port);
});