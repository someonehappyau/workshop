var express=require('express');
var logger=require('morgan');
var mongoose=require('mongoose');
var path=require('path');
var bodyParser=require('body-parser');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

var rtToolbox=require('./router/rtToolbox');
var rtTDType=require('./router/rtTDType');

mongoose.connect('mongodb://localhost/test');

var app=express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(require('express-session')({
	secret: 'cat',
	resave: false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

var User=require('toolbox/model/User');
passport.use(LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/svcToolbox',rtTDType);
app.use('/svcToolbox',rtToolbox);

app.use('/toolbox',express.static(path.join(__dirname,'../apps/toolbox')));
app.use('/bower',express.static(path.join(__dirname,'../bower_components')));
app.use(express.static(__dirname + '/public'));


app.listen(3000);
