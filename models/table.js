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
	name:String
});
const bcaStudents=mongoose.model('bca',studentSchema);
module.exports=bcaStudents;

