/* ============================================================
   The Georgian Network — Remote sync (global content)
   Reads central content from the Apps Script backend (JSONP) and
   publishes Back Office changes to it. Falls back silently to
   local-only mode when no backend URL is configured.
   Loads AFTER data.js (needs TGN.config.remoteUrl), BEFORE app.js.

   Publishing uses fetch POST with Content-Type text/plain: Apps
   Script serves the (redirected) response with CORS * so the result
   IS readable — we wait for it, detect a wrong password, and only
   mark the device as synced when the server confirms the save.
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

  /* Publish current local content to everyone.
     Returns a Promise resolving to {ok:true, rev} or {ok:false, error}. */
  function publish() {
    if (!URL) return Promise.resolve({ ok: false, error: 'not-configured' });
    var token = localStorage.getItem(TOKEN_KEY) || '';
    if (!token) return Promise.resolve({ ok: false, error: 'no-token' });
    var content = window.TGNStore.all();
    var rev = Date.now();
    return fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'save', token: token, rev: rev, content: content })
    }).then(function (r) { return r.json(); }).then(function (resp) {
      if (resp && resp.ok) {
        var srvRev = resp.rev || rev;
        try { localStorage.setItem(REV_KEY, String(srvRev)); } catch (e) {}
        return { ok: true, rev: srvRev };
      }
      return { ok: false, error: (resp && resp.error) || 'save-failed' };
    }).catch(function (e) {
      return { ok: false, error: 'network (' + (e && e.message ? e.message : 'fetch') + ')' };
    });
  }

  /* Re-read the backend and confirm the published revision is live.
     Resolves to true/false. */
  function verify(expectedRev) {
    return new Promise(function (resolve) {
      if (!URL) return resolve(false);
      jsonp(URL + '?action=get&_=' + Date.now(), function (resp) {
        resolve(!!(resp && +resp.rev === +expectedRev));
      });
    });
  }

  window.TGNRemote = {
    configured: !!URL,
    hasToken: function () { return !!localStorage.getItem(TOKEN_KEY); },
    setToken: function (t) { if (t) localStorage.setItem(TOKEN_KEY, t); else localStorage.removeItem(TOKEN_KEY); },
    getToken: function () { return localStorage.getItem(TOKEN_KEY) || ''; },
    publish: publish,
    verify: verify
  };

  pull();
})();
