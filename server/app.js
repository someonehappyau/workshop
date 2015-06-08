var express=require('express');
var logger=require('morgan');
var mongoose=require('mongoose');
var path=require('path');
var bodyParser=require('body-parser');

var rtToolbox=require('./router/rtToolbox');

mongoose.connect('mongodb://localhost/test');

var app=express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));

app.use('/svcToolbox',rtToolbox);

app.use('/toolbox',express.static(path.join(__dirname,'../apps/toolbox')));
app.use('/bower',express.static(path.join(__dirname,'../bower_components')));
app.use(express.static(__dirname + '/public'));


app.listen(3000);
