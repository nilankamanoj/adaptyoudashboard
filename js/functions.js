
		var signin = "<div id ='frmsignin'>"
			+"<h3 class='cursive-font'>sign in</h3>"
			+"<form action='javascript:signIn()'>"
			+"<div class='row form-group'>"
			+"<div class='col-md-12'>"
			+"<label for='email'>email</label>"
			+"<input type='text' id='email' class='form-control'>"
			+"</div>"
			+"</div>"
			+"<div class='row form-group'>"
			+"<div class='col-md-12'>"
			+"<label for='password'>password</label>"
			+"<input type='password' id='password' class='form-control'>"
			+"</div>"
			+"</div>"
	  	+"<div class='row form-group'>"
			+"<div class='col-md-12'>"
			+"<button class='btn btn-primary' id ='btnsin' ><span>sign in</span></a></button>"
			+"</div>"
			+"</div>"
		  +"</form>"
		  +"</div>";

			var signup = "<div id ='frmsignup'>"
				+"<h3 class='cursive-font'>sign up</h3>"
				+"<form action='javascript:signUp()'>"
				+"<div class='row form-group'>"
				+"<div class='col-md-12'>"
				+"<label for='email'>email</label>"
				+"<input type='text' id='email' class='form-control'>"
				+"</div>"
				+"</div>"
				+"<div class='row form-group'>"
				+"<div class='col-md-12'>"
				+"<label for='password'>password</label>"
				+"<input type='password' id='password' class='form-control'>"
				+"</div>"
				+"</div>"
				+"<div class='row form-group'>"
				+"<div class='col-md-12'>"
				+"<label for='passwordconf'>password confirm</label>"
				+"<input type='password' id='passwordconf' class='form-control'>"
				+"</div>"
				+"</div>"
		  	+"<div class='row form-group'>"
				+"<div class='col-md-12'>"
				+"<button class='btn btn-primary' id ='btnsup'><span>sign up</span></a></button>"
				+"</div>"
				+"</div>"
			  +"</form>"
			  +"</div>";




	document.getElementById('frm').innerHTML = signin;
	var state = 2;
	document.getElementById("alter").onclick = function () {
		if(state == 1){
			state = 2;
			document.getElementById('frm').innerHTML = signin;

	}
	else{
		state = 1;
		document.getElementById('frm').innerHTML = signup;

	}
};

function signIn() {
	var data = "email="+document.getElementById('email').value+"&password="+document.getElementById('password').value;

	var xhr = new XMLHttpRequest();
	//xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
	    console.log(this.responseText);
	  }
	});

	xhr.open("POST", "https://adaptyoumain.herokuapp.com/api/authenticate");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//xhr.setRequestHeader("Cache-Control", "no-cache");

	xhr.send(data);
}

function signUp() {
	var data = "email="+document.getElementById('email').value+"&password="+document.getElementById('password').value;

	var xhr = new XMLHttpRequest();
	//xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
	    console.log(this.responseText);
	  }
	});

	xhr.open("POST", "https://adaptyoumain.herokuapp.com/api/signup");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//xhr.setRequestHeader("Cache-Control", "no-cache");

	xhr.send(data);

};
