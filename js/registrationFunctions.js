/**
 * Created by ricca on 18/02/2017.
 */

/**
 * Created by ricca on 18/02/2017.
 */

var name;
var surname;
var email;
var password;

function checkRegistrationForm() {

    name     = document.registrationForm.name.value;
    surname  = document.registrationForm.surname.value;
    email    = document.registrationForm.email.value;
    password = document.registrationForm.password.value;

    if(name == ""){
        alert("Inserisci un nome!");
        document.registrationForm.name.focus();
        return false;
    }

    else if(surname == ""){
        alert("Inserisci un cognome!");
        document.registrationForm.surname.focus();
        return false;
    }

    else if(email == ""){
        alert("Inserisci una email!");
        document.registrationForm.email.focus();
        return false;
    }

    else if(password == ""){
        alert("Inserisci una password!");
        document.registrationForm.password.focus();
        return false;
    }


    return registration();
}

function registration() {
    var i=0;
    var found = false;
    var usersList = localStorage.getItem('usersList');
    var parsedJSONUsersList = JSON.parse(usersList);

    for(i=0; i < parsedJSONUsersList.users.length; i++){
        if(parsedJSONUsersList.users[i].email == email){
            found = true;
        }
    }
    if(!found){
        //possiamo inserire il nuovo utente
        var newUser = {"name": name, "surname": surname, "email": email, "password": hashCode(password)};
        console.log(newUser);
        parsedJSONUsersList.users.push(newUser);
        console.log(parsedJSONUsersList);
        localStorage.setItem('usersList', JSON.stringify(parsedJSONUsersList));
    }
    else {
        //email già presente
        alert("Email già usata da un'altro utente");
        return false;
    }

}