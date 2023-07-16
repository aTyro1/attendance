var mongoose=require('mongoose');
var date;
var r,n;
var preDate=new Date();
var bcaStudents=require('D:/webTech/attendance/models/class_data');
var holidays=[new Date('29-mar-2021'),new Date('30-mar-2021'),new Date('2-apr-2021'),new Date('3-apr-2021'),new Date('5-apr-2021'),new Date('21-apr-2019'),new Date('13-may-2021')];
function checkDate(d)
{
	for(h in holidays)
	{
		if(holidays[h].getDate()==d.getDate() && holidays[h].getMonth()==d.getMonth() && holidays[h].getYear()==d.getYear())
			return false;
	}
	if(d.getDay()==0)
		return false;
	return true;
}
module.exports=function(app,urlencodedParser){
	/*app.get('/',function(req,res){
		res.render('entry');
	});
	app.post('/entry',urlencodedParser,function(req,res){
		var obj={
			roll:Number(req.body.roll),
			name:req.body.name,
			co:Number(req.body.co),
			stats:Number(req.body.stats),
			ds:Number(req.body.ds),
			rdbms:Number(req.body.rdbms),
			ds_l:0,
			rdbms_l:0,
			fnm:Number(req.body.fnm),
			curr_date:new Date('19-mar-2021')
		}
		new bcaStudents(obj).save();
		res.render('entry');
	});*/
	function updateDate(d)
{
	switch(d)
				{
					case 1:
					app.get('/imp',function(req,res){
						res.render('monday');
					});
					break;
					case 2:
					app.get('/imp',function(req,res){
						res.render('tuesday');
					});
					break;
					case 3:
					app.get('/imp',function(req,res){
						res.render('wednesday');
					});
					break;
					case 4:
					app.get('/imp',function(req,res){
						res.render('thrusday');
					});
					break;
					case 5:
					app.get('/imp',function(req,res){
						res.render('friday');
					});
					break;
					case 6:
					app.get('/imp',function(req,res){
						res.render('sat');
					});
					break;
				}
}
	app.get('/',function(req,res){
		res.render('login');
	});
	app.post('/intials',urlencodedParser,function(req,res){
		bcaStudents.findOne({roll:Number(req.body.roll)}).then(function(result){
			r=Number(req.body.roll);
			n=result.name;
			date=result.curr_date;
			if(date.getDate()==preDate.getDate() && date.getMonth()==preDate.getMonth() && date.getYear()==preDate.getYear())
				{
					res.render('home',{name:n,roll:r});
				}
			date.setDate(date.getDate()+1);
			while(checkDate(date)!=true)
			{

				if(date.getDate()==preDate.getDate() && date.getMonth()==preDate.getMonth() && date.getYear()==preDate.getYear())
				res.render('home',{name:n,roll:r});
				date.setDate(date.getDate()+1);
				if(date.getDay()==0)
					date.setDate(date.getDate()+1);
			}
			var t=date.getDay();
			if(t==0)
			{
				date.setDate(date.getDate()+1);
				t=date.getDay();
			}
			if(date.getDate()==preDate.getDate() && date.getMonth()==preDate.getMonth() && date.getYear()==preDate.getYear())
				res.render('home',{name:n,roll:r});
			switch(t)
			{
				case 1:
				res.render('monday',{d:date});
				break;
				case 2:
				res.render('tuesday',{d:date});
				break;
				case 3:
				res.render('wednesday',{d:date});
				break;
				case 4:
				res.render('thrusday',{d:date});
				break;
				case 5:
				res.render('friday',{d:date});
				break;
				case 6:
				res.render('sat',{d:date});
				break;
			}	
		});
	});
	app.post('/updateMon',urlencodedParser,function(req,res){
		var date=new Date(req.body.dateofclass);
		var l=0,c=0,d=0;
		if(req.body.ds=='attended')
			d=1;
		if(req.body.co=='attended')
			c=1;
		if(req.body.dsl1=='attended')
			l+=1;
		if(req.body.dsl2=='attended')
			l+=1;
		
		bcaStudents.findOneAndUpdate({roll:r},{$inc:{co:c,ds:d,ds_l:l}}).then(function(result,err)
		{
		});
		bcaStudents.findOneAndUpdate({roll:r},{$set:{curr_date:new Date(date)}}).then(function(result)
		{
		});
		var nd=new Date();
		date.setDate(date.getDate()+1);
		if(date.getDate()==nd.getDate() && date.getMonth()==nd.getMonth() && date.getYear()==nd.getYear())
		{
			res.render('home',{name:n,roll:r});
		}
		else
		{
			nd=date;
			while(checkDate(nd)==false)
			{
				if(nd.getDate()==preDate.getDate() && nd.getMonth()==preDate.getMonth() && nd.getYear()==preDate.getYear())
				{
					res.render('home',{name:n,roll:r});
				}
				nd.setDate(nd.getDate()+1);
				if(nd.getDay()==0)
					nd.setDate(nd.getDate()+1);
			}
			var t=nd.getDay();
			if(t==0)
			{
				nd.setDate(nd.getDate()+1);
				t=nd.getDay();
			}
			switch(t)
			{
				case 1:
				res.render('monday',{d:nd});
				break;
				case 2:
				res.render('tuesday',{d:nd});
				break;
				case 3:
				res.render('wednesday',{d:nd});
				break;
				case 4:
				res.render('thrusday',{d:nd});
				break;
				case 5:
				res.render('friday',{d:nd});
				break;
				case 6:
				res.render('sat',{d:nd});
				break;
			}	
		}
	});
	app.post('/updateTues',urlencodedParser,function(req,res){
		var date=new Date(req.body.dateofclass);
		var l=0,c=0,d=0,s=0;
		if(req.body.ds=='attended')
			d=1;
		if(req.body.co=='attended')
			c=1;
		if(req.body.stats=='attended')
			s=1;
		if(req.body.dsl1=='attended')
			l+=1;
		if(req.body.dsl2=='attended')
			l+=1;
		
		bcaStudents.findOneAndUpdate({roll:r},{$inc:{co:c,ds:d,stats:s,ds_l:l}}).then(function(result)
		{
		});
		bcaStudents.findOneAndUpdate({roll:r},{$set:{curr_date:new Date(date)}}).then(function(result)
		{
		});
		var nd=new Date();
		date.setDate(date.getDate()+1);
		if(date.getDate()==nd.getDate() && date.getMonth()==nd.getMonth() && date.getYear()==nd.getYear())
		{
			res.render('home',{name:n,roll:r});
		}
		else
		{
			nd=date;
			while(checkDate(nd)!=true)
			{
				if(nd.getDate()==preDate.getDate() && nd.getMonth()==preDate.getMonth() && nd.getYear()==preDate.getYear())
				{
					res.render('home',{name:n,roll:r});
				}
				nd.setDate(nd.getDate()+1);
				if(nd.getDay()==0)
					nd.setDate(nd.getDate()+1);
			}
			var t=nd.getDay();
			if(t==0)
			{
				nd.setDate(nd.getDate()+1);
				t=nd.getDay();
			}
			switch(t)
			{
				case 1:
				res.render('monday',{d:nd});
				break;
				case 2:
				res.render('tuesday',{d:nd});
				break;
				case 3:
				res.render('wednesday',{d:nd});
				break;
				case 4:
				res.render('thrusday',{d:nd});
				break;
				case 5:
				res.render('friday',{d:nd});
				break;
				case 6:
				res.render('sat',{d:nd});
				break;
			}	
		}
	});
	app.post('/updateWed',urlencodedParser,function(req,res){
		var date=new Date(req.body.dateofclass);
		console.log(date);
		var l=0,c=0,d=0,s=0;
		if(req.body.rdbms=='attended')
			d=1;
		if(req.body.co=='attended')
			c=1;
		if(req.body.stats=='attended')
			s=1;
		if(req.body.rdbms1=='attended')
			l+=1;
		if(req.body.rdbms2=='attended')
			l+=1;
		
		bcaStudents.findOneAndUpdate({roll:r},{$inc:{co:c,rdbms:d,stats:s,rdbms_l:l}}).then(function(result)
		{
		});
		bcaStudents.findOneAndUpdate({roll:r},{$set:{curr_date:new Date(date)}}).then(function(result)
		{
		});
		var nd=new Date();
		date.setDate(date.getDate()+1);
		if(date.getDate()==nd.getDate() && date.getMonth()==nd.getMonth() && date.getYear()==nd.getYear())
		{
			res.render('home',{name:n,roll:r});
		}
		else
		{
			nd=date;
			while(checkDate(nd)!=true)
			{
				if(nd.getDate()==preDate.getDate() && nd.getMonth()==preDate.getMonth() && nd.getYear()==preDate.getYear())
				{
					res.render('home',{name:n,roll:r});
				}
				nd.setDate(nd.getDate()+1);
				if(nd.getDay()==0)
					nd.setDate(nd.getDate()+1);
			}
			var t=nd.getDay();
			if(t==0)
			{
				nd.setDate(nd.getDate()+1);
				t=nd.getDay();
			}
			switch(t)
			{
				case 1:
				res.render('monday',{d:nd});
				break;
				case 2:
				res.render('tuesday',{d:nd});
				break;
				case 3:
				res.render('wednesday',{d:nd});
				break;
				case 4:
				res.render('thrusday',{d:nd});
				break;
				case 5:
				res.render('friday',{d:nd});
				break;
				case 6:
				res.render('sat',{d:nd});
				break;
			}	
		}
	});
	app.post('/updateThu',urlencodedParser,function(req,res){
		var date=new Date(req.body.dateofclass);
		var l=0,c=0,d=0,s=0;
		if(req.body.rdbms=='attended')
			d=1;
		if(req.body.co=='attended')
			c=1;
		if(req.body.stats=='attended')
			s=1;
		if(req.body.rdbms1=='attended')
			l+=1;
		if(req.body.rdbms2=='attended')
			l+=1;
		
		bcaStudents.findOneAndUpdate({roll:r},{$inc:{co:c,rdbms:d,stats:s,rdbms_l:l}}).then(function(result)
		{
		});
		bcaStudents.findOneAndUpdate({roll:r},{$set:{curr_date:new Date(date)}}).then(function(result)
		{
		});
		var nd=new Date();
		date.setDate(date.getDate()+1);
		if(date.getDate()==nd.getDate() && date.getMonth()==nd.getMonth() && date.getYear()==nd.getYear())
		{
			res.render('home',{name:n,roll:r});
		}
		else
		{
			nd=date;
			while(checkDate(nd)!=true)
			{
				if(nd.getDate()==preDate.getDate() && nd.getMonth()==preDate.getMonth() && nd.getYear()==preDate.getYear())
				{
					res.render('home',{name:n,roll:r});
				}
				nd.setDate(nd.getDate()+1);
				if(nd.getDay()==0)
					nd.setDate(nd.getDate()+1);
			}
			var t=nd.getDay();
			if(t==0)
			{
				nd.setDate(nd.getDate()+1);
				t=nd.getDay();
			}
			switch(t)
			{
				case 1:
				res.render('monday',{d:nd});
				break;
				case 2:
				res.render('tuesday',{d:nd});
				break;
				case 3:
				res.render('wednesday',{d:nd});
				break;
				case 4:
				res.render('thrusday',{d:nd});
				break;
				case 5:
				res.render('friday',{d:nd});
				break;
				case 6:
				res.render('sat',{d:nd});
				break;
			}	
		}
	});
	app.post('/updateFri',urlencodedParser,function(req,res){
		var date=new Date(req.body.dateofclass);
		var l=0,c=0,d=0,s=0;
		if(req.body.rdbms=='attended')
			d=1;
		if(req.body.ds=='attended')
			c=1;
		if(req.body.stats=='attended')
			s=1;
		
		bcaStudents.findOneAndUpdate({roll:r},{$inc:{ds:c,rdbms:d,stats:s}}).then(function(result)
		{
		});
		bcaStudents.findOneAndUpdate({roll:r},{$set:{curr_date:new Date(date)}}).then(function(result)
		{
		});
		var nd=new Date();
		date.setDate(date.getDate()+1);
		if(date.getDate()==nd.getDate() && date.getMonth()==nd.getMonth() && date.getYear()==nd.getYear())
		{
			res.render('home',{name:n,roll:r});
		}
		else
		{
			nd=date;
			while(checkDate(nd)!=true)
			{
				if(nd.getDate()==preDate.getDate() && nd.getMonth()==preDate.getMonth() && nd.getYear()==preDate.getYear())
				{
					res.render('home',{name:n,roll:r});
				}
				nd.setDate(nd.getDate()+1);
				if(nd.getDay()==0)
					nd.setDate(nd.getDate()+1);
			}
			var t=nd.getDay();
			if(t==0)
			{
				nd.setDate(nd.getDate()+1);
				t=nd.getDay();
			}
			switch(t)
			{
				case 1:
				res.render('monday',{d:nd});
				break;
				case 2:
				res.render('tuesday',{d:nd});
				break;
				case 3:
				res.render('wednesday',{d:nd});
				break;
				case 4:
				res.render('thrusday',{d:nd});
				break;
				case 5:
				res.render('friday',{d:nd});
				break;
				case 6:
				res.render('sat',{d:nd});
				break;
			}	
		}
	});
	app.post('/updateSat',urlencodedParser,function(req,res){
		var date=new Date(req.body.dateofclass);
		var l=0,c=0,d=0,s=0;
		if(req.body.rdbms=='attended')
			d=1;
		if(req.body.ds=='attended')
			c=1;
		if(req.body.stats=='attended')
			s=1;
		if(req.body.fnm1=='attended')
			l+=1;
		if(req.body.fnm2=='attended')
			l+=1;
		l*=2;
		
		bcaStudents.findOneAndUpdate({roll:r},{$inc:{ds:c,rdbms:d,stats:s,fnm:l}}).then(function(result)
		{
		});
		bcaStudents.findOneAndUpdate({roll:r},{$set:{curr_date:new Date(date)}}).then(function(result)
		{
		});
		var nd=new Date();
		date.setDate(date.getDate()+1);
		if(date.getDate()==nd.getDate() && date.getMonth()==nd.getMonth() && date.getYear()==nd.getYear())
		{
			res.render('home',{name:n,roll:r});
		}
		else
		{
			nd=date;
			while(checkDate(nd)==false)
			{
				if(nd.getDate()==preDate.getDate() && nd.getMonth()==preDate.getMonth() && nd.getYear()==preDate.getYear())
				{
					res.render('home',{name:n,roll:r});
				}
				nd.setDate(nd.getDate()+1);
				if(nd.getDay()==0)
					nd.setDate(nd.getDate()+1);
			}
			var t=nd.getDay();
			if(t==0)
			{
				nd.setDate(nd.getDate()+1);
				t=nd.getDay();
			}
	
			switch(t)
			{
				case 1:
				res.render('monday',{d:nd});
				break;
				case 2:
				res.render('tuesday',{d:nd});
				break;
				case 3:
				res.render('wednesday',{d:nd});
				break;
				case 4:
				res.render('thrusday',{d:nd});
				break;
				case 5:
				res.render('friday',{d:nd});
				break;
				case 6:
				res.render('sat',{d:nd});
				break;
			}	
		}
	});
	app.listen(3000);
};