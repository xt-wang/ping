/**
 * Module dependencies.
 */
var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    comment = require('./routes/comment'),
    http = require('http'),
    https = require('https'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade'); //default view engine
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
};

app.get('/', routes.index);
app.get('/user/list/', user.list);
//article/1003513372/commentnum?callback=myHotcomment
app.get('/comment/:targetid/num/', comment.num);
app.get('/comment/:targetid/list/', comment.list);
app.get('/comment/reply/', comment.sync);
app.get('/comment/add/', comment.add);
app.get('/comment/plus/', comment.plus);
app.get('/comment/report/', comment.report);

app.get('/test/:id/:id2',function(req, res){
    console.log(req.params.id);
    console.log(req.params.id2);
});
//http.createServer(app).listen(80);
//https.createServer(options, app).listen(443);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
/*
   var io = require('socket.io').listen(server);
   var redis = require('redis');
   var socket = io;
   socket.on('connection', function(client) {
   var subscribe = redis.createClient();
   subscribe.subscribe('pubsub'); //    listen to messages from channel pubsub
   subscribe.on("message", function(channel, message) {
   client.send(message);
   });
   client.on('message', function(msg) {

   });
   client.on('disconnect', function() {
   subscribe.quit();
   });
   });

//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});
*/
