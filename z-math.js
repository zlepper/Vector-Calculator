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