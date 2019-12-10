//This application has been designed to print the maximum temperature and the average humidity for the next 5 days.
// note* I have used cors-anywhere server which is a proxy that adds CORS headers to a request.
//This is an fast way to fix the CORS error (when trying to fetch) on centain platforms (eg Chrome). Instead of building my own proxy.

fetch("https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b6907d289e10d714a6e88b30761fae22")
	.then(function(resp){
		return resp.json();
	})
	.then(function(data){
		name=data.city.name;
		document.write(name+"<br>");
		list=data.list
		d="";
		days_printed=0;
		res=[]
		for (i in list)
		{
			//finding the maximum temperature and the average humidity for the current day
			if (d=="")
			{
				d=list[i].dt_txt.substring(0,10);
				max=list[i].main.temp_max;
				avg=list[i].main.humidity;
				c=1
				continue
			}

			if (d==list[i].dt_txt.substring(0,10))
			{
				if (list[i].main.temp_max>max)
				{
					max=list[i].main.temp_max;
				}
				avg=avg+list[i].main.humidity;
				c=c+1;
				if (i !=(list.length-1))
				{
					continue
				}
				
			}

			//printing the values when the date is changed and checking the number of days printed
			document.write(d+"<br>");
			document.write("Max temperature: "+max+"<br>")	
			document.write("Average humidity: "+avg/c+"<br>");
			d=list[i].dt_txt.substring(0,10);
			max=list[i].main.temp_max;
			avg=list[i].main.humidity;
			c=1
			days_printed=days_printed+1;
			if (days_printed >= 5)
			{
				break
			}
  		
		}
	})


