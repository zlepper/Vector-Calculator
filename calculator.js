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
    "use strict";
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
    results.append("<h2>Længder</h2><hr>$$|\\vec{v}| =" + roundToTwo(VLength) + "$$<canvas width='130' height='110' id='vectorVLength'></canvas>$$|\\vec{w}| = " + roundToTwo(WLength) + "$$<canvas width='130' height='110' id='vectorWLength'></canvas>");
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
        translate_canvas(canvasId, 0 , -1*document.getElementById(canvasId).height +10);57
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

    // Find den adderede vektor
    var Ux = Vx + Wx;
    var Uy = Vy + Wy;
    var s = "<h2>Vektoraddition</h2><hr>$$\\vec{u} = \\vec{v} + \\vec{w} = \\binom{" + Vx + "+(" + Wx + ")}{" + Vy + "+(" + Wy + ")} = \\binom{" + Ux + "}{" + Uy + "} $$<canvas width='210' height='210' id='adderedeVector'></canvas>";
    results.append(s);
    var ULength = calculateLength(Ux, Uy);
    s = "$$|\\vec{u}| = " + roundToTwo(ULength) + "$$";
    results.append(s);
    canvasId = "adderedeVector";
    results.append("<p>Grøn V</p>");
    prepare_canvas(canvasId);
    var u = get_scaled_vector(Math.abs(Vx) + Math.abs(Wx), Math.abs(Vy) + Math.abs(Wy));
    var o = [Vx/u[2], Vy/u[2], Wx/u[2], Wy/u[2]];
    canvas_arrow(canvasId, 0,0, o[0], o[1], false, "#ff0000");
    canvas_arrow(canvasId, o[0], o[1], o[0] + o[2], o[1] + o[3], false, "#00ff00");
    canvas_arrow(canvasId, 0,0, o[0] + o[2], o[1] + o[3], false, "#0000ff");


    // Find vektor differencen
    var Xdiff = Vx - Wx;
    var Ydiff = Vy - Wy;
    s = "<h2>Vektordifferens</h2><hr>$$\\vec{a} = \\vec{v} - \\vec{w} = \\binom{" + Vx + "-(" + Wx + ")}{" + Vy + "-(" + Wy + ")} = \\binom{" + Xdiff + "}{" + Ydiff + "}$$<canvas width='210' height='210' id='differenceredeVector'></canvas>";
    results.append(s);
    W = get_scaled_double_vector(Vx, Vy, Wx, Wy);
    canvasId = "differenceredeVector";
    prepare_canvas(canvasId);
    canvas_arrow(canvasId, 0, 0, W[0], W[1], false, "#ff0000");
    canvas_arrow(canvasId, 0, 0, W[2], W[3], false, "#00ff00");
    canvas_arrow(canvasId, W[2], W[3], W[0], W[1],  false, "#0000ff");


    // Find prikproduktet
    var point = Vx * Wx + Vy * Wy;
    s = "<h2>Skalarprodukt</h2><hr>$$r = \\vec{v} \\bullet \\vec{w} = " + Vx + "\\cdot" + Wx + "+(" + Vy + "\\cdot" + Wy + ")=" + point + "$$";
    results.append(s);

    // Find vinklen mellem de to vektorer
    var angle = getDegrees(Math.acos(point / (VLength * WLength)));
    s = "<h2>Vinkler mellem vektorer</h2><hr>$$" + "\\alpha = \\arccos \\left (\\frac{" + roundToTwo(point) + "}{" + roundToTwo(VLength) + "\\cdot" + roundToTwo(WLength) + "} \\right) =" + roundToTwo(angle) + "&deg$$<canvas height='210' width='210' id='angle'>Få dig en ny browser</canvas>";
    results.append(s);
    canvasId = "angle";
    prepare_canvas(canvasId);
    canvas_arrow(canvasId, 0, 0, W[0], W[1], false, "#ff0000");
    canvas_arrow(canvasId, 0, 0, W[2], W[3], false, "#00ff00");
    var angleToDraw = Math.acos(Vx/VLength);
    draw_arc(canvasId, 0, 0, 10, angleToDraw, getRadians(angle)+angleToDraw);



    // Tjek om de to vinkler er ortogonalle
    if(angle == 90) {
        results.append("<p>Vektorerne er ortogonale på hindanden.</p>");
    } else {
        results.append("<p>Vektorerne er ikke ortogonale på hindanden</p>");
    }

    // Find den projekterede vektor på V
    var vProjx = point/(Math.pow(WLength, 2)) * Wx;
    var vProjy = point/(Math.pow(WLength, 2)) * Wy;
    results.append("<h2>Projektioner</h2><hr><p>V projekteret på W:</p>$$V_W = \\frac{V \\bullet W}{|\\vec{W}|^2} \\cdot W = \\frac{" + roundToTwo(point) + "}{" + roundToTwo(WLength) + "^2} \\cdot \\binom{" + Wx + "}{" + Wy + "} = \\binom{" + roundToTwo(vProjx) + "}{" + roundToTwo(vProjy) + "}$$<canvas height='210' width='210' id='vProjw'>Få dig en ny browser</canvas>");
    canvasId = "vProjw";
    prepare_canvas(canvasId);
    W = get_scaled_double_vector(Vx, Vy, Wx, Wy, 70);
    var vProjxs = vProjx/W[4];
    var vProjys = vProjy/W[4];
    canvas_arrow(canvasId, 0, 0, W[0], W[1], false, "#ff0000");
    canvas_arrow(canvasId, 0, 0, W[2], W[3], false, "#00ff00");
    canvas_arrow(canvasId, 0, 0, vProjxs, vProjys, false, "#0000ff");


    // Find den projekterede vektor på W
    var wProjx = point/(Math.pow(VLength, 2)) * Vx;
    var wProjy = point/(Math.pow(VLength, 2)) * Vy;
    results.append("<p>W projekteret på V:</p>$$W_V = \\frac{W \\bullet V}{|\\vec{V}|^2} \\cdot V = \\frac{" + roundToTwo(point) + "}{" + roundToTwo(VLength) + "^2} \\cdot \\binom{" + Vx + "}{" + Vy + "} = \\binom{" + roundToTwo(wProjx) + "}{" + roundToTwo(wProjy) + "}$$<canvas height='210' width='210' id='wProjv'>Få dig en ny browser</canvas>");
    canvasId = "wProjv";
    prepare_canvas(canvasId);
    W = get_scaled_double_vector(Vx, Vy, Wx, Wy, 70);
    var wProjxs = wProjx/W[4];
    var wProjys = wProjy/W[4];
    canvas_arrow(canvasId, 0, 0, W[0], W[1], false, "#ff0000");
    canvas_arrow(canvasId, 0, 0, W[2], W[3], false, "#00ff00");
    canvas_arrow(canvasId, 0, 0, wProjxs, wProjys, false, "#0000ff");

    // Parametiśer vektorerne
    // Først med V som førstevektor
    var yKryds = Vy-(Wy * (Vx/Wx));
    results.append("<h2>Parametrisering</h2><hr><p>$$\\binom{x}{y} = \\binom{" + Vx + "}{" + Vy + "}+t \\cdot \\binom{" + Wx + "}{" + Wy + "}$$</p><p>Y krydses i: $$" + Vy + "- \\left(" + Wy + "\\cdot \\frac{" + Vx + "}{" + Wx + "} \\right) = " + roundToTwo(yKryds) + "$$</p><canvas width='210' height='210' id='param1'></canvas>");
    canvasId = "param1";
    prepare_canvas(canvasId);
    u = get_scaled_vector(Math.abs(Vx) + Math.abs(Wx), Math.abs(Vy) + Math.abs(Wy));
    o = [Vx/u[2], Vy/u[2], Wx/u[2], Wy/u[2]];
    var m = get_scaled_double_vector(o[2]*-1, o[3]*-1, o[2], o[3], 400);
    canvas_line(canvasId, o[0] + m[0], o[1] + m[1], o[0] + m[2], o[1] + m[3]);
    canvas_arrow(canvasId, 0,0, o[0], o[1], false, "#ff0000");
    canvas_arrow(canvasId, o[0], o[1], o[0] + o[2], o[1] + o[3], false, "#00ff00");

    // Dernæst med W som førstevektor
    yKryds = Wy-(Vy * (Wx/Vx));
    results.append("<p>$$\\binom{x}{y} = \\binom{" + Wx + "}{" + Wy + "}+t \\cdot \\binom{" + Vx + "}{" + Vy + "}$$</p><p>Y krydses i: $$" + Wy + "- \\left(" + Vy + "\\cdot \\frac{" + Wx + "}{" + Vx + "} \\right) = " + roundToTwo(yKryds) + "$$</p><canvas width='210' height='210' id='param2'></canvas>");
    canvasId = "param2";
    prepare_canvas(canvasId);
    u = get_scaled_vector(Math.abs(Vx) + Math.abs(Wx), Math.abs(Vy) + Math.abs(Wy));
    o = [Wx/u[2], Wy/u[2], Vx/u[2], Vy/u[2]];
    m = get_scaled_double_vector(o[2]*-1, o[3]*-1, o[2], o[3], 400);
    canvas_line(canvasId, o[0] + m[0], o[1] + m[1], o[0] + m[2], o[1] + m[3]);
    canvas_arrow(canvasId, 0,0, o[0], o[1], false, "#ff0000");
    canvas_arrow(canvasId, o[0], o[1], o[0] + o[2], o[1] + o[3], false, "#00ff00");

    // Drej vektoren V
    results.append("<h2>Tværvektorer</h2><hr><p>Tværvektoren til \\( \\vec{V} \\) er:</p><p>$$\\hat{V} = \\binom{" + (Vy*-1) + "}{" + Vx + "}$$</p>");
    results.append("<p>Tværvektoren til \\(\\hat{V}\\) er:</p><p>$$\\hat{\\hat{V}} = \\binom{" + (Vx*-1) + "}{" + (Vy*-1) + "}$$</p>");
    results.append("<p>Tværvektoren til \\(\\hat{\\hat{V}}\\)</p><p>$$\\hat{\\hat{\\hat{V}}} = \\binom{" + (Vy) + "}{" + (Vx*-1) + "}$$</p>");
    results.append("<canvas width='210' height='210' id='rotateVektorV'>Get a new browser</canvas>");
    canvasId = "rotateVektorV";
    prepare_canvas(canvasId);
    W = get_scaled_vector(Vx, Vy, 80);
    canvas_arrow(canvasId, 0,0, W[0], W[1], false, "#ff0000");
    canvas_arrow(canvasId, 0,0, W[1]*-1, W[0], false, "#00ff00");
    canvas_arrow(canvasId, 0,0, W[0]*-1, W[1]*-1, false, "#0000ff");
    canvas_arrow(canvasId, 0,0, W[1], W[0]*-1, false, "#ffff00");

    // Drej vektoren W
    results.append("<p>Tværvektoren til \\(\\vec{W}\\) er:</p>$$\\hat{W} = \\binom{" + (Wy*-1) + "}{" + Wx + "}$$</p>");
    results.append("<p>Tværvektoren til \\(\\hat{W}\\) er:</p><p>$$\\hat{\\hat{W}} = \\binom{" + (Wx*-1) + "}{" + (Wy*-1) + "}$$</p>");
    results.append("<p>Tværvektoren til \\(\\hat{\\hat{W}}\\)</p><p>$$\\hat{\\hat{\\hat{W}}} = \\binom{" + (Wy) + "}{" + (Wx*-1) + "}$$</p>");
    results.append("<canvas width='210' height='210' id='rotateVektorW'>Get a new browser</canvas>");
    canvasId = "rotateVektorW";
    prepare_canvas(canvasId);
    W = get_scaled_vector(Wx, Wy, 80);
    canvas_arrow(canvasId, 0,0, W[0], W[1], false, "#ff0000");
    canvas_arrow(canvasId, 0,0, W[1]*-1, W[0], false, "#00ff00");
    canvas_arrow(canvasId, 0,0, W[0]*-1, W[1]*-1, false, "#0000ff");
    canvas_arrow(canvasId, 0,0, W[1], W[0]*-1, false, "#ffff00");

    // Determinant
    results.append("<h2>Determinant</h2><hr><p>Determinanten er: </p>");
    var detVW = Vx*Wy - Wx*Vy;
    results.append("$$ det(V, W) = \\begin{bmatrix} " + Vx + " & " + Wx + " \\\\ " + Vy + " & " + Wy + " \\end{bmatrix} = " + Vx + " \\cdot " + Wy + " - " + Vy + " \\cdot " + Wx + " = " + detVW + " $$");
    var detWV = Wx*Vy - Vx*Wy;
    results.append("$$ det(W, V) = \\begin{bmatrix} " + Wx + " & " + Vx + " \\\\ " + Wy + " & " + Vy + " \\end{bmatrix} = " + Wx + " \\cdot " + Vy + " - " + Vx + " \\cdot " + Wy + " = " + detWV + " $$");
    results.append("<p>Det udspændte areal er: </p>");
    results.append("$$|det(V, W)| = |" + detVW + "| = " + (Math.abs(detVW)) + "$$");
    results.append("<canvas height='210' width='210' id='determinant'></canvas>");
    canvasId = "determinant";
    prepare_canvas(canvasId);
    W = get_scaled_double_vector(Vx, Vy, Wx, Wy, 50);
    canvas_arrow(canvasId, 0,0, W[0], W[1], false, "#ff0000");
    canvas_arrow(canvasId, 0, 0, W[2], W[3], false, "#00ff00");
    canvas_line(canvasId, W[0], W[1], W[0]+W[2], W[1]+W[3], false, "#00ff00");
    canvas_line(canvasId, W[2], W[3], W[0]+W[2], W[1]+W[3], false, "#ff0000");
    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineTo(W[0], W[1]);
    ctx.lineTo(W[0]+W[2], W[1]+W[3]);
    ctx.lineTo(W[2], W[3]);
    ctx.lineTo(0,0);
    ctx.closePath();
    ctx.fillStyle = "rgba(0,128,0,0.5)";
    ctx.fill();

    // Formatér til matematik
    MathJax.Hub.Typeset();
}

function calculateLength(x,y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}