/**
 * Created by ricca on 18/02/2017.
 */

function fetchUserData() {

    var name = document.getElementById("name");
    var surname = document.getElementById("surname");
    var email = document.getElementById("email");

    var i=0;
    var found = false;
    var usersList = localStorage.getItem('usersList');
    var parsedJSONUsersList = JSON.parse(usersList);

    while(parsedJSONUsersList.users.length >= i){
        if(parsedJSONUsersList.users[i].email == getCookie("username")){
            console.log("TROVATA CORRISPONDENZA");
            name.innerHTML = "Nome: " + parsedJSONUsersList.users[i].name;
            surname.innerHTML = "Cognome: " + parsedJSONUsersList.users[i].surname;
            email.innerHTML = "Email di registrazione: " + parsedJSONUsersList.users[i].email;
            found = true;
        }
        i++;
    }
}