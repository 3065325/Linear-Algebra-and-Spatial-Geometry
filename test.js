"use strict"

import {
    Matrix
} from "./matrices.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let vw = canvas.width / 100;
let vh = canvas.height / 100;

const vectorAmount = 25;
let vectors = [];

let scale = 10;
for (let i = 0; i < vectorAmount; i++) {
    for (let j = 0; j < vectorAmount; j++) {
        vectors[j + i*vectorAmount] = new Matrix([
            [(i - vectorAmount/2)*scale*vh],
            [(j - vectorAmount/2)*scale*vh]
        ])
    }
}

setInterval(() => {
    let length = vectors.length;
    for (let i = 0; i < vectorAmount; i++) {
        for (let j = 0; j < vectorAmount; j++) {
            vectors[length + j + i*vectorAmount] = new Matrix([
                [(i - vectorAmount/2)*scale*vh],
                [(j - vectorAmount/2)*scale*vh]
            ])
        }
    }
}, 5000);

vectors[0].print();
vectors[0].transpose().print();

let t = Math.PI/180;
let R = new Matrix([
    [Math.cos(t), -Math.sin(t)],
    [Math.sin(t), Math.cos(t)]
]);

let I = new Matrix([
    [1, 0],
    [0, 1]
]);

let Sh = new Matrix([
    [1, -1/60],
    [0, 1]
]);

let Sv = new Matrix([
    [1, 0],
    [1/20, 1]
]);

function drawVector(vector, color) {
    // c.beginPath();
    // c.strokeStyle = color;
    // c.moveTo(0, 0);
    // c.lineTo(vector.component(1, 1), vector.component(2, 1));
    // c.stroke();

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
    c.translate(50*vw, 50*vh);

    for (let i = 0; i < vectors.length; i++) {
        let vector = vectors[i];

        drawVector(vector, "#ffffff");

        vectors[i] = Matrix.mult(R.mult(0.999), vector);
    }

}, 1000/120);