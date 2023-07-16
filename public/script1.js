var date=new Date();
		var day=date.getDate();
		var month=date.getMonth()+1;
		var year=date.getFullYear();
		var output=day+"/"+month+"/"+year;
		document.getElementById("date").value=output;
		document.getElementById("date").disabled=true;