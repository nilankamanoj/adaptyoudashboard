/*
 @author : nilanka manoj 
 @description: functional javaascript for documentation.html
 
 */

if (document.cookie) {
    var cred = document.cookie.split(';');
    var email = cred[0].split("=")[1];
    var token = cred[1].split("=")[1];
    loadContent();
}

else {
    document.location.replace("index.html");
}

function loadContent() {


    var data = null;

    var xhr = new XMLHttpRequest();


    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            document.getElementById("overlay").style.display = "none";
            try {
                var res = JSON.parse(this.responseText);
                if (res["success"]) {
                    console.log(this.responseText);

                }
                else {
                    delete document.cookie;
                    document.location.replace("index.html");
                }
            }
            catch (e) {
                delete document.cookie;
                document.location.replace("index.html");
            }

        }
    });

    xhr.open("GET", "https://adaptyoumain.herokuapp.com/api/memberinfo");
    xhr.setRequestHeader("Authorization", token);



    xhr.send(data);
    document.getElementById("overlay").style.display = "block";

    document.getElementById("alter").onclick = function () {
        logOut();
    };

    document.getElementById("message").innerHTML = "Welcome " + email;
}
function logOut() {
    document.cookie = "email=" + "" + "; path=/";
    document.cookie = "token=" + "" + "; path=/";
    document.location.replace("index.html");
}