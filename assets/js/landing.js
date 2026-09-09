/* ============================================================
   VOLTWEAR — LANDING PAGE SCRIPT
   Stationary photo viewer (front / side / back) and small helpers.
   Reveal, nav and logo mounting come from core.js.
   ============================================================ */
(function(){
'use strict';

/* Hero viewer: swap between the three supplied views with a crossfade. */
function viewer(){
  document.querySelectorAll('[data-viewer]').forEach(function(v){
    var imgs = v.querySelectorAll('.viewer-frame img');
    var btns = v.querySelectorAll('[data-view-btn]');
    function show(name){
      imgs.forEach(function(i){ i.classList.toggle('on', i.getAttribute('data-view') === name); });
      btns.forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-view-btn') === name); });
    }
    btns.forEach(function(b){
      b.addEventListener('click', function(){ show(b.getAttribute('data-view-btn')); });
    });
    /* keyboard: left / right arrows cycle views when the viewer is focused */
    v.addEventListener('keydown', function(e){
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var order = ['front','side','back'];
      var cur = 0; btns.forEach(function(b,i){ if (b.classList.contains('on')) cur = i; });
      cur = (cur + (e.key === 'ArrowRight' ? 1 : -1) + order.length) % order.length;
      show(order[cur]); e.preventDefault();
    });
    show('front');
  });
}

/* Product cards: hover switches to the back view where one exists. */
function flipOnHover(){
  document.querySelectorAll('[data-alt]').forEach(function(img){
    var main = img.getAttribute('src'), alt = img.getAttribute('data-alt');
    var pre = new Image(); pre.src = alt;
    var card = img.closest('.product') || img;
    card.addEventListener('mouseenter', function(){ img.src = alt; });
    card.addEventListener('mouseleave', function(){ img.src = main; });
  });
}

function boot(){
  if (/[?&]static\b/.test(location.search)) document.documentElement.classList.add('static');
  viewer(); flipOnHover();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
})();
