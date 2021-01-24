let country_name_array=[];
function getTodayStatus()
{
	let status_link="https://corona.lmao.ninja/v2/all";
	$.getJSON(status_link,function(data)
			{
			let active=data["active"];
			let confirmed=data["cases"]; //cases simillar to confirmed
			let recovered=data["recovered"];
			let deaths=data["deaths"];
			// getting toady detail to calc diff 
			let today_confirmed=data["todayCases"]; //cases simillar to confirmed
			let today_recovered=data["todayRecovered"];
			let today_deaths=data["todayDeaths"];

			//  img src 
			let up_img_src="image/upimg.png";
			let down_img_src="image/downimg.png";
			let upgreen_img_src="image/upgreenimg.png"


			let increases="<br><img src="+up_img_src+" height='12px' width='12px'><span style='font-size:.8rem;'>"

			let decreases="<br><img src="+down_img_src+" height='12px' width='12px'><span style='font-size:.8rem;'>"
			//checking for diff and adding corresponding image for it 
		    if(today_confirmed>0)
		    {
		    	$("#confirmed-no").append(confirmed+increases+today_confirmed+"</span>");
		    }
		    //check if is negative to avoid adding img for zero 
		    else if (today_confirmed<0)
		    {
		    	$("#confirmed-no").append(confirmed+decreases+Math.abs(today_confirmed)+"</span>");
		    }
		    if(today_deaths>0)
		    {
		    	$("#deaths-no").append(deaths+increases+today_deaths+"</span>");
		    }
		    else if(today_deaths<0)
		    {
		    	$("#deaths-no").append(deaths+decreases+Math.abs(today_deaths)+"</span>");
		    }
		    if(today_recovered>0)
		    {
		    	//setting uparrow img for recovered 
		    	let increases="<br><img src="+upgreen_img_src+" height='12px' width='12px'><span style='font-size:.8rem;'>"
		    	$("#recovered-no").append(recovered+increases+today_recovered+"</span>");
		    }
		    else if (today_recovered<0)
		    {
		    	$("#recovered-no").append(recovered+decreases+Math.abs(today_recovered)+"</span>");
		    }
		    $("#active-no").append(active);
			}).fail(handleError);
			getCountryStatus()

}
function getCountryStatus()
{
	 let country_link="https://corona.lmao.ninja/v2/countries";
	 $.getJSON(country_link,function(data)
			{
				$.each(data,function(index,data)
				{
					let active=data["active"];
					let confirmed=data["cases"]; //cases simillar to confirmed
					let recovered=data["recovered"];
					let deaths=data["deaths"];
					let country_name=data["country"]
					let img_flag_src=data["countryInfo"]["flag"]

					// getting toady detail to calc diff 
					let today_confirmed=data["todayCases"]; //cases simillar to confirmed
					let today_recovered=data["todayRecovered"];
					let today_deaths=data["todayDeaths"];

					let up_img_src="image/upimg.png";
					let down_img_src="image/downimg.png";
					let upgreen_img_src="image/upgreenimg.png"

					let increases="<img src="+up_img_src+" height='12px' width='12px'><span style='font-size:.8rem;'>"
					let decreases="<img src="+down_img_src+" height='12px' width='12px'><span style='font-size:.8rem;'>"
					
					//checking for diff and adding corresponding image for it 
				    if(today_confirmed>0)
				    {
				    	 confirmed=confirmed+increases+today_confirmed+"</span>";
				    }
				    //check if is negative to avoid adding img for zero 
				    else if (today_confirmed<0)
				    {
				   		 confirmed=confirmed+decreases+Math.abs(today_confirmed)+"</span>";
				    }
				    if(today_deaths>0)
				    {
				    	deaths=deaths+increases+today_deaths+"</span>";
				    }
				    else if(today_deaths<0)
				    {
				    	deaths=deaths+decreases+Math.abs(today_deaths)+"</span>";
				    }
				    if(today_recovered>0)
				    {
				    	//setting uparrow img for recovered 
				    	let increases="<img src="+upgreen_img_src+" height='12px' width='12px'><span style='font-size:.8rem;'>"
						recovered=recovered+increases+today_recovered+"</span>";
				    }
				    else if (today_recovered<0)
				    {
				    	recovered=recovered+decreases+Math.abs(today_recovered)+"</span>";
				    }
				    //push to array for search 
				    country_name_array.push(country_name.toLowerCase());
				    //split with space and add only first one and remove dot from it 
				    let class_name=country_name.split(" ")[0].toLowerCase().replace(".","");
					let country_html="<div class='country-div "+class_name+" '>										\
						  			<p class='country-name'>"+country_name+"</p>									\
						  			<img src="+img_flag_src+" alt='flag'>													\
						  			<div class='country-data d-flex flex-wrap justify-content-between' >			\
						  				<div class='active-country'>Active<br><span id='active-no'>"+active+"</span></div>\
						  				<div class='confirmed-country'>Confirmed<br><span id='active-no'>"+confirmed+"</span></div>\
						  				<div class='recovered-country'>Recovered<br><span id='active-no'>"+recovered+"</span></div>\
						  				<div class='deaths-country'>Deaths<br><span id='active-no'>"+deaths+"</span></div><br>\
						  			</div>"
					$(".country-container").append(country_html);
				});
			}).fail(handleError);
}
function searchCountry()
{
	let search_val=$("#search-input").val().toLowerCase();
	$("#search-input").val(search_val.toUpperCase());
	$.each(country_name_array,function(index,country_name){
				//split the class name if it has space 
				let class_name=country_name.split(" ")[0].replace(".","")
				if(country_name.startsWith(search_val))
				{
					$("."+class_name).addClass("show");
					$("."+class_name).removeClass("hide");	
				}
				else
				{
					$("."+class_name).addClass("hide");
				}
	});

}

function handleError()
{
	console.log("dd")
	$(".error_container").css({"display":"intial;"});
	$(".error-msg").text("Sorry for inconvenience try again later");
}
getTodayStatus();