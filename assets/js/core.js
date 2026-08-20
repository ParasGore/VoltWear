/* ============================================================
   VOLTWEAR — INTERACTION LAYER
   ============================================================ */
(function(){
'use strict';

/* ---------- LOGO SYSTEM ---------- */
var LOGO = {
  /* Primary symbol: "The Arc" — a V-torso silhouette carrying a
     signal bolt. Reads as neckline, as voltage, as vector. */
  mark: function(size, grad){
    size = size || 32;
    var g = grad === false ? '' : '1';
    var id = 'lg' + Math.random().toString(36).slice(2,7);
    return '<svg viewBox="0 0 32 32" width="'+size+'" height="'+size+'" fill="none" aria-hidden="true">'+
      (g?'<defs><linearGradient id="'+id+'" x1="2" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">'+
      '<stop stop-color="#C8FF3C"/><stop offset=".55" stop-color="#3EE8B5"/><stop offset="1" stop-color="#2F80FF"/></linearGradient></defs>':'')+
      '<path d="M4.6 4.8 L16 28.2 L27.4 4.8" stroke="'+(g?'url(#'+id+')':'currentColor')+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>'+
      '<path d="M19.4 9.6 L13.4 17.4 L17.2 17.4 L12.2 24.6" stroke="'+(g?'#EEF2F7':'currentColor')+'" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>'+
    '</svg>';
  },
  /* App icon: squircle, dark, gradient arc */
  appIcon: function(size, radius){
    size = size || 96; radius = radius || 22;
    var id = 'ai' + Math.random().toString(36).slice(2,7);
    return '<svg viewBox="0 0 96 96" width="'+size+'" height="'+size+'" aria-hidden="true">'+
      '<defs><linearGradient id="bg'+id+'" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">'+
      '<stop stop-color="#161E28"/><stop offset="1" stop-color="#05070A"/></linearGradient>'+
      '<linearGradient id="fg'+id+'" x1="18" y1="20" x2="80" y2="76" gradientUnits="userSpaceOnUse">'+
      '<stop stop-color="#C8FF3C"/><stop offset=".55" stop-color="#3EE8B5"/><stop offset="1" stop-color="#2F80FF"/></linearGradient>'+
      '<radialGradient id="gl'+id+'" cx=".5" cy=".35" r=".7">'+
      '<stop stop-color="#2F80FF" stop-opacity=".38"/><stop offset="1" stop-color="#2F80FF" stop-opacity="0"/></radialGradient></defs>'+
      '<rect width="96" height="96" rx="'+radius+'" fill="url(#bg'+id+')"/>'+
      '<rect width="96" height="96" rx="'+radius+'" fill="url(#gl'+id+')"/>'+
      '<path d="M15 17 L48 84 L81 17" stroke="url(#fg'+id+')" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="M58 30 L40 53 L51 53 L36 74" stroke="#EEF2F7" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<rect x=".6" y=".6" width="94.8" height="94.8" rx="'+(radius-.4)+'" fill="none" stroke="rgba(255,255,255,.09)"/>'+
    '</svg>';
  }
};
window.VWLogo = LOGO;

/* ---------- MOUNT LOGOS ---------- */
function mountLogos(){
  document.querySelectorAll('[data-logo]').forEach(function(el){
    var t = el.getAttribute('data-logo');
    var s = parseInt(el.getAttribute('data-size') || '32', 10);
    var r = parseInt(el.getAttribute('data-radius') || '22', 10);
    var g = el.getAttribute('data-grad') !== 'false';
    el.innerHTML = t === 'icon' ? LOGO.appIcon(s, r) : LOGO.mark(s, g);
  });
}

/* ---------- NAV ---------- */
function nav(){
  var n = document.querySelector('.nav');
  if (!n) return;
  var f = function(){ n.classList.toggle('stuck', window.scrollY > 24); };
  f(); window.addEventListener('scroll', f, {passive:true});
  var b = document.querySelector('.burger');
  var l = document.querySelector('.nav-links');
  if (b && l) b.addEventListener('click', function(){
    var open = l.style.display === 'flex';
    l.style.cssText = open ? '' :
      'display:flex;position:absolute;top:var(--nav-h);left:12px;right:12px;flex-direction:column;'+
      'padding:14px;background:rgba(10,14,19,.96);backdrop-filter:blur(24px);'+
      'border:1px solid var(--hairline);border-radius:18px;gap:2px';
  });
}

/* ---------- REVEAL ---------- */
function reveal(){
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
}

/* ---------- COUNTERS ---------- */
function counters(){
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var el = e.target;
      var to = parseFloat(el.getAttribute('data-count'));
      var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
      var pre = el.getAttribute('data-pre') || '';
      var suf = el.getAttribute('data-suf') || '';
      var t0 = null, dur = 1700;
      function step(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var e2 = 1 - Math.pow(1 - p, 4);
        el.textContent = pre + (to * e2).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, {threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){ io.observe(el); });
}

/* ---------- BARS ---------- */
function bars(){
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var i = e.target.querySelector('i');
      if (i) setTimeout(function(){ i.style.width = e.target.getAttribute('data-fill') + '%'; }, 120);
    });
  }, {threshold:.4});
  document.querySelectorAll('.bar[data-fill]').forEach(function(el){
    var i = el.querySelector('i'); if (i) i.style.width = '0%';
    io.observe(el);
  });
}

/* ---------- CARD SPOTLIGHT ---------- */
function spotlight(){
  document.addEventListener('pointermove', function(e){
    var c = e.target.closest ? e.target.closest('.card') : null;
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, {passive:true});
}

/* ---------- 3D TURNTABLE ---------- */
function turntable(){
  var stage = document.querySelector('[data-stage]');
  if (!stage) return;
  var rot = stage.querySelector('.stage-rot');
  if (!rot) return;
  var angle = -18, vel = .16, dragging = false, lastX = 0, idle = 0;

  function apply(){
    rot.style.transform = 'rotateY(' + angle + 'deg)';
  }
  function loop(){
    if (!dragging){
      idle++;
      if (idle > 90) { angle += vel; }
      else { vel = vel * .98 + .0032; }
    }
    apply();
    requestAnimationFrame(loop);
  }
  stage.addEventListener('pointerdown', function(e){
    dragging = true; lastX = e.clientX; idle = 0;
    stage.setPointerCapture && stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', function(e){
    if (!dragging) return;
    angle += (e.clientX - lastX) * .48; lastX = e.clientX; idle = 0;
  });
  ['pointerup','pointercancel','pointerleave'].forEach(function(ev){
    stage.addEventListener(ev, function(){ dragging = false; idle = 0; });
  });
  var flip = document.querySelector('[data-flip]');
  if (flip) flip.addEventListener('click', function(){
    idle = -400;
    var target = Math.round((angle - 180) / 180) * 180;
    var start = angle, t0 = null;
    (function anim(t){
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 700, 1), e2 = 1 - Math.pow(1 - p, 3);
      angle = start + (target - start) * e2; apply();
      if (p < 1) requestAnimationFrame(anim); else idle = 0;
    })();
  });
  apply(); requestAnimationFrame(loop);
}

/* ---------- SEGMENTED CONTROL ---------- */
function segments(){
  document.querySelectorAll('.seg').forEach(function(seg){
    seg.addEventListener('click', function(e){
      var b = e.target.closest('button'); if (!b) return;
      seg.querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); });
      b.classList.add('on');
      var group = seg.getAttribute('data-target');
      var val = b.getAttribute('data-val');
      if (!group) return;
      document.querySelectorAll('[data-panel="' + group + '"]').forEach(function(p){
        p.style.display = (p.getAttribute('data-val') === val) ? '' : 'none';
      });
      var ev = new CustomEvent('vw:seg', {detail:{group:group, val:val}});
      document.dispatchEvent(ev);
    });
  });
}

/* ---------- ECG WAVEFORM GENERATOR ---------- */
window.VWWave = function(w, h, beats, amp){
  w = w || 300; h = h || 60; beats = beats || 4; amp = amp || 1;
  var seg = w / beats, d = '', i;
  for (i = 0; i < beats; i++){
    var x = i * seg, m = h / 2;
    d += (i === 0 ? 'M' : 'L') + x + ',' + m;
    d += 'L' + (x + seg*.13) + ',' + m;
    d += 'L' + (x + seg*.20) + ',' + (m - 5*amp);       /* P */
    d += 'L' + (x + seg*.27) + ',' + m;
    d += 'L' + (x + seg*.36) + ',' + (m + 6*amp);       /* Q */
    d += 'L' + (x + seg*.42) + ',' + (m - 24*amp);      /* R */
    d += 'L' + (x + seg*.48) + ',' + (m + 11*amp);      /* S */
    d += 'L' + (x + seg*.56) + ',' + m;
    d += 'L' + (x + seg*.70) + ',' + (m - 8*amp);       /* T */
    d += 'L' + (x + seg*.82) + ',' + m;
  }
  d += 'L' + w + ',' + (h/2);
  return d;
};

/* ---------- SPARK / AREA PATH ---------- */
window.VWSpark = function(vals, w, h, close){
  var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals);
  var rg = (mx - mn) || 1, n = vals.length, d = '', i;
  for (i = 0; i < n; i++){
    var x = (i / (n - 1)) * w;
    var y = h - ((vals[i] - mn) / rg) * (h * .84) - h * .08;
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
  }
  if (close) d += 'L' + w + ',' + h + 'L0,' + h + 'Z';
  return d;
};

/* ---------- YEAR ---------- */
function year(){
  document.querySelectorAll('[data-year]').forEach(function(e){ e.textContent = new Date().getFullYear(); });
}

/* ---------- BOOT ---------- */
function boot(){
  mountLogos(); nav(); reveal(); counters(); bars();
  spotlight(); turntable(); segments(); year();
  document.querySelectorAll('[data-shirt]').forEach(function(el){
    if (!window.VWShirt) return;
    el.innerHTML = window.VWShirt.render({
      view:    el.getAttribute('data-view') || 'front',
      variant: el.getAttribute('data-variant') || 'perf',
      labels:  el.getAttribute('data-labels') === 'true',
      traces:  el.getAttribute('data-traces') !== 'false',
      flow:    el.getAttribute('data-flow') !== 'false',
      sensors: el.getAttribute('data-sensors') !== 'false',
      pulse:   el.getAttribute('data-pulse') !== 'false'
    });
  });
  if (window.VWPage) window.VWPage();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
})();
