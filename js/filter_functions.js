/**
 * Created by ricca on 17/02/2017.
 */

/* When the user clicks on the button,
 toggle between hiding and showing the dropdown content */
function displayElements(id) {
    console.log(id);

    document.getElementById("nameDropdown").classList.remove("show");
    document.getElementById("cityDropdown").classList.remove("show");
    document.getElementById("typeDropdown").classList.remove("show");
    document.getElementById("numberDropdown").classList.remove("show");

    document.getElementById(id).classList.toggle("show");
}

function filterFunction(id, input) {
    var input, filter, ul, li, a, i;
    input = document.getElementById(input);
    filter = input.value.toUpperCase();
    div = document.getElementById(id);
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function searchWithFilters() {

    var citta    = document.getElementById("filterCitta").innerHTML;
    var nome     = document.getElementById("filterNome").innerHTML;
    var tipo     = document.getElementById("filterTipo").innerHTML;
    var capienza = document.getElementById("filterCapienza").innerHTML;

    var resturantsList = localStorage.getItem('resturantsList');
    var parsedJSONResturantsList = JSON.parse(resturantsList);
    var resturants = parsedJSONResturantsList.resturants;

    if(citta != "Seleziona città"){
        resturants = resturants.filter(function (restItem) {
            return restItem.citta === citta;
        });
    }

    if(nome != "Seleziona nome ristorante") {
        resturants = resturants.filter(function (restItem) {
            return restItem.nome === nome;
        });
    }

    if(tipo != "Seleziona tipologia ristorante"){
        resturants = resturants.filter(function (restItem) {

            for (element in restItem.tipologia){
                if(tipo == restItem.tipologia[element]){
                    return restItem;
                }
            }
        });
    }

    if(capienza != "Seleziona capienza ristorante"){
        resturants = resturants.filter(function (restItem) {
            return restItem.posti < Number(capienza);
        });
    }

    console.log(resturants);

    generatePolaroid(resturants);
}

function resetFilters(){
    var cityFilter = document.getElementById("filterCitta");
    var nameFilter = document.getElementById("filterNome");
    var typeFilter = document.getElementById("filterTipo");
    var seatsFilter = document.getElementById("filterCapienza");

    cityFilter.innerText = "Seleziona città";
    nameFilter.innerText = "Seleziona nome ristorante";
    typeFilter.innerText = "Seleziona tipologia ristorante";
    seatsFilter.innerText = "Seleziona capienza ristorante";

    generatePolaroid();

}

function setFilterButton(filterParameter, filtertype, id) {
        var filterButton = document.getElementById(filtertype);
        filterButton.innerHTML = filterParameter;
        document.getElementById(id).classList.remove("show");
}
