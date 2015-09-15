var express=require('express');
var logger=require('morgan');
var path=require('path');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

var rtTDConfig=require('./router/rtTDConfig');
var rtUser=require('./router/rtUser');
var rtTodo=require('./router/rtTodo');

var rtMCOrigin=require('./router/rtMCOrigin');
var rtMCModel=require('./router/rtMCModel');
var rtMCMaker=require('./router/rtMCMaker');
var rtMCEngine=require('./router/rtMCEngine');
var rtMCPic=require('./router/rtMCPic');

var app=express();

app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(require('express-session')({
	secret: 'cat',
	resave: false,
	saveUninitialized:false,
	cookie:{path:'/',maxAge:900000},
	rolling:true
}));
app.use(passport.initialize());
app.use(passport.session());

var svcUser=require('./toolbox/service/svcUser');
passport.use(new LocalStrategy(svcUser.authenticate));
passport.serializeUser(svcUser.serializeUser);
passport.deserializeUser(svcUser.deserializeUser);

app.use('/toolbox/svcTodolist',rtTDConfig);
app.use('/toolbox/svcToolbox',rtUser);
app.use('/toolbox/svcTodolist',rtTodo);

app.use('/mc/svcMCO',rtMCOrigin);
app.use('/mc/svcMC',rtMCModel);
app.use('/mc/svcMC',rtMCMaker);
app.use('/mc/svcMC',rtMCEngine);
app.use('/mc/svcMC',rtMCPic);

app.use('/testlab',express.static(path.join(__dirname,'../apps/testlab')));
app.use('/toolbox',express.static(path.join(__dirname,'../apps/toolbox')));
app.use('/mc',express.static(path.join(__dirname,'../apps/mc')));
app.use('/bower',express.static(path.join(__dirname,'../bower_components')));
app.use(express.static(__dirname + '/public'));


app.listen(3001);

process.on('uncaughtException', function (err) {
	  console.log('Caught exception: ' + err);
});


