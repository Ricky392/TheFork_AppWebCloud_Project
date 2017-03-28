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

    return login();
}

function login() {
    var i=0;
    var found = false;
    var usersList = localStorage.getItem('usersList');
    var parsedJSONUsersList = JSON.parse(usersList);

    var users = parsedJSONUsersList.users;

    //search in the user list if there is a user that match the login form data
    var foundUser = users.filter(function (userItem){
        return userItem.email === email && userItem.password === hashCode(password);
    });

    console.log("foundUser", foundUser);

    if(foundUser[0] == undefined){
        //not logged
        alert("Credenziali di accesso non riconosciute");
        return false;
    } else{
        //logged
        var nome = foundUser[0].name
        var cog  = foundUser[0].surname
        var username = nome+" "+cog
        setLoginCookie(email, username,10);
        alert("Accesso effettuato");
        return true;
    }
    //search in the user list if there is a user that match the login form data
    /*while(users.length >= i){
        if(users[i].email == email && users[i].password == hashCode(password)){
            console.log("TROVATA CORRISPONDENZA");
            var nome = users[i].name
            var cog  = users[i].surname
            var username = nome+" "+cog
            setLoginCookie(email, username,10);

            alert("Accesso effettuato");
            found = true;
            return true;
        }
        i++;
    }
    if(found == false)
        alert("Username o password non riconosciuta");
        return false;
*/
}
