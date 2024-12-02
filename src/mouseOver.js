import p5 from 'p5/lib/p5';
const sketch = window; // for single sketch
sketch.p5 = p5;

const width = 1000;
const height = 1000; 

let theShader;
let shaderBg;

sketch.preload = function(){
    theShader = loadShader("./shaders/example.vert", "./shaders/normalized.frag");
}

sketch.setup = function(){
    pixelDensity(1);
    createCanvas(width, height, WEBGL);

    shaderBg = createGraphics(windowWidth, windowHeight, WEBGL);

    noStroke();
    rect(0,0, width, height)

}

sketch.draw = function(){
    shaderBg.shader(theShader);
}

sketch.windowResized = function(){

    resizeCanvas(windowWidth, windowHeight);
  
}