#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D texture1;
uniform sampler2D texture2;

uniform sampler2D noiseTexture;

const float threshold = 0.5;
const float range = .2;

varying vec2 pos;

void main(){
    // vec4 color1 = texture2D(texture1, pos);
    // vec4 color2 = texture2D(texture2, pos);
    
    vec4 color1 = vec4(.5, 0.0, 0.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 0.2, 1.0);

    float noise = texture2D(noiseTexture, fract(pos * 2.)).r;
    float t = smoothstep(threshold - range, threshold + range, noise);
    gl_FragColor = mix(color1, color2, t);
}