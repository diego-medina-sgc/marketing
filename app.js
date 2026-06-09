/* ============================================================
   The Georgian Network — App logic
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
    policies: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>',
    resources: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    admissions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 8l10 5 10-5z"/><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/></svg>',
    marketing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 14-7v16L3 13z"/><path d="M3 11v2a2 2 0 0 0 2 2h2"/><path d="M8 15v3a1.5 1.5 0 0 0 3 0v-1.5"/></svg>',
    news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h13v14H6a2 2 0 0 1-2-2z"/><path d="M17 8h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2"/><path d="M8 9h5M8 13h5"/></svg>',
    cake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21h16v-7H4z"/><path d="M4 14a2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0"/><path d="M12 6v3M12 4.5a1 1 0 1 0 0-.01"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l-1 4"/><path d="M5 4c0 9 6 15 14 15"/></svg>',
    food: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v8a2 2 0 0 0 4 0V3M7 11v10"/><path d="M17 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4 2.5-1 2.5-4-1-5-2.5-5M17 16v5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12z"/></svg>',
    search: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
    slides: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M12 17v3M9 20h6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V7c0-1 .3-1.5 1.6-1.5H17V2.5h-2.6C11.6 2.5 10.5 4 10.5 6.4V9H8v3h2.5v9.5H14V12h2.4l.4-3z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.5v10h-3v-10zM5 3.5A1.75 1.75 0 1 1 5 7a1.75 1.75 0 0 1 0-3.5zM9 8.5h2.9v1.4h.04c.4-.76 1.4-1.6 2.9-1.6 3.1 0 3.66 2 3.66 4.7v5.5h-3v-4.9c0-1.16-.02-2.66-1.62-2.66-1.62 0-1.87 1.27-1.87 2.58v4.98H9z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.6 7.9.6 7.9.6s6 0 7.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22.4 12 31 31 0 0 0 22 8.2zM10 15V9l5.2 3z"/></svg>'
  };

  const PLACEHOLDER = "this.onerror=null;this.style.display='none';this.parentNode.classList.add('no-img');";

  /* ---------- NAV STRUCTURE ---------- */
  const NAV = [
    { id: 'home', icon: 'home' },
    { id: 'policies', icon: 'policies' },
    { id: 'resources', icon: 'resources' },
    { id: 'admissions', icon: 'admissions' },
    { id: 'marketing', icon: 'marketing' }
  ];

  /* ---------- RENDER: SIDEBAR ---------- */
  function renderNav() {
    const nav = document.getElementById('sb-nav');
    let h = '<div class="sb-lbl">' + T().nav_label + '</div>';
    NAV.forEach(function (item) {
      const active = current === item.id || (item.children && item.children.indexOf(current) > -1);
      h += '<button class="nav-item' + (active ? ' active' : '') + (item.children ? (active ? ' open' : '') : '') + '" data-nav="' + item.id + '"' + (item.children ? ' data-group="1"' : '') + '>' +
        IC[item.icon] + '<span>' + T().nav[item.id] + '</span>' +
        (item.children ? '<span class="nav-caret">' + IC.chevron + '</span>' : '') +
        '</button>';
      if (item.children) {
        h += '<div class="nav-group-children' + (active ? ' open' : '') + '" data-children="' + item.id + '">';
        item.children.forEach(function (cid) {
          h += '<button class="nav-sub' + (current === cid ? ' active' : '') + '" data-nav="' + cid + '"><span>' + T().nav[cid] + '</span></button>';
        });
        h += '</div>';
      }
    });
    nav.innerHTML = h;
    nav.querySelectorAll('[data-nav]').forEach(function (b) {
      b.addEventListener('click', function () {
        const id = b.getAttribute('data-nav');
        if (b.getAttribute('data-group') && id !== current) {
          // toggle group open OR navigate to first child? -> navigate to marketing landing
        }
        go(id);
      });
    });
  }

  /* ---------- RENDER: panels ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function rootDomain(host) {
    var p = host.split('.');
    var sld = ['com', 'edu', 'co', 'org', 'net', 'gov', 'ac'];
    if (p.length > 2 && sld.indexOf(p[p.length - 2]) > -1 && p[p.length - 1].length === 2) return p.slice(-3).join('.');
    return p.slice(-2).join('.');
  }
  function tile(accent, abbr, name, desc, url, favicon) {
    var ico;
    if (favicon) {
      var host = rootDomain(String(url || '').replace(/^https?:\/\//, '').split('/')[0]);
      var fb = "if(!this.dataset.f){this.dataset.f=1;this.src='https://www.google.com/s2/favicons?sz=64&domain=" + host + "';}else{this.parentNode.classList.remove('has-fav');this.parentNode.textContent='" + abbr + "';}";
      ico = '<div class="tile-ico has-fav"><img class="tile-fav" src="https://icons.duckduckgo.com/ip3/' + host + '.ico" alt="" referrerpolicy="no-referrer" onerror="' + fb + '"/></div>';
    } else {
      ico = '<div class="tile-ico">' + abbr + '</div>';
    }
    return '<a class="tile" style="--accent:' + accent + '" href="' + url + '" target="_blank" rel="noopener">' +
      '<div class="tile-top">' + ico +
      '<span class="tile-arrow">' + IC.arrow + '</span></div>' +
      '<div class="tile-name">' + name + '</div>' +
      '<div class="tile-desc">' + desc + '</div></a>';
  }

  function pageHead(p) {
    return '<div class="page-hd"><div class="page-hd-inner"><div>' +
      '<div class="page-kicker">' + L(p.kicker) + '</div>' +
      '<h1 class="page-title">' + L(p.title) + '</h1>' +
      '<div class="page-sub">' + L(p.sub) + '</div>' +
      '</div></div></div>';
  }

  function newsCard(n) {
    const c = n.catColor;
    return '<article class="news-item ' + c + '" data-news="' + n.id + '">' +
      '<div class="news-ico">' + IC.news + '</div>' +
      '<div class="news-item-body">' +
      '<div class="news-item-head"><span class="news-cat ' + c + '">' + L(n.cat) + '</span>' +
      '<span class="news-date">' + L(n.date) + '</span></div>' +
      '<h3 class="news-title">' + L(n.title) + '</h3>' +
      '<p class="news-excerpt">' + L(n.excerpt) + '</p>' +
      '<div class="news-foot"><span class="news-sign">' + L(n.sign) + '</span>' +
      '<span class="news-more">' + T().read_more + ' ' + IC.arrow + '</span></div>' +
      '</div></article>';
  }

  function renderHome() {
    const p = { kicker: { en: 'Welcome', es: 'Bienvenido' }, title: { en: 'The Georgian Network', es: 'The Georgian Network' }, sub: { en: 'An essential hub for daily updates and collaboration', es: 'Un espacio esencial para novedades diarias y colaboración' } };
    let h = '';
    // hero
    h += '<div class="hero">' +
      '<div class="hero-body">' +
      '<div class="hero-kicker">' + L(p.kicker) + '</div>' +
      '<h1 class="hero-title">' + L(p.title) + '</h1>' +
      '<p class="hero-sub">' + L(p.sub) + '</p>' +
      '</div></div>';

    h += '<div class="home-cols"><div class="home-main">';

    // newsfeed
    h += '<section class="sec" style="--accent:var(--red)">' +
      '<div class="sec-hd"><h2 class="sec-title">' + IC.news + (lang === 'es' ? 'Novedades' : 'Newsfeed') + '</h2>' +
      '<span class="sec-meta">' + D.NEWS.length + (lang === 'es' ? ' publicaciones' : ' posts') + '</span></div>';
    h += '<div class="news-list">';
    D.NEWS.forEach(function (n) { h += newsCard(n); });
    h += '</div></section>';

    // vacancies
    h += '<section class="sec" style="--accent:var(--red)">' +
      '<div class="sec-hd"><h2 class="sec-title">' + IC.user + (lang === 'es' ? 'Búsquedas laborales' : 'Staff Vacancies') + '</h2>' +
      '<span class="sec-meta">' + D.VACANCIES.length + (lang === 'es' ? ' abiertas' : ' open') + '</span></div>' +
      '<div class="vac-grid">';
    D.VACANCIES.forEach(function (v) {
      h += '<div class="vac-card' + (v.campus === 'n' ? '' : '') + '">' +
        '<div class="vac-top"><span class="vac-campus ' + v.campus + '">' + (v.campus === 'q' ? 'Quilmes' : 'North') + '</span>' +
        (v.isNew ? '<span class="vac-new">● ' + (lang === 'es' ? 'Nueva' : 'New') + '</span>' : '') + '</div>' +
        '<h3 class="vac-title">' + L(v.title) + '</h3>' +
        '<div class="news-date" style="margin-bottom:9px">' + L(v.site) + '</div>' +
        '<p class="vac-desc">' + L(v.desc) + '</p>' +
        '<div class="vac-foot"><a class="vac-apply" href="mailto:' + v.email + '">' + IC.mail + ' ' + T().apply + '</a>' +
        '<span class="vac-contact">' + v.contact + '</span></div>' +
        '</div>';
    });
    h += '</div></section>';

    // extensions + menu (dual)
    h += '<section class="sec" style="--accent:var(--navy)">' +
      '<div class="sec-hd"><h2 class="sec-title">' + IC.phone + (lang === 'es' ? 'Internos' : 'Extensions') + '</h2></div>' +
      '<div class="dual-grid">';
    D.EXTENSIONS.forEach(function (e) {
      h += '<a class="doc-card ' + e.campus + '" href="' + e.url + '" target="_blank" rel="noopener">' +
        '<div class="doc-ico">' + IC.phone + '</div>' +
        '<div class="doc-info"><div class="doc-campus">' + L(e.label) + '</div><div class="doc-name">' + L(e.name) + '</div></div>' +
        '<span class="doc-arrow">' + IC.arrow + '</span></a>';
    });
    h += '</div></section>';

    h += '<section class="sec" style="--accent:var(--teal)">' +
      '<div class="sec-hd"><h2 class="sec-title">' + IC.food + (lang === 'es' ? 'Menú del comedor' : 'Dining Menu') + '</h2></div>' +
      '<div class="dual-grid">';
    D.MENUS.forEach(function (e) {
      h += '<a class="doc-card ' + e.campus + '" href="' + e.url + '" target="_blank" rel="noopener">' +
        '<div class="doc-ico">' + IC.food + '</div>' +
        '<div class="doc-info"><div class="doc-campus">' + L(e.label) + '</div><div class="doc-name">' + L(e.name) + '</div></div>' +
        '<span class="doc-arrow">' + IC.arrow + '</span></a>';
    });
    h += '</div></section>';

    h += '</div>'; // home-main

    // aside: birthdays + calendar
    h += '<aside class="home-aside">';
    h += '<div class="panel-card"><div class="panel-card-hd">' + IC.cake +
      '<span class="panel-card-ttl">' + (lang === 'es' ? 'Cumpleaños' : 'Birthdays') + '</span>' +
       '<span class="panel-card-meta">' + (lang === 'es' ? 'Diciembre' : 'December') + '</span></div>' +
      '<div class="panel-card-body bday-grid">';
    D.BIRTHDAYS.forEach(function (b) {
      const mon = lang === 'es' ? 'DIC' : 'DEC';
      const cc = (b.campus === 'q' || b.campus === 'n') ? b.campus : 'one';
      h += '<div class="bday-row ' + cc + '"><div class="bday-date"><div class="bday-day">' + b.d + '</div><div class="bday-mon">' + mon + '</div></div>' +
        '<div class="bday-info"><div class="bday-name">' + b.name + '</div><div class="bday-dept">' + L(D.DEPTS[b.dept]) + '</div></div>' +
        '<span class="bday-cake">' + IC.cake + '</span></div>';
    });
    h += '</div>' +
      '<div class="bday-legend">' +
      '<span class="bday-leg q">' + (lang === 'es' ? 'Quilmes' : 'Quilmes') + '</span>' +
      '<span class="bday-leg n">North</span>' +
      '<span class="bday-leg one">One School</span>' +
      '</div></div>';

    h += '<div class="panel-card"><div class="panel-card-hd">' + IC.calendar +
      '<span class="panel-card-ttl">' + (lang === 'es' ? 'Calendarios' : 'Calendars') + '</span></div>' +
      '<div class="panel-card-body">' +
      '<a class="cal-row q" href="#" target="_blank" rel="noopener"><span class="cal-ico">' + IC.calendar + '</span>' +
      '<span class="cal-txt"><span class="cal-name">' + (lang === 'es' ? 'Calendario Quilmes' : 'Quilmes Calendar') + '</span><span class="cal-sub">' + (lang === 'es' ? 'Académico y eventos' : 'Academic & events') + '</span></span>' + '<span class="cal-arrow">' + IC.arrow + '</span></a>' +
      '<a class="cal-row n" href="#" target="_blank" rel="noopener"><span class="cal-ico">' + IC.calendar + '</span>' +
      '<span class="cal-txt"><span class="cal-name">' + (lang === 'es' ? 'Calendario North' : 'North Calendar') + '</span><span class="cal-sub">' + (lang === 'es' ? 'Académico y eventos' : 'Academic & events') + '</span></span>' + '<span class="cal-arrow">' + IC.arrow + '</span></a>' +
      '</div></div>';
    h += '</aside>';

    h += '</div>'; // home-cols
    return h;
  }

  function renderPolicies() {
    const p = D.PAGES.policies;
    let h = pageHead(p);
    h += '<p class="intro">' + L(p.intro) + '</p>';
    h += '<section class="sec" style="--accent:var(--navy)">' +
      '<div class="sec-hd"><h2 class="sec-title">' + IC.folder + (lang === 'es' ? 'Documentos' : 'Documents') + '</h2>' +
      '<a class="sec-link" href="https://drive.google.com/drive/folders/' + p.folderId + '" target="_blank" rel="noopener">' + T().open_folder + ' ' + IC.ext + '</a></div>' +
      '<div id="drive-cards" class="dual-grid" data-folder="' + p.folderId + '"><div class="drive-loading">' + (lang === 'es' ? 'Cargando carpeta…' : 'Loading folder…') + '</div></div>' +
      '</section>';
    h += contactStrip();
    return h;
  }

  function driveKey() { return (window.TGNStore && TGNStore.get('driveApiKey', '')) || (D.config && D.config.driveApiKey) || ''; }
  function driveTypeLabel(mime) {
    if (/folder/.test(mime)) return lang === 'es' ? 'Carpeta' : 'Folder';
    if (/spreadsheet/.test(mime)) return 'Sheet';
    if (/presentation/.test(mime)) return 'Slides';
    if (/document/.test(mime)) return 'Doc';
    if (/pdf/.test(mime)) return 'PDF';
    return lang === 'es' ? 'Archivo' : 'File';
  }
  function driveCard(f) {
    const isFolder = /folder/.test(f.mimeType);
    const ic = isFolder ? IC.folder : (/presentation/.test(f.mimeType) ? IC.slides : IC.doc);
    const c = isFolder ? 'var(--navy)' : 'var(--teal)';
    let when = '';
    if (f.modifiedTime) { try { when = new Date(f.modifiedTime).toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); } catch (e) {} }
    return '<a class="doc-card" style="--c:' + c + '" href="' + (f.webViewLink || '#') + '" target="_blank" rel="noopener">' +
      '<div class="doc-ico">' + ic + '</div>' +
      '<div class="doc-info"><div class="doc-campus">' + driveTypeLabel(f.mimeType) + (when ? ' · ' + when : '') + '</div><div class="doc-name">' + esc(f.name) + '</div></div>' +
      '<span class="doc-arrow">' + IC.arrow + '</span></a>';
  }
  function driveEmbedFallback(folderId, note) {
    return '<div class="cc" style="grid-column:1/-1">' + (note ? '<div class="drive-note">' + note + '</div>' : '') +
      '<div class="embed-frame"><iframe src="https://drive.google.com/embeddedfolderview?id=' + folderId + '#list" height="420" title="Drive folder"></iframe></div></div>';
  }
  async function loadDriveCards() {
    const box = document.getElementById('drive-cards');
    if (!box) return;
    const folderId = box.getAttribute('data-folder');
    const key = driveKey();
    if (!key) { box.innerHTML = driveEmbedFallback(folderId, ''); return; }
    try {
      const url = 'https://www.googleapis.com/drive/v3/files?q=' + encodeURIComponent("'" + folderId + "' in parents and trashed=false") +
        '&key=' + key + '&fields=' + encodeURIComponent('files(id,name,mimeType,modifiedTime,webViewLink)') +
        '&orderBy=folder,name&pageSize=200&supportsAllDrives=true&includeItemsFromAllDrives=true';
      const res = await fetch(url);
      if (!res.ok) throw new Error('http ' + res.status);
      const data = await res.json();
      const files = (data.files || []);
      if (!files.length) { box.innerHTML = '<div class="drive-loading">' + (lang === 'es' ? 'La carpeta está vacía.' : 'The folder is empty.') + '</div>'; return; }
      box.innerHTML = files.map(driveCard).join('');
    } catch (e) {
      box.innerHTML = driveEmbedFallback(folderId, lang === 'es' ? 'No se pudo leer la carpeta con la API — mostrando el visor de Drive.' : 'Could not read the folder via the API — showing the Drive viewer.');
    }
  }

  function renderResources() {
    const p = D.PAGES.resources;
    let h = pageHead(p);
    // quick links
    h += '<section class="sec" style="--accent:var(--navy)">' +
      '<div class="sec-hd"><h2 class="sec-title">' + IC.sparkle + (lang === 'es' ? 'Accesos rápidos' : 'Quick links') + '</h2></div>' +
      '<p class="intro" style="margin-bottom:18px">' + L(p.isamsNote) + '</p>' +
      '<div class="tile-grid">';
    D.QUICK_LINKS.forEach(function (t) {
      h += tile(t.accent, t.abbr, t.name, L(t.desc), t.url, true);
    });
    h += '</div></section>';

    // other tools
    h += '<section class="sec" style="--accent:var(--teal)">' +
      '<div class="sec-hd"><h2 class="sec-title">' + IC.resources + (lang === 'es' ? 'Otras herramientas' : 'Other tools') + '</h2></div>' +
      '<div class="tool-cols">';
    D.TOOL_GROUPS.forEach(function (g) {
      h += '<div class="tool-group" style="--accent:' + g.accent + '"><div class="tool-group-hd"><span class="dot"></span>' + L(g.name) + '</div>';
      g.links.forEach(function (l) {
        h += '<a class="tool-link" href="' + l.url + '" target="_blank" rel="noopener">' + l.name + IC.ext + '</a>';
      });
      h += '</div>';
    });
    h += '</div></section>';

    // strategies
    const s = p.strategies;
    h += '<section class="sec" style="--accent:var(--violet)">' +
      '<div class="sec-hd"><h2 class="sec-title">' + IC.slides + L(s.title) + '</h2>' +
      '<a class="sec-link" href="' + s.link + '" target="_blank" rel="noopener">' + (lang === 'es' ? 'Abrir presentaci\u00f3n' : 'Open presentation') + ' ' + IC.ext + '</a></div>' +
      '<div class="cc" style="--accent:var(--violet)"><div class="cc-hd"><div class="cc-ttl">' + L(s.linkLabel) + '</div>' +
      '<div class="cc-sub">Google Slides</div></div>' +
      '<p class="tile-desc" style="font-size:.82rem;line-height:1.5;margin-bottom:14px">' + L(s.desc) + '</p>' +
      '<div class="embed-frame slides-embed"><iframe src="' + s.embed + '" allowfullscreen title="' + L(s.linkLabel) + '"></iframe></div>' +
      '</div></section>';
    return h;
  }

  function renderPending(key) {
    const p = D.PAGES[key];
    let h = pageHead(p);
    h += '<div class="empty-state"><div class="empty-ico">' + IC.clock + '</div>' +
      '<div class="empty-title">' + (lang === 'es' ? 'Contenido en migración' : 'Content being migrated') + '</div>' +
      '<div class="empty-sub">' +
      (lang === 'es'
        ? 'Esta sección del sitio original requiere inicio de sesión, así que su contenido todavía no se pudo copiar. En cuanto esté disponible (o lo compartas), lo agregamos acá con este mismo diseño.'
        : "This section of the original site requires sign-in, so its content couldn't be copied yet. As soon as it's available (or you share it), we'll add it here in this same design.") +
      '</div></div>';
    h += contactStrip();
    return h;
  }

  function contactStrip() {
    return '<div class="contact-strip" style="margin-top:8px">' +
      '<div class="contact-txt"><div class="contact-ttl">' + (lang === 'es' ? '¿Querés compartir algo con la red?' : 'Want to share something with the network?') + '</div>' +
      '<div class="contact-sub">' + (lang === 'es' ? 'Escribinos y lo sumamos.' : 'Write to us and we\'ll add it.') + '</div></div>' +
      '<a class="contact-cta" href="mailto:marketing@stgeorges.edu.ar">' + IC.mail + ' marketing@stgeorges.edu.ar</a></div>';
  }

  const RENDERERS = {
    home: renderHome, policies: renderPolicies, resources: renderResources,
    admissions: renderAdmissions,
    marketing: renderMarketingApp
  };

  function renderMarketingApp() {
    return '<div id="mkt-root" class="mkt-assistant"></div>';
  }

  function renderAdmissions() {
    const p = D.PAGES.admissions, A = D.ADMISSIONS;
    let h = pageHead(p);
    h += '<p class="intro">' + L(p.intro) + '</p>';
    h += '<section class="sec" style="--accent:var(--red)">' +
      '<div class="sec-hd"><h2 class="sec-title">' + IC.doc + (lang === 'es' ? 'Formularios de entrevista' : 'Interview forms') + '</h2>' +
      '<span class="sec-meta">' + (lang === 'es' ? 'Por nivel y secci\u00f3n' : 'By level & section') + '</span></div>' +
      '<div class="tool-cols">';
    A.groups.forEach(function (g) {
      h += '<div class="tool-group" style="--accent:' + g.accent + '"><div class="tool-group-hd"><span class="dot"></span>' + L(g.level) + '</div>';
      g.forms.forEach(function (f) {
        h += '<a class="form-link" style="--accent:' + g.accent + '" href="' + f.url + '" target="_blank" rel="noopener">' +
          '<span class="fl-ico">' + IC.doc + '</span>' + L(f.name) + '<span class="fl-go">' + IC.ext + '</span></a>';
      });
      h += '</div>';
    });
    h += '</div></section>';

    // contact
    const c = A.contact;
    h += '<section class="sec" style="--accent:var(--navy)">' +
      '<div class="sec-hd"><h2 class="sec-title">' + IC.phone + (lang === 'es' ? 'Contacto' : 'Contact us') + '</h2></div>' +
      '<p class="intro" style="margin-bottom:16px">' + (lang === 'es' ? 'Escribinos por email o WhatsApp. Conectate con el campus Quilmes o North.' : 'Reach out via email or WhatsApp. Connect with the Quilmes or North campus.') + '</p>' +
      '<div class="contact-grid">' +
      '<div class="contact-card"><div class="contact-campus">Quilmes</div>' +
      '<a class="contact-line" href="mailto:' + c.quilmesEmail + '">' + IC.mail + c.quilmesEmail + '</a>' +
      '<a class="contact-line" href="' + c.quilmesWa.url + '" target="_blank" rel="noopener">' + IC.phone + 'WhatsApp · ' + c.quilmesWa.label + '</a></div>' +
      '<div class="contact-card n"><div class="contact-campus">North</div>' +
      '<a class="contact-line" href="mailto:' + c.northEmail + '">' + IC.mail + c.northEmail + '</a>' +
      '<a class="contact-line" href="' + c.northWa.url + '" target="_blank" rel="noopener">' + IC.phone + 'WhatsApp · ' + c.northWa.label + '</a></div>' +
      '</div></section>';
    return h;
  }

  /* ---------- NAVIGATION ---------- */
  function go(id) {
    if (!RENDERERS[id]) id = 'home';
    current = id;
    localStorage.setItem('tgn-panel', id);
    const panel = document.getElementById('panel');
    panel.classList.remove('active');
    panel.innerHTML = RENDERERS[id]();
    void panel.offsetWidth;
    panel.classList.add('active');
    window.scrollTo({ top: 0 });
    renderNav();
    bindPanel();
    closeMobileSidebar();
  }

  /* ---------- PANEL BINDINGS ---------- */
  function bindPanel() {
    document.querySelectorAll('[data-news]').forEach(function (c) {
      c.addEventListener('click', function () { openNews(c.getAttribute('data-news')); });
    });
    if (current === 'marketing' && window.MKT) {
      const mr = document.getElementById('mkt-root');
      if (mr) window.MKT.mount(mr, lang);
    }
    if (current === 'policies') { loadDriveCards(); }
  }

  /* ---------- NEWS MODAL ---------- */
  function openNews(id) {
    const n = D.NEWS.find(function (x) { return x.id === id; });
    if (!n) return;
    const ov = document.getElementById('modal-overlay');
    const cmap = { red: 'var(--red)', teal: 'var(--teal)', navy: 'var(--navy)' };
    const cm = cmap[n.catColor] || 'var(--red)';
    ov.innerHTML = '<div class="modal-wrap"><button class="modal-close" aria-label="Close">' + IC.close + '</button>' +
      '<div class="modal" style="border-top:4px solid ' + cm + '">' +
      '<div class="modal-body">' +
      '<span class="modal-cat" style="background:color-mix(in srgb,' + cm + ' 14%,transparent);color:' + cm + '">' + L(n.cat) + '</span>' +
      '<div class="modal-date">' + L(n.date) + '</div>' +
      '<h2 class="modal-title">' + L(n.title) + '</h2>' +
      '<div class="modal-text">' + L(n.body) + '</div>' +
      '<div class="modal-sign">— ' + L(n.sign) + '</div>' +
      '</div></div></div>';
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
    ov.querySelector('.modal-close').addEventListener('click', closeNews);
  }
  function closeNews() {
    const ov = document.getElementById('modal-overlay');
    ov.classList.remove('open');
    ov.innerHTML = '';
    document.body.style.overflow = '';
  }

  /* ---------- LANG / THEME ---------- */
  function applyChrome() {
    document.documentElement.lang = lang;
    document.getElementById('net-sub').textContent = T().net_sub;
    document.getElementById('search-input').placeholder = T().search;
    document.getElementById('live-badge').textContent = T().live;
    document.getElementById('sb-update').textContent = T().updated;
    document.getElementById('theme-name').textContent = T().theme;
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }
  function setLang(l) {
    lang = l; localStorage.setItem('tgn-lang', l);
    applyChrome(); renderNav(); go(current);
  }
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme);
    const logo = document.getElementById('hdr-logo');
    if (logo) logo.src = theme === 'dark' ? 'assets/logo-h-white.png' : 'assets/logo-h.png';
    const tr = document.getElementById('theme-track');
    const sun = document.getElementById('sw-sun'), moon = document.getElementById('sw-moon');
    if (tr) tr.classList.toggle('sw-on', theme === 'dark');
    if (sun) sun.classList.toggle('sw-active', theme === 'light');
    if (moon) moon.classList.toggle('sw-active', theme === 'dark');
  }
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('tgn-theme', theme); applyTheme();
  }

  /* ---------- SIDEBAR MOBILE ---------- */
  function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('scrim').classList.remove('show');
  }
  function toggleMobileSidebar() {
    const sb = document.getElementById('sidebar');
    sb.classList.toggle('mobile-open');
    document.getElementById('scrim').classList.toggle('show', sb.classList.contains('mobile-open'));
  }

  /* ---------- SEARCH ---------- */
  function doSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) return;
    // simple: jump to first matching panel by keyword
    const map = { polic: 'policies', recurso: 'resources', resource: 'resources', admis: 'admissions', market: 'marketing', cumple: 'home', birthday: 'home', menu: 'home', interno: 'home', news: 'home', novedad: 'home' };
    for (const k in map) { if (q.indexOf(k) > -1) { go(map[k]); return; } }
    go('home');
  }

  /* ---------- INIT ---------- */
  function init() {
    applyTheme();
    applyChrome();
    renderNav();
    go(current);

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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
