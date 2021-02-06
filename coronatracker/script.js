//global var to store the state name 
var state_name_array=[];

//change to 1 if user search by specific data because if user search by specific date it dont has active element
var no_active=0;
const STATE_CODES={
				AN: "Andaman and Nicobar Islands",
				AP: "Andhra Pradesh",
				AR: "Arunachal Pradesh",
				AS: "Assam",
				BR: "Bihar",
				CH: "Chandigarh",
				CT: "Chhattisgarh",
				DL: "Delhi",
				DN: "Dadra and Nagar Haveli and Daman and Diu",
				GA: "Goa",
				GJ: "Gujarat",
				HP: "Himachal Pradesh",
				HR: "Haryana",
				JH: "Jharkhand",
				JK: "Jammu and Kashmir",
				KA: "Karnataka",
				KL: "Kerala",
				LA: "Ladakh",
				LD: "Lakshadweep",
				MH: "Maharashtra",
				ML: "Meghalaya",
				MN: "Manipur",
				MP: "Madhya Pradesh",
				MZ: "Mizoram",
				NL: "Nagaland",
				OR: "Odisha",
				PB: "Punjab",
				PY: "Puducherry",
				RJ: "Rajasthan",
				SK: "Sikkim",
				TG: "Telangana",
				TN: "Tamil Nadu",
				TR: "Tripura",
				UN: "State Unassigned",
				UP: "Uttar Pradesh",
				UT: "Uttarakhand",
				WB: "West Bengal",
};

const API_CLOSED_DATE="2021-02-01";
function getAllData(isstatus=0) {
	/*
		getting data from api which has  "cases_time_series"  "statewise" and "tested" details we only need statewise details
	*/
	var alldatalink="https://api.covid19india.org/data.json";
	try
	{
		$.getJSON(alldatalink,function(data){
			// storing prev day val for calculation of total value in india 
			let prev_index=data["cases_time_series"].length;
			let prev_confirm=data["cases_time_series"][prev_index-1]["totalconfirmed"];
			let prev_recoverd=data["cases_time_series"][prev_index-1]["totalrecovered"];
			let prev_deaths=data["cases_time_series"][prev_index-1]["totaldeceased"];
			
			//iterating only statewise object
			$.each(data["statewise"],function(index,data){
				//storing value for calculation
				let date=data["lastupdatedtime"].split(" ")[0];
				let active=data["active"];
				let confirmed=data["confirmed"];
				let recovered=data["recovered"];
				let deaths=data["deaths"];
				//adding the today  status of covid 
				if(data["state"]==="Total")
				{
					//call function with isstatus =1 
				 	addDataToTable([date,active,confirmed,recovered,deaths],[prev_confirm,prev_recoverd,prev_deaths],1);	
				}
				//pushing the state details to table 
				else if(!isstatus)
				{
					//to change date fromat 
					date=date.split("/").reverse().join("-");
					//call function to get prev  day data 
					getPrevDayData(date,data["statecode"],[date,active,confirmed,recovered,deaths,data["state"]])	 
				}
			})

	}).fail(handleError);
	}
	catch(error)
	{
		handleError();
	}
}
function getPrevDayData(tdate,statecode,data_array) {
	let prevdate=tdate.split("-");
	//creating date object and month start from zero so minus one 
	prevdate=new Date(prevdate[0],prevdate[1]-1,prevdate[2]);
	//calculating prev day by sub one
	prevdate.setDate(prevdate.getDate()-1);
	// it return day/month/year, hr:min:sec AM
	prevdate=prevdate.toLocaleString();
	//spilting date and time 
	prevdate=prevdate.split(",")[0];
	// convert day/month/year day month year
	prevdate=prevdate.split("/");
	//if day is single digit adding zero to it 
	if(prevdate[0].length==1)
	{
		prevdate[0]="0"+prevdate[0]
	}
	//if date is single digit adding zero to it 
	if(prevdate[1].length==1)
	{
		prevdate[1]="0"+prevdate[1]

	}
	//changing date format to year/month/date
	prevdate=prevdate[2]+"-"+prevdate[0]+"-"+prevdate[1];
	let link="https://api.covid19india.org/v3/data-"+prevdate+".json";
	//store prev day data in array 
	let prev_data_array=[]
	fetch(link).then((response) => {
    					return response.json()
  						}).then((data) =>{
								if(data[statecode]!==undefined)
								{
								  
									    if(data[statecode]["total"]["confirmed"]===undefined)
										{			    
									     	prev_data_array.push(0)
										}
										else
										{
											prev_data_array.push(data[statecode]["total"]["confirmed"])
										}
									    if(data[statecode]["total"]["recovered"]===undefined)
									    {
										    prev_data_array.push(0)
										}
										else
										{
											prev_data_array.push(data[statecode]["total"]["recovered"])
										}			    
									    //if none one died pushing zero 
										if(data[statecode]["total"]["deceased"]===undefined)
									    {
										    prev_data_array.push(0)
										}
										else
										{
												prev_data_array.push(data[statecode]["total"]["deceased"])
										}
										//call functio to add data to tabel isstatus =0
										addDataToTable(data_array,prev_data_array,0);
								}
							    }).catch(handleError);
}
function addDataToTable(data_array,prev_data_array,isstatus,isold=0)
{
				//retrive the valu from array 
				let date=data_array[0];
				let active=data_array[1];
				let confirmed=data_array[2];
				let recovered=data_array[3];
				let deaths=data_array[4];

				let prev_confirm=prev_data_array[0]
				let prev_recoverd=prev_data_array[1]
				let prev_deaths=prev_data_array[2]
				if(!isold)
				{
					//calculating the difference 
					var diff_confirm=(confirmed-prev_confirm);
					var diff_deaths=(deaths-prev_deaths);
					var diff_recovered=(recovered-prev_recoverd);
				}
				else
				{
					var diff_confirm=prev_confirm;
					var diff_deaths=prev_deaths;
					var diff_recovered	=prev_recoverd;
				}
				console.log(diff_confirm,diff_deaths,diff_recovered,deaths)
				//  img src 
				let up_img_src="image/upimg.png";
				let down_img_src="image/downimg.png";
				let upgreen_img_src="image/upgreenimg.png"
				let confirm_pic,active_element,recovered_pic,deaths_pic;

				let increases="<br><img src="+up_img_src+" height='12px' width='12px'><span style='font-size:.7rem;'>"

				let decreases="<br><img src="+down_img_src+" height='12px' width='12px'><span style='font-size:.7rem;'>"
				//checking if it add to satus or table 
				if(isstatus==1)
				{
					//checking for diff and adding corresponding image for it 
				    if(diff_confirm>0)
				    {
				    	$("#confirmed-no").append(confirmed+increases+diff_confirm+"</span>");
				    }
				    //check if is negative to avoid adding img for zero 
				    else if (diff_confirm<=0)
				    {

				    	$("#confirmed-no").append(confirmed+decreases+Math.abs(diff_confirm)+"</span>");
				    }
				    if(diff_deaths>0)
				    {
				    	$("#deaths-no").append(deaths+increases+diff_deaths+"</span>");
				    }
				    else if(diff_deaths<=0)
				    {
				    	$("#deaths-no").append(deaths+decreases+Math.abs(diff_deaths)+"</span>");
				    }
				    if(diff_recovered>0)
				    {
				    	//setting uparrow img for recovered 
				    	let increases="<br><img src="+upgreen_img_src+" height='12px' width='12px'><span style='font-size:.7rem;'>"
				    	$("#recovered-no").append(recovered+increases+diff_recovered+"</span>");
				    }
				    else if (diff_recovered<=0)
				    {
				    	$("#recovered-no").append(recovered+decreases+Math.abs(diff_recovered)+"</span>");
				    }
				    $("#active-no").append(active);
					$("#status-date").text(date);
				}
				//add data to table 
				else
				{
					
					if(diff_confirm>0)
					{
						confirm_pic=confirmed+increases+diff_confirm;
						
					}
				    else if(diff_confirm<=0)
				    {
				    	confirm_pic=confirmed+decreases+Math.abs(diff_confirm);
				    	
				    }
				    if(diff_deaths>0)
				    {
				    	deaths_pic=deaths+increases+Math.abs(diff_deaths);
				    }
				    else if(diff_deaths<=0)
				    {	
				    	deaths_pic=deaths+decreases+Math.abs(diff_deaths);
				    }
				    if(diff_recovered>0)
				    {
				    	let increases="<br><img src="+upgreen_img_src+" height='12px' width='12px'><span style='font-size:.7rem;'>"
				    	recovered_pic=recovered+increases+diff_recovered;
				    }
				    else if(diff_recovered<=0)
				    {
				    	recovered_pic=recovered+decreases+Math.abs(diff_recovered);	
				    }
				    //checking if active persent or not
				    if(active)
				    {
						 active_element= "<div class='active-state'>Active<br><span id='active-no'>"+active+"</span></div>"

				    }
				    else{
				    	 active_element="<div></div>";
				    }
				    //retriving state value 
				    let state_name=data_array[5]?data_array[5]:"unknown state";
				  	state_name_array.push(state_name.toLowerCase())
				  	let class_name=state_name.split(" ")[0].toLowerCase();
					let state_html="<div class='state-div "+class_name+"' >						\
						  			<p class='state-name' onclick='goToState(event)'>"+state_name+"<br>"+date+"</p>	\
						  			<div class='state-data d-flex flex-wrap justify-content-between' >			\
						  			"+active_element+
						  				"<div class='confirmed-state'>Confirmed<br><span id='active-no'>"+confirm_pic+"</span></div>\
						  				<div class='recovered-state'>Recovered<br><span id='active-no'>"+recovered_pic+"</span></div>\
						  				<div class='deaths-state'>Deaths<br><span id='active-no'>"+deaths_pic+"</span></div><br>\
						  			</div>"
					$(".state-container").append(state_html);
				}
}
function goToState(event)
{ 
	//it return total text 
	let array=event.target.nextSibling.nextSibling.innerText.split("\n");
	console.log(array)
	debugger;
	let tactive=tconfirmed=trecovered=tdeaths=diff_confirm=diff_recovered=diff_deaths=0;
	if(no_active)
	{
		 tactive="unknown";
		 index=2
	}
	else{
		if(array[1])
		{
		 tactive=array[1];
		}
		index=0;
	}


	
	if(array[3-index])
	{
		 tconfirmed=array[3-index];
	}
	if(array[4-index])
	{
		 diff_confirm=array[4-index];
	}
	if(array[6-index])
	{
		 trecovered=array[6-index];
	}
	if(array[7-index])
	{
		 diff_recovered=array[7-index];
	}
	if(array[9-index])
	{
	 tdeaths=array[9-index];
	}
	if(array[10-index])
	{
		 diff_deaths=array[10-index];
	}
	
	//store all data as single object 
	let state_data={"tactive":tactive,"tconfirmed":tconfirmed,"trecovered":trecovered,"tdeaths":tdeaths,
					"diff_confirm":diff_confirm,"diff_recovered":diff_recovered,"diff_deaths":diff_deaths};

	//getting state 	
	let state_name =event.target.innerText.split("\n")[0];
	let prevdate= event.target.innerText.split("\n")[1];
	
	sessionStorage.setItem("state",state_name);
	sessionStorage.setItem("prevdate",prevdate);
	sessionStorage.setItem("state_data",JSON.stringify(state_data));
	window.location="state.html"	
}
function searchState()
{
	let search_val=$("#search_input").val().toLowerCase();
	$.each(state_name_array,function(index,state_name){
				//split the class name if it has space 
				let class_name=state_name.split(" ")[0]
				if(state_name.startsWith(search_val))
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

function search()
{
	let search_button=document.querySelector("#search_button");

	search_button.addEventListener("click",function(){
		let date=$("#search_date").val();
		//if user requested date greater than API CLOSED DATE handle error
		if(new Date(date)<new Date(API_CLOSED_DATE))
		{
			getSpecificData(date);
		}
		else
		{
			handleError();
		}
	});
}

function getSpecificData(date)
{
	//setting no active to 1
	no_active=1;
	$(".state-container").empty();
	document.querySelector(".state-container").style.display="flex";
	document.querySelector(".error_container").style.display="none";
	let link="https://api.covid19india.org/v3/data-"+date+".json";
	$.getJSON(link,function(datas){
			for(data in datas){
				let data_array=[];
				let prev_data_array=[];
				data_array.push(date);
				//pushing active has no active
				data_array.push(0)
				
				if(datas[data]["delta"])
				{
					if(datas[data]["delta"]["confirmed"]===undefined)
					{	    
				     	prev_data_array.push(0)
					}
					else
					{
						prev_data_array.push(datas[data]["delta"]["confirmed"])
					}
				    if(datas[data]["delta"]["recovered"]===undefined)
				    {
					    prev_data_array.push(0)
					}
					else
					{
						prev_data_array.push(datas[data]["delta"]["recovered"])
					}			    
				    //if none one died pushing zero 
					if(datas[data]["delta"]["deceased"]===undefined)
				    {
					    prev_data_array.push(0)
					}
					else
					{
							prev_data_array.push(datas[data]["delta"]["deceased"])
					}
				}
				if(datas[data]["total"])
				{
					if(datas[data]["total"]["confirmed"]===undefined)
					{			    
				     	data_array.push(0)
					}
					else
					{
						data_array.push(datas[data]["total"]["confirmed"])
					}
				    if(datas[data]["total"]["recovered"]===undefined)
				    {
					    data_array.push(0)
					}
					else
					{
						data_array.push(datas[data]["total"]["recovered"])
					}		
					    
				    //if none one died pushing zero 
					if(datas[data]["total"]["deceased"]===undefined)
				    {
				    	
					    data_array.push(0)
					}
					else
					{
						data_array.push(datas[data]["total"]["deceased"])
					}
				}
				//storing the coressponding sates name
				data_array[5]=STATE_CODES[data]?STATE_CODES[data]:"state code is "+data;
				addDataToTable(data_array,prev_data_array,0,1);
			}
			//calling the search state function to filter if user entered
			searchState();
		}).catch(handleError);

}
function handleError()
{
	document.querySelector(".state-container").style.display="none";
	document.querySelector(".error_container").style.display="flex";
}
search();

//added this at api closed on feb 6 2:47
if(new Date()<new Date(API_CLOSED_DATE))
{
	getAllData();
}
else
{
	handleError();
}
//calling only for getting satus
getAllData(1);