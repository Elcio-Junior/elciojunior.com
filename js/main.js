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

    var about = document.getElementById('aboutBody'); about.innerHTML = '';
    d['about.body'].forEach(function (t) { about.appendChild(el('p', null, t)); });

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
  var codeBg = document.getElementById('codeBg');

  function buildCodeBg() {
    codeBg.innerHTML = '';
    var cols = Math.max(2, Math.ceil(window.innerWidth / 340));
    for (var c = 0; c < cols; c++) {
      var block = [];
      for (var k = 0; k < snippets.length; k++) block.push(snippets[(c * 3 + k) % snippets.length].join('\n'));
      var half = block.join('\n\n') + '\n\n';
      half += half; // garante altura maior que telas altas
      var col = el('div', 'code-col' + (c % 2 ? ' down' : ''), half + half); // duas metades iguais: loop sem emenda
      col.style.setProperty('--dur', (50 + (c * 17) % 40) + 's');
      col.style.animationDelay = -(c * 7) + 's';
      codeBg.appendChild(col);
    }
  }
  buildCodeBg();
  var lastW = window.innerWidth, rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (window.innerWidth !== lastW) { lastW = window.innerWidth; buildCodeBg(); } }, 200);
  });

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
