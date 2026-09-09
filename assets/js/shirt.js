/* ============================================================
   VOLTWEAR — PARAMETRIC GARMENT RENDER ENGINE
   Generates production-accurate SVG technical views of the
   smart garment: front / back / side, per variant, with
   conductive trace networks and sensor placement maps.
   ============================================================ */
(function(global){
'use strict';

/* --- Geometry: fitted athletic tee, centre line x=210 --- */
var PATH_FRONT =
 "M210,68 C226,68 238,57 246,44 C290,52 330,70 354,91 C360,96 363,103 365,111 "+
 "L373,159 C375,168 370,176 361,179 L317,192 C308,195 300,189 298,181 L293,133 "+
 "L301,300 L311,485 C312,494 306,501 297,503 C259,511 161,511 123,503 "+
 "C114,501 108,494 109,485 L119,300 L127,133 L122,181 C120,189 112,195 103,192 "+
 "L59,179 C50,176 45,168 47,159 L55,111 C57,103 60,96 66,91 C90,70 130,52 174,44 "+
 "C182,57 194,68 210,68 Z";

var PATH_BACK =
 "M210,56 C228,56 240,50 247,44 C291,52 330,70 354,91 C360,96 363,103 365,111 "+
 "L373,159 C375,168 370,176 361,179 L317,192 C308,195 300,189 298,181 L293,133 "+
 "L301,300 L311,485 C312,494 306,501 297,503 C259,511 161,511 123,503 "+
 "C114,501 108,494 109,485 L119,300 L127,133 L122,181 C120,189 112,195 103,192 "+
 "L59,179 C50,176 45,168 47,159 L55,111 C57,103 60,96 66,91 C90,70 130,52 173,44 "+
 "C180,50 192,56 210,56 Z";

var PATH_SIDE =
 "M182,74 C196,58 238,50 258,62 C276,72 286,90 290,110 L304,170 "+
 "C307,180 302,189 293,191 L262,198 C254,200 247,195 245,187 L240,143 "+
 "L252,300 L262,486 C263,495 257,502 248,504 C222,510 182,510 158,504 "+
 "C149,502 144,495 145,486 L154,300 L164,143 C166,106 170,84 182,74 Z";

var NECK_SIDE = "M182,74 C193,66 214,62 236,64";

var NECK_FRONT = "M174,44 C182,58 194,69 210,69 C226,69 238,58 246,44";
var NECK_BACK  = "M173,44 C181,51 192,57 210,57 C228,57 239,51 247,44";

/* --- Sensor taxonomy --- */
var TYPES = {
  ecg:  {c:"#FF3B5C", n:"ECG Electrode",        d:"Dry silver-chloride knit electrode, 3-lead clinical morphology"},
  emg:  {c:"#C8FF3C", n:"EMG Array",            d:"4-channel surface electromyography, 1 kHz differential"},
  imu:  {c:"#2F80FF", n:"9-Axis IMU",           d:"Accel + gyro + magnetometer, 200 Hz sensor-fusion node"},
  temp: {c:"#FFB020", n:"Thermistor",           d:"NTC skin + ambient delta, ±0.05 °C"},
  resp: {c:"#3EE8B5", n:"Respiration Band",     d:"Conductive-elastomer strain gauge, tidal volume"},
  hub:  {c:"#8B5CFF", n:"VoltCore Hub",         d:"Edge NPU, 6-axis ref IMU, 5-day cell, magnetic dock"}
};

/* --- Sensor maps per variant / view --- */
var MAPS = {
  perf:{
    front:[
      {x:172,y:176,t:"ecg", l:"ECG V1 · Right sternal border"},
      {x:248,y:176,t:"ecg", l:"ECG V5 · Left mid-axillary"},
      {x:210,y:214,t:"ecg", l:"ECG Ref · Xiphoid ground"},
      {x:210,y:136,t:"imu", l:"Sternal IMU · Cadence + GCT"},
      {x:158,y:250,t:"resp",l:"Thoracic respiration band"},
      {x:262,y:250,t:"resp",l:"Costal respiration band"},
      {x:246,y:120,t:"temp",l:"Core-proxy thermistor"},
      {x:166,y:330,t:"emg", l:"EMG · Rectus abdominis"},
      {x:254,y:330,t:"emg", l:"EMG · External oblique"},
      {x:296,y:404,t:"hub", l:"VoltCore Hub · Left rib dock"}
    ],
    back:[
      {x:210,y:108,t:"imu", l:"C7 IMU · Head-neck vector"},
      {x:210,y:236,t:"imu", l:"T7 IMU · Thoracic reference"},
      {x:210,y:352,t:"imu", l:"L3 IMU · Pelvic drop + rotation"},
      {x:164,y:150,t:"emg", l:"EMG · Upper trapezius"},
      {x:256,y:150,t:"emg", l:"EMG · Upper trapezius"},
      {x:172,y:300,t:"emg", l:"EMG · Erector spinae L"},
      {x:248,y:300,t:"emg", l:"EMG · Erector spinae R"},
      {x:150,y:230,t:"temp",l:"Scapular thermal delta"}
    ]
  },
  gym:{
    front:[
      {x:170,y:162,t:"emg", l:"EMG · Pectoralis major (clavicular)"},
      {x:250,y:162,t:"emg", l:"EMG · Pectoralis major (sternal)"},
      {x:140,y:150,t:"emg", l:"EMG · Anterior deltoid L"},
      {x:280,y:150,t:"emg", l:"EMG · Anterior deltoid R"},
      {x:176,y:200,t:"ecg", l:"ECG dual-lead · effort HR"},
      {x:244,y:200,t:"ecg", l:"ECG dual-lead · effort HR"},
      {x:180,y:320,t:"emg", l:"EMG · Rectus abdominis upper"},
      {x:240,y:320,t:"emg", l:"EMG · Rectus abdominis lower"},
      {x:210,y:140,t:"imu", l:"Bar-path IMU · rep velocity"},
      {x:298,y:400,t:"hub", l:"VoltCore Hub"}
    ],
    back:[
      {x:158,y:170,t:"emg", l:"EMG · Latissimus dorsi L"},
      {x:262,y:170,t:"emg", l:"EMG · Latissimus dorsi R"},
      {x:176,y:130,t:"emg", l:"EMG · Mid trapezius L"},
      {x:244,y:130,t:"emg", l:"EMG · Mid trapezius R"},
      {x:180,y:290,t:"emg", l:"EMG · Erector spinae L"},
      {x:240,y:290,t:"emg", l:"EMG · Erector spinae R"},
      {x:210,y:230,t:"imu", l:"T7 IMU · Spinal flexion guard"},
      {x:210,y:360,t:"imu", l:"L3 IMU · Lumbar shear alert"}
    ]
  },
  posture:{
    front:[
      {x:210,y:132,t:"imu", l:"Sternal IMU · Forward-head vector"},
      {x:152,y:146,t:"emg", l:"EMG · Pec minor L (tightness)"},
      {x:268,y:146,t:"emg", l:"EMG · Pec minor R (tightness)"},
      {x:186,y:196,t:"ecg", l:"ECG single-lead · desk stress HRV"},
      {x:210,y:262,t:"resp",l:"Diaphragmatic breathing band"},
      {x:296,y:398,t:"hub", l:"VoltCore Hub"}
    ],
    back:[
      {x:210,y:96, t:"imu", l:"C7 IMU · Cervical tilt (°)"},
      {x:210,y:200,t:"imu", l:"T4 IMU · Thoracic kyphosis"},
      {x:210,y:330,t:"imu", l:"L3 IMU · Lumbar lordosis"},
      {x:158,y:138,t:"emg", l:"EMG · Upper trap L (overload)"},
      {x:262,y:138,t:"emg", l:"EMG · Upper trap R (overload)"},
      {x:170,y:214,t:"emg", l:"EMG · Lower trap L (underuse)"},
      {x:250,y:214,t:"emg", l:"EMG · Lower trap R (underuse)"},
      {x:186,y:290,t:"emg", l:"EMG · Erector spinae"},
      {x:234,y:290,t:"emg", l:"EMG · Multifidus"}
    ]
  },
  elite:{
    front:[
      {x:172,y:172,t:"ecg", l:"ECG V1 · Medical-grade"},
      {x:248,y:172,t:"ecg", l:"ECG V5 · Medical-grade"},
      {x:210,y:210,t:"ecg", l:"ECG V3 · 5-lead array"},
      {x:210,y:132,t:"imu", l:"Titanium-shell sternal IMU"},
      {x:150,y:250,t:"resp",l:"Dual respiration band"},
      {x:270,y:250,t:"resp",l:"Dual respiration band"},
      {x:246,y:116,t:"temp",l:"Dual thermistor · core proxy"},
      {x:160,y:330,t:"emg", l:"EMG · 8-ch core array"},
      {x:260,y:330,t:"emg", l:"EMG · 8-ch core array"},
      {x:140,y:154,t:"emg", l:"EMG · Deltoid"},
      {x:280,y:154,t:"emg", l:"EMG · Deltoid"},
      {x:298,y:400,t:"hub", l:"VoltCore Pro · 9-day cell"}
    ],
    back:[
      {x:210,y:104,t:"imu", l:"C7 IMU"},
      {x:210,y:222,t:"imu", l:"T7 IMU"},
      {x:210,y:344,t:"imu", l:"L3 IMU"},
      {x:160,y:146,t:"emg", l:"EMG · Trapezius"},
      {x:260,y:146,t:"emg", l:"EMG · Trapezius"},
      {x:150,y:246,t:"emg", l:"EMG · Latissimus"},
      {x:270,y:246,t:"emg", l:"EMG · Latissimus"},
      {x:176,y:308,t:"emg", l:"EMG · Erector spinae"},
      {x:244,y:308,t:"emg", l:"EMG · Erector spinae"},
      {x:210,y:404,t:"temp",l:"Lumbar thermal"}
    ]
  }
};

/* --- Conductive trace networks (bezier bus routing) --- */
var TRACES = {
  front:[
    "M296,404 C270,392 250,360 246,320 C242,282 250,240 248,200 C247,186 248,180 248,176",
    "M296,404 C264,394 236,372 224,338 C212,304 214,250 212,214",
    "M212,214 C210,190 208,180 210,136",
    "M212,214 C196,206 182,196 172,176",
    "M172,176 C160,168 152,156 148,142 C144,128 148,116 158,108",
    "M248,176 C258,166 266,154 268,140 C270,126 264,116 254,110",
    "M296,404 C276,414 250,420 210,422 C170,420 144,414 124,404",
    "M124,404 C136,368 148,346 166,330",
    "M296,404 C282,368 268,346 254,330",
    "M210,136 C196,124 188,110 186,96",
    "M210,136 C224,124 232,110 234,96",
    "M158,250 C176,236 196,232 210,232 C224,232 244,236 262,250"
  ],
  back:[
    "M210,108 C210,150 210,190 210,236",
    "M210,236 C210,290 210,320 210,352",
    "M210,108 C190,116 174,128 164,150",
    "M210,108 C230,116 246,128 256,150",
    "M164,150 C150,168 142,192 150,230",
    "M256,150 C270,168 278,192 270,230",
    "M210,236 C192,250 178,272 172,300",
    "M210,236 C228,250 242,272 248,300",
    "M172,300 C166,336 172,368 186,392",
    "M248,300 C254,336 248,368 234,392",
    "M186,392 C198,398 222,398 234,392",
    "M164,150 C186,144 234,144 256,150",
    "M150,230 C176,220 244,220 270,230",
    "M136,180 C154,164 178,158 210,158 C242,158 266,164 284,180"
  ],
  side:[
    "M205,470 C205,400 203,340 202,280 C201,220 204,162 211,124",
    "M205,470 C216,420 227,378 233,330",
    "M233,330 C237,280 239,220 237,152",
    "M211,124 C223,120 234,128 238,144",
    "M180,300 C196,292 220,292 236,300",
    "M176,206 C190,196 216,194 232,200",
    "M205,470 C196,430 188,390 184,350"
  ]
};

var VARIANT_STYLE = {
  perf:   {a:"#2F80FF",b:"#8B5CFF",fab1:"#141C26",fab2:"#0A0E13",trace:"rgba(47,128,255,.34)"},
  gym:    {a:"#C8FF3C",b:"#3EE8B5",fab1:"#171B18",fab2:"#0A0E13",trace:"rgba(200,255,60,.3)"},
  posture:{a:"#3EE8B5",b:"#2F80FF",fab1:"#111C1E",fab2:"#0A0E13",trace:"rgba(62,232,181,.3)"},
  elite:  {a:"#E7EDF5",b:"#8B5CFF",fab1:"#1C222B",fab2:"#0B0F14",trace:"rgba(231,237,245,.26)"}
};

var uid = 0;

/* --------------------------------------------------------
   render(opts)
   view      : 'front' | 'back' | 'side'
   variant   : 'perf' | 'gym' | 'posture' | 'elite'
   traces    : bool  — conductive pathway network
   flow      : bool  — animated energy flow
   sensors   : bool  — sensor nodes
   labels    : bool  — callout leader lines + text
   pulse     : bool  — halo animation on nodes
   -------------------------------------------------------- */
function render(o){
  o = o || {};
  var view    = o.view    || 'front';
  var variant = o.variant || 'perf';
  var st      = VARIANT_STYLE[variant];
  var id      = 'vw' + (++uid);
  var showT   = o.traces  !== false;
  var showS   = o.sensors !== false;
  var flow    = o.flow    !== false;
  var labels  = !!o.labels;
  var pulse   = o.pulse   !== false;

  var body = view === 'back' ? PATH_BACK : (view === 'side' ? PATH_SIDE : PATH_FRONT);
  var neck = view === 'back' ? NECK_BACK : (view === 'side' ? NECK_SIDE : NECK_FRONT);
  var traceSet = TRACES[view] || TRACES.front;
  var map = (MAPS[variant] && MAPS[variant][view]) || [];
  if (view === 'side') map = [];

  var s = '';
  s += '<svg class="shirt-svg" viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="VoltWear '+variant+' '+view+' view">';

  /* defs */
  s += '<defs>';
  s += '<linearGradient id="fab'+id+'" x1="0" y1="0" x2="1" y2="1">'+
       '<stop offset="0" stop-color="'+st.fab1+'"/>'+
       '<stop offset=".48" stop-color="'+st.fab2+'"/>'+
       '<stop offset="1" stop-color="'+st.fab1+'"/></linearGradient>';
  s += '<linearGradient id="sheen'+id+'" x1="0" y1="0" x2="1" y2="0">'+
       '<stop offset="0" stop-color="#fff" stop-opacity="0"/>'+
       '<stop offset=".42" stop-color="#fff" stop-opacity=".12"/>'+
       '<stop offset=".55" stop-color="#fff" stop-opacity=".03"/>'+
       '<stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>';
  s += '<linearGradient id="edge'+id+'" x1="0" y1="0" x2="0" y2="1">'+
       '<stop offset="0" stop-color="'+st.a+'" stop-opacity=".85"/>'+
       '<stop offset="1" stop-color="'+st.b+'" stop-opacity=".35"/></linearGradient>';
  s += '<radialGradient id="vent'+id+'" cx=".5" cy=".5" r=".5">'+
       '<stop offset="0" stop-color="'+st.a+'" stop-opacity=".16"/>'+
       '<stop offset="1" stop-color="'+st.a+'" stop-opacity="0"/></radialGradient>';
  s += '<pattern id="knit'+id+'" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(22)">'+
       '<path d="M0 3.5h7" stroke="rgba(255,255,255,.05)" stroke-width=".8"/>'+
       '<path d="M3.5 0v7" stroke="rgba(255,255,255,.028)" stroke-width=".8"/></pattern>';
  s += '<clipPath id="clip'+id+'"><path d="'+body+'"/></clipPath>';
  s += '<filter id="soft'+id+'" x="-40%" y="-40%" width="180%" height="180%">'+
       '<feGaussianBlur stdDeviation="5"/></filter>';
  s += '</defs>';

  /* drop shadow plate */
  s += '<ellipse cx="210" cy="520" rx="120" ry="15" fill="'+st.a+'" opacity=".13" filter="url(#soft'+id+')"/>';

  /* far-side sleeve ghost — side view depth */
  if (view === 'side'){
    s += '<path d="M172,98 C160,112 154,134 152,160 L148,198 C147,206 152,212 160,212 L190,210" '+
         'fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.1)" stroke-width="1"/>';
  }

  /* garment body */
  s += '<path d="'+body+'" fill="url(#fab'+id+')" stroke="rgba(255,255,255,.22)" stroke-width="1.3"/>';
  s += '<g clip-path="url(#clip'+id+')">';
  s +=   '<rect x="0" y="0" width="420" height="560" fill="url(#knit'+id+')"/>';
  s +=   '<rect x="0" y="0" width="420" height="560" fill="url(#sheen'+id+')"/>';
  /* ventilation zones */
  s +=   '<ellipse cx="150" cy="250" rx="46" ry="86" fill="url(#vent'+id+')"/>';
  s +=   '<ellipse cx="270" cy="250" rx="46" ry="86" fill="url(#vent'+id+')"/>';
  /* laser-perforation ventilation pattern */
  var vx, vy;
  for (vy = 180; vy < 400; vy += 15){
    for (vx = 120; vx < 302; vx += 15){
      var dxl = Math.abs(vx-146), dxr = Math.abs(vx-274);
      if (Math.min(dxl,dxr) < 26 && Math.abs(vy-284) < 96){
        s += '<circle cx="'+vx+'" cy="'+vy+'" r="1.1" fill="rgba(255,255,255,.11)"/>';
      }
    }
  }
  /* compression / bonded seam panels */
  s +=   '<path d="M119,300 C150,286 270,286 301,300" fill="none" stroke="rgba(255,255,255,.09)" stroke-width="1"/>';
  s +=   '<path d="M127,190 C160,176 260,176 293,190" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="1"/>';
  s +=   '<path d="M113,420 C150,406 270,406 307,420" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="1"/>';
  s += '</g>';

  /* silhouette accent edge */
  s += '<path d="'+body+'" fill="none" stroke="url(#edge'+id+')" stroke-width="1.6" opacity=".55"/>';

  /* neck rib */
  if (neck){
    s += '<path d="'+neck+'" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="4.5" stroke-linecap="round"/>';
    s += '<path d="'+neck+'" fill="none" stroke="'+st.a+'" stroke-width="1.3" stroke-linecap="round" opacity=".8"/>';
  }
  /* cuff bands */
  if (view !== 'side'){
    s += '<path d="M103,192 L122,181" stroke="'+st.a+'" stroke-width="2.4" opacity=".6" stroke-linecap="round"/>';
    s += '<path d="M317,192 L298,181" stroke="'+st.a+'" stroke-width="2.4" opacity=".6" stroke-linecap="round"/>';
    s += '<path d="M109,485 C150,496 270,496 311,485" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="2.6" stroke-linecap="round"/>';
  }

  /* conductive trace network */
  if (showT){
    s += '<g clip-path="url(#clip'+id+')">';
    traceSet.forEach(function(d,i){
      s += '<path class="trace" d="'+d+'" stroke="'+st.trace+'" stroke-width="1.5" fill="none" stroke-linecap="round"/>';
      s += '<path class="trace" d="'+d+'" stroke="rgba(255,255,255,.1)" stroke-width="3.4" fill="none" stroke-linecap="round"/>';
      if (flow){
        s += '<path class="trace trace-flow" d="'+d+'" style="animation-delay:'+(-i*0.42).toFixed(2)+'s"/>';
      }
    });
    /* trace junction pads */
    traceSet.forEach(function(d){
      var m = d.match(/M([\d.]+),([\d.]+)/);
      if (m) s += '<circle cx="'+m[1]+'" cy="'+m[2]+'" r="1.9" fill="'+st.a+'" opacity=".5"/>';
    });
    s += '</g>';
  }

  /* sensor nodes */
  if (showS && map.length){
    map.forEach(function(n,i){
      var c = TYPES[n.t].c;
      var r = n.t === 'hub' ? 13 : (n.t === 'ecg' ? 8 : 6.5);
      s += '<g class="node" data-type="'+n.t+'" data-label="'+n.l+'">';
      if (pulse && n.t !== 'hub'){
        s += '<circle cx="'+n.x+'" cy="'+n.y+'" r="6" fill="none" stroke="'+c+'" stroke-width="1" class="node-halo" style="animation-delay:'+(i*0.26).toFixed(2)+'s"/>';
      }
      if (n.t === 'hub'){
        s += '<rect x="'+(n.x-15)+'" y="'+(n.y-10)+'" width="30" height="20" rx="7" fill="#0A0E13" stroke="'+c+'" stroke-width="1.4"/>';
        s += '<rect x="'+(n.x-9)+'" y="'+(n.y-4.5)+'" width="18" height="9" rx="3.5" fill="'+c+'" opacity=".28"/>';
        s += '<circle cx="'+n.x+'" cy="'+n.y+'" r="2.4" fill="'+c+'"/>';
      } else if (n.t === 'imu'){
        s += '<rect x="'+(n.x-r)+'" y="'+(n.y-r)+'" width="'+(r*2)+'" height="'+(r*2)+'" rx="3" fill="#0A0E13" stroke="'+c+'" stroke-width="1.3"/>';
        s += '<rect x="'+(n.x-2.4)+'" y="'+(n.y-2.4)+'" width="4.8" height="4.8" rx="1" fill="'+c+'"/>';
      } else if (n.t === 'emg'){
        s += '<circle cx="'+n.x+'" cy="'+n.y+'" r="'+r+'" fill="#0A0E13" stroke="'+c+'" stroke-width="1.3"/>';
        s += '<path d="M'+(n.x-3.4)+','+n.y+' l1.7,-3.4 l1.7,6.2 l1.7,-4.4 l1.7,1.6" fill="none" stroke="'+c+'" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"/>';
      } else if (n.t === 'ecg'){
        s += '<circle cx="'+n.x+'" cy="'+n.y+'" r="'+r+'" fill="#0A0E13" stroke="'+c+'" stroke-width="1.4"/>';
        s += '<circle cx="'+n.x+'" cy="'+n.y+'" r="'+(r-2.8)+'" fill="'+c+'" opacity=".8"/>';
      } else if (n.t === 'temp'){
        s += '<circle cx="'+n.x+'" cy="'+n.y+'" r="'+r+'" fill="#0A0E13" stroke="'+c+'" stroke-width="1.3"/>';
        s += '<path d="M'+n.x+','+(n.y-3.2)+' v4.6" stroke="'+c+'" stroke-width="1.5" stroke-linecap="round"/>';
        s += '<circle cx="'+n.x+'" cy="'+(n.y+2.6)+'" r="1.8" fill="'+c+'"/>';
      } else {
        s += '<circle cx="'+n.x+'" cy="'+n.y+'" r="'+r+'" fill="#0A0E13" stroke="'+c+'" stroke-width="1.3"/>';
        s += '<path d="M'+(n.x-3.6)+','+n.y+' q1.8,-3.4 3.6,0 q1.8,3.4 3.6,0" fill="none" stroke="'+c+'" stroke-width="1.2" stroke-linecap="round"/>';
      }
      s += '</g>';
    });
  }

  /* callout labels */
  if (labels && map.length){
    map.forEach(function(n,i){
      var c = TYPES[n.t].c;
      var left = n.x < 210;
      var lx = left ? 26 : 394;
      var ly = 92 + i * 34;
      var midx = left ? n.x - 26 : n.x + 26;
      s += '<g opacity=".92">';
      s += '<path d="M'+n.x+','+n.y+' L'+midx+','+ly+' L'+lx+','+ly+'" fill="none" stroke="'+c+'" stroke-width=".7" opacity=".45"/>';
      s += '<circle cx="'+lx+'" cy="'+ly+'" r="2" fill="'+c+'"/>';
      s += '<text x="'+(left?lx+8:lx-8)+'" y="'+(ly+3.4)+'" text-anchor="'+(left?'start':'end')+'" '+
           'font-family="JetBrains Mono, monospace" font-size="8.2" letter-spacing=".04em" fill="rgba(238,242,247,.85)">'+
           n.l.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</text>';
      s += '</g>';
    });
  }

  s += '</svg>';
  return s;
}

function legend(types){
  types = types || ['ecg','emg','imu','temp','resp','hub'];
  return '<ul class="sensor-legend">' + types.map(function(t){
    return '<li><i style="background:'+TYPES[t].c+';color:'+TYPES[t].c+'"></i><span>'+TYPES[t].n+'</span></li>';
  }).join('') + '</ul>';
}

function mapOf(variant, view){ return (MAPS[variant]||{})[view] || []; }

global.VWShirt = { render:render, legend:legend, TYPES:TYPES, map:mapOf,
  paths:{front:PATH_FRONT, back:PATH_BACK, side:PATH_SIDE}, traces:TRACES };
})(window);
