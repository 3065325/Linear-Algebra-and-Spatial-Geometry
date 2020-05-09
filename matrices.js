export class Matrix {
    constructor(multiArray) {
        this.components = multiArray;
    }

    component(i, j) {
        return this.components[i - 1][j - 1];
    }

    mult(s) {
        let M1 = new Array(this.components.length);
        for (let i = 0; i < this.components.length; i++) {
            M1[i] = new Array(this.components[0].length);

            let thisRow = this.components[i];
            let M1Row = M1[i];

            for (let j = 0; j < this.components[0].length; j++) {
                M1Row[j] = s * thisRow[j];
            }
        }

        return new Matrix(M1);
    }

    minor(i, j) {
        if (this.components.length === 1 && this.components[0].length === 1) {
            console.log("Attempted to take the minor of a 1x1 Matrix");
            return undefined;
        }

        let M1 = [];
        for (let k = 0; k < this.components.length; k++) {
            if (k === i - 1) {
                continue;
            }
            M1[M1.length] = [];
            let M1Row = M1[M1.length - 1];

            for (let l = 0; l < this.components[0].length; l++) {
                if (l === j - 1) {
                    continue;
                }
                
                M1Row[M1Row.length] = this.components[k][l];
            }
        }

        return new Matrix(M1);
    }

    transpose() {
        let M1 = new Array(this.components[0].length);
        for (let i = 0; i < this.components[0].length; i++) {

            M1[i] = new Array(this.components.length);
            let M1Row = M1[i];
            for (let j = 0; j < this.components.length; j++) {
                M1Row[j] = this.components[j][i];
            }
        }

        return new Matrix(M1);
    }

    print() {
        let String = "";
        for (let i = 1; i <= this.components.length; i++) {
            for (let j = 1; j <= this.components[0].length; j++) {
                String = `${String} ${this.component(i, j)}`;
            }
            String = `${String}\n`;
        }
        console.log(String);
    }

    static add(M1, M2) {
        if (M1.components.length !== M2.components.length || M1.components[0].length != M2.components[0].length) {
            console.log(`Attempted to add a ${M1.components.length}x${M1.components[0].length} Matrix by a ${M2.components.length}x${M2.components[0].length} Matrix`);
            return undefined;
        }

        let M3 = new Array(M1.components.length);
        for (let i = 0; i < M1.components.length; i++) {
            M3[i] = new Array(M1.components[0].length);

            let M1Row = M1.components[i];
            let M2Row = M2.components[i];
            let M3Row = M3[i];

            for (let j = 0; j < M1.components[0].length; j++) {
                M3Row[j] = M1Row[j] + M2Row[j];
            }
        }

        return new Matrix(M3);
    }

    static sub(M1, M2) {
        if (M1.components.length !== M2.components.length || M1.components[0].length !== M2.components[0].length) {
            console.log(`Attempted to subtract a ${M1.components.length}x${M1.components[0].length} Matrix by a ${M2.components.length}x${M2.components[0].length} Matrix`);
            return undefined;
        }

        let M3 = new Array(M1.components.length);
        for (let i = 0; i < M1.components.length; i++) {
            M3[i] = new Array(M1.components[0].length);

            let M1Row = M1.components[i];
            let M2Row = M2.components[i];
            let M3Row = M3[i];

            for (let j = 0; j < M1.components[0].length; j++) {
                M3Row[j] = M1Row[j] - M2Row[j];
            }
        }

        return new Matrix(M3);
    }

    static mult(M1, M2) {
        if (M1.components[0].length !== M2.components.length) {
            console.log(`Attempted to multiply a ${M1.components.length}x${M1.components[0].length} Matrix by a ${M2.components.length}x${M2.components[0].length} Matrix`);
            return undefined;
        }

        let M3 = new Array(M1.components.length);
        for (let i = 0; i < M1.components.length; i++) {

            M3[i] = new Array(M2.components[0].length);
            for (let j = 0; j < M2.components[0].length; j++) {
                let sum = 0;

                for (let k = 0; k < M1.components[0].length; k++) {
                    sum += M1.components[i][k] * M2.components[k][j];
                }

                M3[i][j] = sum;
            }
        }

        return new Matrix(M3);
    }

    static dot(M1, M2) {
        return Matrix.mult(M1.transpose(), M2);
    }

    static cofactor(i, j) {
        return Math.pow(-1, i + j);
    }

    static det2(M1) {
        if (M1.components.length !== 2 || M1.components[0].length !== 2) {
            console.log(`Attempted to get the 2x2 determinant of a ${M1.components.length}x${M1.components[0].length} Matrix`);
            return undefined;
        }

        if (M1.components.length === 1) {
            return M1.component(1, 1);
        }

        return M1.component(1, 1) * M1.component(2, 2) - M1.component(1, 2) * M1.component(2, 1);
    }
}