/**
 * Created by ricca on 10/02/2017.
 */

//hashcode functions for strings --- wll be used for crypting password during login / registration
function hashCode(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function loadUsersData() {
    var url="/AppWC/data/users.json";
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(localStorage.getItem('usersList') == null)
            localStorage.setItem('usersList', JSON.stringify(data));
    }).catch(function() {
        console.log("Error");
    });
}

function loadResturantsData() {
    var url="/AppWC/data/resturants.json";
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(localStorage.getItem('resturantsList') == null)
            localStorage.setItem('resturantsList', JSON.stringify(data));
    }).catch(function() {
        console.log("Error");
    });
}

function setLoginCookie(name, expirationDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "username =" + name + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {

    } else {
        document.location.href = "login.html";
    }
}

function checkLogin() {
    var user = getCookie("username");
    if (user != "") {
        return true;
    } else {
        return false;
    }
}

function deleteCookie(){
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.location.href = "index.html";
}

function checkIfLogged() {
    if(checkLogin()){
        var loginLink = document.getElementById("login_link");
        loginLink.innerHTML = "Bentornato caro utente";
    }

}