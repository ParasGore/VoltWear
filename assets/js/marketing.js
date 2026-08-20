/* ============================================================
   VOLTWEAR — CAMPAIGN & ECOSYSTEM VISUAL GENERATORS
   ============================================================ */
window.VWPage = function(){

var VOLT="#C8FF3C", ARC="#2F80FF", MINT="#3EE8B5", VIO="#8B5CFF", PLAT="#EEF2F7";

/* ---------- helper: brand mark path ---------- */
function markSVG(size,color){
  color = color || VOLT;
  return '<svg viewBox="0 0 32 32" width="'+size+'" height="'+size+'" fill="none">'+
   '<path d="M4.6 4.8 L16 28.2 L27.4 4.8" stroke="'+color+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'+
   '<path d="M19.4 9.6 L13.4 17.4 L17.2 17.4 L12.2 24.6" stroke="'+(color===VOLT?PLAT:color)+'" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}
function wm(size,color,ls){
  return '<span style="font-family:var(--f-display);font-weight:600;text-transform:uppercase;'+
    'letter-spacing:'+(ls||'.2em')+';font-size:'+size+'px;color:'+(color||PLAT)+'">Voltwear</span>';
}

/* ---------- 01 PACKAGING ---------- */
function isoBox(o){
  o=o||{};
  var W=o.w||180, D=o.d||180, H=o.h||60, cx=o.cx||260, cy=o.cy||170;
  var accent=o.accent||VOLT, label=o.label||"VOLTWEAR ONE", sub=o.sub||"SMART GARMENT · SIZE M";
  var L=[cx-W,cy], T=[cx,cy-D/2], R=[cx+W,cy], B=[cx,cy+D/2];
  var s='<svg viewBox="0 0 520 '+(o.vh||400)+'" style="width:100%;height:100%">';
  s+='<defs>'+
   '<linearGradient id="pt'+cx+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1A222C"/><stop offset="1" stop-color="#0C1117"/></linearGradient>'+
   '<linearGradient id="pl'+cx+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E141B"/><stop offset="1" stop-color="#070A0E"/></linearGradient>'+
   '<linearGradient id="pr'+cx+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151D26"/><stop offset="1" stop-color="#0A0E13"/></linearGradient>'+
   '<filter id="sh'+cx+'" x="-40%" y="-40%" width="180%" height="200%"><feGaussianBlur stdDeviation="16"/></filter>'+
   '</defs>';
  /* ground shadow */
  s+='<ellipse cx="'+cx+'" cy="'+(cy+D/2+H+18)+'" rx="'+(W*.86)+'" ry="'+(D*.16)+'" fill="#000" opacity=".65" filter="url(#sh'+cx+')"/>';
  /* left face */
  s+='<path d="M'+L[0]+','+L[1]+' L'+B[0]+','+B[1]+' L'+B[0]+','+(B[1]+H)+' L'+L[0]+','+(L[1]+H)+' Z" fill="url(#pl'+cx+')" stroke="rgba(255,255,255,.08)" stroke-width="1"/>';
  /* right face */
  s+='<path d="M'+B[0]+','+B[1]+' L'+R[0]+','+R[1]+' L'+R[0]+','+(R[1]+H)+' L'+B[0]+','+(B[1]+H)+' Z" fill="url(#pr'+cx+')" stroke="rgba(255,255,255,.08)" stroke-width="1"/>';
  /* top face */
  s+='<path d="M'+L[0]+','+L[1]+' L'+T[0]+','+T[1]+' L'+R[0]+','+R[1]+' L'+B[0]+','+B[1]+' Z" fill="url(#pt'+cx+')" stroke="rgba(255,255,255,.14)" stroke-width="1"/>';

  /* artwork on the top face — mapped through an isometric matrix */
  var m='matrix('+(W/100)+','+(D/2/100)+','+(-W/100)+','+(D/2/100)+','+L[0]+','+L[1]+')';
  s+='<g transform="'+m+'">';
  /* blind-deboss trace pattern */
  s+='<g stroke="rgba(255,255,255,.06)" stroke-width=".8" fill="none">'+
     '<path d="M8 74 C26 62 34 46 40 26"/><path d="M8 74 C30 70 48 60 62 42"/>'+
     '<path d="M8 74 C24 78 46 78 66 70"/><path d="M40 26 C48 22 58 24 64 30"/></g>';
  s+='<g transform="translate(9,12) scale(.42)">'+markSVG(32,accent)+'</g>';
  s+='<text x="9" y="34" font-family="Inter Tight" font-size="7" font-weight="600" letter-spacing="1.5" fill="'+PLAT+'">'+label+'</text>';
  s+='<text x="9" y="43" font-family="JetBrains Mono" font-size="3.4" letter-spacing=".7" fill="#7C8A9C">'+sub+'</text>';
  s+='<rect x="9" y="84" width="26" height="5" rx="1" fill="none" stroke="rgba(255,255,255,.14)" stroke-width=".5"/>';
  s+='<text x="11" y="87.6" font-family="JetBrains Mono" font-size="2.6" letter-spacing=".5" fill="#7C8A9C">SN 000001 / 41300</text>';
  s+='</g>';
  /* volt foil edge highlight */
  s+='<path d="M'+L[0]+','+L[1]+' L'+T[0]+','+T[1]+'" stroke="'+accent+'" stroke-width="1.4" opacity=".55"/>';
  s+='<path d="M'+L[0]+','+(L[1]+H)+' L'+B[0]+','+(B[1]+H)+'" stroke="'+accent+'" stroke-width="1" opacity=".28"/>';
  s+='</svg>';
  return s;
}
document.getElementById('packRender').innerHTML = isoBox({vh:400});

document.getElementById('packFamily').innerHTML = [
  ["Elite case","Anodised 6061 aluminium",PLAT,"ELITE 001/2000","CALIBRATED · 14 APR 2026"],
  ["Sports bra carton","Q1 2027",MINT,"VOLTWEAR BRA","SMART GARMENT · SIZE 32C"],
  ["Shorts carton","Q3 2027",ARC,"VOLTWEAR SHORTS","SMART GARMENT · SIZE M"],
  ["Hub replacement","Service pack",VIO,"VOLTCORE","EDGE MODULE · GEN 1"]
].map(function(p,i){
  return '<div class="frame rv in"><div style="height:210px;background:#07090D;display:flex;align-items:center;justify-content:center">'+
    isoBox({w:110,d:110,h:38,cx:260,cy:150,vh:280,accent:p[2],label:p[3],sub:p[4]})+'</div>'+
    '<div class="cap"><span class="micro">'+p[0]+'</span><span class="micro c-dim">'+p[1]+'</span></div></div>';
}).join('');

/* ---------- 02 TAGLINES ---------- */
document.getElementById('taglines').innerHTML = [
  ["Read the signal.","Master line","The instruction and the product description in the same three words. Works in every market, translates without losing the double meaning, and survives being shouted across a trade-show floor."],
  ["The body has always been electric.","Brand film / hero","Reframes the category: this isn't a new gadget, it's the first correct reading of something that was always happening. Positions the company as inevitable rather than novel."],
  ["Wrists guess. Fabric knows.","Competitive / performance media","The sharpest thing we can say without naming a competitor. Runs where WHOOP and Apple already spend."],
  ["1,240 cm² of truth.","Technical / paid social","A number nobody can argue with, and one no wristband can ever match. For the audience that reads spec sheets."],
  ["Your form, before it breaks.","Injury prevention / clinical","Sells the outcome that actually makes people pay: not more data, fewer injuries. The lead line for the team and rehab channel."],
  ["Wear the instrument.","Retail / closing line","The purchase line. Frames the garment as laboratory equipment rather than clothing — which is exactly the premium the price requires."]
].map(function(t,i){
  return '<div class="card rv in"><span class="tag'+(i===0?' tag-volt':'')+'">'+t[1]+'</span>'+
    '<div class="h-md mt24" style="letter-spacing:-.03em">'+t[0]+'</div>'+
    '<p class="small mt16">'+t[2]+'</p></div>';
}).join('');

/* ---------- CAMPAIGN CONCEPTS ---------- */
function shirtMini(v,w,view){
  return '<div style="width:'+w+'px">'+VWShirt.render({view:view||'front',variant:v||'perf',flow:true})+'</div>';
}
document.getElementById('adConcepts').innerHTML = [
  {
    t:"Concept 01 · THE TRACE",
    l:"Read the signal.",
    d:"A single athlete in near-darkness. The only light in the frame is the conductive trace network on the garment, catching a rim from one side. The traces continue off the body and become the ECG line running across the bottom of the frame, into the logo. Shot on 85 mm, ISO pushed, grain intact.",
    m:["Brand film · 60 / 30 / 15","Cinema + CTV","Hero OOH"],
    bg:"radial-gradient(ellipse at 74% 50%,rgba(200,255,60,.16),transparent 58%),#07090D",
    render:function(){ return shirtMini('perf',210); }
  },
  {
    t:"Concept 02 · WRISTS GUESS",
    l:"Wrists guess.<br>Fabric knows.",
    d:"Split frame. Left: a wrist, a single number, deliberately flat and grey. Right: the same moment rendered from the chest — sixteen muscle channels, an ECG complex, a spine. No voiceover. The comparison does the work in under four seconds.",
    m:["Paid social · 6s + 15s","YouTube pre-roll","Retail endcap"],
    bg:"linear-gradient(90deg,#0A0E13 0%,#0A0E13 44%,rgba(47,128,255,.1) 100%),#07090D",
    render:function(){ return shirtMini('gym',210); }
  },
  {
    t:"Concept 03 · SIX DAYS",
    l:"Your form,<br>before it breaks.",
    d:"A hamstring tear, in reverse. The film runs backwards from the injury to six days earlier, where the shirt's risk flag is already amber on a screen nobody looked at. Ends on the app, the flag, and the line. The only emotional film in the campaign — it earns the clinical tone of everything else.",
    m:["Brand film · 90s","Team & federation sales","Press launch"],
    bg:"radial-gradient(ellipse at 26% 60%,rgba(255,90,60,.14),transparent 58%),#07090D",
    render:function(){ return shirtMini('elite',210,'back'); }
  }
].map(function(c){
  return '<div class="frame rv in"><div class="ad" style="min-height:340px;background:'+c.bg+';padding:44px;gap:36px;flex-wrap:wrap">'+
    '<div class="copy" style="flex:1;min-width:280px">'+
      '<div class="micro">'+c.t+'</div>'+
      '<div class="h-lg mt24" style="letter-spacing:-.04em">'+c.l+'</div>'+
      '<p class="small mt24" style="max-width:52ch">'+c.d+'</p>'+
      '<div class="flex gap-8 wrap mt24">'+c.m.map(function(m){return '<span class="tag">'+m+'</span>';}).join('')+'</div>'+
    '</div>'+
    '<div style="flex:0 0 auto;position:relative;z-index:3">'+c.render()+'</div>'+
  '</div></div>';
}).join('');

/* ---------- 03 OOH ---------- */
function oohPanel(o){
  return '<div style="position:absolute;inset:0;background:'+o.bg+';display:flex;align-items:center;'+
    'padding:'+(o.pad||'6%')+';gap:5%">'+
    '<div style="flex:1;position:relative;z-index:3">'+
      '<div style="font-family:var(--f-display);font-weight:600;letter-spacing:-.045em;line-height:.95;'+
      'font-size:'+o.size+'">'+o.line+'</div>'+
      (o.sub?'<div class="micro" style="margin-top:'+(o.gap||'14px')+'">'+o.sub+'</div>':'')+
    '</div>'+
    (o.art?'<div style="flex:0 0 auto;position:relative;z-index:3">'+o.art+'</div>':'')+
    '<div style="position:absolute;right:4%;bottom:8%;display:flex;align-items:center;gap:9px;z-index:4">'+
      markSVG(o.mark||20,VOLT)+wm(o.wmSize||11)+'</div>'+
  '</div>';
}
document.getElementById('billboard').innerHTML = oohPanel({
  bg:"radial-gradient(ellipse at 78% 46%,rgba(200,255,60,.15),transparent 56%),#07090D",
  line:"Read the<br>signal.", size:"clamp(30px,5.4vw,74px)",
  sub:"VOLTWEAR · SMART ELECTRICAL APPAREL · Q3 2026",
  art:'<div style="width:190px">'+VWShirt.render({view:'front',variant:'perf'})+'</div>'
});
document.getElementById('transit').innerHTML = oohPanel({
  bg:"linear-gradient(100deg,#07090D 40%,rgba(47,128,255,.14) 100%)",
  line:"Wrists guess.<br>Fabric knows.", size:"clamp(19px,3.1vw,40px)",
  sub:"1,240 CM² OF TRUTH", mark:15, wmSize:8.5,
  art:'<div style="width:110px">'+VWShirt.render({view:'front',variant:'gym',sensors:true})+'</div>'
});
document.getElementById('airport').innerHTML = oohPanel({
  bg:"radial-gradient(ellipse at 30% 40%,rgba(139,92,255,.16),transparent 60%),#07090D",
  line:"Wear the<br>instrument.", size:"clamp(19px,3.1vw,40px)",
  sub:"ELITE EDITION · NUMBERED 001–2000", mark:15, wmSize:8.5,
  art:'<div style="width:110px">'+VWShirt.render({view:'front',variant:'elite',flow:false})+'</div>'
});

/* ---------- 04 SOCIAL ---------- */
function post(o){
  return '<div class="social rv in" style="background:'+o.bg+'">'+
    '<div class="flex between center">'+markSVG(17,VOLT)+'<span class="micro">'+o.tag+'</span></div>'+
    '<div>'+o.mid+'</div>'+
    '<div><div style="font-family:var(--f-display);font-size:'+(o.fs||18)+'px;font-weight:600;letter-spacing:-.03em;line-height:1.1">'+o.line+'</div>'+
    (o.sub?'<div class="micro" style="margin-top:8px">'+o.sub+'</div>':'')+'</div></div>';
}
document.getElementById('socialGrid').innerHTML=[
  post({bg:"radial-gradient(ellipse at 50% 30%,rgba(255,59,92,.14),transparent 62%),#0A0E13",tag:"1/4 · ECG",
    mid:'<svg viewBox="0 0 220 70" style="width:100%"><path d="'+VWWave(220,70,3,1.1)+'" fill="none" stroke="#FF3B5C" stroke-width="2" stroke-linejoin="round" style="filter:drop-shadow(0 0 6px rgba(255,59,92,.6))"/></svg>',
    line:"This is a heartbeat.<br>Not an estimate of one.",sub:"5-LEAD DRY ECG · 512 HZ"}),
  post({bg:"radial-gradient(ellipse at 50% 40%,rgba(200,255,60,.13),transparent 62%),#0A0E13",tag:"2/4 · EMG",
    mid:'<div style="display:flex;gap:4px;align-items:flex-end;height:76px">'+
      [44,72,58,96,38,66,88,52,74,42].map(function(v){return '<i style="flex:1;height:'+v+'%;background:linear-gradient(180deg,#C8FF3C,#3EE8B5);border-radius:3px;display:block"></i>';}).join('')+'</div>',
    line:"Which muscle<br>actually did the rep?",sub:"16 CHANNELS · 1 KHZ"}),
  post({bg:"radial-gradient(ellipse at 50% 40%,rgba(62,232,181,.13),transparent 62%),#0A0E13",tag:"3/4 · POSTURE",
    mid:'<svg viewBox="0 0 120 90" style="width:100%;height:90px">'+
      '<path d="M60,6 C50,30 52,54 64,76" fill="none" stroke="#3EE8B5" stroke-width="4" stroke-linecap="round"/>'+
      '<path d="M60,6 C54,30 54,54 62,76" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.5" stroke-dasharray="3 3"/>'+
      '<text x="76" y="20" font-family="JetBrains Mono" font-size="8" fill="#FFB020">+9.4°</text></svg>',
    line:"Every 15° forward<br>is 12 kg on your neck.",sub:"9-NODE SPINAL ARRAY"}),
  post({bg:"radial-gradient(ellipse at 50% 40%,rgba(139,92,255,.14),transparent 62%),#0A0E13",tag:"4/4 · AI",
    mid:'<div style="font-family:var(--f-mono);font-size:10px;line-height:1.7;color:#B49BFF">'+
      '&gt; RISK MODEL · 6D HORIZON<br>&gt; LEFT HAMSTRING ....... 34%<br>&gt; RECOMMEND: DEFER SPEED<br>&gt; CONFIDENCE ........... 0.83</div>',
    line:"It flagged the tear<br>six days early.",sub:"VOLT-1 · ON-DEVICE"})
].join('');

document.getElementById('storyGrid').innerHTML=[
  {bg:"radial-gradient(ellipse at 50% 34%,rgba(200,255,60,.16),transparent 58%),#0A0E13",l:"Read the<br>signal.",v:'perf'},
  {bg:"radial-gradient(ellipse at 50% 34%,rgba(47,128,255,.16),transparent 58%),#0A0E13",l:"1,240 cm²<br>of truth.",v:'gym'},
  {bg:"radial-gradient(ellipse at 50% 34%,rgba(62,232,181,.15),transparent 58%),#0A0E13",l:"Sit like<br>an athlete.",v:'posture'},
  {bg:"radial-gradient(ellipse at 50% 34%,rgba(139,92,255,.16),transparent 58%),#0A0E13",l:"Wear the<br>instrument.",v:'elite'}
].map(function(s){
  return '<div class="social story rv in" style="background:'+s.bg+';padding:20px">'+
    '<div class="flex between center">'+markSVG(16,VOLT)+'<span class="micro">STORY 9:16</span></div>'+
    '<div style="display:flex;justify-content:center"><div style="width:74%">'+VWShirt.render({view:'front',variant:s.v})+'</div></div>'+
    '<div><div style="font-family:var(--f-display);font-size:19px;font-weight:600;letter-spacing:-.03em;line-height:1.1">'+s.l+'</div>'+
    '<div style="margin-top:12px;display:inline-flex;height:28px;padding:0 14px;border-radius:99px;background:'+VOLT+';color:#05070A;'+
    'align-items:center;font-size:11px;font-weight:600">Reserve — $99</div></div></div>';
}).join('');

/* ---------- 05 BOOTH ---------- */
document.getElementById('boothPlan').innerHTML =
'<svg viewBox="0 0 480 360" style="width:100%;height:100%">'+
 '<defs><pattern id="gp" width="20" height="20" patternUnits="userSpaceOnUse">'+
 '<path d="M20 0H0v20" fill="none" stroke="rgba(255,255,255,.05)" stroke-width="1"/></pattern></defs>'+
 '<rect width="480" height="360" fill="url(#gp)"/>'+
 '<rect x="40" y="40" width="400" height="280" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.18)" stroke-width="1.4"/>'+
 /* LED volume */
 '<rect x="180" y="120" width="120" height="120" fill="rgba(47,128,255,.14)" stroke="'+ARC+'" stroke-width="1.6"/>'+
 '<text x="240" y="176" text-anchor="middle" font-family="JetBrains Mono" font-size="9" letter-spacing="1" fill="'+ARC+'">LED VOLUME</text>'+
 '<text x="240" y="190" text-anchor="middle" font-family="JetBrains Mono" font-size="7.5" fill="#7C8A9C">6 × 6 × 6 M</text>'+
 /* fitting pods */
 [[60,60],[60,130],[60,200],[380,60],[380,130],[380,200]].map(function(p,i){
   return '<rect x="'+p[0]+'" y="'+p[1]+'" width="40" height="52" fill="rgba(200,255,60,.1)" stroke="'+VOLT+'" stroke-width="1.2"/>'+
     '<text x="'+(p[0]+20)+'" y="'+(p[1]+30)+'" text-anchor="middle" font-family="JetBrains Mono" font-size="7" fill="'+VOLT+'">A'+(i+1)+'</text>';
 }).join('')+
 /* vitrine */
 '<rect x="150" y="60" width="180" height="34" fill="rgba(139,92,255,.12)" stroke="'+VIO+'" stroke-width="1.2"/>'+
 '<text x="240" y="81" text-anchor="middle" font-family="JetBrains Mono" font-size="7.5" fill="'+VIO+'">C · TEARDOWN VITRINE 3 M</text>'+
 /* meeting room */
 '<rect x="150" y="262" width="180" height="52" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)" stroke-width="1.2"/>'+
 '<text x="240" y="292" text-anchor="middle" font-family="JetBrains Mono" font-size="7.5" fill="#B7C2D0">D · MEETING ROOM · 8 SEAT</text>'+
 /* flow arrows */
 '<path d="M100 86 C130 86 140 110 168 130" fill="none" stroke="rgba(200,255,60,.4)" stroke-width="1" stroke-dasharray="4 4"/>'+
 '<path d="M312 130 C340 110 350 86 378 86" fill="none" stroke="rgba(200,255,60,.4)" stroke-width="1" stroke-dasharray="4 4"/>'+
 /* dims */
 '<g font-family="JetBrains Mono" font-size="7.5" fill="#7C8A9C">'+
 '<text x="240" y="30" text-anchor="middle">12.0 M</text><text x="22" y="184" text-anchor="middle" transform="rotate(-90 22 184)">9.0 M</text>'+
 '<text x="52" y="338">ISLAND STAND · 108 M² · 4-SIDED OPEN</text></g>'+
 '<path d="M40 22h400M40 18v8M440 18v8" stroke="rgba(255,255,255,.2)" stroke-width="1"/>'+
'</svg>';

document.getElementById('boothElev').innerHTML =
'<svg viewBox="0 0 480 360" style="width:100%;height:100%">'+
 '<defs><linearGradient id="led" x1="0" y1="0" x2="1" y2="1">'+
 '<stop offset="0" stop-color="#2F80FF" stop-opacity=".5"/><stop offset=".5" stop-color="#8B5CFF" stop-opacity=".35"/>'+
 '<stop offset="1" stop-color="#C8FF3C" stop-opacity=".3"/></linearGradient>'+
 '<linearGradient id="flr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E141B"/><stop offset="1" stop-color="#07090D"/></linearGradient></defs>'+
 '<rect width="480" height="360" fill="url(#flr)"/>'+
 /* ceiling truss + hanging sign */
 '<path d="M60 44h360" stroke="rgba(255,255,255,.2)" stroke-width="2"/>'+
 [90,150,210,270,330,390].map(function(x){return '<path d="M'+x+' 44v12" stroke="rgba(255,255,255,.14)" stroke-width="1"/>';}).join('')+
 '<rect x="168" y="56" width="144" height="30" rx="4" fill="#0A0E13" stroke="rgba(255,255,255,.18)"/>'+
 '<text x="240" y="76" text-anchor="middle" font-family="Inter Tight" font-size="14" font-weight="600" letter-spacing="4" fill="#EEF2F7">VOLTWEAR</text>'+
 /* LED cube */
 '<rect x="160" y="112" width="160" height="160" fill="url(#led)" stroke="'+ARC+'" stroke-width="1.6"/>'+
 '<g opacity=".85" transform="translate(160,150)"><path d="'+VWWave(160,44,2,.8)+'" fill="none" stroke="#FF3B5C" stroke-width="1.6" stroke-linejoin="round"/></g>'+
 '<g transform="translate(200,150)"><g stroke="rgba(255,255,255,.5)" stroke-width="1" fill="none">'+
 '<ellipse cx="40" cy="14" rx="9" ry="10"/><path d="M28 30 q12,-6 24,0 l5,20 -4,34 q-12,5 -26,0 l-4,-34 z"/></g>'+
 '<path d="M40 34 C34 54 35 72 42 90" stroke="'+MINT+'" stroke-width="3" fill="none" stroke-linecap="round"/></g>'+
 '<text x="240" y="292" text-anchor="middle" font-family="JetBrains Mono" font-size="7.5" fill="'+ARC+'">LIVE VISITOR TELEMETRY · 6 M LED VOLUME</text>'+
 /* fitting pods elevation */
 [[62,196],[104,196],[334,196],[376,196]].map(function(p){
   return '<rect x="'+p[0]+'" y="'+p[1]+'" width="38" height="76" rx="3" fill="#0C1117" stroke="rgba(200,255,60,.4)" stroke-width="1.2"/>'+
     '<path d="M'+(p[0]+8)+' '+(p[1]+58)+'h22" stroke="rgba(200,255,60,.35)" stroke-width="1"/>';
 }).join('')+
 '<text x="62" y="288" font-family="JetBrains Mono" font-size="7" fill="'+VOLT+'">FITTING PODS</text>'+
 /* floor */
 '<path d="M20 272h440" stroke="rgba(255,255,255,.22)" stroke-width="1.4"/>'+
 '<g font-family="JetBrains Mono" font-size="7" fill="#7C8A9C">'+
 '<text x="20" y="300">FLOOR · POLISHED BLACK RESIN, 2% GLOSS</text>'+
 '<text x="20" y="314">LIGHTING · 2700K PERIMETER WASH + 6500K TASK ONLY</text>'+
 '<text x="20" y="328">ACOUSTIC · RECYCLED PET FELT BAFFLES, NRC 0.85</text></g>'+
'</svg>';

/* ---------- 06 ECOSYSTEM ---------- */
var GARMENTS=[
  {n:"Smart Compression Shirt",y:"2026 · Shipping",c:VOLT,
   d:"The platform product. ECG, trunk EMG, spinal array.",
   p:"M210,68 C226,68 238,57 246,44 C290,52 330,70 354,91 C360,96 363,103 365,111 L373,159 C375,168 370,176 361,179 L317,192 C308,195 300,189 298,181 L293,133 L301,300 L311,485 C312,494 306,501 297,503 C259,511 161,511 123,503 C114,501 108,494 109,485 L119,300 L127,133 L122,181 C120,189 112,195 103,192 L59,179 C50,176 45,168 47,159 L55,111 C57,103 60,96 66,91 C90,70 130,52 174,44 C182,57 194,68 210,68 Z",
   tr:["M296,404 C264,394 236,372 224,338 C212,304 214,250 212,214","M212,214 C210,190 208,180 210,136","M212,214 C196,206 182,196 172,176","M296,404 C276,414 250,420 210,422 C170,420 144,414 124,404"],
   nd:[[172,176],[248,176],[210,136],[296,404],[166,330],[254,330]]},
  {n:"Smart Sports Bra",y:"Q1 2027",c:MINT,
   d:"Same trunk array, re-engineered for 4G impact support.",
   p:"M112,206 C122,172 158,148 210,148 C262,148 298,172 308,206 L314,284 C316,306 302,322 280,322 L140,322 C118,322 104,306 106,284 Z",
   ex:'<path d="M158,166 C150,128 168,96 194,78" fill="none" stroke="rgba(255,255,255,.24)" stroke-width="9" stroke-linecap="round"/>'+
      '<path d="M262,166 C270,128 252,96 226,78" fill="none" stroke="rgba(255,255,255,.24)" stroke-width="9" stroke-linecap="round"/>'+
      '<path d="M158,166 C150,128 168,96 194,78" fill="none" stroke="#3EE8B5" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>'+
      '<path d="M262,166 C270,128 252,96 226,78" fill="none" stroke="#3EE8B5" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>',
   tr:["M210,318 C210,280 210,246 210,212","M210,212 C186,206 168,200 156,190","M210,212 C234,206 252,200 264,190","M140,300 C176,286 244,286 280,300"],
   nd:[[176,206],[244,206],[210,212],[286,300]]},
  {n:"Smart Compression Shorts",y:"Q3 2027",c:ARC,
   d:"Glute, hamstring, quad and adductor EMG. Hip IMU.",
   p:"M118,196 L302,196 C306,196 308,199 308,203 L304,300 C302,340 296,382 288,418 C286,426 280,430 272,430 L236,430 C228,430 223,425 222,417 L212,318 L208,318 L198,417 C197,425 192,430 184,430 L148,430 C140,430 134,426 132,418 C124,382 118,340 116,300 L112,203 C112,199 114,196 118,196 Z",
   tr:["M210,206 C170,214 146,232 138,262","M210,206 C250,214 274,232 282,262","M138,262 C142,320 150,372 160,412","M282,262 C278,320 270,372 260,412","M118,230 C170,220 250,220 302,230"],
   nd:[[152,268],[268,268],[164,352],[256,352],[210,206]]},
  {n:"Smart Recovery Wear",y:"Q2 2028",c:VIO,
   d:"Overnight HRV, respiration, skin temp. Far-infrared yarn.",
   p:"M210,68 C226,68 238,57 246,44 C290,52 330,70 354,91 C362,98 366,108 368,118 L392,286 C394,298 388,306 376,308 L340,312 C330,313 322,306 320,296 L300,186 L301,300 L311,485 C312,494 306,501 297,503 C259,511 161,511 123,503 C114,501 108,494 109,485 L119,300 L120,186 L100,296 C98,306 90,313 80,312 L44,308 C32,306 26,298 28,286 L52,118 C54,108 58,98 66,91 C90,70 130,52 174,44 C182,57 194,68 210,68 Z",
   tr:["M210,140 C210,200 210,260 210,320","M210,200 C176,208 150,228 140,258","M210,200 C244,208 270,228 280,258","M150,340 C180,326 240,326 270,340"],
   nd:[[210,140],[178,208],[242,208],[210,320],[296,400]]},
  {n:"Smart Training Suit",y:"Q2 2029",c:PLAT,
   d:"64-channel full body. Markerless motion capture, replaced.",
   p:"M210,60 C226,60 238,50 246,38 C288,46 326,64 350,86 C358,94 361,104 362,114 L372,180 C374,192 366,200 354,200 L322,198 L300,150 L306,290 C308,320 306,350 302,380 L292,500 C290,512 284,518 274,518 L246,518 C236,518 230,512 229,500 L214,360 L206,360 L191,500 C190,512 184,518 174,518 L146,518 C136,518 130,512 128,500 L118,380 C114,350 112,320 114,290 L120,150 L98,198 L66,200 C54,200 46,192 48,180 L58,114 C59,104 62,94 70,86 C94,64 132,46 174,38 C182,50 194,60 210,60 Z",
   tr:["M210,110 C210,180 210,250 210,300","M210,300 C196,360 190,430 186,494","M210,300 C224,360 230,430 234,494","M210,140 C176,148 148,166 136,192","M210,140 C244,148 272,166 284,192","M140,250 C176,236 244,236 280,250"],
   nd:[[210,110],[168,168],[252,168],[210,240],[176,400],[244,400],[210,300]]}
];
document.getElementById('ecoGrid').innerHTML = GARMENTS.map(function(g,i){
  var id='g'+i, s='<svg viewBox="0 0 420 560" style="width:100%;height:230px">';
  s+='<defs><linearGradient id="f'+id+'" x1="0" y1="0" x2="1" y2="1">'+
     '<stop offset="0" stop-color="#161E28"/><stop offset=".5" stop-color="#0A0E13"/><stop offset="1" stop-color="#161E28"/></linearGradient>'+
     '<clipPath id="c'+id+'"><path d="'+g.p+'"/></clipPath>'+
     '<pattern id="k'+id+'" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(22)">'+
     '<path d="M0 4h8" stroke="rgba(255,255,255,.045)" stroke-width=".9"/></pattern></defs>';
  if(g.ex) s+=g.ex;
  s+='<path d="'+g.p+'" fill="url(#f'+id+')" stroke="rgba(255,255,255,.22)" stroke-width="1.3"/>';
  s+='<g clip-path="url(#c'+id+')"><rect width="420" height="560" fill="url(#k'+id+')"/>';
  g.tr.forEach(function(d,j){
    s+='<path d="'+d+'" fill="none" stroke="'+g.c+'" stroke-width="1.5" stroke-linecap="round" opacity=".42"/>';
    s+='<path class="trace trace-flow" d="'+d+'" style="stroke:'+g.c+';animation-delay:'+(-j*.5)+'s"/>';
  });
  s+='</g>';
  g.nd.forEach(function(n){
    s+='<circle cx="'+n[0]+'" cy="'+n[1]+'" r="6" fill="#0A0E13" stroke="'+g.c+'" stroke-width="1.4"/>'+
       '<circle cx="'+n[0]+'" cy="'+n[1]+'" r="2.2" fill="'+g.c+'"/>';
  });
  s+='</svg>';
  return '<div class="eco-cell rv in"><div style="width:100%">'+s+'</div>'+
    '<div class="micro mt16" style="color:'+g.c+'">'+g.y+'</div>'+
    '<div class="h-xs mt8">'+g.n+'</div>'+
    '<p class="small mt8">'+g.d+'</p></div>';
}).join('');

};
