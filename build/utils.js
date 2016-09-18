"use strict";
function getCanvas(id) {
    var c = document.getElementById(id);
    var $ = c.getContext('2d');
    var w = c.width = 400;
    var h = c.height = 550;
    return { c: c, $: $, w: w, h: h };
}
exports.getCanvas = getCanvas;
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randomNumber = randomNumber;
function Sin(n, angle, arc, plus) {
    return plus ? n + Math.sin(angle) * arc : n - Math.sin(angle) * arc;
}
exports.Sin = Sin;
function Cos(n, angle, arc, plus) {
    return plus ? n + Math.cos(angle) * arc : n - Math.cos(angle) * arc;
}
exports.Cos = Cos;
