/* FINEWAVE 동작 스크립트 — WPCode "JavaScript 스니펫"(사이트 전체·푸터 위치)에 붙여넣기
   ※ <script> 태그 없이 이 내용만 붙여넣으세요 (WPCode가 태그를 자동으로 감쌉니다) */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 헤더: 투명 → 스크롤 시 다크 */
  var hd = document.getElementById('fwhd');
  if (hd) {
    var onScroll = function () { hd.classList.toggle('solid', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    /* 모바일 햄버거 메뉴 */
    var burger = document.getElementById('fwBurger');
    burger.addEventListener('click', function () {
      var open = hd.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });
    hd.querySelector('nav').addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        hd.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* TOP 버튼: 메인 화면 아래로 내려갔을 때만 노출 + 맨 위로 이동 */
  var topBtn = document.getElementById('fwTopBtn');
  if (topBtn) {
    var onTop = function () {
      topBtn.classList.toggle('on', window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener('scroll', onTop, { passive: true }); onTop();
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* 스크롤 리빌 */
  var els = document.querySelectorAll('#fwv .rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.2 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  /* 360도: 모바일 경량 소스 + 진입 시 1회 재생 */
  var v = document.getElementById('turn');
  if (v) {
    var mob = window.matchMedia('(max-width: 767px)').matches;
    var s = document.createElement('source');
    s.src = mob ? 'https://finewave.kr/wp-content/uploads/2026/07/product-360-640.mp4' : 'https://finewave.kr/wp-content/uploads/2026/07/product-360-960.mp4';
    s.type = 'video/mp4';
    v.appendChild(s); v.load();
    var done = false;
    function go() { if (!reduced && !done) { done = true; var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
    if (!('IntersectionObserver' in window)) { go(); }
    else {
      var t = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { go(); t.disconnect(); } });
      }, { threshold: 0.6 });
      t.observe(v);
    }
  }
})();
