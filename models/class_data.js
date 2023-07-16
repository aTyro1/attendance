const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/bca');
mongoose.connection.once('open',function(){
	console.log('connected!');
}).on('error',function(error){
	console.log('error');
});
const Schema=mongoose.Schema;
const studentSchema=new Schema({
	roll:Number,
	name:String,
	co:Number,
	stats:Number,
	ds:Number,
	rdbms:Number,
	ds_l:Number,
	rdbms_l:Number,
	fnm:Number,
	curr_date:Date
});
const bcaStudents=mongoose.model('bca',studentSchema);
module.exports=bcaStudents;