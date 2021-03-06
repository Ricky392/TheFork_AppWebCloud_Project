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

//do registration
function registration() {
    console.log('entrato in registration');
    var i=0;
    var found = false;
    var usersList = loadFromLocalStorage('usersList');
    var users = usersList.users;

    //check if there is a user that already have an email equals to the new one
    for(i=0; i < users.length; i++){
        if(users[i].email == email){
            found = true;
            console.log('utente già registrato');
        }
    }
    if(!found){
        //possiamo inserire il nuovo utente
        var newUser = {"name": name, "surname": surname, "email": email, "password": hashCode(password), reservations: []};
        console.log(newUser);
        users.push(newUser);
        console.log(usersList);
        writeInLocalStorage('usersList', usersList);
        alert("Registrazione della tua utenza completata con successo!");
        return true;
    }
    else {
        //email già presente
        alert("Email già usata da un'altro utente");
        return false;
    }

}
