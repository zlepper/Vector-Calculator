/**
 * Created by rasmus on 1/7/15.
 */
function validate(t) {
    //console.log(t);
    var input = document.getElementById(t);
    console.log(input.value);
    var id = "#" + input.id;
    console.log(id);
    if(input.value != "" || input.value != null) {
        jQuery(id).parent().addClass("has-success").removeClass("has-error");
    } else {
        jQuery(id).parent().addClass("has-error").removeClass("has-success");
    }

    if(areAllFilled()) {
        calculate();
    }
}

function areAllFilled() {
    var tmp = document.getElementById('Vx');
    if(tmp.value == "" || tmp.value == null) {
        return false;
    }
    tmp = document.getElementById('Vy');
    if(tmp.value == "" || tmp.value == null) {
        return false;
    }
    tmp = document.getElementById('Wx');
    if(tmp.value == "" || tmp.value == null) {
        return false;
    }
    tmp = document.getElementById('Wy');
    if(tmp.value == "" || tmp.value == null) {
        return false;
    }
    return true;
}

function calculate() {
    var tmp = document.getElementById('Vx');
    var Vx = tmp.value;
    tmp = document.getElementById('Vy');
    var Vy = tmp.value;
    tmp = document.getElementById('Wx');
    var Wx = tmp.value;
    tmp = document.getElementById('Wy');
    var Wy = tmp.value;
}