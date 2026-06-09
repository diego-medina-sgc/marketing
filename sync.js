/* ============================================================
   The Georgian Network — Remote sync (global content)
   Reads central content from the Apps Script backend (JSONP) and
   publishes Back Office changes to it. Falls back silently to
   local-only mode when no backend URL is configured.
   Loads AFTER data.js (needs TGN.config.remoteUrl), BEFORE app.js.
   ============================================================ */
(function () {
  'use strict';
  var URL = (window.TGN && window.TGN.config && window.TGN.config.remoteUrl) || '';
  var TOKEN_KEY = 'tgn-publish-token';
  var REV_KEY = 'tgn-remote-rev';
  var APPLIED = 'tgn-remote-applied';
  var BACKUP_KEY = 'tgn-cms-v1-backup-before-remote';

  function jsonp(url, cb) {
    var name = '__tgnCb' + Date.now();
    var done = false;
    window[name] = function (data) { done = true; cleanup(); cb(data); };
    var s = document.createElement('script');
    s.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'cb=' + name;
    s.onerror = function () { cleanup(); cb(null); };
    function cleanup() { try { delete window[name]; } catch (e) { window[name] = undefined; } if (s.parentNode) s.parentNode.removeChild(s); }
    document.head.appendChild(s);
    setTimeout(function () { if (!done) { cleanup(); cb(null); } }, 8000);
  }

  function applyContent(content, rev) {
    try { localStorage.setItem(BACKUP_KEY, localStorage.getItem(window.TGNStore.KEY) || '{}'); } catch (e) {}
    try { localStorage.setItem(window.TGNStore.KEY, JSON.stringify(content || {})); } catch (e) {}
    try { localStorage.setItem(REV_KEY, String(rev)); } catch (e) {}
  }

  function pull() {
    if (!URL) return;
    jsonp(URL + '?action=get', function (resp) {
      if (!resp || resp.error || !resp.content) return;
      var rev = +(resp.rev || 0);
      var localRev = +(localStorage.getItem(REV_KEY) || 0);
      if (rev > localRev) {
        applyContent(resp.content, rev);
        if (!sessionStorage.getItem(APPLIED)) {
          sessionStorage.setItem(APPLIED, '1');
          location.reload();
        }
      }
    });
  }

  // Publish current local content to everyone. Returns true if a request was sent.
  function publish() {
    if (!URL) return false;
    var token = localStorage.getItem(TOKEN_KEY) || '';
    if (!token) return false;
    var content = window.TGNStore.all();
    var rev = Date.now();
    try {
      fetch(URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'save', token: token, rev: rev, content: content })
      });
      localStorage.setItem(REV_KEY, String(rev));
      return { ok: true, mode: 'sent' };
    } catch (e) { return { ok: false, error: e }; }
  }

  window.TGNRemote = {
    configured: !!URL,
    hasToken: function () { return !!localStorage.getItem(TOKEN_KEY); },
    setToken: function (t) { if (t) localStorage.setItem(TOKEN_KEY, t); else localStorage.removeItem(TOKEN_KEY); },
    getToken: function () { return localStorage.getItem(TOKEN_KEY) || ''; },
    publish: publish
  };

  pull();
})();
