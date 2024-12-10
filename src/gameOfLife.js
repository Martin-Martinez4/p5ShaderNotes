import p5 from 'p5/lib/p5';
const sketch = window; // for single sketch
sketch.p5 = p5;

let theShader;
let prevFrame;

sketch.preload = function () {
    theShader = loadShader("./shaders/gameOfLife/gameOfLife.vert", "./shaders/gameOfLife/gameOfLife.frag");
}

sketch.setup = function () {
    createCanvas(600, 600, WEBGL);
    pixelDensity(1);
    noSmooth();
    
    prevFrame = createGraphics(width, height);
    prevFrame.pixelDensity(1);
    prevFrame.noSmooth();
    
    background(0);
    stroke(255);
    shader(theShader);
    theShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}

sketch.draw = function () {
    if(mouseIsPressed) {
        line(
          pmouseX-width/2,
          pmouseY-height/2,
          mouseX-width/2,
          mouseY-height/2
        );
      }  
      
      // Copy the rendered image into our prevFrame image
      prevFrame.image(get(), 0, 0);  
      // Set the image of the previous frame into our shader
      theShader.setUniform('tex', prevFrame);
      
      // Give the shader a surface to draw on
      rect(-width/2,-height/2,width,height);
}


