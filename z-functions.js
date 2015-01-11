//Praktiske funktioner der mangler i normalt javascript.
function getRadians(degrees) {
    return degrees * (Math.PI/180);
}

function getDegrees(radians) {
    return radians * (180/Math.PI);
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function translate_canvas_X(id, positive) {
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    if (!positive) {
        ctx.translate(c.width, 0);
        console.log("Translated: " + c.width);
    } else {
        ctx.translate(-1 * c.width, 0);
        console.log("Translated: " + (-1 * c.width));
    }
}

function translate_canvas(id, amountX, amountY){
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    console.log("translating x by " + amountX);
    console.log("translating y by " + amountY);
    ctx.translate(amountX, amountY);
}

function translate_canvas_Y(id, positive) {
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    if(positive) {
        ctx.translate(0, c.height);
    } else {
        ctx.translate(0, -1 * c.height);
    }
}

function draw_axis(id) {
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(-300,0);
    ctx.lineTo(300,0);
    ctx.moveTo(0,300);
    ctx.lineTo(0,-300);
    ctx.stroke();
}

function canvas_arrow(id, fromx, fromy, tox, toy, orientation){
    var headlen = 10;   // length of head in pixels
    //console.log("Drawing from " + fromx + ", " + fromy);
    //console.log("Drawing to " + tox + ", " + toy);
    var angle = Math.atan2(toy-fromy,tox-fromx);
    var c = document.getElementById(id);
    var context = c.getContext("2d");
    if(orientation) {
        context.translate(0, c.height);
        context.scale(1, -1);
    }
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6), toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6), toy-headlen*Math.sin(angle+Math.PI/6));
    context.stroke();
}

function get_scaled_vector(Vx, Vy) {
    var s;
    if(Math.abs(Vx) > Math.abs(Vy)) {
        s = Math.abs(Vx)/90;
    } else {
        s = Math.abs(Vy)/90;
    }
    //console.log("s: " + s);
    var Wx = Vx/s;
    //console.log("Wx: " + Wx);
    var Wy = Vy/s;
    //console.log("Wy: " + Wy);
    return [Wx, Wy];
}

function set_text(id, posx, posy, text, orientation) {
    var c = document.getElementById(id);
    var context = c.getContext("2d");
    if(orientation) {
        //context.translate(0, c.height);
        context.scale(1, -1);
    }
    context.fillText(text, posx, -1*posy);
}