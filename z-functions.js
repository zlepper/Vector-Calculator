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

function canvas_arrow(context, fromx, fromy, tox, toy){
    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
}