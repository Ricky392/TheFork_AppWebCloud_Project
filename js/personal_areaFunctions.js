/**
 * Created by ricca on 18/02/2017.
 */

var reference_email;

function fetchUserData() {

    var name = document.getElementById("name");
    var surname = document.getElementById("surname");
    var email = document.getElementById("email");
    var reservationsUl = document.getElementById("reservations");

    var i=0;
    var found = false;
    var usersList = loadFromLocalStorage('usersList');
    var users = usersList.users;

    while(users.length >= i){
        if(users[i].email == getCookie("username")){
            console.log("TROVATA CORRISPONDENZA");
            name.innerHTML = "Nome: " + users[i].name;
            surname.innerHTML = "Cognome: " + users[i].surname;
            email.innerHTML = "Email di registrazione: " + users[i].email;
            reference_email = users[i].email;
            var li = document.createElement("li");
            for(var j=0; j < users[i].reservations.length;j++) {
                var res = users[i].reservations[j];
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(res.resturant+", "+getLiteralDay(Number(res.day))+" alle "+getLiteralResHour(Number(res.hour))+" per "+res.seats+" persone;"));
                reservationsUl.appendChild(li);
            }
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
    var usersList = loadFromLocalStorage('usersList');

    var users = usersList.users;

    var user = users.filter(function (user) {
        return user.email === getCookie("username");
    });

    name.value = user[0].name;
    surname.value = user[0].surname;
    email.value = user[0].email;
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
    var usersList = loadFromLocalStorage('usersList');
    var users = usersList.users;

    for(i=0; i < users.length; i++){
        if(users[i].email == email){
            //possiamo modificare il nuovo utente
            var reservations = users[i].reservations;
            users.splice(i, 1);
            var newUser = {"name": name, "surname": surname, "email": email, "password": hashCode(password), "reservations": reservations};
            console.log(newUser);
            users.push(newUser);
            console.log(usersList);
            writeInLocalStorage('usersList', usersList);
            alert("Modifica effettuata con successo");
        }
    }
}

function deleteAccount() {
    if(confirm("Sei sicuro di voler cancellare il tuo account?")) {
        var i;
        var usersList = loadFromLocalStorage('usersList');
        var users = usersList.users;

        for (i = 0; i < users.length; i++) {
            console.log(reference_email);
            if (users[i].email == reference_email) {
                //possiamo modificare il nuovo utente
                console.log("trovato e pronto per eliminazione");
                users.splice(i, 1);

                writeInLocalStorage('usersList', usersList);
                deleteCookie();
            }
        }
    }
}
