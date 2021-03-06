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
    //get request for the above path
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        //load the user list if there's no one in the localStorage
        if(localStorage.getItem('usersList') == null)
            localStorage.setItem('usersList', JSON.stringify(data));
    }).catch(function() {
        console.log("Error");
    });
}

function loadResturantsData() {
    var url="/AppWC/data/resturants.json";
    //get request for the above path
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        //load the resturant list if there's no one in the localStorage
        if(localStorage.getItem('resturantsList') == null) {
            localStorage.setItem('resturantsList', JSON.stringify(data));
            generateReservationArray();
            generatePolaroid();
        }
    }).catch(function() {
        console.log("Error");
    });
}

function setLoginCookie(email, name, expirationDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "username =" + email + ";" + expires + ";path=/";
    document.cookie = "name =" + name + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    //cerca tra i cookie estratti
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        //pulizia del cookie da eventuali spazi vuoti
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        //stringa pulita,
        if (c.indexOf(name) == 0) {
            //se ritorna zero, significa che la prima parte della stringa
            //corrisponde con la chiave + "uguale"
            //estraggo quindi il valore del cookie
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
    // this branch is triggered when there's no user logged
    } else {
        //redirect user to login page
        document.location.href = "login.html";
    }
}

//check if someone is logged
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

//check if some is logged and change login link with a cute text
function checkIfLogged() {
    if(checkLogin()){
        var loginLink = document.getElementById("login_link");
        var username = getCookie('name');
        loginLink.innerHTML = "<strong>Bentornato/a "+username+"</strong>";
    }

}

function getLiteralDay(index) {
    switch(index){
        case 0: return "Lunedì";
        case 1: return "Martedì";
        case 2: return "Mercoledì";
        case 3: return "Giovedì";
        case 4: return "Venerdì";
        case 5: return "Sabato";
        case 6: return "Domenica";
    }
}

function getLiteralResHour(index) {
    switch(index){
        case 0: return "19:00 - 21:00";
        case 1: return "Dopo le 21:00";
    }
}

//generate the reservation array based on resturant presents on site load
function generateReservationArray() {
    //var retJson = {"reservations": []};
    var retJson = {"reservations": []};
    var resturantsList = localStorage.getItem('resturantsList');
    var parsedJSONResturantsList = JSON.parse(resturantsList);
    var resturants = parsedJSONResturantsList.resturants;
    var i = 0;
    while (i < resturants.length) {
        var resturant = resturants[i];
        var newRest = {"name": resturant.nome, "f0": [resturant.posti, resturant.posti, resturant.posti, resturant.posti, resturant.posti, resturant.posti, resturant.posti,],
            "f1": [resturant.posti, resturant.posti, resturant.posti, resturant.posti, resturant.posti, resturant.posti, resturant.posti,]};
        retJson.reservations.push(newRest);
        i++;
    }
    localStorage.setItem('reservationList', JSON.stringify(retJson));
}

function loadFromLocalStorage(itemName){
    //itemName is the key string
    var string = localStorage.getItem(itemName);
    var parsedJSON = JSON.parse(string);

    //return json obj
    return parsedJSON;
}

function writeInLocalStorage(itemName, itemJSON){
    //itemName is the key string for saving in localStorage
    //itemJSON is the input JSON
    localStorage.setItem(itemName, JSON.stringify(itemJSON));
}
