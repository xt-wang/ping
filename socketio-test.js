/*
const PORT = 3000;
const HOST = 'localhost';
var express = require('express')
	, http = require('http');
var app = express()
//module.exports = express.createServer();
//app.use(express.staticProvider(__dirname + '/public'));
var server = app.listen(3000,"localhost");
//var io = require('socket.io').listen(server);

var redis = require('redis');
var client = redis.createClient();
const io = require('socket.io');
app.use(express.static(__dirname + '/public'));

if (!module.parent) {
    //app.listen(PORT, HOST);
    const socket  = io.listen(server);
    socket.on('connection', function(client) {
        const subscribe = redis.createClient();
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
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/

/**
 * Module dependencies.
 */
 
var express = require('express')
  , routes = require('./routes')
  , http = require('http');
 
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
var redis = require('redis');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

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

app.configure('development', function(){
  app.use(express.errorHandler());
});
 
app.get('/', routes.index);
 
 
console.log("Express server listening on port 3000");