var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');


app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(multer());

// create a default connection string
var connectionString = 'mongodb://localhost/webdev2016';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}


// connect to the database
var db = mongoose.connect(connectionString);



var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//security

var LocalStrategy = require('passport-local').Strategy;
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


require("./public/project/server/app.js")(app, mongoose, db, passport, LocalStrategy);
//require("./public/assignment/server/app.js")(app, mongoose, db, passport, LocalStrategy);

app.listen(port, ipaddress); //listening for incoming request


