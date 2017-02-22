/**
 * Created by ricca on 15/02/2017.
 */

function generatePolaroid() {
    var resturantsList = localStorage.getItem('resturantsList');
    var parsedJSONResturantsList = JSON.parse(resturantsList);
    var resturants = parsedJSONResturantsList.resturants;
    var i = 0;
    var template = document.querySelector('#polaroid_template');
    while (i < resturants.length) {
        var resturant = resturants[i];
        var clone = template.content.cloneNode(true);
        var h2 = clone.querySelectorAll('h2');
        h2[0].innerHTML = resturant.nome;
        var p = clone.querySelectorAll('p');
        p[0].innerHTML = "Città: " + resturant.citta +"</br></br>Posti Liberi: "+resturant.posti;
        var a = clone.querySelectorAll('a');
        var nome = resturant.nome;
        a[0].setAttribute("onClick", "bookResturant('"+nome+"');");
        a[1].setAttribute("onClick", "showResturantDetail('"+nome+"');");
        template.parentNode.appendChild(clone);
        i++;
    }
}

function showResturantDetail(nome) {
    console.log(nome);
    document.getElementById("resturant_detail").style.display= "block";

    //load resturant data
    var name = document.getElementById("resturant_name");
    var type = document.getElementById("resturant_type");
    var position = document.getElementById("resturant_position");
    var price= document.getElementById("resturant_price");
    var vacancy = document.getElementById("resturant_vacancy");
    var menu = document.getElementById("resturant_menu");

    var resturantsList = localStorage.getItem('resturantsList');
    var parsedJSONResturantsList = JSON.parse(resturantsList);
    var resturants = parsedJSONResturantsList.resturants;

    for(var i=0; i<resturants.length; i++){
        if(resturants[i].nome == nome){
            name.innerHTML = resturants[i].nome;
            type.innerHTML = "Categoria: "+resturants[i].tipologia;
            position.innerHTML = "situato in "+resturants[i].via+", "+resturants[i].citta;
            price.innerHTML = "Fascia di prezzo "+resturants[i].fascia_prezzo;
            vacancy.innerHTML = "Posti rimanenti: "+resturants[i].posti;
            menu.innerHTML = "Menù presenti: ";
            for(var j=0; j<resturants[i].menus.length; j++){
                menu.innerHTML = resturants[i].menus[j].menu;
            }
        }
    }
}

function bookResturant(nome) {
    var user = getCookie("username");
    if (user != "") {
        document.getElementById("resturant_booking").style.display= "block";
        return true;
    } else {
        alert("Devi accedere prima di poter prenotare un ristorante");
        return false;
    }

}