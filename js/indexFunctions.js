/**
 * Created by ricca on 15/02/2017.
 */

function generatePolaroid() {
    var resturantsList = localStorage.getItem('resturantsList');
    var parsedJSONResturantsList = JSON.parse(resturantsList);
    var resturants = parsedJSONResturantsList.resturants;

    //load resturant data
    var name = document.getElementById("resturant_name");
    var type = document.getElementById("resturant_type");
    var position = document.getElementById("resturant_position");
    var price = document.getElementById("resturant_price");
    var vacancy = document.getElementById("resturant_vacancy");
    var menu = document.getElementById("resturant_menu");


    var i = 0;
    var template = document.querySelector('#polaroid_template');
    while (i < resturants.length) {
        var resturant = resturants[i];
        var clone = template.content.cloneNode(true);
        var h2 = clone.querySelectorAll('h2');
        h2[0].innerHTML = resturant.nome;
        var p = clone.querySelectorAll('p');
        p[0].innerHTML = "Città: " + resturant.citta +"</br></br>Posti a sedere: "+resturant.posti;
        var a = clone.querySelectorAll('a');
        var nome = resturant.nome;
        a[0].setAttribute("onClick", "bookResturant('"+nome+"');");
        a[1].setAttribute("onClick", "showResturantDetail('"+nome+"');");
        template.parentNode.appendChild(clone);
        i++;

        name.innerHTML = resturant.nome;
        type.innerHTML = "Categoria: "+resturant.tipologia;
        position.innerHTML = "situato in "+resturant.via+", "+resturant.citta;
        price.innerHTML = "Fascia di prezzo "+resturant.fascia_prezzo;
        vacancy.innerHTML = "Posti a sedere: "+resturant.posti;
        menu.innerHTML = "Menù presenti: ";
        for(var j=0; j<resturant.menus.length; j++){
            menu.innerHTML = resturant.menus[j].menu;
        }
    }
}

function showResturantDetail(nomeRistorante) {

    //lista prenotazioni
    var reservationList = localStorage.getItem("reservationList");
    var parsedJSONReservationlist = JSON.parse(reservationList);
    var reservations = parsedJSONReservationlist.reservations;

    var reservation_table = document.getElementById("resturant_reservations");

    console.log(nomeRistorante);
    document.getElementById("resturant_detail").style.display= "block";

    reservation_table.innerHTML = "";

    for(var j=0; j<reservations.length; j++){
        if(reservations[j].name == nomeRistorante){
            var fascia0 = reservations[j].f0;
            var fascia1 = reservations[j].f1;
            for(var k=0; k<7; k++){
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(getLiteralDay(k)+" -> 19:00 - 21:00 "+fascia0[k]+" posti liberi | dopo le 21:00 "+fascia1[k]+" posti liberi"));
                reservation_table.appendChild(li);
            }
        }
    }

}

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

function confirmPrenotation(restName) {
    var confirmBtn = document.getElementById("confirmBtn");
    var seats = document.getElementById("reservation_seats");
    var hour = document.getElementById("reservation_hour");
    var day = document.getElementById("reservation_day");
    var user = getCookie("username");
    console.log(restName, user.toString(), seats.value, day.value, hour.value);
}