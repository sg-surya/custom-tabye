/* ========================================
   Search Engine - Local Search
   Vasudev AI - Full Width
   ======================================== */

(function() {
  "use strict";

  // Elements
  var searchInput = document.getElementById("searchInput");
  var searchWrapper = document.getElementById("searchWrapper");
  var omnibox = document.getElementById("omnibox");
  var resultsInfo = document.getElementById("resultsInfo");
  var resultsCount = document.getElementById("resultsCount");
  var resultsTime = document.getElementById("resultsTime");
  var resultsContainer = document.getElementById("resultsContainer");
  var loading = document.getElementById("loading");
  var noResults = document.getElementById("noResults");
  var pagination = document.getElementById("pagination");

  // State
  var allResults = [];
  var currentPage = 1;
  var perPage = 10;
  var omniIndex = -1;
  var omniList = [];
  var timer = null;

  // Local data
  var data = {
    docks: [],
    notes: "",
    tasks: [],
    links: []
  };

  // Init
  function init() {
    loadData();
    
    var q = getQuery();
    if (q) {
      searchInput.value = q;
      doSearch(q);
    } else {
      searchInput.focus();
    }

    // Events
    searchInput.addEventListener("input", onInput);
    searchInput.addEventListener("keydown", onKey);
    searchInput.addEventListener("focus", function() {
      var q = searchInput.value.trim();
      if (q.length >= 1) showOmni(q);
    });
    searchInput.addEventListener("blur", function() {
      setTimeout(function() { omnibox.classList.remove("open"); }, 150);
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", function(e) {
      if (e.key === "/" && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === "Escape") {
        omnibox.classList.remove("open");
      }
    });
  }

  function getQuery() {
    var p = new URLSearchParams(window.location.search);
    return p.get("q") || "";
  }

  function loadData() {
    try {
      data.docks = JSON.parse(localStorage.getItem("vasudev_dock_sites")) || getDefaultSites();
      data.notes = localStorage.getItem("vasudev_notes") || "";
      data.tasks = JSON.parse(localStorage.getItem("vasudev_tasks")) || [];
      data.links = JSON.parse(localStorage.getItem("vasudev_quicklinks")) || [];
    } catch(e) {
      data.docks = getDefaultSites();
    }
  }

  function getDefaultSites() {
    return [
      { name: "Vasudev AI", url: "https://vasudev.online", domain: "vasudev.online" },
      { name: "YouTube", url: "https://youtube.com", domain: "youtube.com" },
      { name: "ChatGPT", url: "https://chatgpt.com", domain: "chatgpt.com" },
      { name: "GitHub", url: "https://github.com", domain: "github.com" }
    ];
  }

  function onInput() {
    var q = searchInput.value.trim();
    clearTimeout(timer);
    
    if (q.length >= 1) {
      timer = setTimeout(function() { showOmni(q); }, 150);
    } else {
      omnibox.classList.remove("open");
    }
  }

  function onKey(e) {
    if (e.key === "Enter") {
      var q = searchInput.value.trim();
      if (!q) return;
      
      if (omniIndex >= 0 && omniList[omniIndex]) {
        q = omniList[omniIndex].text;
        searchInput.value = q;
      }
      
      doSearch(q);
      
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      moveOmni(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveOmni(-1);
    }
  }

  function moveOmni(dir) {
    if (omniList.length === 0) return;
    omniIndex = Math.max(0, Math.min(omniIndex + dir, omniList.length - 1));
    updateOmniUI();
  }

  function showOmni(q) {
    omniList = [];
    var lower = q.toLowerCase();

    // Search docks
    data.docks.forEach(function(s) {
      if (s.name && s.name.toLowerCase().includes(lower)) {
        omniList.push({ text: s.name, type: "bookmark" });
      }
    });

    // Search links
    data.links.forEach(function(l) {
      if (l.name && l.name.toLowerCase().includes(lower)) {
        omniList.push({ text: l.name, type: "link" });
      }
    });

    // Add direct search
    omniList.push({ text: q, type: "search" });

    omniList = omniList.slice(0, 6);
    omniIndex = -1;
    updateOmniUI();
  }

  function updateOmniUI() {
    omnibox.innerHTML = "";
    
    if (omniList.length === 0) {
      omnibox.classList.remove("open");
      return;
    }

    omniList.forEach(function(item, i) {
      var div = document.createElement("div");
      div.className = "omni-item" + (i === omniIndex ? " active" : "");
      var icon = item.type === "bookmark" ? "★" : item.type === "link" ? "🔗" : "🔍";
      
      div.innerHTML = 
        '<svg class="omni-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">' +
        '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' +
        '<span class="omni-text">' + esc(item.text) + '</span>' +
        '<span class="omni-type">' + icon + '</span>';
      
      div.addEventListener("mousedown", function(e) {
        e.preventDefault();
        searchInput.value = item.text;
        doSearch(item.text);
      });
      
      div.addEventListener("mouseenter", function() {
        omniIndex = i;
        updateOmniUI();
      });
      
      omnibox.appendChild(div);
    });

    omnibox.classList.add("open");
  }

  function doSearch(q) {
    // Update URL
    history.replaceState(null, "", "search.html?q=" + encodeURIComponent(q));
    
    // Hide all
    resultsInfo.classList.remove("show");
    resultsContainer.classList.remove("show");
    resultsContainer.innerHTML = "";
    noResults.classList.remove("show");
    pagination.classList.remove("show");
    
    // Show loading
    loading.classList.add("show");
    
    allResults = [];
    var lower = q.toLowerCase();
    var start = Date.now();

    // Search docks
    data.docks.forEach(function(s) {
      if ((s.name && s.name.toLowerCase().includes(lower)) ||
          (s.domain && s.domain.toLowerCase().includes(lower))) {
        allResults.push({
          type: "bookmark",
          icon: "★",
          title: s.name,
          url: s.url,
          desc: "Bookmark • " + (s.domain || "")
        });
      }
    });

    // Search links
    data.links.forEach(function(l) {
      if (l.name && l.name.toLowerCase().includes(lower)) {
        allResults.push({
          type: "link",
          icon: "🔗",
          title: l.name,
          url: l.url,
          desc: "Quick link"
        });
      }
    });

    // Search notes
    if (data.notes && data.notes.toLowerCase().includes(lower)) {
      var preview = data.notes.substring(0, 120).replace(/\n/g, " ");
      allResults.push({
        type: "note",
        icon: "📝",
        title: "Note matching: " + q,
        url: "index.html",
        desc: preview
      });
    }

    // Search tasks
    data.tasks.forEach(function(t) {
      if (t.text && t.text.toLowerCase().includes(lower)) {
        allResults.push({
          type: "task",
          icon: t.done ? "✓" : "○",
          title: t.text,
          url: "index.html",
          desc: t.done ? "Completed" : "Pending"
        });
      }
    });

    // If nothing found
    if (allResults.length === 0) {
      allResults = [
        { type: "engine", icon: "🔍", title: "Search on Google", url: "https://google.com/search?q=" + encodeURIComponent(q), desc: "Open Google search" },
        { type: "engine", icon: "🦆", title: "Search on DuckDuckGo", url: "https://duckduckgo.com/?q=" + encodeURIComponent(q), desc: "Open DuckDuckGo" },
        { type: "engine", icon: "🌐", title: "Search on Bing", url: "https://bing.com/search?q=" + encodeURIComponent(q), desc: "Open Bing" }
      ];
    }

    var time = ((Date.now() - start) / 1000).toFixed(2);
    
    setTimeout(function() {
      showResults(time);
    }, 250);
  }

  function showResults(time) {
    loading.classList.remove("show");
    
    resultsCount.textContent = allResults.length + " results found";
    resultsTime.textContent = "(" + time + "s)";
    resultsInfo.classList.add("show");

    if (allResults.length === 0) {
      noResults.classList.add("show");
      return;
    }

    resultsContainer.classList.add("show");
    
    var start = (currentPage - 1) * perPage;
    var page = allResults.slice(start, start + perPage);

    page.forEach(function(r, i) {
      var div = document.createElement("div");
      div.className = "result-card";
      div.style.animationDelay = (i * 0.08) + "s";
      div.innerHTML = 
        '<div class="result-meta"><span class="result-icon">' + r.icon + '</span>' + esc(r.desc) + '</div>' +
        '<h3 class="result-title"><a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.title) + '</a></h3>' +
        '<p class="result-desc">' + esc(r.desc) + '</p>';
      resultsContainer.appendChild(div);
    });

    // Pagination
    var totalPages = Math.ceil(allResults.length / perPage);
    if (totalPages > 1) {
      showPages(totalPages);
    }
  }

  function showPages(total) {
    pagination.innerHTML = "";
    pagination.classList.add("show");

    for (var i = 1; i <= Math.min(total, 5); i++) {
      var btn = document.createElement("button");
      btn.className = "page-btn" + (i === currentPage ? " active" : "");
      btn.textContent = i;
      btn.addEventListener("click", function() {
        currentPage = parseInt(this.textContent);
        window.scrollTo({ top: 0, behavior: "smooth" });
        showResults(0);
      });
      pagination.appendChild(btn);
    }
  }

  function esc(str) {
    if (!str) return "";
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  init();
})();