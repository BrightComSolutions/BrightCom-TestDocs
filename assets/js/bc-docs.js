/*
  BrightCom Docs — page interactions.
  Runs with `defer`, so DOM is available on first line.
*/
(function () {
  'use strict';

  var root = document.documentElement;
  var doc = document;

  // ------------------------------------------------------------------
  // Theme toggle (button lives in navbar). Flash prevention runs inline
  // in head-end.html; this block only owns the *toggle* behavior.
  // ------------------------------------------------------------------
  function applyTheme(t) {
    if (t === 'dark' || t === 'light') {
      root.setAttribute('data-theme', t);
    } else {
      root.removeAttribute('data-theme');
    }
  }
  function currentTheme() {
    return root.getAttribute('data-theme') || 'light';
  }
  doc.querySelectorAll('[data-bc-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('bc_theme', next); } catch (_) {}
    });
  });

  // ------------------------------------------------------------------
  // ⌘K / Ctrl+K — open search overlay. ESC closes. Clicking the navbar
  // search pill or the hero search button also opens.
  // ------------------------------------------------------------------
  var overlay = doc.getElementById('bc-search-overlay');
  var searchInput = overlay ? overlay.querySelector('input') : null;
  var searchResultsEl = overlay ? overlay.querySelector('#bc-search-results') : null;
  var searchHits = [];
  var selectedIdx = 0;
  var searchIndex = null;
  var searchIndexPromise = null;

  function openSearch() {
    if (!overlay) return;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    setTimeout(function () { if (searchInput) searchInput.focus(); }, 10);
    if (searchInput && searchInput.value === '') renderRecent();
  }
  function closeSearch() {
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }
  doc.querySelectorAll('[data-bc-search-open]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); openSearch(); });
  });
  if (overlay) {
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });
  }

  doc.addEventListener('keydown', function (e) {
    var isMod = e.metaKey || e.ctrlKey;
    if (isMod && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (overlay && overlay.classList.contains('open')) closeSearch(); else openSearch();
      return;
    }
    if (!overlay || !overlay.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeSearch(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); selectedIdx = Math.min(selectedIdx + 1, Math.max(searchHits.length - 1, 0)); paintSelection(); return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); selectedIdx = Math.max(selectedIdx - 1, 0); paintSelection(); return; }
    if (e.key === 'Enter') {
      var row = searchResultsEl && searchResultsEl.querySelector('.bc-sr.sel');
      if (row && row.dataset.href) { window.location.href = row.dataset.href; }
    }
  });

  // ---- Search engine: fetch Docsy's offlineSearch index and do a lightweight match ----
  function loadIndex() {
    if (searchIndex) return Promise.resolve(searchIndex);
    if (searchIndexPromise) return searchIndexPromise;
    var url = (doc.documentElement.getAttribute('data-bc-search-index')) || '/index.json';
    searchIndexPromise = fetch(url, { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error('index ' + r.status); return r.json(); })
      .then(function (j) { searchIndex = j; return j; })
      .catch(function () { searchIndex = []; return []; });
    return searchIndexPromise;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c];
    });
  }
  function highlight(text, q) {
    if (!q) return escapeHtml(text || '');
    var safe = escapeHtml(text || '');
    try {
      var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      return safe.replace(re, '<mark>$1</mark>');
    } catch (_) { return safe; }
  }
  function score(hit, q) {
    var ql = q.toLowerCase();
    var t = (hit.title || '').toLowerCase();
    var b = (hit.content || hit.description || hit.body || '').toLowerCase();
    var s = 0;
    if (t.indexOf(ql) === 0) s += 50;
    if (t.indexOf(ql) !== -1) s += 25;
    if (b.indexOf(ql) !== -1) s += 5;
    return s;
  }
  function markFromTitle(title) {
    var words = (title || '?').trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  function renderList(hits, q) {
    searchHits = hits;
    selectedIdx = 0;
    if (!searchResultsEl) return;
    if (!hits.length) {
      searchResultsEl.innerHTML =
        '<div class="bc-search-section-head">' + (q ? '0 results for "' + escapeHtml(q) + '"' : 'No results') + '</div>' +
        '<div style="padding:14px 12px 18px;color:var(--muted);font-size:13px;">Try a different term or broaden your query.</div>';
      return;
    }
    var html = '<div class="bc-search-section-head">' + hits.length + ' result' + (hits.length === 1 ? '' : 's') + '</div>';
    hits.forEach(function (h, i) {
      var href = h.ref || h.uri || h.url || '#';
      var path = (h.breadcrumb || h.url || href).replace(/^\//, '').replace(/\/$/, '').replace(/\//g, ' / ') || '—';
      var desc = h.description || h.excerpt || '';
      if (!desc && h.content) { desc = h.content.substring(0, 140); }
      html += '<a class="bc-sr' + (i === 0 ? ' sel' : '') + '" href="' + escapeHtml(href) + '" data-href="' + escapeHtml(href) + '">' +
        '<div class="bc-sr-mark">' + escapeHtml(markFromTitle(h.title)) + '</div>' +
        '<div class="bc-sr-body">' +
          '<div class="bc-sr-title">' + highlight(h.title || '(untitled)', q) + '</div>' +
          '<div class="bc-sr-path">' + escapeHtml(path) + '</div>' +
          (desc ? '<div class="bc-sr-desc">' + highlight(desc, q) + '</div>' : '') +
        '</div>' +
        '<span class="bc-sr-kbd">↵</span>' +
      '</a>';
    });
    searchResultsEl.innerHTML = html;
  }

  function paintSelection() {
    if (!searchResultsEl) return;
    var rows = searchResultsEl.querySelectorAll('.bc-sr');
    rows.forEach(function (r, i) { r.classList.toggle('sel', i === selectedIdx); });
    var sel = rows[selectedIdx];
    if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'nearest' });
  }

  function renderRecent() {
    if (!searchResultsEl) return;
    var list = [];
    try { list = JSON.parse(localStorage.getItem('bc_search_recent') || '[]'); } catch (_) {}
    if (!list.length) {
      searchResultsEl.innerHTML =
        '<div class="bc-search-section-head">Try searching</div>' +
        '<div style="padding:14px 12px 18px;color:var(--muted);font-size:13px;">Start typing to find guides, references and release notes.</div>';
      return;
    }
    renderList(list, '');
    var head = searchResultsEl.querySelector('.bc-search-section-head');
    if (head) head.textContent = 'Recent';
  }

  function runQuery(q) {
    if (!q || q.length < 2) { renderRecent(); return; }
    loadIndex().then(function (idx) {
      var arr = Array.isArray(idx) ? idx : (idx.pages || idx.index || []);
      var hits = [];
      arr.forEach(function (h) {
        var s = score(h, q);
        if (s > 0) hits.push({ hit: h, s: s });
      });
      hits.sort(function (a, b) { return b.s - a.s; });
      renderList(hits.slice(0, 20).map(function (x) { return x.hit; }), q);
    });
  }

  if (searchInput) {
    var deb;
    searchInput.addEventListener('input', function () {
      clearTimeout(deb);
      var q = searchInput.value.trim();
      deb = setTimeout(function () { runQuery(q); }, 120);
    });
  }

  // ------------------------------------------------------------------
  // Copy-code buttons (injected into every <pre> that doesn't have one)
  // ------------------------------------------------------------------
  doc.querySelectorAll('.td-content pre, .bc-article pre').forEach(function (pre) {
    if (pre.querySelector('.bc-copy')) return;
    var btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'bc-copy';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var code = pre.querySelector('code') || pre;
      var text = code.innerText;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = 'Copied';
          setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
        });
      }
    });
    pre.appendChild(btn);
  });

  // ------------------------------------------------------------------
  // Sidebar group collapse persistence
  // ------------------------------------------------------------------
  var SIDE_KEY = 'bc_nav_collapsed';
  function readCollapsed() {
    try { return JSON.parse(localStorage.getItem(SIDE_KEY) || '{}'); } catch (_) { return {}; }
  }
  function writeCollapsed(o) {
    try { localStorage.setItem(SIDE_KEY, JSON.stringify(o)); } catch (_) {}
  }
  (function restore() {
    var coll = readCollapsed();
    doc.querySelectorAll('.bc-sidebar [data-bc-group]').forEach(function (g) {
      var id = g.getAttribute('data-bc-group');
      if (coll[id]) g.classList.add('collapsed');
    });
  })();
  doc.querySelectorAll('.bc-sidebar .bc-group-head').forEach(function (h) {
    h.addEventListener('click', function () {
      var g = h.closest('[data-bc-group]');
      if (!g) return;
      g.classList.toggle('collapsed');
      var coll = readCollapsed();
      coll[g.getAttribute('data-bc-group')] = g.classList.contains('collapsed');
      writeCollapsed(coll);
    });
  });

  // ------------------------------------------------------------------
  // TOC scroll-spy — IntersectionObserver on article h2/h3
  // ------------------------------------------------------------------
  var tocList = doc.querySelector('.bc-toc-list');
  var headings = doc.querySelectorAll('.td-content h2[id], .td-content h3[id], .bc-article h2[id], .bc-article h3[id]');
  if (tocList && headings.length && 'IntersectionObserver' in window) {
    var active = null;
    var seen = {};
    var setActive = function (id) {
      if (active === id) return;
      active = id;
      tocList.querySelectorAll('a').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });
      for (var i = 0; i < headings.length; i++) {
        if (seen[headings[i].id]) { setActive(headings[i].id); return; }
      }
    }, { rootMargin: '-80px 0px -70% 0px' });
    headings.forEach(function (h) { io.observe(h); });
  }

  // ------------------------------------------------------------------
  // Feedback card (Was this page helpful?) — emit a CustomEvent for
  // downstream analytics. No network call by default.
  // ------------------------------------------------------------------
  doc.querySelectorAll('[data-bc-feedback]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var answer = btn.getAttribute('data-bc-feedback');
      var path = window.location.pathname;
      doc.dispatchEvent(new CustomEvent('bc:feedback', { detail: { answer: answer, path: path } }));
      var card = btn.closest('.bc-toc-feedback');
      if (card) card.innerHTML = '<div class="bc-f-q">Thanks — noted.</div>';
    });
  });
})();
