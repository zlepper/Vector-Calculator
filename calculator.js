function validate(t) {
    var input = document.getElementById(t);
    var id = "#" + input.id;
    //Farv feltet grønt hvis der er indtastet en brugbar værdi
    if(input.value != "" && input.value != null) {
        jQuery(id).parent().addClass("has-success").removeClass("has-error");
    } else {
        jQuery(id).parent().addClass("has-error").removeClass("has-success");
    }

    // Hvis der er indtastet noget brugbart over det hele
    // udregn.
    if(areAllFilled()) calculate();
}

$(document).ready(function() {
    var count = 0;
    //Check om det første felt er udfyldt
    var tmp = jQuery("#Vx");
    if(tmp.val() != "" && tmp.val() != null) {
        count++;
        tmp.parent().addClass("has-success");
    }
    //Check om det anden felt er udfyldt
    tmp = jQuery("#Vy");
    if(tmp.val() != "" && tmp.val() != null) {
        count++;
        tmp.parent().addClass("has-success");
    }
    //Check om det tredje felt er udfyldt
    tmp = jQuery("#Wx");
    if(tmp.val() != "" && tmp.val() != null) {
        count++;
        tmp.parent().addClass("has-success");
    }
    //Check om det fjerde felt er udfyldt
    tmp = jQuery("#Wy");
    if (tmp.val() != "" && tmp.val() != null) {
        count++;
        tmp.parent().addClass("has-success");
    }
    // Hvis alle fire felter er udfyldt, udregn
    if(count == 4) {
        calculate();
    }
});

function areAllFilled() {
    //Check om det første felt er udfyldt
    var tmp = document.getElementById('Vx');
    if(tmp.value == "" || tmp.value == null) {
        return false;
    }
    //Check om det anden felt er udfyldt
    tmp = document.getElementById('Vy');
    if(tmp.value == "" || tmp.value == null) {
        return false;
    }
    //Check om det tredje felt er udfyldt
    tmp = document.getElementById('Wx');
    if(tmp.value == "" || tmp.value == null) {
        return false;
    }
    //Check om det fjerde felt er udfyldt
    tmp = document.getElementById('Wy');
    return !(tmp.value == "" || tmp.value == null);
}

function calculate() {
    // Find alle værdier i inputfelterne
    var tmp = document.getElementById('Vx');
    var Vx = Number(tmp.value);
    tmp = document.getElementById('Vy');
    var Vy = Number(tmp.value);
    tmp = document.getElementById('Wx');
    var Wx = Number(tmp.value);
    tmp = document.getElementById('Wy');
    var Wy = Number(tmp.value);

    // Beregn længde af vektoren og vis til brugeren
    var VLength = calculateLength(Vx, Vy);
    //console.log(VLength);
    var WLength = calculateLength(Wx, Wy);
    //console.log(WLength);
    var r = "Længden af vektor V: " + roundToTwo(VLength) + "\nLængden af vektor W: " + roundToTwo(WLength) + "\n";
    var results = document.getElementById("results");
    results.value = r;

    // Find den adderede vektor
    var Ux = Vx + Wx;
    var Uy = Vy + Wy;
    results.value = results.value + "\nDen adderede vektor har en x-værdi på: " + roundToTwo(Ux) + "\n\t og en y-værdi på: " + roundToTwo(Uy);
    var ULength = calculateLength(Ux, Uy);
    results.value += "\n\tDette giver en længde på: " + roundToTwo(ULength) + "\n";

    // Find vektor differencen
    var Xdiff = Vx - Wx;
    var Ydiff = Vy - Wy;
    results.value += "\nVektordifferencen for x er: " + roundToTwo(Xdiff) + "\n\tOg for y: " + roundToTwo(Ydiff) + "\n";

    // Find prikproduktet
    var point = Vx * Vy + Wx + Wy;
    results.value += "\nSkalarproduktet af de to vektorer er: " + roundToTwo(point) + "\n";

    // Find vinklen mellem de to vektorer
    var angle = getDegrees(Math.acos(point / (VLength * WLength)));
    results.value += "\nVinkelen mellem de to vektorer er: " + roundToTwo(angle) + "\n";

    // Tjek om de to vinkler er ortogonalle
    if(point == 0) {
        results.value += "\tVektorerne er ortogonalle på hindanden\n";
    }

    // Find den projekterede vektor på V



    // Find den projekterede vektor på W


}

function calculateLength(x,y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}