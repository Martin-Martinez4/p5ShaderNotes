#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

// we need the sketch resolution to perform some calculations
uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st = mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle)) * _st;

    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){
    // scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x, 2.0));
    index += step(1., mod(_st.y, 2.0)) * 2.0;

      //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
    if(index == 1.0){
        // rotate by 90 deg
        _st = rotate2D(_st, PI * 0.5);

    } else if (index == 2.0){
        // rotate by -90 deg
        _st = rotate2D(_st, PI * -0.5);

    }else if (index == 3.0){
        // rotate by 180 deg
        _st = rotate2D(_st, PI); 
    }

    return _st;
}

float concentricCircles(in vec2 st, in vec2 radius, in float res, in float scale){
    float dist = distance(st, radius);
    float pct = floor(dist * res) / scale;
    return pct;
}

void main(void){
    vec2 st = gl_FragCoord.xy/resolution.xy;
    vec2 mst = gl_FragCoord.xy/mouse.xy;
    float mdist= distance(vec2(1.0,1.0), mst);

    float dist = distance(st,vec2(sin(time/10.0),cos(time/10.0)));
    st = tile(st,10.0);
  
    st = rotate2D(st,dist/(mdist/5.0)*PI*2.0);

    gl_FragColor = vec4(vec3(concentricCircles(st, vec2(0.0,0.0), 5.0, 5.0),concentricCircles(st, vec2(0.0,0.0), 10.0, 10.0),concentricCircles(st, vec2(0.0,0.0), 20.0, 10.0)),1.0);
}

