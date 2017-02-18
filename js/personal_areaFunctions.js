/**
 * Created by ricca on 18/02/2017.
 */

var reference_email;

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
            reference_email = parsedJSONUsersList.users[i].email;

            found = true;
        }
        i++;
    }
}

function fetchUserDataEditMode() {
    var name = document.editingForm.name;
    var surname = document.editingForm.surname;
    var email = document.editingForm.email;
    var password = document.editingForm.password;

    var i = 0;
    var found = false;
    var usersList = localStorage.getItem('usersList');
    var parsedJSONUsersList = JSON.parse(usersList);

    while (parsedJSONUsersList.users.length >= i) {
        if (parsedJSONUsersList.users[i].email == getCookie("username")) {
            console.log("TROVATA CORRISPONDENZA");
            name.value = parsedJSONUsersList.users[i].name;
            surname.value = parsedJSONUsersList.users[i].surname;
            email.value = parsedJSONUsersList.users[i].email;
        }
        i++;
    }
}

function checkEditingForm() {

    name     = document.editingForm.name.value;
    surname  = document.editingForm.surname.value;
    email    = document.editingForm.email.value;
    password = document.editingForm.password.value;

    if(name == ""){
        alert("Inserisci un nome!");
        document.editingForm.name.focus();
        return false;
    }

    else if(surname == ""){
        alert("Inserisci un cognome!");
        document.editingForm.surname.focus();
        return false;
    }

    else if(email == ""){
        alert("Inserisci una email!");
        document.editingForm.email.focus();
        return false;
    }

    else if(password == ""){
        alert("Inserisci una password!");
        document.editingForm.password.focus();
        return false;
    }


    return editUser();
}

function editUser() {
    var i;
    var usersList = localStorage.getItem('usersList');
    var parsedJSONUsersList = JSON.parse(usersList);

    for(i=0; i < parsedJSONUsersList.users.length; i++){
        if(parsedJSONUsersList.users[i].email == email){
            //possiamo modificare il nuovo utente
            parsedJSONUsersList.users.splice(i, 1);
            var newUser = {"name": name, "surname": surname, "email": email, "password": hashCode(password)};
            console.log(newUser);
            parsedJSONUsersList.users.push(newUser);
            console.log(parsedJSONUsersList);
            localStorage.setItem('usersList', JSON.stringify(parsedJSONUsersList));
            alert("Modifica effettuata con successo");
        }
    }
}

function deleteAccount() {
    if(confirm("Sei sicuro di voler cancellare il tuo account?")) {
        var i;
        var usersList = localStorage.getItem('usersList');
        var parsedJSONUsersList = JSON.parse(usersList);

        for (i = 0; i < parsedJSONUsersList.users.length; i++) {
            console.log(reference_email);
            if (parsedJSONUsersList.users[i].email == reference_email) {
                //possiamo modificare il nuovo utente
                console.log("trovato e pronto per eliminazione");
                parsedJSONUsersList.users.splice(i, 1);
                localStorage.setItem('usersList', JSON.stringify(parsedJSONUsersList));
                deleteCookie();
            }
        }
    }
}