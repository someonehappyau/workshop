var express=require('express');
var logger=require('morgan');
var mongoose=require('mongoose');
var path=require('path');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

var rtTDType=require('./router/rtTDType');
var rtUser=require('./router/rtUser');
var rtTodo=require('./router/rtTodo');

mongoose.connect('mongodb://localhost/test');

var app=express();

app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(require('express-session')({
	secret: 'cat',
	resave: false,
	saveUninitialized:false,
	cookie:{path:'/toolbox',maxAge:300000},
	rolling:true
}));
app.use(passport.initialize());
app.use(passport.session());

var svcUser=require('./toolbox/service/svcUser');
passport.use(new LocalStrategy(svcUser.authenticate));
passport.serializeUser(svcUser.serializeUser);
passport.deserializeUser(svcUser.deserializeUser);

var checkUserRole=function(role){
	return [
		passport.authenticate('local'),
		function(req,res,next){
			if(req.user && req.user.role==='')
				next();
			else
				res.send(401, 'Unauthorized');
		}
	];
};

app.use('/toolbox/svcTodolist',rtTDType);
app.use('/toolbox/svcToolbox',rtUser);
app.use('/toolbox/svcTodolist',rtTodo);

app.use('/testlab',express.static(path.join(__dirname,'../apps/testlab')));
app.use('/toolbox',express.static(path.join(__dirname,'../apps/toolbox')));
app.use('/bower',express.static(path.join(__dirname,'../bower_components')));
app.use(express.static(__dirname + '/public'));


app.listen(3000);

process.on('uncaughtException', function (err) {
	  console.log('Caught exception: ' + err);
});


