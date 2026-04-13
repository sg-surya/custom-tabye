/* ========================================
   VASUDEV AI - NEW TAB
   Main Script - All Functionality
   v5.0 - Dock+, Omnibox, Gradient Text
   ======================================== */

(function () {
  "use strict";

  // ========================================
  // KNOWN ELEMENT IDS (our whitelist)
  // ========================================
  var OUR_IDS = [
    "curtain", "bgGradient", "vasudevTopBar", "vasudevMain",
    "vasudevDock", "vasudevFooter", "clock", "hours", "minutes",
    "dateDisplay", "greeting", "searchInput", "themeToggle",
    "themeIcon", "widgetToggle", "widgetsPanel", "notesArea",
    "taskList", "newTaskInput", "clearDone", "calendarMonth",
    "calendarGrid", "dockAddBtn", "addSiteModal", "modalCard",
    "modalClose", "siteUrlInput", "siteNameInput", "modalCancel",
    "modalAdd", "omniboxDropdown", "githubBadge"
  ];

  function isOurElement(node) {
    if (!node || node.nodeType !== 1) return false;
    if (node.id && OUR_IDS.indexOf(node.id) !== -1) return true;
    var tag = (node.tagName || "").toLowerCase();
    if (tag === "main" || tag === "nav" || tag === "footer" ||
        tag === "script" || tag === "link" || tag === "style" || tag === "head") return true;
    if (node.classList) {
      if (node.classList.contains("vasudev-curtain") ||
          node.classList.contains("vasudev-bg-gradient") ||
          node.classList.contains("top-bar") ||
          node.classList.contains("dock") ||
          node.classList.contains("footer") ||
          node.classList.contains("main-container") ||
          node.classList.contains("modal-overlay") ||
          node.classList.contains("github-badge") ||
          node.classList.contains("blob3") ||
          node.classList.contains("blob4")) return true;
    }
    if (node.closest && (
      node.closest("#vasudevTopBar") ||
      node.closest("#vasudevMain") ||
      node.closest("#vasudevDock") ||
      node.closest("#vasudevFooter") ||
      node.closest("#addSiteModal") ||
      node.closest("#githubBadge") ||
      node.closest(".vasudev-bg-gradient") ||
      node.closest(".vasudev-curtain")
    )) return true;
    return false;
  }

  // ========================================
  // NUCLEAR CHROME KILL
  // ========================================
  function nukeChrome() {
    var children = Array.from(document.body.children);
    children.forEach(function (child) {
      if (!isOurElement(child)) {
        try { document.body.removeChild(child); } catch (e) {}
      }
    });
    Array.from(document.documentElement.children).forEach(function (child) {
      var tag = (child.tagName || "").toLowerCase();
      if (tag !== "head" && tag !== "body") {
        try { document.documentElement.removeChild(child); } catch (e) {}
      }
    });
  }

  nukeChrome();

  var chromeObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType === 1 && !isOurElement(node)) {
          try {
            if (node.parentNode) node.parentNode.removeChild(node);
          } catch (e) {}
        }
      });
    });
  });
  chromeObserver.observe(document.body, { childList: true, subtree: false });
  chromeObserver.observe(document.documentElement, { childList: true, subtree: false });

  var killRound = 0;
  var killTimer = setInterval(function () {
    nukeChrome();
    killRound++;
    if (killRound > 30) clearInterval(killTimer);
  }, 300);

  // ========================================
  // BACKGROUND GRADIENT - blobs 3 & 4
  // ========================================
  var bgGradient = document.getElementById("bgGradient");
  if (bgGradient) {
    var blob3 = document.createElement("div");
    blob3.className = "blob3";
    bgGradient.appendChild(blob3);

    var blob4 = document.createElement("div");
    blob4.className = "blob4";
    bgGradient.appendChild(blob4);
  }

  // ========================================
  // DOM ELEMENTS
  // ========================================
  var $ = function (sel) { return document.querySelector(sel); };
  var hoursEl = $("#hours");
  var minutesEl = $("#minutes");
  var dateEl = $("#dateDisplay");
  var greetingEl = $("#greeting");
  var searchInput = $("#searchInput");
  var themeToggle = $("#themeToggle");
  var themeIcon = $("#themeIcon");
  var widgetToggle = $("#widgetToggle");
  var widgetsPanel = $("#widgetsPanel");
  var notesArea = $("#notesArea");
  var taskList = $("#taskList");
  var newTaskInput = $("#newTaskInput");
  var clearDoneBtn = $("#clearDone");
  var calendarMonth = $("#calendarMonth");
  var calendarGrid = $("#calendarGrid");
  var dock = $("#vasudevDock");
  var dockAddBtn = $("#dockAddBtn");
  var modal = $("#addSiteModal");
  var modalClose = $("#modalClose");
  var modalCancel = $("#modalCancel");
  var modalAdd = $("#modalAdd");
  var siteUrlInput = $("#siteUrlInput");
  var siteNameInput = $("#siteNameInput");
  var omniboxDropdown = $("#omniboxDropdown");
  var searchWrapper = $(".search-wrapper");

  // ========================================
  // STORAGE
  // ========================================
  var KEYS = {
    theme: "vasudev_theme",
    notes: "vasudev_notes",
    tasks: "vasudev_tasks",
    widgets: "vasudev_widgets_visible",
    dockSites: "vasudev_dock_sites",
  };

  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }

  // ========================================
  // DEFAULT DOCK SITES
  // ========================================
  var DEFAULT_SITES = [
    { url: "https://vasudev.online", name: "Vasudev AI", domain: "vasudev.online" },
    { url: "https://youtube.com", name: "YouTube", domain: "youtube.com" },
    { url: "https://chatgpt.com", name: "ChatGPT", domain: "chatgpt.com" },
    { url: "https://github.com", name: "GitHub", domain: "github.com" }
  ];

  var dockSites = load(KEYS.dockSites, null);
  if (!dockSites) {
    dockSites = DEFAULT_SITES.slice();
    save(KEYS.dockSites, dockSites);
  }

  // ========================================
  // 1. THEME
  // ========================================
  var sunPath = "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z";
  var moonPath = "M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z";

  var savedTheme = load(KEYS.theme, null);
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var currentTheme = savedTheme || (systemDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", currentTheme);
  var initPath = themeIcon.querySelector("path");
  if (initPath) {
    initPath.setAttribute("d", currentTheme === "dark" ? moonPath : sunPath);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var path = themeIcon.querySelector("path");
    if (path) {
      themeIcon.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease";
      themeIcon.style.transform = "rotate(180deg) scale(0.5)";
      themeIcon.style.opacity = "0";
      setTimeout(function () {
        path.setAttribute("d", theme === "dark" ? moonPath : sunPath);
        themeIcon.style.transform = "rotate(0deg) scale(1)";
        themeIcon.style.opacity = "1";
      }, 200);
    }
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!load(KEYS.theme, null)) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  themeToggle.addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    var next = cur === "dark" ? "light" : "dark";
    applyTheme(next);
    save(KEYS.theme, next);
  });

  // ========================================
  // 2. CLOCK & GREETING
  // ========================================
  var lastTimeStr = "";

  function updateClock() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var hStr = h < 10 ? "0" + h : "" + h;
    var mStr = m < 10 ? "0" + m : "" + m;
    var timeStr = hStr + ":" + mStr;

    if (timeStr !== lastTimeStr) {
      lastTimeStr = timeStr;
      hoursEl.textContent = hStr;
      minutesEl.textContent = mStr;

      if (h >= 5 && h < 12) greetingEl.textContent = "Good morning";
      else if (h >= 12 && h < 17) greetingEl.textContent = "Good afternoon";
      else if (h >= 17 && h < 21) greetingEl.textContent = "Good evening";
      else greetingEl.textContent = "Good night";

      var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      dateEl.textContent = days[now.getDay()] + ", " + months[now.getMonth()] + " " + now.getDate();
    }

    var msToNext = 1000 - now.getMilliseconds();
    setTimeout(updateClock, msToNext < 50 ? 1000 : msToNext);
  }

  updateClock();

  // ========================================
  // 3. PAGE LOAD CURTAIN
  // ========================================
  var curtain = document.getElementById("curtain");
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      setTimeout(function () {
        if (curtain) {
          curtain.classList.add("lifted");
          setTimeout(function () {
            if (curtain.parentNode) curtain.parentNode.removeChild(curtain);
          }, 600);
        }
      }, 100);
    });
  });

  // ========================================
  // 4. RIPPLE EFFECT
  // ========================================
  function addRipple(element) {
    if (!element) return;
    element.classList.add("ripple");
    element.addEventListener("click", function (e) {
      var rect = element.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var size = Math.max(rect.width, rect.height);
      var wave = document.createElement("span");
      wave.className = "ripple-wave";
      wave.style.width = size + "px";
      wave.style.height = size + "px";
      wave.style.left = (x - size / 2) + "px";
      wave.style.top = (y - size / 2) + "px";
      element.appendChild(wave);
      setTimeout(function () {
        if (wave.parentNode) wave.parentNode.removeChild(wave);
      }, 600);
    });
  }

  addRipple(themeToggle);
  addRipple(widgetToggle);

  // ========================================
  // 5. 3D TILT - SEARCH
  // ========================================
  searchWrapper.addEventListener("mousemove", function (e) {
    var rect = searchWrapper.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var centerX = rect.width / 2;
    var centerY = rect.height / 2;
    var rotateX = ((y - centerY) / centerY) * -2.5;
    var rotateY = ((x - centerX) / centerX) * 2.5;
    searchWrapper.style.transform = "perspective(600px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-3px)";
  });

  searchWrapper.addEventListener("mouseleave", function () {
    searchWrapper.style.transform = "perspective(600px) rotateX(0) rotateY(0) translateY(0)";
  });

  // ========================================
  // 6. 3D TILT + MAGNETIC HOVER - DOCK
  // ========================================
  function setupDockTilt() {
    var items = document.querySelectorAll(".dock-item");

    dock.addEventListener("mousemove", function (e) {
      var rect = dock.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -3;
      var rotateY = ((x - centerX) / centerX) * 2;
      dock.style.transform = "perspective(800px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

      items = document.querySelectorAll(".dock-item");
      items.forEach(function (item) {
        var itemRect = item.getBoundingClientRect();
        var itemCenterX = itemRect.left + itemRect.width / 2;
        var distance = Math.abs(e.clientX - itemCenterX);
        var maxDist = 80;
        if (distance < maxDist) {
          var scale = 1 + (1 - distance / maxDist) * 0.18;
          var lift = (1 - distance / maxDist) * 6;
          item.style.transform = "translateY(-" + lift + "px) scale(" + scale + ")";
        } else {
          item.style.transform = "";
        }
      });
    });

    dock.addEventListener("mouseleave", function () {
      dock.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
      items = document.querySelectorAll(".dock-item");
      items.forEach(function (item) { item.style.transform = ""; });
    });
  }

  setupDockTilt();

  // ========================================
  // 7. DOCK RENDERING (dynamic, icons only)
  // ========================================
  function renderDock() {
    // Remove all existing dock items (but keep separator and add btn in HTML)
    // Rebuild everything
    dock.innerHTML = "";

    // Render site icons
    dockSites.forEach(function (site, index) {
      var a = document.createElement("a");
      a.href = site.url;
      a.target = "_blank";
      a.className = "dock-item";
      a.title = site.name || site.domain;

      var img = document.createElement("img");
      img.src = "https://www.google.com/s2/favicons?domain=" + site.domain + "&sz=128";
      img.alt = site.name || site.domain;
      img.className = "dock-icon";
      img.onerror = function () {
        // Fallback: show first letter
        this.style.display = "none";
        var fallback = document.createElement("div");
        fallback.className = "dock-icon";
        fallback.style.display = "flex";
        fallback.style.alignItems = "center";
        fallback.style.justifyContent = "center";
        fallback.style.fontSize = "14px";
        fallback.style.fontWeight = "600";
        fallback.style.color = "var(--text-secondary)";
        fallback.textContent = (site.name || site.domain).charAt(0).toUpperCase();
        a.insertBefore(fallback, this);
      };

      // Tooltip
      var tooltip = document.createElement("span");
      tooltip.className = "dock-tooltip";
      tooltip.textContent = site.name || site.domain;

      // Remove button (only for user-added / all removable)
      var removeBtn = document.createElement("button");
      removeBtn.className = "dock-remove-btn";
      removeBtn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>';
      removeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        dockSites.splice(index, 1);
        save(KEYS.dockSites, dockSites);
        renderDock();
      });

      a.appendChild(img);
      a.appendChild(tooltip);
      a.appendChild(removeBtn);
      dock.appendChild(a);
    });

    // Separator
    var sep = document.createElement("div");
    sep.className = "dock-separator";
    dock.appendChild(sep);

    // Add button
    var addBtn = document.createElement("button");
    addBtn.className = "dock-item dock-add-btn";
    addBtn.id = "dockAddBtn";
    addBtn.title = "Add website";
    addBtn.innerHTML = '<svg class="dock-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M12 5v14m-7-7h14"/></svg>';
    addBtn.addEventListener("click", openModal);
    dock.appendChild(addBtn);
  }

  renderDock();

  // ========================================
  // 8. ADD WEBSITE MODAL
  // ========================================
  function openModal() {
    siteUrlInput.value = "";
    siteNameInput.value = "";
    modal.classList.add("visible");
    setTimeout(function () { siteUrlInput.focus(); }, 100);
  }

  function closeModal() {
    modal.classList.remove("visible");
  }

  function extractDomain(url) {
    url = url.trim();
    // Remove protocol
    url = url.replace(/^https?:\/\//i, "");
    // Remove www.
    url = url.replace(/^www\./i, "");
    // Get domain part only
    var domain = url.split("/")[0].split("?")[0].split("#")[0];
    return domain.toLowerCase();
  }

  function addSite() {
    var rawUrl = siteUrlInput.value.trim();
    if (!rawUrl) return;

    var domain = extractDomain(rawUrl);
    if (!domain) return;

    var url = rawUrl;
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    var name = siteNameInput.value.trim();
    if (!name) {
      // Auto-generate name from domain
      name = domain.replace(/\.[^.]+$/, ""); // remove TLD
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }

    // Check if already exists
    var exists = dockSites.some(function (s) { return s.domain === domain; });
    if (exists) {
      siteUrlInput.style.borderColor = "var(--danger)";
      setTimeout(function () { siteUrlInput.style.borderColor = ""; }, 1500);
      return;
    }

    dockSites.push({ url: url, name: name, domain: domain });
    save(KEYS.dockSites, dockSites);
    renderDock();
    closeModal();
  }

  modalClose.addEventListener("click", closeModal);
  modalCancel.addEventListener("click", closeModal);
  modalAdd.addEventListener("click", addSite);

  // Enter key in modal inputs
  siteUrlInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      if (siteUrlInput.value.trim()) {
        siteNameInput.focus();
      }
    }
  });
  siteNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addSite();
  });

  // Close modal on overlay click
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  // ========================================
  // 9. SEARCH + OMNIBOX SUGGESTIONS
  // ========================================
  var omniActiveIndex = -1;
  var omniResults = [];
  var fetchTimer = null;
  var abortController = null;

  function showOmnibox(items) {
    omniResults = items;
    omniActiveIndex = -1;

    if (!items || items.length === 0) {
      hideOmnibox();
      return;
    }

    var html = "";
    items.forEach(function (item, i) {
      var query = searchInput.value.trim();
      var text = item;
      // Bold the matching part
      var lowerText = text.toLowerCase();
      var lowerQuery = query.toLowerCase();
      var idx = lowerText.indexOf(lowerQuery);
      var displayText;
      if (idx !== -1 && query.length > 0) {
        displayText = escapeHtml(text.substring(0, idx)) +
          "<strong>" + escapeHtml(text.substring(idx, idx + query.length)) + "</strong>" +
          escapeHtml(text.substring(idx + query.length));
      } else {
        displayText = escapeHtml(text);
      }

      html += '<div class="omni-item" data-index="' + i + '">' +
        '<svg class="omni-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">' +
        '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' +
        '<span class="omni-item-text">' + displayText + '</span>' +
        '<span class="omni-item-type">Search</span>' +
        '</div>';
    });

    omniboxDropdown.innerHTML = html;
    omniboxDropdown.classList.add("visible");
    searchWrapper.classList.add("omni-open");

    // Click handlers
    var omniItems = omniboxDropdown.querySelectorAll(".omni-item");
    omniItems.forEach(function (el) {
      el.addEventListener("mousedown", function (e) {
        e.preventDefault();
        var idx = parseInt(el.getAttribute("data-index"), 10);
        var q = omniResults[idx];
        if (q) {
          searchInput.value = q;
          hideOmnibox();
          performSearch(q);
        }
      });
      el.addEventListener("mouseenter", function () {
        clearActiveOmni();
        el.classList.add("active");
        omniActiveIndex = parseInt(el.getAttribute("data-index"), 10);
      });
    });
  }

  function hideOmnibox() {
    omniboxDropdown.classList.remove("visible");
    omniboxDropdown.innerHTML = "";
    searchWrapper.classList.remove("omni-open");
    omniResults = [];
    omniActiveIndex = -1;
  }

  function clearActiveOmni() {
    var items = omniboxDropdown.querySelectorAll(".omni-item");
    items.forEach(function (el) { el.classList.remove("active"); });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function fetchSuggestions(query) {
    if (!query || query.length < 2) {
      hideOmnibox();
      return;
    }

    // Cancel previous request
    if (abortController) {
      try { abortController.abort(); } catch (e) {}
    }
    abortController = new AbortController();

    // Use fetch() - works in Chrome extensions with host_permissions
    // client=chrome returns plain JSON array: ["query", ["sug1","sug2",...]]
    var url = "https://suggestqueries.google.com/complete/search?client=chrome&q=" + encodeURIComponent(query);

    fetch(url, { signal: abortController.signal })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data[1]) {
          var suggestions = data[1].map(function (item) {
            return typeof item === "string" ? item : (item[0] || "");
          }).filter(function (s) { return s.length > 0; }).slice(0, 6);
          showOmnibox(suggestions);
        }
      })
      .catch(function (err) {
        // Ignore abort errors, hide on real errors
        if (err.name !== "AbortError") {
          hideOmnibox();
        }
      });
  }

  function performSearch(q) {
    if (!q) return;

    searchWrapper.style.transition = "all 0.3s cubic-bezier(0.4, 0, 1, 1)";
    searchWrapper.style.transform = "perspective(600px) scale(0.96) translateY(4px)";
    searchWrapper.style.opacity = "0.6";

    var isUrl = /^https?:\/\//i.test(q) || /^www\./i.test(q) || /^[a-z0-9]([a-z0-9-]*[a-z0-9])?\.[a-z]{2,}$/i.test(q);

    setTimeout(function () {
      if (isUrl) {
        window.location.href = q.startsWith("http") ? q : "https://" + q;
      } else {
        window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(q);
      }
    }, 150);
  }

  // Search input events
  searchInput.addEventListener("input", function () {
    var q = searchInput.value.trim();

    // Icon bounce
    var icon = $(".search-icon");
    icon.style.transform = "translateY(-50%) scale(1.2) rotate(-12deg)";
    setTimeout(function () {
      icon.style.transform = "translateY(-50%) scale(1) rotate(0deg)";
    }, 150);

    // Debounced fetch
    clearTimeout(fetchTimer);
    fetchTimer = setTimeout(function () {
      fetchSuggestions(q);
    }, 200);
  });

  searchInput.addEventListener("keydown", function (e) {
    // Arrow navigation in omnibox
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (omniResults.length > 0) {
        omniActiveIndex = Math.min(omniActiveIndex + 1, omniResults.length - 1);
        updateOmniActive();
      }
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (omniResults.length > 0) {
        omniActiveIndex = Math.max(omniActiveIndex - 1, -1);
        updateOmniActive();
      }
      return;
    }

    if (e.key === "Enter") {
      var q;
      if (omniActiveIndex >= 0 && omniResults[omniActiveIndex]) {
        q = omniResults[omniActiveIndex];
        searchInput.value = q;
      } else {
        q = searchInput.value.trim();
      }
      hideOmnibox();
      if (q) performSearch(q);
      return;
    }

    if (e.key === "Escape") {
      hideOmnibox();
      searchInput.blur();
    }
  });

  searchInput.addEventListener("blur", function () {
    // Delay to allow click on suggestion
    setTimeout(hideOmnibox, 200);
  });

  searchInput.addEventListener("focus", function () {
    var q = searchInput.value.trim();
    if (q.length >= 2) {
      fetchSuggestions(q);
    }
  });

  function updateOmniActive() {
    var items = omniboxDropdown.querySelectorAll(".omni-item");
    items.forEach(function (el, i) {
      if (i === omniActiveIndex) {
        el.classList.add("active");
        // Update input text to match suggestion
        if (omniResults[i]) {
          searchInput.value = omniResults[i];
        }
      } else {
        el.classList.remove("active");
      }
    });
  }

  // ========================================
  // 10. WIDGETS TOGGLE
  // ========================================
  var widgetsVisible = load(KEYS.widgets, false);

  function setWidgetsVisible(visible) {
    widgetsVisible = visible;
    if (visible) {
      widgetsPanel.classList.add("visible");
    } else {
      widgetsPanel.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      widgetsPanel.style.opacity = "0";
      widgetsPanel.style.transform = "translateY(8px) scale(0.98)";
      setTimeout(function () {
        widgetsPanel.classList.remove("visible");
        widgetsPanel.style.opacity = "";
        widgetsPanel.style.transform = "";
        widgetsPanel.style.transition = "";
      }, 250);
    }
    save(KEYS.widgets, visible);
  }

  if (widgetsVisible) {
    widgetsPanel.classList.add("visible");
    widgetsPanel.style.animation = "none";
    widgetsPanel.style.opacity = "1";
    widgetsPanel.style.transform = "none";
  }

  widgetToggle.addEventListener("click", function () {
    setWidgetsVisible(!widgetsVisible);
  });

  // ========================================
  // 11. NOTES
  // ========================================
  notesArea.value = load(KEYS.notes, "");
  var notesTimer = null;
  notesArea.addEventListener("input", function () {
    clearTimeout(notesTimer);
    notesTimer = setTimeout(function () { save(KEYS.notes, notesArea.value); }, 300);
  });

  // ========================================
  // 12. TASKS
  // ========================================
  var tasks = load(KEYS.tasks, []);

  function saveTasks() { save(KEYS.tasks, tasks); }

  function renderTasks() {
    taskList.innerHTML = "";
    if (tasks.length === 0) {
      var empty = document.createElement("li");
      empty.className = "task-item";
      empty.style.justifyContent = "center";
      empty.style.opacity = "0.4";
      empty.style.fontSize = "12px";
      empty.style.padding = "12px 0";
      empty.textContent = "No tasks yet";
      taskList.appendChild(empty);
      return;
    }
    tasks.forEach(function (task, index) {
      var li = document.createElement("li");
      li.className = "task-item";
      li.style.animationDelay = (index * 0.04) + "s";

      var checkbox = document.createElement("div");
      checkbox.className = "task-checkbox" + (task.done ? " checked" : "");
      checkbox.addEventListener("click", function () {
        tasks[index].done = !tasks[index].done;
        saveTasks();
        renderTasks();
      });

      var text = document.createElement("span");
      text.className = "task-text" + (task.done ? " completed" : "");
      text.textContent = task.text;

      li.appendChild(checkbox);
      li.appendChild(text);
      taskList.appendChild(li);
    });
  }

  newTaskInput.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    var val = newTaskInput.value.trim();
    if (!val) return;
    tasks.unshift({ text: val, done: false });
    saveTasks();
    newTaskInput.value = "";
    newTaskInput.style.transform = "scale(0.97)";
    setTimeout(function () { newTaskInput.style.transform = "scale(1)"; }, 120);
    renderTasks();
  });

  clearDoneBtn.addEventListener("click", function () {
    tasks = tasks.filter(function (t) { return !t.done; });
    saveTasks();
    renderTasks();
  });

  renderTasks();

  // ========================================
  // 13. CALENDAR
  // ========================================
  function renderCalendar() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var today = now.getDate();
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    calendarMonth.textContent = monthNames[month] + " " + year;

    var html = "";
    var dayNames = ["S","M","T","W","T","F","S"];
    dayNames.forEach(function (d) { html += '<div class="cal-head">' + d + "</div>"; });
    for (var i = 0; i < firstDay; i++) { html += '<div class="cal-day empty"></div>'; }
    for (var d = 1; d <= daysInMonth; d++) {
      html += '<div class="cal-day' + (d === today ? " today" : "") + '">' + d + "</div>";
    }
    calendarGrid.innerHTML = html;
  }

  renderCalendar();

  // ========================================
  // 14. KEYBOARD SHORTCUTS
  // ========================================
  document.addEventListener("keydown", function (e) {
    var isInputFocused = document.activeElement === searchInput ||
                         document.activeElement === notesArea ||
                         document.activeElement === newTaskInput ||
                         document.activeElement === siteUrlInput ||
                         document.activeElement === siteNameInput;

    if (e.key === "/" && !isInputFocused) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === "Escape") {
      if (modal.classList.contains("visible")) {
        closeModal();
      } else {
        hideOmnibox();
        document.activeElement.blur();
      }
    }
    if (e.key === "t" && !isInputFocused) {
      themeToggle.click();
    }
    if (e.key === "w" && !isInputFocused) {
      widgetToggle.click();
    }
  });

})();
