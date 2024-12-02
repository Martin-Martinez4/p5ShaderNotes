import p5 from 'p5/lib/p5';
const sketch = window; // for single sketch
sketch.p5 = p5;

const width = 600;
const height = 600; 

let exampleShader;

sketch.preload = function(){
    exampleShader = loadShader("./shaders/example.vert", "./shaders/example.frag");
}

sketch.setup = function(){
    createCanvas(width, height, WEBGL);

    shader(exampleShader);

    noStroke();
    rect(0,0, width, height)
}

sketch.windowResized = function(){

    resizeCanvas(windowWidth, windowHeight);
  
}





