/**
 * Created by ricca on 17/02/2017.
 */

/* When the user clicks on the button,
 toggle between hiding and showing the dropdown content */
function displayElements(id) {
    console.log(id);
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