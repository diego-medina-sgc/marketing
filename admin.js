/* ============================================================
   The Georgian Network — Back Office (content editor)
   Front-end CMS for marketing@stgeorges.edu.ar. Edits overlay the
   defaults via TGNStore (localStorage). Reload applies to the site.
   NOTE: this is a front-end gate for a prototype — not real auth.
   ============================================================ */
(function () {
  'use strict';
  const S = window.TGNStore;
  const ADMIN_EMAIL = 'marketing@stgeorges.edu.ar';
  const ADMIN_PASS = 'marketingsgc2024';
  const AUTH_KEY = 'tgn-admin-ok';

  /* ── Google SSO helpers ── */
  function googleClientId() { return (S.get('googleClientId', '') || '').trim(); }
  function adminEmails() { const raw = S.get('adminEmails', 'marketing@stgeorges.edu.ar'); return String(raw).split(',').map(s => s.trim().toLowerCase()).filter(Boolean); }
  function emailAllowed(e) { e = (e || '').toLowerCase(); const list = adminEmails(); if (list.indexOf(e) > -1) return true; return list.some(function (a) { return a.charAt(0) === '@' && e.slice(-a.length) === a; }); }
  function decodeJwt(t) { try { const p = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'); return JSON.parse(decodeURIComponent(escape(atob(p)))); } catch (e) { return null; } }
  function loadGIS() { return new Promise(function (res, rej) { if (window.google && google.accounts && google.accounts.id) return res(); const s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true; s.onload = function () { res(); }; s.onerror = function () { rej(); }; document.head.appendChild(s); }); }
  function handleGoogleCredential(resp) {
    const data = decodeJwt(resp.credential); const email = data && data.email;
    const err = document.getElementById('ad-err');
    if (email && data.email_verified !== false && emailAllowed(email)) { localStorage.setItem(AUTH_KEY, '1'); localStorage.setItem('tgn-admin-user', email); renderShell(); }
    else if (err) { err.textContent = email ? (email + ' is not authorised for the Back Office.') : 'Could not sign in with Google.'; }
  }

  const IC = {
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 2h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 22h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6A7 7 0 0 0 19 12z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15 6-6 6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13h10l1-13"/></svg>',
    caret: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
    news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h13v14H6a2 2 0 0 1-2-2z"/><path d="M17 8h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2"/><path d="M8 9h5M8 13h5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    cake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21h16v-7H4z"/><path d="M4 14a2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0"/><path d="M12 6v3"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 7a4 4 0 0 1 5 5l-9 9-3-3 9-9a4 4 0 0 1-2-2z"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
    slides: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M12 17v3M9 20h6"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="1.2"/><circle cx="17.5" cy="10.5" r="1.2"/><circle cx="8.5" cy="7.5" r="1.2"/><circle cx="6.5" cy="12.5" r="1.2"/><path d="M12 2a10 10 0 1 0 0 20 2.5 2.5 0 0 0 2-4 2.5 2.5 0 0 1 2-4h1a4 4 0 0 0 4-4 9 9 0 0 0-9-8z"/></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M5 21h14"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V9m0 0 4 4m-4-4-4 4"/><path d="M5 3h14"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
  };

  const COLORS = [
    { v: 'var(--red)', c: '#DC1E33' }, { v: 'var(--navy)', c: '#213463' }, { v: 'var(--teal)', c: '#109AA9' },
    { v: 'var(--violet)', c: '#6B6EB3' }, { v: 'var(--celeste)', c: '#6AB2E2' }, { v: 'var(--ink)', c: '#1A1F35' },
    { v: 'var(--green)', c: '#15803d' }, { v: 'var(--amber)', c: '#b45309' }
  ];
  const colorHex = (v) => { const f = COLORS.find(x => x.v === v); return f ? f.c : (v || '#213463'); };

  /* ---------- helpers ---------- */
  const escA = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const escH = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let oc = 0; let registry = {};
  function oid(o) { if (!o.__oid) o.__oid = ++oc; registry[o.__oid] = o; return o.__oid; }
  function setPath(o, path, val) { const p = path.split('.'); let cur = o; for (let i = 0; i < p.length - 1; i++) { if (cur[p[i]] == null || typeof cur[p[i]] !== 'object') cur[p[i]] = {}; cur = cur[p[i]]; } cur[p[p.length - 1]] = val; }
  function strip(v) { return JSON.parse(JSON.stringify(v, (k, val) => (k === '__oid' ? undefined : val))); }

  /* ---------- TYPES config ---------- */
  const TYPES = [
    { key: 'news', label: 'Newsfeed', icon: 'news', kind: 'flat' },
    { key: 'vacancies', label: 'Staff Vacancies', icon: 'user', kind: 'flat' },
    { key: 'birthdays', label: 'Birthdays', icon: 'cake', kind: 'flat' },
    { key: 'quicklinks', label: 'Resources', icon: 'grid', kind: 'flat' },
    { key: 'tools', label: 'Other Tools', icon: 'wrench', kind: 'groups' },
    { key: 'interviewforms', label: 'Interview Forms', icon: 'doc', kind: 'iforms' },
    { sep: true },
    { key: 'presentations', label: 'Presentations', icon: 'slides', kind: 'pres' },
    { key: 'documents', label: 'Documents', icon: 'doc', kind: 'docs' },
    { key: 'designs', label: 'Designs (Canva)', icon: 'palette', kind: 'designs' },
    { sep: true },
    { key: 'settings', label: 'Settings', icon: 'cog', kind: 'settings' }
  ];
  const SUBTITLE = {
    news: 'Posts shown in the Home newsfeed. Bilingual text (EN/ES). The body supports basic HTML.',
    vacancies: 'Open positions shown on the Home page.',
    birthdays: 'Staff birthdays. Campus sets the colour: Quilmes = red, North = navy, One School = black.',
    quicklinks: 'Platform tiles shown under Resources › Quick links.',
    tools: 'Tools grouped by level, shown under Resources › Other tools.',
    interviewforms: 'Admissions interview forms, grouped by level. Each form is a link.',
    presentations: 'Direct presentation templates in Marketing › Presentations.',
    documents: 'Letterhead documents in Marketing › Documents, grouped by campus.',
    designs: 'Canva templates shown in Marketing › Designs. These sync live from the Google Sheet “Canva Brand Templates”. Edits here act only as a fallback if the sheet can’t be reached.',
    settings: 'Site-wide settings. The Google Drive API key lets the Policies page list a Drive folder’s contents as live cards.'
  };

  function defaultFor(key) {
    const D = window.TGN_DEFAULTS || {}, M = window.MKT_DEFAULTS || {};
    if (key in D) return S.clone(D[key]);
    if (key in M) return S.clone(M[key]);
    return null;
  }
  function load(key) {
    const def = defaultFor(key);
    return S.clone(S.get(key, def));
  }

  /* ---------- state ---------- */
  let state = { active: 'news', working: {} };
  function wd(key) { if (!state.working[key]) state.working[key] = load(key); return state.working[key]; }
  function commit(key) { S.set(key, strip(wd(key))); flashSaved(); }

  /* ---------- field builders ---------- */
  const inp = (o, prop, val, ph) => '<input class="ad-in" data-oid="' + oid(o) + '" data-prop="' + prop + '" value="' + escA(get(o, prop, val)) + '" placeholder="' + escA(ph || '') + '"/>';
  function get(o, prop, fallback) { const p = prop.split('.'); let c = o; for (let i = 0; i < p.length; i++) { if (c == null) return fallback || ''; c = c[p[i]]; } return c == null ? (fallback || '') : c; }
  const area = (o, prop, rows) => '<textarea class="ad-area" rows="' + (rows || 3) + '" data-oid="' + oid(o) + '" data-prop="' + prop + '">' + escH(get(o, prop)) + '</textarea>';
  function sel(o, prop, opts) { const cur = get(o, prop); return '<select class="ad-sel" data-oid="' + oid(o) + '" data-prop="' + prop + '">' + opts.map(op => '<option value="' + escA(op.v) + '"' + (String(op.v) === String(cur) ? ' selected' : '') + '>' + escH(op.l) + '</option>').join('') + '</select>'; }
  function chk(o, prop, label) { return '<label class="ad-check"><input type="checkbox" data-oid="' + oid(o) + '" data-prop="' + prop + '" data-bool="1"' + (get(o, prop) ? ' checked' : '') + '/>' + label + '</label>'; }
  function swatch(o, prop) { const cur = get(o, prop); return '<div class="ad-swatches">' + COLORS.map(c => '<button class="ad-sw' + (c.v === cur ? ' on' : '') + '" style="background:' + c.c + '" data-oid="' + oid(o) + '" data-prop="' + prop + '" data-sw="' + c.v + '" title="' + c.v + '"></button>').join('') + '</div>'; }
  const fld = (label, ctrl) => '<div class="ad-field"><label class="ad-lbl">' + label + '</label>' + ctrl + '</div>';
  function bi(label, o, prop) { return '<div class="ad-field"><label class="ad-lbl">' + label + '</label><div class="ad-bi">' + '<div class="ad-bi-col"><span class="ad-flag">EN</span>' + inp(o, prop + '.en') + '</div><div class="ad-bi-col"><span class="ad-flag">ES</span>' + inp(o, prop + '.es') + '</div></div></div>'; }
  function biArea(label, o, prop, rows) { return '<div class="ad-field"><label class="ad-lbl">' + label + '</label><div class="ad-bi">' + '<div class="ad-bi-col"><span class="ad-flag">EN</span>' + area(o, prop + '.en', rows) + '</div><div class="ad-bi-col"><span class="ad-flag">ES</span>' + area(o, prop + '.es', rows) + '</div></div></div>'; }

  const CATCOLORS = [{ v: 'red', l: 'Red · Community/Action' }, { v: 'teal', l: 'Teal · Announcement' }, { v: 'navy', l: 'Navy · Event' }];
  const CAMPUS2 = [{ v: 'q', l: 'Quilmes' }, { v: 'n', l: 'North' }];
  const CAMPUS3 = [{ v: 'q', l: 'Quilmes (red)' }, { v: 'n', l: 'North (navy)' }, { v: 'one', l: 'One School (black)' }];
  const DEPTS = [{ v: 'P', l: 'Prep' }, { v: 'S', l: 'Secondary' }, { v: 'M', l: 'Admin' }, { v: 'Bd', l: 'Boarding' }, { v: 'EF', l: 'PE' }];

  /* ---------- per-type item forms ---------- */
  function itemForm(key, it) {
    const o = oid(it);
    if (key === 'news') return bi('Title', it, 'title') + '<div class="ad-row2">' + fld('Category label', biInline(it, 'cat')) + fld('Category colour', sel(it, 'catColor', CATCOLORS)) + '</div>' + bi('Date', it, 'date') + bi('Signature', it, 'sign') + biArea('Excerpt', it, 'excerpt', 2) + biArea('Body (HTML allowed)', it, 'body', 6) + fld('Internal id', inp(it, 'id'));
    if (key === 'vacancies') return bi('Title', it, 'title') + '<div class="ad-row2">' + fld('Campus', sel(it, 'campus', CAMPUS2)) + fld('Flag', chk(it, 'isNew', 'Show “New” badge')) + '</div>' + bi('Site / detail line', it, 'site') + biArea('Description', it, 'desc', 3) + '<div class="ad-row2">' + fld('Apply email', inp(it, 'email')) + fld('Contact name', inp(it, 'contact')) + '</div>';
    if (key === 'birthdays') return fld('Name (Surname, Name)', inp(it, 'name')) + '<div class="ad-row3">' + fld('Day', inp(it, 'd')) + fld('Month', inp(it, 'm')) + fld('Dept', sel(it, 'dept', DEPTS)) + '</div>' + fld('Campus (colour)', sel(it, 'campus', CAMPUS3));
    if (key === 'quicklinks') return '<div class="ad-row2">' + fld('Badge (1–2 chars)', inp(it, 'abbr')) + fld('Accent colour', swatch(it, 'accent')) + '</div>' + fld('Name', inp(it, 'name')) + bi('Description', it, 'desc') + fld('URL', inp(it, 'url'));
    return '';
  }
  function biInline(o, prop) { return '<div class="ad-bi"><div class="ad-bi-col"><span class="ad-flag">EN</span>' + inp(o, prop + '.en') + '</div><div class="ad-bi-col"><span class="ad-flag">ES</span>' + inp(o, prop + '.es') + '</div></div>'; }

  function itemName(key, it) {
    if (key === 'birthdays') return (it.d || '?') + '/' + (it.m || '?') + ' · ' + (it.name || '—');
    if (key === 'quicklinks' || key === 'presentations') return it.name || '—';
    const t = it.title || it.name; return (t && (t.es || t.en)) || it.name || '—';
  }
  function itemDot(key, it) {
    if (key === 'news') return ({ red: '#DC1E33', teal: '#109AA9', navy: '#213463' })[it.catColor] || '#213463';
    if (key === 'birthdays' || key === 'vacancies') return it.campus === 'n' ? '#213463' : (it.campus === 'one' ? '#1A1F35' : '#DC1E33');
    if (key === 'quicklinks') return colorHex(it.accent);
    return '#213463';
  }
  function newItem(key) {
    if (key === 'news') return { id: 'post-' + Date.now(), cat: { en: 'Announcement', es: 'Anuncio' }, catColor: 'teal', date: { en: '', es: '' }, sign: { en: '', es: '' }, title: { en: 'New post', es: 'Nueva nota' }, excerpt: { en: '', es: '' }, body: { en: '', es: '' } };
    if (key === 'vacancies') return { campus: 'q', isNew: true, title: { en: 'New role', es: 'Nuevo puesto' }, site: { en: '', es: '' }, desc: { en: '', es: '' }, email: 'jobs.rrhh@stgeorges.edu.ar', contact: '' };
    if (key === 'birthdays') return { d: 1, m: 12, name: 'Surname, Name', dept: 'P', campus: 'one' };
    if (key === 'quicklinks') return { abbr: 'XX', name: 'New link', desc: { en: '', es: '' }, url: 'https://', accent: 'var(--navy)' };
    if (key === 'presentations') return { name: 'New template', url: 'https://' };
    return {};
  }

  /* ---------- panel renderers ---------- */
  function flatPanel(key) {
    const arr = wd(key);
    let h = '';
    if (!arr.length) h += '<div class="ad-empty">No items yet. Click “Add” to create one.</div>';
    arr.forEach((it, i) => {
      h += '<div class="ad-item" data-i="' + i + '"><div class="ad-item-hd" data-toggle><span class="ad-item-dot" style="background:' + itemDot(key, it) + '"></span>' +
        '<span class="ad-item-name">' + escH(itemName(key, it)) + '</span>' + itemTools(i, arr.length) + '<span class="ad-caret">' + IC.caret + '</span></div>' +
        '<div class="ad-item-body">' + itemForm(key, it) + '</div></div>';
    });
    return h;
  }
  function itemTools(i, n) {
    return '<span class="ad-item-tools">' +
      '<button class="ad-tool" data-move="up" data-i="' + i + '"' + (i === 0 ? ' disabled style="opacity:.3"' : '') + '>' + IC.up + '</button>' +
      '<button class="ad-tool" data-move="down" data-i="' + i + '"' + (i === n - 1 ? ' disabled style="opacity:.3"' : '') + '>' + IC.down + '</button>' +
      '<button class="ad-tool del" data-del="' + i + '">' + IC.trash + '</button></span>';
  }

  function groupsPanel(key) { // tools
    const arr = wd(key); let h = '';
    arr.forEach((g, gi) => {
      h += '<div class="ad-group-block"><div class="ad-group-hd"><span class="ad-item-dot" style="background:' + colorHex(g.accent) + '"></span>' +
        '<span class="ad-h2">' + escH((g.name && (g.name.es || g.name.en)) || 'Group') + '</span>' +
        '<span class="ad-item-tools" style="margin-left:auto">' +
        '<button class="ad-tool" data-gmove="up" data-gi="' + gi + '"' + (gi === 0 ? ' disabled style="opacity:.3"' : '') + '>' + IC.up + '</button>' +
        '<button class="ad-tool" data-gmove="down" data-gi="' + gi + '"' + (gi === arr.length - 1 ? ' disabled style="opacity:.3"' : '') + '>' + IC.down + '</button>' +
        '<button class="ad-tool del" data-gdel="' + gi + '">' + IC.trash + '</button></span></div>' +
        bi('Group name', g, 'name') + fld('Accent colour', swatch(g, 'accent')) +
        '<div class="ad-field"><label class="ad-lbl">Links</label><div class="ad-sub-list">';
      (g.links || []).forEach((l, li) => {
        h += '<div class="ad-sub-item">' + inp(l, 'name', '', 'Name') + inp(l, 'url', '', 'https://') + '<button class="ad-tool del" data-ldel="' + gi + ':' + li + '">' + IC.trash + '</button></div>';
      });
      h += '<button class="ad-mini-add" data-ladd="' + gi + '">' + IC.plus + ' Add link</button></div></div></div>';
    });
    h += '<button class="ad-mini-add" data-gadd="1">' + IC.plus + ' Add group</button>';
    return h;
  }

  function iformsPanel(key) {
    const arr = wd(key); let h = '';
    arr.forEach((g, gi) => {
      h += '<div class="ad-group-block"><div class="ad-group-hd"><span class="ad-item-dot" style="background:' + colorHex(g.accent) + '"></span>' +
        '<span class="ad-h2">' + escH((g.level && (g.level.es || g.level.en)) || 'Level') + '</span>' +
        '<span class="ad-item-tools" style="margin-left:auto">' +
        '<button class="ad-tool" data-gmove="up" data-gi="' + gi + '"' + (gi === 0 ? ' disabled style="opacity:.3"' : '') + '>' + IC.up + '</button>' +
        '<button class="ad-tool" data-gmove="down" data-gi="' + gi + '"' + (gi === arr.length - 1 ? ' disabled style="opacity:.3"' : '') + '>' + IC.down + '</button>' +
        '<button class="ad-tool del" data-gdel="' + gi + '">' + IC.trash + '</button></span></div>' +
        bi('Level name', g, 'level') + fld('Accent colour', swatch(g, 'accent')) +
        '<div class="ad-field"><label class="ad-lbl">Forms</label><div class="ad-sub-list">';
      (g.forms || []).forEach((f, fi) => {
        h += '<div style="margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--hairline)">' +
          '<div class="ad-sub-item" style="margin-bottom:6px">' + inp(f, 'name.en', '', 'Name EN') + inp(f, 'name.es', '', 'Name ES') + '<button class="ad-tool del" data-fdel="' + gi + ':' + fi + '">' + IC.trash + '</button></div>' +
          inp(f, 'url', '', 'https://') + '</div>';
      });
      h += '<button class="ad-mini-add" data-fadd="' + gi + '">' + IC.plus + ' Add form</button></div></div></div>';
    });
    h += '<button class="ad-mini-add" data-gadd="1">' + IC.plus + ' Add level</button>';
    return h;
  }

  function presPanel(key) {
    const arr = wd(key); let h = '<div class="ad-sub-list" style="border:none;padding:0">';
    arr.forEach((p, i) => {
      h += '<div class="ad-sub-item">' + inp(p, 'name', '', 'Name') + inp(p, 'url', '', 'https://') +
        '<button class="ad-tool" data-move="up" data-i="' + i + '"' + (i === 0 ? ' disabled style="opacity:.3"' : '') + '>' + IC.up + '</button>' +
        '<button class="ad-tool del" data-del="' + i + '">' + IC.trash + '</button></div>';
    });
    h += '</div><button class="ad-mini-add" data-padd="1">' + IC.plus + ' Add presentation</button>';
    return h;
  }

  function docsPanel(key) {
    const obj = wd(key); let h = '';
    const order = ['North', 'Quilmes', 'OneSchool'];
    const keys = order.filter(k => obj[k]).concat(Object.keys(obj).filter(k => order.indexOf(k) < 0));
    keys.forEach(ck => {
      const list = obj[ck] || (obj[ck] = []);
      h += '<div class="ad-group-block"><div class="ad-group-hd"><span class="ad-h2">' + escH(ck === 'OneSchool' ? 'One School' : ck) + '</span></div><div class="ad-sub-list">';
      list.forEach((d, di) => {
        h += '<div class="ad-sub-item">' + inp(d, 'name', '', 'Name') + inp(d, 'url', '', 'https://') + '<button class="ad-tool del" data-docdel="' + ck + ':' + di + '">' + IC.trash + '</button></div>';
      });
      h += '<button class="ad-mini-add" data-docadd="' + ck + '">' + IC.plus + ' Add document</button></div></div>';
    });
    return h;
  }

  function designsPanel(key) {
    const obj = wd(key); let h = '';
    Object.keys(obj).forEach(cat => {
      const list = obj[cat] || [];
      h += '<div class="ad-group-block"><div class="ad-group-hd"><span class="ad-h2">' + escH(cat) + '</span>' +
        '<span class="ad-item-tools" style="margin-left:auto"><button class="ad-tool del" data-catdel="' + escA(cat) + '">' + IC.trash + '</button></span></div>';
      list.forEach((t, ti) => {
        h += '<div style="background:var(--surface);border:1px solid var(--hairline);border-radius:9px;padding:12px;margin-bottom:10px">' +
          '<div class="ad-sub-item" style="margin-bottom:8px"><span class="ad-item-name" style="font-weight:700">' + escH(t.name || '—') + (t.variations ? ' · ' + t.variations.length + ' var.' : '') + '</span>' +
          '<button class="ad-tool del" data-desdel="' + escA(cat) + ':' + ti + '">' + IC.trash + '</button></div>' +
          fld('Name', inp(t, 'name')) + '<div class="ad-row2">' + fld('Template URL', inp(t, 'url', '', 'https://canva…')) + fld('Preview URL (Drive)', inp(t, 'preview', '', 'https://drive…')) + '</div>' +
          fld('Usage note', inp(t, 'usage')) + '</div>';
      });
      h += '<button class="ad-mini-add" data-desadd="' + escA(cat) + '">' + IC.plus + ' Add template</button></div>';
    });
    h += '<button class="ad-mini-add" data-catadd="1">' + IC.plus + ' Add category</button>';
    return h;
  }

  function settingsPanel() {
    const key = S.get('driveApiKey', '');
    const cid = S.get('googleClientId', '');
    const emails = S.get('adminEmails', 'marketing@stgeorges.edu.ar');
    return '<div class="ad-group-block"><div class="ad-group-hd"><span class="ad-h2">Google sign-in (SSO)</span></div>' +
      '<div class="ad-field"><label class="ad-lbl">OAuth Client ID</label>' +
      '<input class="ad-in" id="ad-gclient" value="' + escA(cid) + '" placeholder="xxxxx.apps.googleusercontent.com" autocomplete="off"/></div>' +
      '<div class="ad-field"><label class="ad-lbl">Authorised admin emails</label>' +
      '<input class="ad-in" id="ad-gemails" value="' + escA(emails) + '" placeholder="marketing@stgeorges.edu.ar, @stgeorges.edu.ar" autocomplete="off"/></div>' +
      '<p class="ad-sub" style="margin:6px 0 0">Comma-separated. Use a full address (marketing@stgeorges.edu.ar) or a whole domain (@stgeorges.edu.ar). With a Client ID set, a “Sign in with Google” button appears on the login. Add your site’s URL to “Authorised JavaScript origins” in Google Cloud Console.</p></div>' +
      '<div class="ad-group-block"><div class="ad-group-hd"><span class="ad-h2">Google Drive</span></div>' +
      '<div class="ad-field"><label class="ad-lbl">Drive API key</label>' +
      '<input class="ad-in" id="ad-drivekey" value="' + escA(key) + '" placeholder="AIza…" autocomplete="off"/></div>' +
      '<p class="ad-sub" style="margin:10px 0 0">Used by the <b>Policies</b> page to list the Drive folder’s contents as cards. Enable the <b>Google Drive API</b> in Google Cloud Console and share the folder as “Anyone with the link → Viewer”. Leave blank to fall back to the embedded Drive viewer.</p></div>';
  }

  function panelHtml(key) {
    const kind = (TYPES.find(t => t.key === key) || {}).kind;
    if (kind === 'flat') return flatPanel(key);
    if (kind === 'groups') return groupsPanel(key);
    if (kind === 'iforms') return iformsPanel(key);
    if (kind === 'pres') return presPanel(key);
    if (kind === 'docs') return docsPanel(key);
    if (kind === 'designs') return designsPanel(key);
    if (kind === 'settings') return settingsPanel();
    return '';
  }

  /* ---------- render editor ---------- */
  function renderEditor() {
    registry = {};
    const def = TYPES.find(t => t.key === state.active);
    const kind = def.kind;
    const showAdd = (kind === 'flat');
    const main = document.getElementById('ad-main');
    main.innerHTML = '<div class="ad-head"><div><div class="ad-h">' + def.label + '</div></div>' +
      (showAdd ? '<button class="ad-add" id="ad-add-btn">' + IC.plus + ' Add ' + def.label.replace(/s$/, '').toLowerCase() + '</button>' : '') + '</div>' +
      '<p class="ad-sub">' + (SUBTITLE[state.active] || '') + '</p>' +
      '<div id="ad-panel">' + panelHtml(state.active) + '</div>';
    document.querySelectorAll('.ad-nav-item').forEach(b => b.classList.toggle('on', b.getAttribute('data-type') === state.active));
    bindEditor();
  }
  function repanel() { registry = {}; document.querySelectorAll('.ad-nav-item').forEach(()=>{}); document.getElementById('ad-panel').innerHTML = panelHtml(state.active); bindEditor(); }

  /* ---------- bind ---------- */
  function bindEditor() {
    const main = document.getElementById('ad-main');
    if (state.active === 'settings') {
      const k = document.getElementById('ad-drivekey'); if (k) k.addEventListener('input', function () { S.set('driveApiKey', k.value.trim()); flashSaved(); });
      const gc = document.getElementById('ad-gclient'); if (gc) gc.addEventListener('input', function () { S.set('googleClientId', gc.value.trim()); flashSaved(); });
      const ge = document.getElementById('ad-gemails'); if (ge) ge.addEventListener('input', function () { S.set('adminEmails', ge.value.trim()); flashSaved(); });
      return;
    }
    main.querySelectorAll('[data-toggle]').forEach(h => h.addEventListener('click', e => { if (e.target.closest('.ad-item-tools')) return; h.parentNode.classList.toggle('open'); }));
    const addBtn = document.getElementById('ad-add-btn');
    if (addBtn) addBtn.addEventListener('click', () => { wd(state.active).unshift(newItem(state.active)); commit(state.active); renderEditor(); });
    // generic field inputs
    main.querySelectorAll('[data-oid]').forEach(el => {
      const ev = (el.type === 'checkbox' || el.tagName === 'SELECT') ? 'change' : 'input';
      el.addEventListener(ev, () => {
        const o = registry[el.getAttribute('data-oid')]; if (!o) return;
        let v = el.value; if (el.getAttribute('data-bool')) v = el.checked;
        setPath(o, el.getAttribute('data-prop'), v); commit(state.active);
        const nm = el.closest('.ad-item'); if (nm) { const lab = nm.querySelector('.ad-item-name'); if (lab && /name|prop="(title|name)/.test(el.getAttribute('data-prop')) || (lab && el.getAttribute('data-prop').match(/^(title|name|d|m)/))) lab.textContent = itemName(state.active, registry[nm.querySelector('[data-toggle] .ad-item-dot') ? '' : ''] || o); }
      });
    });
    // swatches
    main.querySelectorAll('[data-sw]').forEach(b => b.addEventListener('click', () => {
      const o = registry[b.getAttribute('data-oid')]; if (!o) return;
      setPath(o, b.getAttribute('data-prop'), b.getAttribute('data-sw')); commit(state.active);
      b.parentNode.querySelectorAll('.ad-sw').forEach(s => s.classList.remove('on')); b.classList.add('on');
    }));
    // move / delete (flat + pres)
    main.querySelectorAll('[data-move]').forEach(b => b.addEventListener('click', () => { const arr = wd(state.active); const i = +b.getAttribute('data-i'); const j = b.getAttribute('data-move') === 'up' ? i - 1 : i + 1; if (j < 0 || j >= arr.length) return; const t = arr[i]; arr[i] = arr[j]; arr[j] = t; commit(state.active); renderEditor(); }));
    main.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => { if (!confirm('Delete this item?')) return; wd(state.active).splice(+b.getAttribute('data-del'), 1); commit(state.active); renderEditor(); }));
    // groups
    main.querySelectorAll('[data-gmove]').forEach(b => b.addEventListener('click', () => { const arr = wd(state.active); const i = +b.getAttribute('data-gi'); const j = b.getAttribute('data-gmove') === 'up' ? i - 1 : i + 1; if (j < 0 || j >= arr.length) return; const t = arr[i]; arr[i] = arr[j]; arr[j] = t; commit(state.active); repanel(); }));
    main.querySelectorAll('[data-gdel]').forEach(b => b.addEventListener('click', () => { if (!confirm('Delete this group and all its items?')) return; wd(state.active).splice(+b.getAttribute('data-gdel'), 1); commit(state.active); repanel(); }));
    main.querySelectorAll('[data-gadd]').forEach(b => b.addEventListener('click', () => { const arr = wd(state.active); if (state.active === 'tools') arr.push({ name: { en: 'New group', es: 'Nuevo grupo' }, accent: 'var(--navy)', links: [] }); else arr.push({ level: { en: 'New level', es: 'Nuevo nivel' }, accent: 'var(--navy)', forms: [] }); commit(state.active); repanel(); }));
    main.querySelectorAll('[data-ladd]').forEach(b => b.addEventListener('click', () => { wd(state.active)[+b.getAttribute('data-ladd')].links.push({ name: 'New tool', url: 'https://' }); commit(state.active); repanel(); }));
    main.querySelectorAll('[data-ldel]').forEach(b => b.addEventListener('click', () => { const p = b.getAttribute('data-ldel').split(':'); wd(state.active)[+p[0]].links.splice(+p[1], 1); commit(state.active); repanel(); }));
    main.querySelectorAll('[data-fadd]').forEach(b => b.addEventListener('click', () => { wd(state.active)[+b.getAttribute('data-fadd')].forms.push({ name: { en: 'New form', es: 'Nuevo formulario' }, url: 'https://' }); commit(state.active); repanel(); }));
    main.querySelectorAll('[data-fdel]').forEach(b => b.addEventListener('click', () => { const p = b.getAttribute('data-fdel').split(':'); wd(state.active)[+p[0]].forms.splice(+p[1], 1); commit(state.active); repanel(); }));
    // presentations
    main.querySelectorAll('[data-padd]').forEach(b => b.addEventListener('click', () => { wd(state.active).push({ name: 'New template', url: 'https://' }); commit(state.active); repanel(); }));
    // documents
    main.querySelectorAll('[data-docadd]').forEach(b => b.addEventListener('click', () => { wd(state.active)[b.getAttribute('data-docadd')].push({ name: 'New document', url: 'https://' }); commit(state.active); repanel(); }));
    main.querySelectorAll('[data-docdel]').forEach(b => b.addEventListener('click', () => { const p = b.getAttribute('data-docdel').split(':'); wd(state.active)[p[0]].splice(+p[1], 1); commit(state.active); repanel(); }));
    // designs
    main.querySelectorAll('[data-desadd]').forEach(b => b.addEventListener('click', () => { const cat = b.getAttribute('data-desadd'); wd(state.active)[cat].push({ name: 'New template', url: 'https://', preview: '', usage: '', fields: [] }); commit(state.active); repanel(); }));
    main.querySelectorAll('[data-desdel]').forEach(b => b.addEventListener('click', () => { const p = b.getAttribute('data-desdel').split(':'); if (!confirm('Delete this template?')) return; wd(state.active)[p[0]].splice(+p[1], 1); commit(state.active); repanel(); }));
    main.querySelectorAll('[data-catadd]').forEach(b => b.addEventListener('click', () => { const n = prompt('New category name:'); if (!n) return; wd(state.active)[n] = []; commit(state.active); repanel(); }));
    main.querySelectorAll('[data-catdel]').forEach(b => b.addEventListener('click', () => { if (!confirm('Delete this whole category?')) return; delete wd(state.active)[b.getAttribute('data-catdel')]; commit(state.active); repanel(); }));
  }

  /* ---------- shell ---------- */
  function flashSaved() { const s = document.getElementById('ad-saved'); if (!s) return; s.classList.add('show'); clearTimeout(flashSaved._t); flashSaved._t = setTimeout(() => s.classList.remove('show'), 1400); }

  function renderShell() {
    const ov = document.getElementById('ad-overlay');
    if (localStorage.getItem(AUTH_KEY) !== '1') { ov.innerHTML = loginHtml(); bindLogin(); return; }
    state.working = {};
    let nav = '';
    TYPES.forEach(t => { if (t.sep) { nav += '<div class="ad-nav-sep"></div>'; return; } nav += '<button class="ad-nav-item" data-type="' + t.key + '">' + IC[t.icon] + '<span class="ad-nav-lbl">' + t.label + '</span></button>'; });
    ov.innerHTML = '<div class="ad-shell">' +
      '<div class="ad-top"><div class="ad-title"><span class="ad-lock">' + IC.cog + '</span>Back Office</div>' +
      '<span class="ad-badge">The Georgian Network</span>' +
      '<div class="ad-top-actions"><span class="ad-saved" id="ad-saved">' + IC.check + ' Saved</span>' +
      '<button class="ad-x" id="ad-close">' + IC.x + '</button></div></div>' +
      '<div class="ad-body"><div class="ad-nav">' + nav + '</div><div class="ad-main" id="ad-main"></div></div>' +
      '<div class="ad-foot">' +
      '<button class="ad-fbtn" id="ad-export">' + IC.download + ' Export JSON</button>' +
      '<button class="ad-fbtn" id="ad-import">' + IC.upload + ' Import JSON</button>' +
      '<button class="ad-fbtn warn" id="ad-resetall">' + IC.reset + ' Reset all</button>' +
      '<button class="ad-fbtn" id="ad-logout">' + IC.out + ' Log out</button>' +
      '<button class="ad-publish" id="ad-publish">' + IC.check + ' Apply to site (reload)</button>' +
      '<input type="file" id="ad-file" accept="application/json" style="display:none"/></div></div>';
    document.querySelectorAll('.ad-nav-item').forEach(b => b.addEventListener('click', () => { state.active = b.getAttribute('data-type'); renderEditor(); }));
    document.getElementById('ad-close').addEventListener('click', close);
    document.getElementById('ad-logout').addEventListener('click', () => { localStorage.removeItem(AUTH_KEY); localStorage.removeItem('tgn-admin-user'); renderShell(); });
    document.getElementById('ad-publish').addEventListener('click', () => { location.reload(); });
    document.getElementById('ad-export').addEventListener('click', exportJson);
    document.getElementById('ad-import').addEventListener('click', () => document.getElementById('ad-file').click());
    document.getElementById('ad-file').addEventListener('change', importJson);
    document.getElementById('ad-resetall').addEventListener('click', () => { if (confirm('Reset ALL content back to the original defaults? This clears every edit.')) { S.replaceAll({}); location.reload(); } });
    renderEditor();
  }

  function loginHtml() {
    const cid = googleClientId();
    let body;
    if (cid) {
      body = '<p>Sign in with your authorised St George\u2019s Google account.</p>' +
        '<div class="ad-err" id="ad-err"></div>' +
        '<div id="ad-google" class="ad-google"></div>' +
        '<p class="ad-note">Only authorised accounts can access the Back Office.</p>';
    } else {
      body = '<p>Enter the Marketing team email and password to edit the intranet content.</p>' +
        '<div class="ad-err" id="ad-err"></div>' +
        '<input class="ad-in" id="ad-email" type="email" placeholder="marketing@stgeorges.edu.ar" autocomplete="off"/>' +
        '<input class="ad-in" id="ad-pass" type="password" placeholder="Password" autocomplete="off"/>' +
        '<button class="ad-login-btn" id="ad-enter">Enter</button>' +
        '<p class="ad-note">Tip: set up <b>Google sign-in</b> in Settings for secure access without a shared password.</p>';
    }
    return '<div class="ad-shell" style="max-width:520px;margin:auto;align-self:center"><div class="ad-top"><div class="ad-title"><span class="ad-lock">' + IC.lock + '</span>Back Office</div><div class="ad-top-actions"><button class="ad-x" id="ad-close">' + IC.x + '</button></div></div>' +
      '<div class="ad-login"><div class="ad-login-ico">' + IC.lock + '</div><h2>Marketing access</h2>' + body + '</div></div>';
  }
  function bindLogin() {
    document.getElementById('ad-close').addEventListener('click', close);
    const cid = googleClientId();
    if (cid) {
      loadGIS().then(function () {
        try { google.accounts.id.initialize({ client_id: cid, callback: handleGoogleCredential }); google.accounts.id.renderButton(document.getElementById('ad-google'), { theme: 'filled_blue', size: 'large', text: 'signin_with', shape: 'pill', width: 300 }); } catch (e) {}
      }).catch(function () {});
      return;
    }
    const go = () => {
      const v = (document.getElementById('ad-email').value || '').trim().toLowerCase();
      const p = (document.getElementById('ad-pass').value || '');
      if (v === ADMIN_EMAIL && p === ADMIN_PASS) { localStorage.setItem(AUTH_KEY, '1'); renderShell(); }
      else { document.getElementById('ad-err').textContent = (v === ADMIN_EMAIL && p !== ADMIN_PASS) ? 'Incorrect password.' : 'Those credentials do not have access.'; }
    };
    document.getElementById('ad-enter').addEventListener('click', go);
    document.getElementById('ad-email').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('ad-pass').focus(); });
    document.getElementById('ad-pass').addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    document.getElementById('ad-email').focus();
  }

  function exportJson() {
    const out = {};
    TYPES.forEach(t => { if (t.key) out[t.key] = strip(load(t.key)); });
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'georgian-network-content.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function importJson(e) {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => { try { const obj = JSON.parse(r.result); let n = 0; TYPES.forEach(t => { if (t.key && obj[t.key] !== undefined) { S.set(t.key, obj[t.key]); n++; } }); alert('Imported ' + n + ' sections. The site will reload.'); location.reload(); } catch (err) { alert('Could not read that file: ' + err.message); } };
    r.readAsText(file);
  }

  function open() { document.getElementById('ad-overlay').classList.add('open'); document.body.style.overflow = 'hidden'; renderShell(); }
  function close() { document.getElementById('ad-overlay').classList.remove('open'); document.body.style.overflow = ''; if (location.hash === '#admin') history.replaceState(null, '', location.pathname); }

  /* ---------- init ---------- */
  function init() {
    if (!document.getElementById('ad-overlay')) { const d = document.createElement('div'); d.id = 'ad-overlay'; d.className = 'ad-overlay'; document.body.appendChild(d); }
    const btn = document.getElementById('btn-admin');
    if (btn) { btn.innerHTML = IC.cog; btn.addEventListener('click', open); }
    if (location.hash === '#admin') open();
    window.addEventListener('hashchange', () => { if (location.hash === '#admin') open(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { const ov = document.getElementById('ad-overlay'); if (ov && ov.classList.contains('open')) close(); } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
