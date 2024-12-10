#version 300 es

precision mediump float;

in vec2 pos;
out vec4 color;

uniform sampler2D image;
uniform vec2 aspect;
uniform float t;
uniform vec2 center;

const float maxRadius = 0.25;

float getCircleSDF(vec2 dir, vec2 aspect,float  t, float maxRadius){
     float d = length(dir/aspect) - t * maxRadius;
     return d;
}

float getSquareSDF(vec2 dir, vec2 aspect,float  t, float maxRadius){
    vec2 d2 = abs(dir/aspect) - (t * maxRadius,t * maxRadius);
    return length(max(d2, 0.0) + min(max(d2.x, d2.y), 0.0));

}

float getOffsetStrength(float t, vec2 dir){
    float d = getCircleSDF(dir, aspect, t, maxRadius);

    // mask the ripple
    d *=  1. - smoothstep(0.0, 0.05, abs(d)); 

    // smooth intro
    // increase distortion
    d *= smoothstep(0., 0.1, t);

    //  smoothstep is negative inside the circle and want the opposite, 1 - smoothstep is used
    // smooth outro
    // decrease distortion
    d *= 1. - smoothstep(0.5, .75, t);

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
    float tOffset = 0.05 * sin(t * 3.14);
    float rD = getOffsetStrength(t + tOffset, dir);
    float gD = getOffsetStrength(t, dir);
    float bD = getOffsetStrength(t - tOffset, dir);

    // float d = getOffsetStrength(t, dir);

    dir = normalize(dir);

    float r = texture(image, pos + dir * rD).r;
    float g = texture(image, pos + dir * gD).g;
    float b = texture(image, pos + dir * bD).b;

    // color = texture(image, pos + dir * d);
    float shading = gD * 8.;
  
    color = vec4(r, g, b, 1.);
    color.rgb += shading;
}

