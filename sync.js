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

  // Publish current local content to everyone. Returns a promise resolving to boolean.
  function publish() {
    if (!URL) return Promise.resolve(false);
    var token = localStorage.getItem(TOKEN_KEY) || '';
    if (!token) return Promise.resolve(false);
    var content = window.TGNStore.all();
    var rev = Date.now();

    return fetch(URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ 
        token: token, 
        rev: rev, 
        content: content 
      })
    })
    .then(function (response) { return response.json(); })
    .then(function (data) {
      if (data && data.ok) {
        console.log("Sincronización remota exitosa:", data);
        localStorage.setItem(REV_KEY, String(rev));
        return true;
      } else {
        console.error("Error en la respuesta del servidor:", data.error);
        return false;
      }
    })
    .catch(function (err) {
      console.error("Error de red en la sincronización:", err);
      return false;
    });
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
