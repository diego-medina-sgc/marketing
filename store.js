/* ============================================================
   The Georgian Network — Content Store
   Lightweight CMS overlay. Defaults live in data.js / marketing.js;
   edits made in the Back Office are saved here (localStorage) and
   overlaid on top of the defaults at load time.
   Must load BEFORE data.js and marketing.js.
   ============================================================ */
window.TGNStore = (function () {
  const KEY = 'tgn-cms-v1';
  function all() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function get(key, fallback) { const o = all(); return (o && Object.prototype.hasOwnProperty.call(o, key)) ? o[key] : fallback; }
  function set(key, val) { const o = all(); o[key] = val; localStorage.setItem(KEY, JSON.stringify(o)); }
  function reset(key) { const o = all(); delete o[key]; localStorage.setItem(KEY, JSON.stringify(o)); }
  function isOverridden(key) { return Object.prototype.hasOwnProperty.call(all(), key); }
  function replaceAll(obj) { localStorage.setItem(KEY, JSON.stringify(obj || {})); }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  return { all, get, set, reset, isOverridden, replaceAll, clone, KEY };
})();
