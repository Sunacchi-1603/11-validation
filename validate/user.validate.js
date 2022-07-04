module.exports.postCreate = function(req, res, next) {
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
	next();
};