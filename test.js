import {
    Matrix
} from "./matrices.js";

import {
    Quaternion
} from "./complex.js";

var scene = new THREE.Scene();
var renderer, camera;
var controls;

let cubeAmount = 10;
let cubeScale = 3;
let cubes = new Array(cubeAmount ** 3);
let cubePositions = new Array(cubes.length);

for (let i = 0; i < cubeAmount; i++) {
    for (let j = 0; j < cubeAmount; j++) {
        for (let k = 0; k < cubeAmount; k++) {
            let index = k + cubeAmount * j + cubeAmount ** 2 * i;
            let cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());

            cubePositions[index] = new Matrix([
                [i * cubeScale - (cubeAmount * cubeScale/2 - 1)],
                [j * cubeScale - (cubeAmount * cubeScale/2 - 1)],
                [k * cubeScale - (cubeAmount * cubeScale/2 - 1)]
            ]);
            cube.position.set(cubePositions[index].component(1, 1), cubePositions[index].component(2, 1), cubePositions[index].component(3, 1));
            
            scene.add(cube);
            cubes[index] = cube;
        }
    }
}

let Skew = new Matrix([
    [1, -0.005, 0],
    [-0.005, 1, 0],
    [0, 0, 1]
]);

let AoR = new Matrix([
    [1],
    [1],
    [1]
]).normalize();

let RPM = 30;
let RQ = Quaternion.rotationQuaternion(RPM/60, AoR)

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.y = 32;
    camera.position.z = 80;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    var gridXZ = new THREE.GridHelper(1000, 1000);
    gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    scene.add(gridXZ);
}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    for (let i = 0; i < cubeAmount ** 3; i++) {
        let cube = cubes[i];
        let cubePosition = cubePositions[i];

        cubePositions[i] = RQ.rotate(cubePosition);

        cube.position.set(cubePosition.component(1, 1), cubePosition.component(2, 1), cubePosition.component(3, 1));
    }
}