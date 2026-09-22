/* Ragul S portfolio - behaviour (theme toggle, animations, copy-email). You rarely need to edit this file. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Theme toggle ---------- */
  var btn = document.getElementById('theme');
  function effective() { return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  function label() { btn.textContent = effective() === 'dark' ? 'Light mode' : 'Dark mode'; }
  btn.addEventListener('click', function () {
    var next = effective() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('rs-theme', next); } catch (e) {}
    label();
  });
  label();

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById('copy');
  var status = document.getElementById('copy-status');
  // Reads the address from the Email link in the Contact section, so you only edit it in index.html
  var email = (document.getElementById('email-link').getAttribute('href') || '').replace('mailto:', '');
  var resetTimer;
  copyBtn.addEventListener('click', function () {
    function done(ok) {
      copyBtn.textContent = ok ? 'Copied' : 'Copy failed';
      copyBtn.classList.toggle('done', ok);
      status.textContent = ok ? 'Email address copied.' : 'Copy failed. Select the address and copy it manually.';
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        copyBtn.textContent = 'Copy email';
        copyBtn.classList.remove('done');
      }, 2500);
    }
    function fallback() {
      try {
        var ta = document.createElement('textarea');
        ta.value = email; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        done(ok);
      } catch (e) { done(false); }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () { done(true); }, fallback);
    } else { fallback(); }
  });

  /* ---------- Headline: split into words for the rise-in ---------- */
  var h1 = document.querySelector('.hero h1');
  if (h1 && !reduce) {
    var words = h1.textContent.trim().split(/\s+/);
    h1.setAttribute('aria-label', words.join(' '));
    h1.textContent = '';
    words.forEach(function (w, i) {
      var outer = document.createElement('span'); outer.className = 'w'; outer.setAttribute('aria-hidden', 'true');
      var inner = document.createElement('span'); inner.textContent = w; inner.style.setProperty('--i', i);
      outer.appendChild(inner); h1.appendChild(outer);
      if (i < words.length - 1) h1.appendChild(document.createTextNode(' '));
    });
    h1.classList.add('split');
  }

  /* ---------- Photo and glow follow the pointer ---------- */
  var panel = document.getElementById('hero');
  var photo = document.getElementById('photo');
  if (panel && photo && finePointer && !reduce) {
    var raf = 0, tx = 0, ty = 0, gx = 62, gy = 34;
    function apply() {
      raf = 0;
      photo.style.setProperty('--px', tx.toFixed(3));
      photo.style.setProperty('--py', ty.toFixed(3));
      panel.style.setProperty('--gx', gx.toFixed(1) + '%');
      panel.style.setProperty('--gy', gy.toFixed(1) + '%');
    }
    panel.addEventListener('pointermove', function (e) {
      var r = panel.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
      tx = (nx - 0.5) * 2; ty = (ny - 0.5) * 2; gx = nx * 100; gy = ny * 100;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    panel.addEventListener('pointerleave', function () {
      tx = 0; ty = 0; gx = 62; gy = 34;
      if (!raf) raf = requestAnimationFrame(apply);
    });
  }

  /* ---------- Scroll reveals ---------- */
  var groups = [
    '.sec-head',
    '.about-copy > *',
    '.stat',
    '.project',
    '.rows dt, .rows dd',
    '.rows-note',
    '.timeline li',
    '.wins li',
    '.c-card',
    '#contact .sec-body > p'
  ];
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, idx) {
      el.classList.add('reveal');
      var order = /dt, \.rows dd/.test(sel) ? Math.floor(idx / 2) : idx;
      el.style.setProperty('--i', Math.min(order, 5));
    });
  });

  var targets = document.querySelectorAll('.reveal, .sec, .about');
  if ('IntersectionObserver' in window && !reduce) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); revealer.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) { revealer.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  /* ---------- Count-up numbers ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function run(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var start = null, dur = 1300;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(dec);
      if (t < 1) requestAnimationFrame(step); else el.textContent = target.toFixed(dec);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var counter = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); counter.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) {
      c.textContent = (0).toFixed(parseInt(c.getAttribute('data-dec') || '0', 10));
      counter.observe(c);
    });
  }

  /* ---------- Scroll progress, top bar border and timeline fill ---------- */
  var bar = document.getElementById('progress');
  var topbar = document.getElementById('topbar');
  var tl = document.querySelector('.timeline');
  var ticking = false;
  function onScroll() {
    ticking = false;
    var max = root.scrollHeight - window.innerHeight;
    bar.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
    topbar.classList.toggle('scrolled', window.scrollY > 8);
    if (tl && !reduce) {
      var r = tl.getBoundingClientRect();
      var p = (window.innerHeight * 0.75 - r.top) / r.height;
      tl.style.setProperty('--tl', Math.max(0, Math.min(1, p)).toFixed(3));
    }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Highlight the current section in the nav ---------- */
  var links = {};
  document.querySelectorAll('.topbar nav a').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  function setCurrent(id) {
    Object.keys(links).forEach(function (k) {
      if (k === id) links[k].setAttribute('aria-current', 'true');
      else links[k].removeAttribute('aria-current');
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setCurrent(e.target.id); });
    }, { rootMargin: '-25% 0px -65% 0px' });
    Object.keys(links).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }
})();
