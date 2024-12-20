import p5 from "p5/lib/p5";
const sketch = window; // for single sketch
sketch.p5 = p5;

var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

let flying = 0;

let terrain = [];

sketch.preload = function () {};

sketch.setup = function () {
    createCanvas(600, 600, WEBGL);
    cols = w / scl;
    rows = h / scl;

    for(let x = 0; x < cols; x++){
        terrain[x] = [];
        for(let y = 0; y < rows; y++){
            terrain[x][y] = 0;
        }
    }

};

sketch.draw = function () {
    flying -= 0.1
    let yOff = flying;
    for(let y = 0; y < rows; y++){
        let xOff = 0;
        for(let x = 0; x < cols; x++){
            terrain[x][y] = map(noise(xOff,yOff), 0, 1, -40, 75);
            xOff += 0.1;
        }

        yOff += 0.1;
    }

  background(0);

  translate(0, 50);
  rotateX(PI/3);

  fill(200, 200, 200, 100)

  translate(-w/2, -h/2)

  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    //   rect(x * scl, y * scl, scl, scl);
    }
    endShape();
  }
};

sketch.mouseDragged = function () {};

sketch.windowResized = function () {};
