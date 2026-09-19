// Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCoCusA1Ytw4rVvKyYWbA-8qYzzyRsxnmA",
    authDomain: "pydatabase.firebaseapp.com",
    databaseURL: "https://pydatabase.firebaseio.com",
    projectId: "pydatabase",
    storageBucket: "pydatabase.appspot.com",
    messagingSenderId: "824884022334",
    appId: "1:824884022334:web:f453f4bf4f153a84f8d56f",
    measurementId: "G-FB963CN6V4"
  };
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 //global var 
 var auth=firebase.auth();


//main function program start here 
function main()
{
	signUp();
	sigIn();
	signOut();
}

//program begin here 
main()


//signin function to handle the sigin  method
function sigIn()
{
	//getting  the doc node of signin button
	let signin_button=document.getElementById("signin");
	//attaching the event listener click to the signin button
	signin_button.addEventListener("click",function(button)
	{
		//getting the user entered email and password
		let email=document.getElementById("email").value;
		let password=document.getElementById("password").value;
		//checking if user enters the email and password
		if(email && password)
		{
				//calling the siginwithemailandpassword by passing email password to the function
				let user_promises=auth.signInWithEmailAndPassword(email,password);
				user_promises.then(function(userprofile)
				{
					//cheking if user got signin
					if(userprofile.user)
					{
							/*
							adding event listener onAuthStateChanged to check user status if he is signin or siginout 
							*/
							var unsubscribe=auth.onAuthStateChanged(function(userprofile)
							{
								//if user signin
								if(userprofile)
								{
									
									//getting  the doc node of form_container , user_container and msg
									let form_container=document.getElementById('form_container');
									let user_container=document.getElementById('user_container');
									let paragraph=document.getElementById('msg');

									//checking if user has verified his email id
									if(userprofile && userprofile.emailVerified===false)
									{
											//if usernot verified the mail the mail will be send to user mail address
											userprofile.sendEmailVerification().then(function()
											{
							 					alert("mail send to your mail id ")
											})
											
											form_container.style.display="none";
											user_container.style.display="flex";
											paragraph.innerText="You sign in sucessfully but You need to verify your mail address to see the secret msg";
									}
									//if user mail is verified he can see the secret text
									else if( userprofile.emailVerified===true)
									{
										form_container.style.display="none";
										user_container.style.display="flex";
										//getting firestore
										let db=firebase.firestore();
										//getting the collection secrets in firestore
										let data=db.collection("Secrets").get()
										//if we get 
										data.then(function(snapshot)
										{
											//getting the secret msg 
											let secrets=snapshot.docs[0].data()["Msg"];
											//adding to the display
											paragraph.innerText="You sign in sucessfully";
											let secrets_para=document.getElementById('secrets');
											secrets_para.innerText="your Secret word is '"+secrets+"'";
										})//reading data end here
										
									}//else if end here
								//unsubscribe the onAuthStateChanged event to avoid call after user sign out
								unsubscribe();
								}//if userprofile end here
							})//auth state listener end here
					}//if user profile end here 					
				})//then end here 
				//if any error accur catch that
				user_promises.catch(function(errors)
				{
					//getting  the doc node of signout button
					let error=document.getElementById("error");
					error.innerText=errors.message;
				})//catch end here 
		}//if email and password end here 
		else
		{
			let error=document.getElementById("error");
			error.innerText="Enter your mail address and password please"
		}//else end here
	})//event listener end here
}//function end here

//signup function to handle the sigin  method
function signUp()
{
	//getting  the doc node of signup button
	let signup_button=document.getElementById("signup");
	//attaching the event listener click to the signin button
	signup_button.addEventListener("click",function(button)
	{
		//getting the user entered email and password
		let email=document.getElementById("email").value;
		let password=document.getElementById("password").value;
		//checking if user enters the email and password
		if(email && password)
		{
				//calling the createUserWithEmailAndPassword by passing email password to the function
				let user_promises=auth.createUserWithEmailAndPassword(email,password);
				user_promises.then(function(userprofile)
				{
					//cheking if user got signin
					if(userprofile.user)
					{
						/*
							adding event listener onAuthStateChanged to check user status if he is signin or siginout
						*/
						let unsubscribe=auth.onAuthStateChanged(function(userprofile)
						{
							//if user signup
							if(userprofile)
							{
								//getting  the doc node of form_container , user_container and msg
								let form_container=document.getElementById('form_container');
								let user_container=document.getElementById('user_container');
								let paragraph=document.getElementById('msg');
								//checking if user has verified his email id
								if(userprofile && userprofile.emailVerified===false)
								{
										userprofile.sendEmailVerification().then(function()
										{
						 					alert("mail send to your mail id ")
										})
										
										form_container.style.display="none";
										user_container.style.display="flex";
										paragraph.innerText="You sign up sucessfully but You need to verify your mail address to see the secret msg";
								}//if userprofile and emailVerified end here
							}//if user profile end here
							//unsubscribe the onAuthStateChanged event to avoid call after user sign out
							unsubscribe();
						})//auth state event listener end here 
					}//if user profile end here
				})//user promises then end here 
				//if any error accur catch that
				user_promises.catch(function(errors)
				{
					//getting  the doc node of signout button
					let error=document.getElementById("error");
					error.innerText=errors.message;
				})//user promises catch end here
		}//if email and password end here 	
		else
		{
			let error=document.getElementById("error");
			error.innerText="Enter your mail address and password please"
		}//else end here
	})//event listener end here
}//function end here

function signOut()
{
	//getting  the doc node of signout button
	let signout_button=document.getElementById("signout");
	//attaching the event listener click to the signout button
	signout_button.addEventListener("click",function(button)
	{
		//calling the signout function  
		let signout_promises=auth.signOut();
		
		//if sign out sucess
		signout_promises.then(function(){
				//getting  the doc node of form_container , user_container and msg
				let form_container=document.getElementById('form_container');
				let user_container=document.getElementById('user_container');
				//style the container
				form_container.style.display="flex";
				user_container.style.display="none";
				//getting the email , password and error pragraph node and set to empty
				let email=document.getElementById("email");
				email.value="";
				let password=document.getElementById("password");
				password.value="";
				let error=document.getElementById("error");
				error.innerText="";
		})//sign out then end here 

		//if sign out failed
		signout_promises.catch(function(errors){
			//getting  the doc node of signout button
			let error=document.getElementById("error");
			error.innerText=error.message;
		})//sign out catch end here 
	})//event listener end here
}//function end here 