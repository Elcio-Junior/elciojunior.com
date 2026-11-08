(function () {
  var S = window.SITE;
  var root = document.documentElement;
  var lang = (navigator.language || 'pt').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
  try { var saved = localStorage.getItem('lang'); if (saved === 'pt' || saved === 'en') lang = saved; } catch (e) {}

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function render() {
    var d = S[lang];
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(function (n) { n.textContent = d[n.dataset.i18n]; });
    document.getElementById('langBtn').textContent = lang === 'pt' ? 'EN' : 'PT';

    var summary = document.getElementById('heroSummary'); summary.innerHTML = '';
    d['hero.summary'].forEach(function (t) { summary.appendChild(el('p', null, t)); });

    document.querySelector('meta[name="description"]').setAttribute('content', d['meta.description']);
    document.getElementById('avatar').alt = d['avatar.alt'];

    var grid = document.getElementById('stackGrid'); grid.innerHTML = '';
    S.stack.forEach(function (cat) {
      var c = el('div', 'card'); c.appendChild(el('h3', null, cat[lang]));
      var ul = el('ul', 'chips');
      cat.items.forEach(function (s) { ul.appendChild(el('li', null, s)); });
      c.appendChild(ul); grid.appendChild(c);
    });

    [['expList', 'experience.items'], ['projList', 'projects.items'], ['eduList', 'education.items']].forEach(function (p) {
      var box = document.getElementById(p[0]); box.innerHTML = '';
      d[p[1]].forEach(function (i) {
        var c = el('article', 'card item');
        c.appendChild(el('div', 'meta', i.meta));
        c.appendChild(el('h3', null, i.title));
        c.appendChild(el('p', null, i.text));
        box.appendChild(c);
      });
    });

    var links = document.getElementById('links'); links.innerHTML = '';
    S.links.forEach(function (l) {
      var a = el('a', 'btn', l.label); a.href = l.url;
      if (l.url.indexOf('http') === 0) { a.target = '_blank'; a.rel = 'noopener'; }
      links.appendChild(a);
    });
  }

  document.getElementById('langBtn').addEventListener('click', function () {
    lang = lang === 'pt' ? 'en' : 'pt';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    render();
  });
  document.getElementById('themeBtn').addEventListener('click', function () {
    var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  });

  // Fundo com código em movimento: colunas que rolam em loop contínuo
  var snippets = [
    ['const elcio = {', '  role: "developer",', '  loves: ["code", "ideas"],', '  build() { return "something great"; }', '};'],
    ['async function hello() {', '  await coffee();', '  return ship(elcio.build());', '}'],
    ['git commit -m "feat: be awesome"', 'git push origin main'],
    ['public async Task<IActionResult> Get()', '{', '    var data = await _mediator.Send(new Query());', '    return Ok(data);', '}'],
    ['@Component({ standalone: true })', 'export class AppComponent {', '  count = signal(0);', '  inc() { this.count.update(n => n + 1); }', '}'],
    ['SELECT name, role', 'FROM developers', 'WHERE passion = \'code\'', 'ORDER BY impact DESC;'],
    ['while (alive) {', '  learn();', '  build();', '  share();', '}']
  ];
  // Desenhado em canvas: cada caractere se afasta do cursor e volta suavemente ao lugar
  (function codeBackground() {
    var canvas = document.createElement('canvas');
    document.getElementById('codeBg').appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var FONT_SIZE = 12, LH = 20, GAP = 48, PAD = 24;
    var RADIUS = 130, PUSH = 46, EASE = 0.12;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var W = 0, H = 0, cw = 7.2, columns = [], colors = {};
    var mouse = { x: -9999, y: -9999 };

    function readColors() {
      var cs = getComputedStyle(root);
      colors.code = cs.getPropertyValue('--code').trim() || 'rgba(0,0,0,.06)';
      colors.hot = cs.getPropertyValue('--gold').trim() || '#b88a2c';
    }

    function build() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = FONT_SIZE + 'px "JetBrains Mono", ui-monospace, Consolas, monospace';
      ctx.textBaseline = 'top';
      cw = ctx.measureText('M').width;

      columns = [];
      var x = PAD, c = 0;
      while (x < W) {
        var lines = [], maxLen = 0;
        // repete os trechos até a coluna ser mais alta que a tela (loop sem buracos)
        for (var k = 0; lines.length * LH < H + LH * 4; k++) {
          snippets[(c * 3 + k) % snippets.length].forEach(function (l) { lines.push(l); maxLen = Math.max(maxLen, l.length); });
          lines.push('');
        }
        var chars = [];
        lines.forEach(function (line, li) {
          for (var i = 0; i < line.length; i++) {
            if (line[i] !== ' ') chars.push({ ch: line[i], bx: x + i * cw, by: li * LH, ox: 0, oy: 0 });
          }
        });
        columns.push({
          chars: chars, height: lines.length * LH,
          speed: (10 + (c * 7) % 9) * (c % 2 ? -1 : 1), // px/s, colunas alternam o sentido
          offset: c * 137
        });
        x += maxLen * cw + GAP; c++;
      }
    }

    var last = performance.now();
    function frame(now) {
      var dt = Math.min((now - last) / 1000, 0.1); last = now;
      ctx.clearRect(0, 0, W, H);
      var hot = [];
      ctx.fillStyle = colors.code;
      columns.forEach(function (col) {
        if (!reduce) col.offset += col.speed * dt;
        var ch = col.height;
        for (var i = 0; i < col.chars.length; i++) {
          var p = col.chars[i];
          var y = ((p.by - col.offset) % ch + ch) % ch - LH * 2;
          if (y < -LH * 2 || y > H) { p.ox = p.oy = 0; continue; }
          var tx = 0, ty = 0;
          if (!reduce) {
            var dx = p.bx + cw / 2 - mouse.x, dy = y + LH / 2 - mouse.y;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < RADIUS && d > 0.01) {
              var f = 1 - d / RADIUS; f = f * f * PUSH;
              tx = dx / d * f; ty = dy / d * f;
            }
          }
          p.ox += (tx - p.ox) * EASE; p.oy += (ty - p.oy) * EASE;
          var m = Math.abs(p.ox) + Math.abs(p.oy);
          if (m > 1) hot.push(p.ch, p.bx + p.ox, y + p.oy, m);
          else ctx.fillText(p.ch, p.bx + p.ox, y + p.oy);
        }
      });
      // caracteres deslocados ganham um leve brilho dourado
      if (hot.length) {
        ctx.fillStyle = colors.hot;
        for (var j = 0; j < hot.length; j += 4) {
          ctx.globalAlpha = Math.min(0.45, 0.08 + hot[j + 3] / PUSH * 0.4);
          ctx.fillText(hot[j], hot[j + 1], hot[j + 2]);
        }
        ctx.globalAlpha = 1;
      }
      requestAnimationFrame(frame);
    }

    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'mouse') { mouse.x = e.clientX; mouse.y = e.clientY; }
    }, { passive: true });
    document.addEventListener('mouseleave', function () { mouse.x = mouse.y = -9999; });
    window.addEventListener('blur', function () { mouse.x = mouse.y = -9999; });

    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 150); });
    new MutationObserver(readColors).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    readColors(); build();
    // refaz a medida quando a fonte JetBrains Mono terminar de carregar
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    requestAnimationFrame(frame);
  })();

  document.getElementById('year').textContent = new Date().getFullYear();
  render();

  // Reveal + link ativo
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(function (n) { io.observe(n); });

  var links = document.querySelectorAll('.nav a');
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });
})();
