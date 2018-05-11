if (document.cookie) {
    var cred = document.cookie.split(';');
    var email = cred[0].split("=")[1];
    var token = cred[1].split("=")[1];
    loadContent();
}



else {
    document.location.replace("index.html");
}

function logOut() {
    document.cookie = "email=" + "" + "; path=/";
    document.cookie = "token=" + "" + "; path=/";
    document.location.replace("index.html");
}

function deleteUrl(url) {




    if (url.length > 5) {

        var r = confirm("Do You Want to delete \"" + url + "?");
        if (r == true) {
            var data = "url=" + url;

            var xhr = new XMLHttpRequest();


            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    document.getElementById("overlay").style.display = "none";
                    try {
                        var res = JSON.parse(this.responseText);
                        if (res["success"]) {
                            document.getElementById('info').innerHTML = "<div class='alert alert-info'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;" + res["msg"] + " </div>";
                            loadContent();
                        }
                        else {
                            document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;" + res["msg"] + " </div>";
                        }
                    }
                    catch (e) {
                        delete document.cookie;
                        document.location.replace("index.html");
                    }
                }
            });

            xhr.open("POST", "https://adaptyoumain.herokuapp.com/api/deletepage");
            xhr.setRequestHeader("Authorization", token);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.send(data);
            document.getElementById("overlay").style.display = "block";

        }
    }

    else {
        document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;invalid url! </div>";
    }
}

function addUrl() {
    var newUrl = document.getElementById("new-url").value;

    if (newUrl.length > 5) {
        var data = "url=" + newUrl;

        var xhr = new XMLHttpRequest();


        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                document.getElementById("overlay").style.display = "none";
                try {
                    var res = JSON.parse(this.responseText);
                    if (res["success"]) {
                        document.getElementById('info').innerHTML = "<div class='alert alert-info'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;" + res["msg"] + " </div>";
                        document.getElementById("new-url").value = "";
                        loadContent();
                    }
                    else {
                        document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;" + res["msg"] + " </div>";
                    }
                }
                catch (e) {
                    delete document.cookie;
                    document.location.replace("index.html");
                }
            }
        });

        xhr.open("POST", "https://adaptyoumain.herokuapp.com/api/memberinfo");
        xhr.setRequestHeader("Authorization", token);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(data);
        document.getElementById("overlay").style.display = "block";


    }
    else {
        document.getElementById('info').innerHTML = "<div class='alert alert-danger'><i class='glyphicon glyphicon-warning-sign'></i> &nbsp;invalid url! </div>";
    }
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
                    var urls = res["webpages"]
                    var urlsStr = "";
                    for (i = 0; i < urls.length; i++) {
                        urlsStr += "<div class= 'url-bar'>" + urls[i]["url"] + "<span id='close' class = 'del-url' onclick='deleteUrl(\"" + urls[i]["url"] + "\")'>Remove URL</span></br>" + "</div>";
                    }

                    document.getElementById("urls").innerHTML = urlsStr;
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
