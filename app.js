/* ============================================================
   The Georgian Network — App logic (CORREGIDO COMPLETO)
   ============================================================ */
(function () {
  const D = window.TGN;
  let lang = localStorage.getItem('tgn-lang') || 'en';
  let theme = localStorage.getItem('tgn-theme') || 'light';
  let current = localStorage.getItem('tgn-panel') || 'home';
  const T = () => D.I18N[lang];
  const L = (o) => (o && typeof o === 'object' && 'en' in o) ? (o[lang] || o.en) : o;

  /* ---------- ICONS ---------- */
  const IC = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
    policies: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>',
    resources: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    admissions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    marketing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
  };

  /* ---------- HELPERS ---------- */
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-switch');
    if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('tgn-theme', theme);
    applyTheme();
  }
  function applyChrome() {
    document.getElementById('net-sub').textContent = T().net_sub;
    document.getElementById('search-input').placeholder = T().search;
    document.getElementById('nav-lbl').textContent = T().nav_label;
    document.getElementById('theme-lbl').textContent = T().theme;
    document.getElementById('footer-updated').textContent = T().updated;
  }
  function setLang(l) {
    lang = l;
    localStorage.setItem('tgn-lang', l);
    document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === l));
    applyChrome();
    renderNav();
    go(current);
  }
  function toggleMobileSidebar() {
    document.getElementById('sb').classList.toggle('open');
    document.getElementById('scrim').classList.toggle('open');
  }
  function closeMobileSidebar() {
    document.getElementById('sb').classList.remove('open');
    document.getElementById('scrim').classList.remove('open');
  }

  /* ---------- STORES ---------- */
  function getNews() { return _ov('news', window.TGN_DEFAULTS.news); }
  function getBirthdays() { return _ov('birthdays', window.TGN_DEFAULTS.birthdays); }
  function getVacancies() { return _ov('vacancies', window.TGN_DEFAULTS.vacancies); }
  function getQuicklinks() { return _ov('quicklinks', window.TGN_DEFAULTS.quicklinks); }
  function getTools() { return _ov('tools', window.TGN_DEFAULTS.tools); }
  function getInterviewForms() { return _ov('interviewforms', window.TGN_DEFAULTS.interviewforms); }

  /* ---------- ROUTER ---------- */
  function go(panelId) {
    current = panelId;
    localStorage.setItem('tgn-panel', panelId);
    document.querySelectorAll('.nav-lnk').forEach(lnk => lnk.classList.toggle('active', lnk.getAttribute('data-panel') === panelId));
    closeMobileSidebar();
    
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    window.scrollTo(0, 0);

    if (panelId === 'home') renderHome(main);
    else if (panelId === 'policies') renderPolicies(main);
    else if (panelId === 'resources') renderResources(main);
    else if (panelId === 'admissions') renderAdmissions(main);
    else if (panelId === 'marketing') renderMarketing(main);
  }

  /* ---------- RENDERS ---------- */
  function renderNav() {
    const nav = document.getElementById('nav-links');
    nav.innerHTML = '';
    ['home', 'policies', 'resources', 'admissions', 'marketing'].forEach(p => {
      const a = document.createElement('a');
      a.className = 'nav-lnk' + (p === current ? ' active' : '');
      a.href = '#';
      a.setAttribute('data-panel', p);
      a.innerHTML = IC[p] + '<span>' + T().nav[p] + '</span>';
      a.addEventListener('click', function (e) { e.preventDefault(); go(p); });
      nav.appendChild(a);
    });
  }

  function renderHome(container) {
    container.className = 'grid-home';

    // Section 1: News
    const secNews = document.createElement('section');
    secNews.className = 'card card-news';
    secNews.innerHTML = '<div class="card-hdr"><span class="card-title">' + (lang==='en'?'Latest News':'Novedades') + '</span><span class="badge badge-live">' + T().live + '</span></div>';
    const listNews = document.createElement('div');
    listNews.className = 'news-list';
    
    getNews().forEach(n => {
      const item = document.createElement('div');
      item.className = 'news-item';
      item.innerHTML = `
        <div class="news-meta"><span>${L(n.category)}</span> · <span>${n.date}</span></div>
        <h3 class="news-h">${L(n.title)}</h3>
        <p class="news-p">${L(n.summary)}</p>
        <button class="btn-text">${T().read_more} →</button>
      `;
      item.querySelector('button').addEventListener('click', () => openNews(n));
      listNews.appendChild(item);
    });
    secNews.appendChild(listNews);
    container.appendChild(secNews);

    // Section 2: Right Column (Birthdays + Vacancies)
    const rightCol = document.createElement('div');
    rightCol.className = 'home-aside';

    // Birthdays
    const secBday = document.createElement('section');
    secBday.className = 'card';
    secBday.innerHTML = '<div class="card-hdr"><span class="card-title">' + (lang==='en'?'Birthdays':'Cumpleaños') + '</span></div>';
    const listBday = document.createElement('div');
    listBday.className = 'bday-list';
    
    getBirthdays().forEach(b => {
      const item = document.createElement('div');
      item.className = 'bday-item';
      item.innerHTML = `
        <div class="bday-avatar">${b.name.charAt(0)}</div>
        <div class="bday-info">
          <div class="bday-name">${b.name}</div>
          <div class="bday-dept">${L(D.DEPTS[b.dept]) || b.dept}</div>
        </div>
        <div class="bday-date">${b.date}</div>
      `;
      listBday.appendChild(item);
    });
    secBday.appendChild(listBday);
    rightCol.appendChild(secBday);

    // Vacancies
    const secVac = document.createElement('section');
    secVac.className = 'card';
    secVac.innerHTML = '<div class="card-hdr"><span class="card-title">' + (lang==='en'?'Internal Vacancies':'Búsquedas Internas') + '</span></div>';
    const listVac = document.createElement('div');
    listVac.className = 'vac-list';
    
    getVacancies().forEach(v => {
      const item = document.createElement('div');
      item.className = 'vac-item';
      item.innerHTML = `
        <div class="vac-title">${L(v.title)}</div>
        <div class="vac-meta"><span>${L(D.DEPTS[v.dept])}</span> · <span>${L(v.campus)}</span></div>
        <div class="vac-desc">${L(v.desc)}</div>
        <a href="mailto:hr@stgeorges.edu.ar?subject=Vacancy: ${L(v.title)}" class="btn-text" style="margin-top:8px; display:inline-block;">${T().apply} →</a>
      `;
      listVac.appendChild(item);
    });
    secVac.appendChild(listVac);
    rightCol.appendChild(secVac);

    container.appendChild(rightCol);

    // Section 3: Menus & Extensions
    const btmRow = document.createElement('div');
    btmRow.className = 'home-row-bottom';

    // Dining Menu
    const secMenu = document.createElement('section');
    secMenu.className = 'card';
    secMenu.innerHTML = '<div class="card-hdr"><span class="card-title">' + (lang==='en'?'Dining Hall Menu':'Menú del Comedor') + '</span></div>';
    const mBody = document.createElement('div');
    mBody.style.padding = '16px';
    mBody.innerHTML = `<p style="margin-bottom:12px; font-weight:500; color:var(--text-muted);">${L(D.MENUS.week)}</p>`;
    const mGrid = document.createElement('div');
    mGrid.className = 'menu-grid';
    ['mon', 'tue', 'wed', 'thu', 'fri'].forEach(day => {
      const dBox = document.createElement('div');
      dBox.className = 'menu-day';
      dBox.innerHTML = `<span class="menu-day-name">${day.toUpperCase()}</span><span class="menu-day-val">${L(D.MENUS[day])}</span>`;
      mGrid.appendChild(dBox);
    });
    mBody.appendChild(mGrid);
    secMenu.appendChild(mBody);
    btmRow.appendChild(secMenu);

    // Quick Extensions
    const secExt = document.createElement('section');
    secExt.className = 'card';
    secExt.innerHTML = '<div class="card-hdr"><span class="card-title">' + (lang==='en'?'Useful Extensions':'Internos Útiles') + '</span></div>';
    const extBody = document.createElement('div');
    extBody.className = 'ext-body';
    const extGrid = document.createElement('div');
    extGrid.className = 'ext-grid';
    D.EXTENSIONS.forEach(ex => {
      extGrid.innerHTML += `<div class="ext-item"><strong>${ex.num}</strong><span>${L(ex.name)}</span></div>`;
    });
    extBody.appendChild(extGrid);
    secExt.appendChild(extBody);
    btmRow.appendChild(secExt);

    container.appendChild(btmRow);
  }

  function renderPolicies(container) {
    container.className = 'panel-standard';
    container.innerHTML = `<h1 class="panel-h">${L(D.PAGES.policies.title)}</h1><p class="panel-p">${L(D.PAGES.policies.desc)}</p>`;
    const grid = document.createElement('div');
    grid.className = 'links-grid';
    getQuicklinks().forEach(lnk => {
      grid.innerHTML += `
        <a href="${lnk.url}" target="_blank" class="link-card">
          <div class="link-card-icon">${IC.policies}</div>
          <div class="link-card-info">
            <div class="link-card-title">${L(lnk.title)}</div>
            <div class="link-card-url">${lnk.url}</div>
          </div>
        </a>`;
    });
    container.appendChild(grid);
  }

  function renderResources(container) {
    container.className = 'panel-standard';
    container.innerHTML = `<h1 class="panel-h">${L(D.PAGES.resources.title)}</h1><p class="panel-p">${L(D.PAGES.resources.desc)}</p>`;
    const grid = document.createElement('div');
    grid.className = 'tools-grid';
    getTools().forEach(g => {
      const card = document.createElement('div');
      card.className = 'tool-group-card';
      card.innerHTML = `<h3 class="tool-group-title">${L(g.title)}</h3>`;
      const list = document.createElement('div');
      list.className = 'tool-links';
      g.links.forEach(l => {
        list.innerHTML += `<a href="${l.url}" target="_blank">${L(l.name)} →</a>`;
      });
      card.appendChild(list);
      grid.appendChild(card);
    });
    container.appendChild(grid);
  }

  function renderAdmissions(container) {
    container.className = 'panel-standard';
    container.innerHTML = `<h1 class="panel-h">${L(D.PAGES.admissions.title)}</h1><p class="panel-p">${L(D.PAGES.admissions.desc)}</p>`;
    const actions = document.createElement('div');
    actions.style.marginBottom = '24px';
    actions.innerHTML = `<a href="${D.PAGES.admissions.folderUrl}" target="_blank" class="btn-text" style="font-weight:600;">${T().open_folder} ↗</a>`;
    container.appendChild(actions);

    const grid = document.createElement('div');
    grid.className = 'tools-grid';
    getInterviewForms().forEach(g => {
      const card = document.createElement('div');
      card.className = 'tool-group-card';
      card.innerHTML = `<h3 class="tool-group-title">${L(g.title)}</h3>`;
      const list = document.createElement('div');
      list.className = 'tool-links';
      g.links.forEach(l => {
        list.innerHTML += `<a href="${l.url}" target="_blank">${L(l.name)} [${l.lang.toUpperCase()}] →</a>`;
      });
      card.appendChild(list);
      grid.appendChild(card);
    });
    container.appendChild(grid);
  }

  function renderMarketing(container) {
    container.className = 'panel-standard';
    container.innerHTML = `<h1 class="panel-h">${L(D.PAGES.marketing.title)}</h1><p class="panel-p">${L(D.PAGES.marketing.desc)}</p>`;
    
    const sec = document.createElement('div');
    sec.className = 'mkt-section';
    
    // Brand collateral block
    const bCard = document.createElement('div');
    bCard.className = 'card mkt-brand-card';
    bCard.innerHTML = `
      <div style="padding:20px;">
        <h3 style="margin-bottom:8px; font-size:1.2rem;">${L(D.PAGES.marketing.collateralTitle)}</h3>
        <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:16px;">${L(D.PAGES.marketing.collateralDesc)}</p>
        <a href="${D.PAGES.marketing.folderUrl}" target="_blank" class="btn-text" style="font-weight:600;">${T().open_folder} ↗</a>
      </div>
    `;
    sec.appendChild(bCard);

    // Contact cards block
    const cGrid = document.createElement('div');
    cGrid.className = 'mkt-contact-grid';
    const contacts = D.PAGES.marketing.contacts;
    ['quilmes', 'north'].forEach(k => {
      const c = contacts[k];
      cGrid.innerHTML += `
        <div class="card" style="padding:16px;">
          <div style="font-weight:600; color:var(--primary); margin-bottom:4px;">${c.title}</div>
          <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:12px;">${c.name}</div>
          <div style="font-size:0.9rem; display:flex; flex-direction:column; gap:6px;">
            <a href="${c.email.url}" class="btn-text" style="text-align:left;">✉️ ${c.email.label}</a>
            <a href="${c.wa.url}" target="_blank" class="btn-text" style="text-align:left;">💬 ${c.wa.label}</a>
          </div>
        </div>`;
    });
    sec.appendChild(cGrid);
    container.appendChild(sec);
  }

  /* ---------- MODAL NEWS ---------- */
  function openNews(n) {
    document.getElementById('modal-title').textContent = L(n.title);
    document.getElementById('modal-meta').textContent = L(n.category) + ' · ' + n.date;
    document.getElementById('modal-body').innerHTML = L(n.content) || L(n.summary);
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeNews() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---------- SEARCH ---------- */
  function doSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) return;
    const map = { polic: 'policies', recurso: 'resources', resource: 'resources', admis: 'admissions', market: 'marketing', cumple: 'home', birthday: 'home', menu: 'home', interno: 'home', news: 'home', novedad: 'home' };
    for (const k in map) { if (q.indexOf(k) > -1) { go(map[k]); return; } }
    go('home');
  }

  /* ---------- INIT CON CARGA JSONP COMPATIBLE CON GOOGLE ---------- */
  function init() {
    applyTheme();
    applyChrome();

    if (D.config && D.config.remoteUrl) {
      const callbackName = 'tgn_callback_' + Date.now();
      
      window[callbackName] = function(data) {
        if (data && data.content) {
          window.TGNStore = {
            get: function(key, def) {
              return data.content[key] !== undefined ? data.content[key] : def;
            }
          };
          renderNav();
          go(current);
        }
        delete window[callbackName];
        const scr = document.getElementById(callbackName);
        if (scr) scr.remove();
      };

      const urlConCallback = D.config.remoteUrl + (D.config.remoteUrl.indexOf('?') > -1 ? '&' : '?') + 'cb=' + callbackName;

      const script = document.createElement('script');
      script.id = callbackName;
      script.src = urlConCallback;
      script.onerror = function() {
        console.error("No se pudieron recuperar los datos remotos (Error de red).");
        renderNav();
        go(current);
      };
      document.head.appendChild(script);

    } else {
      renderNav();
      go(current);
    }

    // OYENTES DE EVENTOS
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
    });
    document.getElementById('theme-switch').addEventListener('click', toggleTheme);
    document.getElementById('btn-sb-toggle').addEventListener('click', toggleMobileSidebar);
    document.getElementById('scrim').addEventListener('click', closeMobileSidebar);
    document.getElementById('modal-overlay').addEventListener('click', function (e) {
      if (e.target === this) closeNews();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNews(); });
    const si = document.getElementById('search-input');
    si.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSearch(si.value); });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
