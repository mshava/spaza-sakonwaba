exports.getSearchCategories = function (req, res, next){
	req.getConnection(function (err, connection){
		if (err)
			return next(err);
	var Admin = req.session.user === "Admin";
	var userRole = req.session.user !== "Admin";
    var searchValue = req.params.searchValue;
    searchValue = "%" + searchValue + "%";
    console.log(searchValue);
    var query = "SELECT * FROM categories WHERE category_name LIKE ?";
    connection.query(query,[searchValue],function (err, results){
    	if (err){
    		return next(err);
    	};
    	res.render("category_list",{
    		categories : results,
    		Admin : Admin,
    		userRole : userRole,
    		layout : false
    		});
    	});
    });
};

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err)
			return next(err);
		var query = 'SELECT  * from categories';
		connection.query(query, [], function(err, results) {
			if (err)
				return next(err);

			var result = {
				products : results
			};

			console.log(req.query);
			console.log("---> " + req.query);

			if(req.query.error === "true" ){
				result.error = "Can't delete category..."
			}

			res.render( 'addCategories', result);
		});
	});
};

exports.showmostPopCat = function(req, res, next) {
		req.getConnection(function(err, connection) {
			if (err)
				return next (err);
					connection.query('SELECT  categories.name, sum(sales.no_sold) as totalqty FROM sales INNER JOIN products ON sales.prod_id = products.id INNER JOIN categories ON products.cat_id = categories.id GROUP BY categories.name ORDER BY totalqty DESC LIMIT 0,1; ',[],function (err, results) {
				if (err){
				//console.log("...." + results.length);
					return (err);
				}
				res.render('popular_category', {
			    	products : results
				});
			});
		})
	};

exports.showleastPopCat = function(req, res, next) {
		req.getConnection(function(err, connection) {
			if (err)
			return next (err);
		        connection.query('SELECT  categories.name, sum(sales.no_sold) as totalqty FROM sales INNER JOIN products ON sales.prod_id = products.id INNER JOIN categories ON products.cat_id = categories.id GROUP BY categories.name ORDER BY totalqty ASC LIMIT 0,1; ',[],function (err, results) {
				if (err){
					//console.log("...." + results.length);
					return (err);
				}
				res.render('least_category', {
				    products : results
				});
			});
		})
	};




exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err){
			return next(err);
		}

		// get the data from the user & put it in a map that match your db columns
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			name : input.name,
		};

		connection.query('insert into categories set ?', data, function(err, results) {
			if (err)
			console.log("Error inserting : %s ",err );
			res.redirect('/categories');
		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM categories WHERE id = ?', [id], function(err,rows){
			if(err){
		        console.log("Error Selecting : %s ",err );
			}
		    res.render('edit',{page_title:"Edit Customers - Node.js", data : rows});
		});
	});
};

exports.update = function(req, res, next){
	var data = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('UPDATE categories SET ? WHERE Id = ?', [data, id], function(err, rows){
			if (err){
		       console.log("Error Updating : %s ",err );
			}
		    res.redirect('/categories');
		});
	});
};
exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
	    connection.query('DELETE FROM categories WHERE Id = ?', [id], function(err,rows){
	        if(err){
	            console.log("Error Selecting : %s ",err );
	            return res.redirect('/categories?error=true&msg=category_linked');
		    }
		    else{
	        	res.redirect('/categories');
	        }
		});
	});
};
