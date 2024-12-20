import p5 from "p5/lib/p5";
const sketch = window; // for single sketch
sketch.p5 = p5;

const width = 200;
const height = 200;

sketch.preload = function () {};

sketch.setup = function () {
  createCanvas(width, height);
  pixelDensity(1);
};

sketch.draw = function () {
    let maxiterations = 100;

    loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
  
        let a = map(x, 0, width, -2.5, 2.5);
        let b = map(y, 0, height, -2.5, 2.5);
  
        let ca = a;
        let cb = b;
  
        let n = 0;
  
        while (n < maxiterations) {
          let aa = a * a - b * b;
          let bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;
          if (a * a + b * b > 16) {
            break;
          }
          n++;
        }
  
        // let bright = map(n, 0, maxiterations, 0, 1);
        let bright = (n * 16) % 255;
        // bright = map(sqrt(bright), 0, 1, 0, 255);
  
        if (n == maxiterations) {
          bright = 0;
        }
  
        let pix = (x + y * width) * 4;
        pixels[pix + 0] = bright;
        pixels[pix + 1] = bright;
        pixels[pix + 2] = bright;
        pixels[pix + 3] = 255;
      }
    }
    updatePixels();
  
};

sketch.mouseDragged = function () {};

sketch.windowResized = function () {
  // resizeCanvas(windowWidth, windowHeight);
};
