
/*
 * GET home page.
 */
//create index as api for other modules
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

