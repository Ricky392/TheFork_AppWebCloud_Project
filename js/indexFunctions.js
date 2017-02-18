/**
 * Created by ricca on 15/02/2017.
 */

function generatePolaroid() {
    var resturantsList = localStorage.getItem('resturantsList');
    var parsedJSONResturantsList = JSON.parse(resturantsList);
    var resturants = parsedJSONResturantsList.resturants;

    var template = document.querySelector('#polaroid_template');
    for (var i = 0; i < resturants.length; i++) {
        var resturant = resturants[i];
        var clone = template.content.cloneNode(true);
        var h2 = clone.querySelectorAll('h2');
        h2[0].innerHTML = resturant.nome;
        var p = clone.querySelectorAll('p');
        p[0].innerHTML = "Città: " + resturant.citta;
        template.parentNode.appendChild(clone);
    }
}