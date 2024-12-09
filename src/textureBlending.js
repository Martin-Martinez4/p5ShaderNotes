import p5 from 'p5/lib/p5';
const sketch = window; // for single sketch
sketch.p5 = p5;

const width = 800;
const height = 800; 

let texture1;
let texture2;
let transitionShader;
let noiseTexture;

sketch.preload = function(){
    transitionShader = loadShader("./shaders/textureBlending/blend.vert", "./shaders/textureBlending/blend.frag");

    texture1 = loadImage("/dirt.png");
    texture2 = loadImage("/grass.png");

    noiseTexture = loadImage("/perlin.png");
}

sketch.setup = function(){
    createCanvas(width, height, WEBGL);

    shader(transitionShader);

}

sketch.draw = function(){
    transitionShader.setUniform("texture1", texture1);
    transitionShader.setUniform("texture2", texture2);
    transitionShader.setUniform("noiseTexture", noiseTexture);

    clearInterval();
    rect(0, 0, width, height);
}

sketch.windowResized = function(){

    resizeCanvas(windowWidth, windowHeight);
  
}
