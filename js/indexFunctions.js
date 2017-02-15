/**
 * Created by ricca on 15/02/2017.
 */
var arr = [
    { name:'The Fork USA', country:'USA'},
    { name:'The Fork Canada', country:'Canada'},
    { name:'The Fork Germany', country:'Germany'},
    { name:'The Fork Greece', country:'Greece'}
];


function generatePolaroid() {
    var template = document.querySelector('#polaroid_template');
    for (var i = 0; i < arr.length; i++) {
        var resturant = arr[i];
        var clone = template.content.cloneNode(true);
        var h2 = clone.querySelectorAll('h2');
        h2[0].innerHTML = resturant.name;
        var p = clone.querySelectorAll('p');
        p[0].innerHTML = "Country: " + resturant.country;
        template.parentNode.appendChild(clone);
    }
}