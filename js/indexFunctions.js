/**
 * Created by ricca on 15/02/2017.
 */

//allowed filtertype: CITTA, NOME, TIPO, CAPIENZA


//generate polaroids with html template
function generatePolaroid(resturants) {
    var template = document.querySelector('#polaroid_template');
    var polaroids = document.getElementsByClassName("polaroid");

    if(resturants == null){
        var resturantsList = localStorage.getItem('resturantsList');
        var parsedJSONResturantsList = JSON.parse(resturantsList);
        resturants = parsedJSONResturantsList.resturants;

    }

    for(var pol in polaroids){
        clearPolaroids();
    }

    //for every resturant generate a polaroid
    i = 0;
    for (var i in resturants) {
        var resturant = resturants[i];
        console.log(resturant.nome);
        var clone = template.content.cloneNode(true);
        var h2 = clone.querySelectorAll('h2');
        h2[0].innerHTML = resturant.nome;
        var p = clone.querySelectorAll('p');
        p[0].innerHTML = "Città: " + resturant.citta +"</br></br>Posti a sedere: "+resturant.posti;
        var a = clone.querySelectorAll('a');
        var nome = resturant.nome;
        a[0].setAttribute("onClick", "bookResturant('"+nome+"');");
        a[1].setAttribute("onClick", "showResturantDetail('"+nome+"');");
        //set background
        var imgUrl = resturant.img;
        var div = clone.querySelectorAll('div');
        div[0].setAttribute("style", "background-image: url("+imgUrl+")");
        template.parentNode.appendChild(clone);
    }
}


//generate menu into the resturant description
function getMenu(j, resturant, menu){
    console.log("j", j, resturant.menus[j].menu);
    var index = Number(j)+1;
    menu.innerHTML = menu.innerHTML+index+". "+"<i>"+resturant.menus[j].menu+"</i>: ";
    var ul = document.createElement("ul");
    ul.setAttribute("id", "menu"+j);
    var antipasti = document.createElement("li");
    var primi = document.createElement("li");
    var secondi = document.createElement("li");
    var dolci = document.createElement("li");
    var allergeni = document.createElement("li");
    var bevande = document.createElement("li");
    var prezzo = document.createElement("li");
    var sconti = document.createElement("ul");

    antipasti.appendChild(document.createTextNode("Antipasti: "+resturant.menus[j].antipasti));
    primi.appendChild(document.createTextNode("Primi: "+resturant.menus[j].primi));
    secondi.appendChild(document.createTextNode("Secondi: "+resturant.menus[j].secondi));
    dolci.appendChild(document.createTextNode("Dolci: "+resturant.menus[j].dolci));
    bevande.appendChild(document.createTextNode("Bevande: "+resturant.menus[j].bevande));
    allergeni.appendChild(document.createTextNode("*Allergeni: "+resturant.menus[j].allergeni));
    prezzo.appendChild(document.createTextNode("Prezzo: "+resturant.menus[j].prezzo+" €"));

    ul.appendChild(antipasti.cloneNode(true));
    ul.appendChild(primi.cloneNode(true));
    ul.appendChild(secondi.cloneNode(true));
    ul.appendChild(dolci.cloneNode(true));
    ul.appendChild(bevande.cloneNode(true));
    ul.appendChild(prezzo.cloneNode(true));
    ul.appendChild(allergeni.cloneNode(true));

    document.getElementById("resturant_menu").appendChild(ul);
}

//delete polaroid
function clearPolaroids() {
    var template = document.querySelector('#polaroid_template');
    var polaroids = template.parentNode.getElementsByClassName("polaroid");
    console.log(polaroids.length);
    for(var i=0;i<polaroids.length;i++){
        template.parentNode.removeChild(polaroids[0]);
    }
}

function showResturantDetail(nomeRistorante) {

    //lista prenotazioni
    var reservationList = localStorage.getItem("reservationList");
    var parsedJSONReservationlist = JSON.parse(reservationList);
    var reservations = parsedJSONReservationlist.reservations;

    var resturantsList = localStorage.getItem('resturantsList');
    var parsedJSONResturantsList = JSON.parse(resturantsList);
    resturants = parsedJSONResturantsList.resturants;

    var reservation_table = document.getElementById("resturant_reservations");

    //load resturant data
    var name = document.getElementById("resturant_name");
    var type = document.getElementById("resturant_type");
    var position = document.getElementById("resturant_position");
    var price = document.getElementById("resturant_price");
    var vacancy = document.getElementById("resturant_vacancy");
    var menu = document.getElementById("resturant_menu");
    var booking_section = document.getElementById("booking_section");

    console.log(nomeRistorante);
    document.getElementById("resturant_detail").style.display= "block";

    booking_section.removeChild(booking_section.lastChild);
    booking_section.innerHTML = "<strong>STATO DELLE PRENOTAZINI:</strong>"

    //estraggo l'oggetto rappresentate il ristorante giusto
    var resturantRes = reservations.filter(function (resturantItem) {
        return resturantItem.name === nomeRistorante;
    });

    var fascia0 = resturantRes[0].f0;
    var fascia1 = resturantRes[0].f1;

    //show reservation
    var ul = document.createElement("ul");
    for(var k=0; k<7; k++){
        var li = document.createElement("li");
        var underUl = document.createElement("ul");
        var underLifo = document.createElement("li");
        var underLifi = document.createElement("li");
        //li.appendChild(document.createTextNode(getLiteralDay(k)+" -> 19:00 - 21:00 "+fascia0[k]+" posti liberi | dopo le 21:00 "+fascia1[k]+" posti liberi"));
        li.appendChild(document.createTextNode(getLiteralDay(k)+":"));
        underLifo.appendChild(document.createTextNode("19:00 - 21:00 : "+fascia0[k]+" posti liberi"));
        underUl.appendChild(underLifo);
        underLifi.appendChild(document.createTextNode("Dopo le 21:00 : "+fascia1[k]+" posti liberi"));
        underUl.appendChild(underLifi);
        li.appendChild(underUl);

        ul.appendChild(li);
    }
    booking_section.appendChild(ul);

    var resturant = resturants.filter(function (resturantItem){
        return resturantItem.nome === nomeRistorante;
    });

    console.log(resturant);
    resturant = resturant[0];

    name.innerHTML = resturant.nome;
    type.innerHTML = "Categoria: "+resturant.tipologia;
    position.innerHTML = "<strong>DOVE: </strong>"+resturant.via+", "+resturant.citta;
    price.innerHTML = "<strong>€€€: </strong>"+resturant.fascia_prezzo;
    vacancy.innerHTML = "<strong>CAPIENZA: </strong>"+resturant.posti;
    menu.innerHTML = "<strong>MENUs: </strong><br/><br/>";
    //while (resturant.menus[j] != undefined) {
    //while(j < resturant.menus.length){
    for(var j in resturant.menus){
        console.log(j);
        getMenu(j, resturant, menu);
    }
}

//show booking overlay window
function bookResturant(restName) {
    var user = getCookie("username");
    if (user != "") {
        document.getElementById("resturant_booking").style.display= "block";
        var username = document.getElementById("reservation_name");
        var restName_title = document.getElementById("title");
        restName_title.innerHTML = restName;
        username.innerHTML = "Nome prenotazione: "+getCookie("name");
        confirmBtn.setAttribute("onClick", "confirmPrenotation('"+restName+"');");
        return true;
    } else {
        alert("Devi accedere prima di poter prenotare un ristorante");
        return false;
    }

}

//confirm prenotation when done with form editing
function confirmPrenotation(restName) {

    var isBookingPossible = false;

    //lista prenotazioni
    var reservationList = localStorage.getItem("reservationList");
    var parsedJSONReservationlist = JSON.parse(reservationList);
    var reservations = parsedJSONReservationlist.reservations;

    //lista utenti
    var usersList = localStorage.getItem("usersList");
    var parsedJSONUsersList = JSON.parse(usersList);
    var users = parsedJSONUsersList.users;

    var confirmBtn = document.getElementById("confirmBtn");
    var seats = document.getElementById("reservation_seats").value;
    var hour = document.getElementById("reservation_hour").value;
    var day = document.getElementById("reservation_day").value;
    var user = getCookie("username");
    console.log(restName, user.toString(), seats, day, hour);

    //estraggo l'oggetto rappresentate il ristorante giusto
    var resturant = reservations.filter(function (resturantItem) {
        return resturantItem.name === restName;
    });

    //modifico la disponibilità di posti in base al giorno e l'orario
    if(hour == 0){
        if(resturant[0].f0[day] >= seats){
            resturant[0].f0[day] = resturant[0].f0[day] - seats;
            isBookingPossible = true;
        }

    } else if(hour == 1){
        if(resturant[0].f1[day] >= seats){
            resturant[0].f1[day] = resturant[0].f1[day] - seats;
            isBookingPossible = true;
        }

    }
    if(isBookingPossible){
        localStorage.setItem('reservationList', JSON.stringify(parsedJSONReservationlist));

        var userItem = users.filter(function (item) {
            return item.email === user.toString();
        });

        var newReservation = {
            "resturant": restName,
            "day": day,
            "hour": hour,
            "seats": seats
        };
        console.log(userItem[0].reservations);
        userItem[0].reservations.push(newReservation);
        localStorage.setItem('usersList', JSON.stringify(parsedJSONUsersList));

        alert("Grazie di aver prenotato con La Forchetta");
        document.getElementById("resturant_booking").style.display= "none";
    } else{
      //non è possibile prenotare quindi stoppo l'utente
      alert("Ci dispiace, il numero di posti da te richiesti non è disponibile");
    }
}
