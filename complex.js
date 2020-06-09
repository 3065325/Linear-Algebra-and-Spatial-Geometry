import {
    Matrix
} from "./matrices.js";

export class Complex {
    constructor(a, b) {
        this.R = a;
        this.I = b;
    }

    mult(s) {
        return new Complex(
            this.R * s,
            this.I * s
        );
    }

    div(s) {
        return new Complex(
            this.R / s,
            this.I / s
        );
    }

    conjugate() {
        return new Complex(
            this.R,
            -this.I
        );
    }

    mag() {
        return Math.sqrt(this.R ** 2 + this.I * 2);
    }

    rotate(t) {
        let T = t * Math.PI / 180;
        return new Complex(
            this.R * Math.cos(T) - this.I * Math.sin(-T),
            this.R * Math.sin(-T) + this.I * Math.cos(T)
        );
    }

    vectorForm() {
        return new Matrix([
            [this.R],
            [this.I]
        ]);
    }

    print() {
        let String = `${this.R} + ${this.I}i`;
        console.log(String);
    }

    static add(C1, C2) {
        return new Complex(
            C1.R + C2.R,
            C1.I + C2.I
        );
    }

    static sub(C1, C2) {
        return new Complex(
            C1.R - C2.R,
            C1.I - C2.I
        );
    }

    static mult(C1, C2) {
        return new Complex(
            C1.R * C2.R - C1.I * C2.I,
            C1.R * C2.I + C1.I * C2.R
        );
    }

    static div(C1, C2) {
        return new Complex(
            (C1.R * C2.R + C1.I * C2.I) / (C2.R ** 2 + C2.I ** 2),
            (C1.I * C2.R - C1.R * C2.I) / (C2.R ** 2 + C2.I ** 2)
        );
    }
}

export class Quaternion {
    constructor(r, i, j, k) {
        this.R = r;
        this.I = i;
        this.J = j;
        this.K = k;
    }

    conjugate() {
        return new Quaternion(
            this.R,
            -this.I,
            -this.J,
            -this.K
        )
    }

    rotate(v) {
        let QV = new Quaternion(
            0, v.component(1, 1), v.component(2, 1), v.component(3, 1)
        );

        let RV = Quaternion.mult(Quaternion.mult(this, QV), this.conjugate());
        return new Matrix([
            [RV.I],
            [RV.J],
            [RV.K]
        ]);
    }

    vectorForm() {
        return new Matrix([
            [this.R],
            [this.I],
            [this.J],
            [this.K]
        ]);
    }

    matrixForm() {
        return new Matrix([
            [this.R, -this.I, -this.J, -this.K],
            [this.I, this.R, -this.K, this.J],
            [this.J, this.K, this.R, -this.I],
            [this.K, -this.J, this.I, this.R]
        ]);
    }

    print() {
        let String = `${this.R} + ${this.I}i + ${this.J}j + ${this.K}k`;
        console.log(String);
    }

    static add(Q1, Q2) {
        return new Quaternion(
            Q1.R + Q2.R,
            Q1.I + Q2.I,
            Q1.J + Q2.J,
            Q1.K + Q2.K
        )
    }

    static sub(Q1, Q2) {
        return new Quaternion(
            Q1.R - Q2.R,
            Q1.I - Q2.I,
            Q1.J - Q2.J,
            Q1.K - Q2.K
        )
    }

    static mult(Q1, Q2) {
        let newVectorForm = Matrix.mult(Q1.matrixForm(), Q2.vectorForm());
        return new Quaternion(
            newVectorForm.component(1, 1),
            newVectorForm.component(2, 1),
            newVectorForm.component(3, 1),
            newVectorForm.component(4, 1)
        );
    }

    static rotationQuaternion(t, v) {
        let T = t * Math.PI/180
        return new Quaternion(Math.cos(T / 2), v.component(1, 1) * Math.sin(T / 2), v.component(2, 1) * Math.sin(T / 2), v.component(3, 1) * Math.sin(T / 2));
    }
}