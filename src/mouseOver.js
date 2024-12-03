import p5 from 'p5/lib/p5';
const sketch = window; // for single sketch
sketch.p5 = p5;


let theShader;
let shaderBg;
let width = 1000;
let height = 1000; 

sketch.preload = function(){
    width = windowWidth -10;
    height = windowHeight -10; 
    theShader = loadShader("./shaders/example.vert", "./shaders/uniform.frag");
}

sketch.setup = function(){
    pixelDensity(1);
    createCanvas(width, height);

    shaderBg = createGraphics(windowWidth, windowHeight, WEBGL);

    // noStroke();
    // rect(0,0, width, height)

}

sketch.draw = function(){
    shaderBg.shader(theShader);

    let yMouse = map(mouseY, 0, height, height, 0) / height;
    let xMouse = mouseX / width;

    theShader.setUniform("u_resolution", [width, height]);
    theShader.setUniform("u_time", millis() / 1000.0);
    theShader.setUniform("u_mouse", [xMouse, yMouse]);

     // rect gives us some geometry on the screen to draw the shader on
    shaderBg.rect(0,0,width,height);
    image(shaderBg,0,0,width,height);

    // flip coordinate information box
    let flipX = 0;
    let flipY = 0;
    if(width - mouseX < 200){
        flipX = -130;
    }else{
        flipY = -35;
    }

    // draw coordinate information box
    // fill(255);
    // rect(mouseX+flipX,mouseY+flipY,60,40);
    // fill(0);
    // text('x: '+int(mouseX),mouseX+15+flipX,mouseY+15+flipY);
    // text('y: '+int(mouseY),mouseX+15+flipX,mouseY+30+flipY);
    // fill(0);
    // rect(mouseX+60+flipX,mouseY+flipY,70,40);
    // fill(255);
    // text('x: '+nfc(xMouse,3),mouseX+15+60+flipX,mouseY+15+flipY);
    // text('y: '+nfc(yMouse,3),mouseX+15+60+flipX,mouseY+30+flipY);
    
}

sketch.windowResized = function(){

    resizeCanvas(windowWidth -10, windowHeight -10);
  
}