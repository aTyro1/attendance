var mongoose=require('mongoose');
var express=require('express');
var bodyParser=require('body-parser');
var bcaStudents=require('D:/webTech/attendance/models/class_data');
var controller=require('D:/webTech/attendance/models/controller')
var express=require('express');
var app=express();
app.set('view engine','ejs');
var urlencodedParser=bodyParser.urlencoded({
	extended:false
});
app.use(express.static('./public'));
controller(app,urlencodedParser);


