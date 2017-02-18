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
        console.log(data);
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
        console.log(data);
        localStorage.setItem('resturantList', JSON.stringify(data));
    }).catch(function() {
        console.log("Error");
    });
}