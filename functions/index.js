/*
 @author : nilanka manoj 
 @description: functional javaascript for index.html
 */

if (document.cookie) {
	document.getElementById("overlay").style.display = "block";
	var cred = document.cookie.split(';');
	var email = cred[0].split("=")[1];
	var token = cred[1].split("=")[1];

	var data = null;

	var xhr = new XMLHttpRequest();


	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			document.getElementById("overlay").style.display = "none";
			try {
				var res = JSON.parse(this.responseText);
				if (res["success"]) {
					document.location.replace("memberarea.html");
				}
				else {
					delete document.cookie;

				}
			}
			catch (e) {
				delete document.cookie;

			}
		}
	});

	xhr.open("GET", "https://adaptyoumain.herokuapp.com/api/memberinfo");
	xhr.setRequestHeader("Authorization", token);



	xhr.send(data);

}
var signin = "<div id ='frmsignin'>"
	+ "<h3 class='cursive-font'>sign in</h3>"
	+ "<div id ='info'></div>"
	+ "<form action='javascript:signIn()'>"
	+ "<div class='row form-group'>"
	+ "<div class='col-md-12'>"
	+ "<label for='email'>email</label>"
	+ "<input type='text' id='email' class='form-control'>"
	+ "</div>"
	+ "</div>"
	+ "<div class='row form-group'>"
	+ "<div class='col-md-12'>"
	+ "<label for='password'>password</label>"
	+ "<input type='password' id='password' class='form-control'>"
	+ "</div>"
	+ "</div>"
	+ "<div class='row form-group'>"
	+ "<div class='col-md-12'>"
	+ "<button class='btn btn-primary' id ='btnsin' ><span>sign in</span></a></button>"
	+ "</div>"
	+ "</div>"
	+ "</form>"
	+ "</div>";

var signup = "<div id ='frmsignup'>"
	+ "<h3 class='cursive-font'>sign up</h3>"
	+ "<div id ='info'></div>"
	+ "<form action='javascript:signUp()'>"
	+ "<div class='row form-group'>"
	+ "<div class='col-md-12'>"
	+ "<label for='email'>email</label>"
	+ "<input type='text' id='email' class='form-control'>"
	+ "</div>"
	+ "</div>"
	+ "<div class='row form-group'>"
	+ "<div class='col-md-12'>"
	+ "<label for='password'>password</label>"
	+ "<input type='password' id='password' class='form-control'>"
	+ "</div>"
	+ "</div>"
	+ "<div class='row form-group'>"
	+ "<div class='col-md-12'>"
	+ "<label for='passwordconf'>password confirm</label>"
	+ "<input type='password' id='passwordconf' class='form-control'>"
	+ "</div>"
	+ "</div>"
	+ "<div class='row form-group'>"
	+ "<div class='col-md-12'>"
	+ "<button class='btn btn-primary' id ='btnsup'><span>sign up</span></a></button>"
	+ "</div>"
	+ "</div>"
	+ "</form>"
	+ "</div>";




document.getElementById('frm').innerHTML = signin;
var state = 2;
document.getElementById("alter").onclick = function () {
	if (state == 1) {
		state = 2;
		document.getElementById('frm').innerHTML = signin;

	}
	else {
		state = 1;
		document.getElementById('frm').innerHTML = signup;

	}
};

function signIn() {
	if (!document.getElementById('email').value || !document.getElementById('password').value) {
		document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;all fields required! </div>";
	}
	else if (!validateEmail(document.getElementById('email').value)) {
		document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;invalid email! </div>";
	}
	else if (document.getElementById('password').value.length < 6) {
		document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;pasword required more than 6! </div>";
	}
	else {
		var data = "email=" + document.getElementById('email').value + "&password=" + document.getElementById('password').value;

		var xhr = new XMLHttpRequest();
		//xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				console.log(this.responseText);
				document.getElementById("overlay").style.display = "none";
				var res = JSON.parse(this.responseText);
				if (res["success"]) {
					createCookie(document.getElementById('email').value, res["token"]);
					document.location.replace("memberarea.html");
				}
				else {
					document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;" + res["msg"] + " </div>";
				}
			}
		});

		xhr.open("POST", "https://adaptyoumain.herokuapp.com/api/authenticate");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//xhr.setRequestHeader("Cache-Control", "no-cache");

		xhr.send(data);
		document.getElementById("overlay").style.display = "block";
	}
}

function signUp() {
	if (!document.getElementById('email').value || !document.getElementById('password').value || !document.getElementById('passwordconf').value) {
		document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;all fields required! </div>";
	}
	else if (!validateEmail(document.getElementById('email').value)) {
		document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;invalid email! </div>";
	}
	else if (document.getElementById('password').value.length < 6) {
		document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;pasword required more than 6! </div>";
	}
	else if (document.getElementById('password').value != document.getElementById('passwordconf').value) {
		document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;password and confirm mismatch! </div>";
	}
	else {
		var data = "email=" + document.getElementById('email').value + "&password=" + document.getElementById('password').value;

		var xhr = new XMLHttpRequest();
		//xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				var res = JSON.parse(this.responseText);
				document.getElementById("overlay").style.display = "none";
				if (res["success"]) {
					document.getElementById('info').innerHTML = "<div class='alert alert-info'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;" + res["msg"] + " </div>";
				}
				else {
					document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;" + res["msg"] + " </div>";
				}


			}
		});

		xhr.open("POST", "https://adaptyoumain.herokuapp.com/api/signup");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//xhr.setRequestHeader("Cache-Control", "no-cache");

		xhr.send(data);
		document.getElementById("overlay").style.display = "block";
	}

}

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function createCookie(email, token) {

	document.cookie = "email=" + email + "; path=/";
	document.cookie = "token=" + token + "; path=/";

}

