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
    var results = jQuery(".results");
    results.empty();
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
    results.append("<p>Længden af de to vektorer er: </p>$$|\\vec{v}| =" + roundToTwo(VLength) + "$$<canvas width='130' height='110' id='vectorVLength'></canvas>$$|\\vec{w}| = " + roundToTwo(WLength) + "$$<canvas width='130' height='110' id='vectorWLength'></canvas>");
    //canvas_arrow("vectorVLength", 10, 10, 10+Vx, 10, true);
    // Work for drawing vector V
    var canvasId = "vectorVLength";
    if(Vy < 0) {
        translate_canvas(canvasId, 0 , -1*document.getElementById(canvasId).height +10);
    } else {
        translate_canvas(canvasId, 0 , -10);
    }
    if(Vx < 0) {
        translate_canvas(canvasId, document.getElementById(canvasId).width -10, 0);
    } else {
        translate_canvas(canvasId, 10, 0);
    }
    var W = get_scaled_vector(Vx, Vy);
    results.append("<p></p>");
    canvas_arrow(canvasId, 0, 0, W[0], 0, true, "#ff0000");
    canvas_arrow(canvasId, W[0], 0, W[0], W[1], false, "#00ff00");
    canvas_arrow(canvasId, 0, 0, W[0], W[1], false, "#0000ff");

    // Work for drawing vector W
    canvasId = "vectorWLength";
    if(Wy < 0) {
        translate_canvas(canvasId, 0 , -1*document.getElementById(canvasId).height +10);
    } else {
        translate_canvas(canvasId, 0 , -10);
    }
    if(Wx < 0) {
        translate_canvas(canvasId, document.getElementById(canvasId).width -10, 0);
    } else {
        translate_canvas(canvasId, 10, 0);
    }
    W = get_scaled_vector(Wx, Wy);
    canvas_arrow(canvasId, 0, 0, W[0] + 0, 0, true, "#ff0000");
    canvas_arrow(canvasId, W[0], 0, W[0], W[1], false, "#00ff00");
    canvas_arrow(canvasId, 0, 0, W[0], W[1], false, "#0000ff");
    /*if(Wy < 0) {
        set_text(canvasId, 45, -10, Wx, true);
    } else {
        set_text(canvasId, 45, 0, Wx, true);
    }
    if(Wx < 0) {
        set_text(canvasId, W[0] - 12, (W[1] / 2) - 10, Wy, false);
    } else {
        set_text(canvasId, W[0] + 12, (W[1] / 2) + 10, Wy, false);
    }
    set_text(canvasId, W[0]+12, (W[1]/2)+10, Wy, false);
    set_text(canvasId, (W[0]/2)-15,(W[1]/2)+15, roundToTwo(WLength), false);*/

    // Find den adderede vektor
    var Ux = Vx + Wx;
    var Uy = Vy + Wy;
    var s = "<p>Den adderede vektor er: </p>$$\\vec{u} = \\vec{v} + \\vec{w} = \\binom{" + Vx + "+" + Wx + "}{" + Vy + "+" + Wy + "} = \\binom{" + Ux + "}{" + Uy + "} $$<canvas width='230' height='210' id='adderedeVector'></canvas>";
    results.append(s);
    var ULength = calculateLength(Ux, Uy);
    s = "$$|\\vec{u}| = " + roundToTwo(ULength) + "$$";
    results.append(s);
    canvasId = "adderedeVector";
    results.append("<p>Grøn V</p>")
    scale_canvas(canvasId)
    translate_canvas(canvasId, 105, -115)
    W = get_scaled_vector(Vx+Wx, Vy, Wy);
    var tmpVx = Vx/W[2];
    var tmpVy = Vy/W[2];
    var tmpWx = Wx/W[2];
    var tmpWy = Wy/W[2];
    canvas_arrow(canvasId, 0,0,tmpVx, tmpVy, false, "#ff0000");
    canvas_arrow(canvasId, tmpVx, tmpVy, tmpVx+tmpWx, tmpVy+tmpWy, false, "#00ff00");
    canvas_arrow(canvasId, 0, 0, tmpVx+tmpWx, tmpVy+tmpWy, false, "#0000ff");
    draw_axis(canvasId)


    // Find vektor differencen
    var Xdiff = Vx - Wx;
    var Ydiff = Vy - Wy;
    s = "<p>Vektor differencen er:</p>$$\\vec{a} = \\vec{v} - \\vec{w} = \\binom{" + Vx + "-" + Wx + "}{" + Vy + "-" + Wy + "} = \\binom{" + Xdiff + "}{" + Ydiff + "}$$<canvas width='130' height='110' id='differenceredeVector'></canvas>";
    results.append(s);
    W = get_scaled_vector()
    canvasId = "differenceredeVector";
    canvas_arrow(canvasId, 0, 0, Vx, Vy, true);
    canvas_arrow(canvasId, 0, 0, Wx, Wy, false);
    canvas_arrow(canvasId, Vx, Vy, Wx, Wy, false);


    // Find prikproduktet
    var point = Vx * Wx + Vy * Wy;
    s = "<p>Skalaerproduktet er:</p>$$r = \\vec{v} \\bullet \\vec{w} = " + Vx + "\\cdot" + Wx + "+" + Vy + "\\cdot" + Wy + "=" + point + "$$";
    results.append(s);

    // Find vinklen mellem de to vektorer
    var angle = getDegrees(Math.acos(point / (VLength * WLength)));
    s = "<p>Vinkelen mellem de to vektorer er:</p>$$" + "\\alpha = \\arccos \\left (\\frac{" + roundToTwo(point) + "}{" + roundToTwo(VLength) + "\\cdot" + roundToTwo(WLength) + "} \\right) =" + roundToTwo(angle) + "&deg$$";
    results.append(s);

    // Tjek om de to vinkler er ortogonalle
    if(angle == 90) {
        results.append("<p>Vektorerne er ortogonale på hindanden.</p>");
    } else {
        results.append("<p>Vektorerne er ikke ortogonale på hindanden</p>");
    }

    // Find den projekterede vektor på V



    // Find den projekterede vektor på W

    // Formatér til matematik
    MathJax.Hub.Typeset();
}

function calculateLength(x,y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}