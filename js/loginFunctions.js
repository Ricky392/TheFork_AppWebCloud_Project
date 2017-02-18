/**
 * Created by ricca on 18/02/2017.
 */

var email;
var password;

function checkForm() {

    email    = document.loginForm.email.value;
    password = document.loginForm.password.value;

    if(email == ""){
        alert("Inserisci una email!");
        document.loginForm.email.focus();
        return false;
    }
    else if(password == ""){
        alert("Inserisci una password!");
        document.loginForm.password.focus();
        return false;
    }

    login();
}

function login() {
    var i=0;
    var usersList = localStorage.getItem('usersList');
    var parsedJSONUsersList = JSON.parse(usersList);
    while(parsedJSONUsersList.users.length >= i){
        if(parsedJSONUsersList.users[i].email == email && parsedJSONUsersList.users[i].password == hashCode(password)){
            console.log("TROVATA CORRISPONDENZA");
            alert("TROVATA CORRISPONDENZA");
            break;
        }
        i++;
    }

}