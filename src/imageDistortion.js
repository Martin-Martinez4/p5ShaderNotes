import p5 from 'p5/lib/p5';
const sketch = window; // for single sketch
sketch.p5 = p5;


let img;
let graphics;
let transitionShader;

let t = 1;

sketch.preload = function(){
    transitionShader = loadShader("./shaders/imageDistortion/imageDistort.vert", "./shaders/imageDistortion/imageDistort.frag");

    img = loadImage("/pokeball_cycles_render.png");
}

sketch.setup = function(){
    createCanvas(1200, 900, WEBGL);

    shader(transitionShader);

    graphics = createGraphics(width, height);
    graphics.background("#264653");
    graphics.fill("#2a9d8f");
    graphics.noStroke();

    const s = 40;
    for(let i = 0; i < width/s; i++){
        for(let j = 0; j < height/s; j++){
            if((i + j) % 2 == 0){
                continue;
            }
            graphics.square(i * s, j * s, s);
        }   
    }

    graphics.textSize(80);
    graphics.stroke("#e76f51");
    graphics.fill("#f4a261");
    graphics.strokeWeight(5);
    graphics.textAlign(CENTER, CENTER);
    graphics.text("Cool!", width/2, height/2);

}

sketch.draw = function(){
    // transitionShader.setUniform("image", img);
    transitionShader.setUniform("image", graphics);
    transitionShader.setUniform("t", pow(t, 1/1.5));
    transitionShader.setUniform("aspect", [1, width/height]);

    if(t < 1) {
        t += 0.05;
      }
      
      clear();
      rect(-width/2, -height/2, width, height);
   

    // clearInterval();
    // rect(0, 0, width, height);
}

sketch.mouseReleased = function(){
    setCenterToMouse();
    t = 0;
}

sketch.windowResized = function(){

    resizeCanvas(windowWidth, windowHeight);
  
}

function setCenterToMouse(){
    transitionShader.setUniform("center", [mouseX/width, mouseY/height]);
}
