#version 300 es
precision mediump float;

in vec2 vTexCoord;
out vec4 color;

uniform sampler2D tex;
uniform vec2 normalRes;

void main() {
  vec2 uv = vTexCoord;
  
  uv.y = 1.0 - uv.y;
  
  vec4 col = texture(tex, uv);
  float a = col.r;
  
  float num = 0.0;
  for(float i = -1.0; i < 2.0; i++) {
    for(float j = -1.0; j < 2.0; j++) {
      float x = uv.x + i * normalRes.x;
      float y = uv.y + j * normalRes.y;

      num += texture(tex, vec2(x, y)).r;
    }
  }
  
  num -= a;
  
  if(a > 0.5) {
    if(num < 1.5) {
      a = 0.0;
    }
    if(num > 3.5) {
      a = 0.0;
    }
  } else {
    if(num > 2.5 && num < 3.5) {
      a = 1.0;
    }
  }
  
  if(a == 0.0){

    color = vec4(0, .25, .2, 1.0);
  }else{
    color = vec4(1, 1, .2, 1.0);
  }
}