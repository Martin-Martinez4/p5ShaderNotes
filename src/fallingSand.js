import p5 from 'p5/lib/p5';
const sketch = window; // for single sketch
sketch.p5 = p5;

const width = 500;
const height = 500;

let grid;
let w = 10;
let cols, rows;

let hueValue = 200;

sketch.preload = function () {
}

sketch.setup = function () {
    createCanvas(width, height);
    colorMode(HSB, 360, 255, 255);
    cols = width / w;
    rows = height / w;
    grid = makeGrid(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }

}

sketch.draw = function () {
    background(0);


    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            noStroke();
            if (grid[i][j] > 0) {

                // stroke(255)
                // fill(grid[i][j] * 255);
                fill(grid[i][j], 255, 255);
                let x = i * w;
                let y = j * w;
                square(x, y, w)
            }
        }
    }

    let nextGrid = makeGrid(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            if (state > 0) {

                let below = grid[i][j + 1];

                let dir = int(random(1) * 2) * 2 - 1;

                let belowA, belowB;

                if (i + dir >= 0 && i + dir <= cols - 1) {

                    belowA = grid[i + dir][j + 1];
                }
                if (i - dir >= 0 && i - dir <= cols - 1) {

                    belowB = grid[i - dir][j + 1];
                }


                if (below == 0) {
                    nextGrid[i][j + 1] = grid[i][j];
                } else if (belowA === 0) {
                    nextGrid[i + dir][j + 1] = grid[i][j];

                } else if (belowB === 0) {
                    nextGrid[i - dir][j + 1] = grid[i][j];

                } else {
                    nextGrid[i][j] = grid[i][j];
                }


            }
        }
    }

    grid = nextGrid;
}

// sketch.mousePressed = function () {
//     let col = floor(mouseX / w);
//     let row = floor(mouseY / w);

//     if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows) {

//         grid[col][row] = 1;
//     }
// }

sketch.mouseDragged = function () {
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);

    let matrix = 5;
    let extent = floor(matrix / 2);
    for (let i = -extent; i <= extent; i++) {
        for (let j = -extent; j <= extent; j++) {
            if (random(1) < 0.8) {
                let col = mouseCol + i;
                let row = mouseRow + j;

                if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows) {

                    grid[col][row] = hueValue;
                }
            }
        }
    }

    hueValue += .1;
    if(hueValue > 360){
        hueValue = 1;
    }

}

sketch.windowResized = function () {

    // resizeCanvas(windowWidth, windowHeight);

}

function makeGrid(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }

    return arr;
}
