/**
 * Created by ricca on 18/02/2017.
 */

var email;
var password;

function checkLoginForm() {

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
    var found = false;
    var usersList = localStorage.getItem('usersList');
    var parsedJSONUsersList = JSON.parse(usersList);

    while(parsedJSONUsersList.users.length >= i){
        if(parsedJSONUsersList.users[i].email == email && parsedJSONUsersList.users[i].password == hashCode(password)){
            console.log("TROVATA CORRISPONDENZA");
            setLoginCookie(email,10);
            alert("Accesso effettuato");
            found = true;
        }
        i++;
    }
    if(!found)
        alert("Username o password non riconosciuta");
    else
        document.location.href = "personal_area.html";

}