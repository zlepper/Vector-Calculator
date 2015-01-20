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
    } else {
        ctx.translate(-1 * c.width, 0);
    }
}

function scale_canvas(id) {
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    ctx.scale(1,-1);
}

function translate_canvas(id, amountX, amountY){
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
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
    ctx.strokeStyle = "#000000";
    ctx.stroke();
}

function canvas_arrow(id, fromx, fromy, tox, toy, orientation, color){
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
    if(color != null) {
        context.strokeStyle = color;
    } else {
        context.strokeStyle = "#000000"
    }
    context.stroke();
}

function canvas_line(id, fromx, fromy, tox, toy, orientation, color) {
    var c = document.getElementById(id);
    var context = c.getContext("2d");
    if(orientation) {
        context.translate(0, c.height);
        context.scale(1, -1);
    }
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    if(color != null) {
        context.strokeStyle = color;
    } else {
        context.strokeStyle = "#000000"
    }
    context.stroke();
}

function get_scaled_vector(Vx, Vy, scalar) {
    var s;
    if(Math.abs(Vx) > Math.abs(Vy)) {
        if(scalar == undefined) {
            s = Math.abs(Vx) / 90;
        } else {
            s = Math.abs(Vx) / scalar;
        }
    } else {
        if(scalar == undefined) {
            s = Math.abs(Vy) / 90;
        } else {
            s = Math.abs(Vy) / scalar;
        }
    }
    var Wx = Vx/s;
    var Wy = Vy/s;
    return [Wx, Wy, s];
}

function get_scaled_double_vector(Vx, Vy, Wx, Wy, scalar) {
    var s;
    if(Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2)) > Math.sqrt(Math.pow(Wx, 2) + Math.pow(Wy, 2))) {
        if(Math.abs(Vx) > Math.abs(Vy)) {
            if(scalar == undefined) {
                s = Math.abs(Vx) / 90;
            } else {
                s = Math.abs(Vx) / scalar;
            }
        } else {
            if(scalar == undefined) {
                s = Math.abs(Vy) / 90;
            } else {
                s = Math.abs(Vy) / scalar;
            }
        }
    } else {
        if(Math.abs(Vx) > Math.abs(Vy)) {
            if(scalar == undefined) {
                s = Math.abs(Wx) / 90;
            } else {
                s = Math.abs(Wx) / scalar;
            }
        } else {
            if(scalar == undefined) {
                s = Math.abs(Wy) / 90;
            } else {
                s = Math.abs(Wy) / scalar;
            }
        }
    }
    //console.log(s);
    return [Vx/s, Vy/s, Wx/s, Wy/s, s];
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