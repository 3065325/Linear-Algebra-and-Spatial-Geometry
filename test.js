"use strict"

import {
    Matrix
} from "./matrices.js";
import {
    Complex,
    Quaternion
} from "./complex.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let vw = canvas.width / 100;
let vh = canvas.height / 100;

let V = new Matrix([
    [1],
    [1],
    [1]
]);

let AxisOfRotation = new Matrix([
    [-1],
    [1],
    [-1]
]).normalize();

let speedMultiplier = 2;
let RotationQuaternion = Quaternion.rotationQuaternion(1, AxisOfRotation.mult(speedMultiplier));

function drawVector(vector, color) {
    c.beginPath();
    c.strokeStyle = color;
    c.moveTo(0, 0);
    c.lineTo(vector.component(1, 1), vector.component(2, 1));
    c.stroke();

    c.fillStyle = color;
    c.fillRect(vector.component(1, 1) - 1, vector.component(2, 1) - 1, 3, 3);
}

setInterval(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    vw = canvas.width / 100;
    vh = canvas.height / 100;

    c.fillStyle = '#161616';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.translate(50 * vw, 50 * vh);

    drawVector(V.mult(10 * vh), "#ffffff");
    V = RotationQuaternion.rotate(V);

}, 1000 / 60);