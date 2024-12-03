import p5 from 'p5/lib/p5';
const sketch = window; // for single sketch
sketch.p5 = p5;

let shapeShader;

sketch.preload = function(){
    shapeShader = loadShader("./shaders/example.vert", "./shaders/interactive.frag");
}

sketch.setup = function(){
    pixelDensity(1);
    createCanvas(710, 400, WEBGL);
    noStroke();
}

sketch.draw = function(){
    shader(shapeShader);
    
    shapeShader.setUniform("resolution", [width, height]);
    shapeShader.setUniform("mouse", map(mouseX, 0, width, 0, 8));
    shapeShader.setUniform("time", frameCount * 0.01);
    rect(30, 20, width, height);

}

sketch.windowResized = function(){

    resizeCanvas(windowWidth -10, windowHeight -10);
  
}

