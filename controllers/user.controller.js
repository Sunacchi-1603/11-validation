var db =require('../db');
var shortid = require('shortid');

module.exports.index =  function(req, res) {
	res.render('users/index', { users: db.get('users').value()})};

module.exports.search = function(req, res) {
	var q = req.query.q;
	var mathUser = db.get('users').value().filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
	});
	res.render('users/index', { users: mathUser})
};
module.exports.create = function(req, res) {
	res.render('users/create')
};
module.exports.id = function(req, res) {
	var id = req.params.id;
	var user = db.get('users').find({ id: id}).value()
	res.render('users/view', { user: user})
};
module.exports.postCreate =  function(req, res) {
	req.body.id = shortid.generate();
	var errors = [];
	if (!req.body.name) {
		errors.push('Name is required.');
	}

	if(!req.body.phone) {
		errors.push('Phone is required.')
	}
	if(errors.length) {// neu > 0 nghiax la 1 trong 2 dong tren duoc thuc thi
		res.render('users/create', { 
			errors: errors,
			values: req.body //để khi  lỗi có thể dữ lại input vừa nhập
		})
		return;
	}
	db.get('users').push(req.body).write();
	res.redirect('/users');
};

