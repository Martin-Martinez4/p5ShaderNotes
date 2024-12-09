#version 300 es

precision mediump float;

in vec2 pos;
out vec4 color;

uniform sampler2D image;
uniform vec2 aspect;
uniform float t;
uniform vec2 center;

const float maxRadius = 0.25;

float getOffsetStrength(float t, vec2 dir){
    float d = length(dir/aspect) - t * maxRadius; // SDF of circle

    // mask the ripple
    d *=  1. - smoothstep(0.0, 0.05, abs(d)); 

    // smooth intro
    // increase distortion
    d *= smoothstep(0., 0.05, t);

    //  smoothstep is negative inside the circle and want the opposite, 1 - smoothstep is used
    // smooth outro
    // decrease distortion
    d *= 1. - smoothstep(0.5, 1., t);

    return d;
}

void main(){
    // swiggly
    // float x = sin(pos.y * 12.56) * 0.05;
    // float y = sin(pos.x * 12.56) * 0.05;
    // vec2 offset = vec2(x, y);
    // color = texture(image, pos + offset);

    // simple shockwave
    // vec2 center = vec2(0.5);

    vec2 dir = center - pos;

    // different offset for each color to create chromatic aberration
    float rD = getOffsetStrength(t + 0.02, dir);
    float gD = getOffsetStrength(t, dir);
    float bD = getOffsetStrength(t - 0.02, dir);

    // float d = getOffsetStrength(t, dir);

    dir = normalize(dir);

    float r = texture(image, pos + dir * rD).r;
    float g = texture(image, pos + dir * gD).g;
    float b = texture(image, pos + dir * bD).b;

    // color = texture(image, pos + dir * d);
    float shading = gD * 2.;
  
    // color = vec4(r, g, b, 1.);
    color = vec4(r, g, b, 1.);
    color.rgb += shading;
}

