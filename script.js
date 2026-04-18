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
    "bottomClockSection", "clockValue", "ampm",
    "dateDisplay", "greeting", "searchInput", "dockAddBtn", "addSiteModal", "modalCard",
    "modalClose", "siteUrlInput", "siteNameInput", "modalCancel",
    "modalAdd", "omniboxDropdown", "githubBadge",
    // Gmail Profile
    "gmailProfile", "profilePic", "bottomControls",
    // Settings Panel elements
    "settingsToggle", "settingsOverlay", "settingsPanel", "settingsClose", "settingsBody",
    "settingShowClock", "settingClock24h", "settingShowSeconds", "settingDarkTheme",
    "settingBgMode", "settingBgSolidColor", "settingBgGradientFrom", "settingBgGradientTo", "bgSolidRow", "bgGradientRow",
    "settingTitleColor",
    "settingSearchBgColor", "settingSearchTextColor", "settingSearchRadius", "settingSearchWidth",
    "settingTabIcon", "tabIconUpload", "tabIconClear",
    "settingCustomColor", "settingFont", "fontDropdown", "fontSelected",
    "settingWallpaper", "settingWallpaperDim",
    "exportSettings", "importSettings", "importFile", "resetAllSettings",
    "shortcutsOverlay", "shortcutsModal", "shortcutsClose",
    // Overlays
    "wallpaperLayer", "wallpaperUpload", "wallpaperClear"
  ];

  function isOurElement(node) {
    if (!node || node.nodeType !== 1) return false;
    if (node.id && OUR_IDS.indexOf(node.id) !== -1) return true;
    var tag = (node.tagName || "").toLowerCase();
    if (tag === "main" || tag === "nav" || tag === "footer" ||
        tag === "script" || tag === "link" || tag === "style" || tag === "head") return true;
  if (node.classList && (
    node.classList.contains("vasudev-curtain") ||
    node.classList.contains("vasudev-bg-gradient") ||
    node.classList.contains("top-bar") ||
    node.classList.contains("dock") ||
    node.classList.contains("footer") ||
    node.classList.contains("main-container") ||
    node.classList.contains("modal-overlay") ||
    node.classList.contains("github-badge") ||
    node.classList.contains("blob3") ||
    node.classList.contains("blob4") ||
    // Gmail Profile
    node.classList.contains("gmail-profile") ||
    node.classList.contains("gmail-link") ||
    node.classList.contains("gmail-icon") ||
    node.classList.contains("profile-pic") ||
    node.classList.contains("dock-btn") ||
    node.classList.contains("bottom-controls") ||
    // Settings Panel
    node.classList.contains("settings-overlay") ||
    node.classList.contains("settings-panel") ||
    node.classList.contains("settings-header") ||
    node.classList.contains("settings-body") ||
    node.classList.contains("settings-section") ||
    node.classList.contains("settings-section-title") ||
    node.classList.contains("settings-label") ||
    node.classList.contains("settings-input") ||
    node.classList.contains("settings-toggle") ||
    node.classList.contains("toggle-slider") ||
    node.classList.contains("color-swatch") ||
    node.classList.contains("color-custom") ||
    node.classList.contains("preset-btn") ||
    node.classList.contains("settings-select") ||
    node.classList.contains("settings-preset-row") ||
    node.classList.contains("settings-color-row") ||
    node.classList.contains("settings-row") ||
    node.classList.contains("settings-btn") ||
    node.classList.contains("settings-btn-sm") ||
    node.classList.contains("settings-btn-row") ||
    node.classList.contains("settings-btn-danger") ||
    node.classList.contains("settings-hint") ||
    node.classList.contains("settings-title") ||
    node.classList.contains("settings-close") ||
    // Shortcuts modal
    node.classList.contains("shortcuts-overlay") ||
    node.classList.contains("shortcuts-modal") ||
    node.classList.contains("shortcuts-body") ||
    node.classList.contains("shortcuts-grid") ||
    node.classList.contains("shortcuts-grid-lg") ||
    // Overlays
    node.classList.contains("wallpaper-layer")
  )) return true;
  if (node.closest && (
    node.closest("#vasudevTopBar") ||
    node.closest("#vasudevMain") ||
    node.closest("#vasudevDock") ||
    node.closest("#vasudevFooter") ||
    node.closest("#addSiteModal") ||
    node.closest("#githubBadge") ||
    node.closest(".vasudev-bg-gradient") ||
    node.closest(".vasudev-curtain") ||
    node.closest("#settingsOverlay") ||
    node.closest("#settingsPanel") ||
    node.closest("#shortcutsOverlay") ||
    node.closest("#shortcutsModal") ||
    node.closest(".wallpaper-layer")
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
  // GMAIL PROFILE SYNC
  // ========================================
  var profilePic = document.getElementById("profilePic");
  var savedProfilePic = load("vasudev_profile_pic", "");

  function loadProfilePic() {
    if (typeof chrome !== "undefined" && chrome.identity && chrome.identity.getProfileUserInfo) {
      chrome.identity.getProfileUserInfo(function(userInfo) {
        if (userInfo && userInfo.avatarUrl) {
          profilePic.src = userInfo.avatarUrl;
          profilePic.classList.add("visible");
          save("vasudev_profile_pic", userInfo.avatarUrl);
        } else if (savedProfilePic) {
          profilePic.src = savedProfilePic;
          profilePic.classList.add("visible");
        }
      });
    } else if (savedProfilePic) {
      profilePic.src = savedProfilePic;
      profilePic.classList.add("visible");
    }
  }

  if (profilePic) {
    loadProfilePic();
  }

  // ========================================
  // DOM ELEMENTS
  // ========================================
  var $ = function (sel) { return document.querySelector(sel); };
  var clockValueEl = $("#clockValue");
  var searchInput = $("#searchInput");
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
  var savedTheme = load(KEYS.theme, null);
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var currentTheme = savedTheme || (systemDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", currentTheme);

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme");
    var next = cur === "dark" ? "light" : "dark";
    applyTheme(next);
    save(KEYS.theme, next);
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!load(KEYS.theme, null)) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  // ========================================
  // 2. CLOCK & GREETING
  // ========================================
  var lastTimeStr = "";

  function updateClock() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    // Check 24h from localStorage
    var is24h = localStorage.getItem("vasudev_clock_24h");
    var use24h = is24h === null ? false : is24h === "true";
    
    var hStr = use24h 
      ? (h < 10 ? "0" + h : "" + h)
      : (h === 0 ? "12" : h > 12 ? "" + (h - 12) : "" + h);
    var mStr = m < 10 ? "0" + m : "" + m;
    var timeStr = hStr + ":" + mStr;
    var displayTime = timeStr + " " + (h >= 12 ? "PM" : "AM");

    if (displayTime !== lastTimeStr) {
      lastTimeStr = displayTime;
      if (clockValueEl) clockValueEl.textContent = displayTime;
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

  // ========================================
  // 5. 3D TILT + MAGNETIC HOVER - DOCK
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
      a.className = "dock-item";
      a.title = site.name || site.domain;

      var icon = document.createElement("div");
      icon.className = "dock-icon";
      icon.textContent = (site.name || site.domain).charAt(0).toUpperCase();

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

      a.appendChild(icon);
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

    // Try fetch first (works in Chrome extension with host_permissions)
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
        if (err.name === "AbortError") return;
        // Fallback: JSONP approach for when CORS blocks fetch
        fetchSuggestionsJSONP(query);
      });
  }

  // JSONP fallback - works everywhere (no CORS issues)
  function fetchSuggestionsJSONP(query) {
    if (!query || query.length < 2) {
      hideOmnibox();
      return;
    }

    // Remove previous JSONP script/callback
    var oldScript = document.getElementById("omniJsonp");
    if (oldScript) oldScript.parentNode.removeChild(oldScript);

    var callbackName = "omniCallback_" + Date.now();

    window[callbackName] = function (data) {
      // Google JSONP returns: callback(["query", ["sug1","sug2",...]])
      if (data && data[1]) {
        var suggestions = data[1].filter(function (s) {
          return typeof s === "string" && s.length > 0;
        }).slice(0, 6);
        showOmnibox(suggestions);
      }
      // Cleanup
      delete window[callbackName];
      var s = document.getElementById("omniJsonp");
      if (s) s.parentNode.removeChild(s);
    };

    var script = document.createElement("script");
    script.id = "omniJsonp";
    script.src = "https://suggestqueries.google.com/complete/search?client=firefox&callback=" + callbackName + "&q=" + encodeURIComponent(query);
    document.head.appendChild(script);
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
  // 10. KEYBOARD SHORTCUTS
  // ========================================
  document.addEventListener("keydown", function (e) {
    var isInputFocused = document.activeElement === searchInput ||
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
      toggleTheme();
    }
  });

// ========================================
// SETTINGS PANEL - All 20 Features
// ========================================
var SETTINGS_KEYS = {
  brandName: "vasudev_brand_name",
  titleColor: "vasudev_title_color",
  titleShadow: "vasudev_title_shadow",
  searchBgColor: "vasudev_search_bg_color",
  searchTextColor: "vasudev_search_text_color",
  searchRadius: "vasudev_search_radius",
  searchWidth: "vasudev_search_width",
  searchShadow: "vasudev_search_shadow",
  omniBgColor: "vasudev_omni_bg_color",
  omniTextColor: "vasudev_omni_text_color",
  omniHighlightColor: "vasudev_omni_highlight_color",
  omniRadius: "vasudev_omni_radius",
  showClock: "vasudev_show_clock",
  showDock: "vasudev_show_dock",
  clock24h: "vasudev_clock_24h",
  showSeconds: "vasudev_show_seconds",
  accentColor: "vasudev_accent_color",
  themePreset: "vasudev_theme_preset",
  fontFamily: "vasudev_font_family",
  bgMode: "vasudev_bg_mode",
  bgSolidColor: "vasudev_bg_solid_color",
  bgGradientFrom: "vasudev_bg_gradient_from",
  bgGradientTo: "vasudev_bg_gradient_to",
  wallpaper: "vasudev_wallpaper",
  wallpaperDim: "vasudev_wallpaper_dim",
  tabIcon: "vasudev_tab_icon",
  settingsOpen: "vasudev_settings_open"
};

// Elements
var settingsToggle = $("#settingsToggle");
var settingsOverlay = $("#settingsOverlay");
var settingsPanel = $("#settingsPanel");
var settingsClose = $("#settingsClose");
var shortcutsOverlay = $("#shortcutsOverlay");
var shortcutsClose = $("#shortcutsClose");
var focusOverlay = $("#focusOverlay");
var wallpaperLayer = $("#wallpaperLayer");

// Settings state
var settings = {
  brandName: load(SETTINGS_KEYS.brandName, "Vasudev AI"),
  titleColor: load(SETTINGS_KEYS.titleColor, ""),
  titleShadow: load(SETTINGS_KEYS.titleShadow, 35),
  searchBgColor: load(SETTINGS_KEYS.searchBgColor, "#2b2b2f"),
  searchTextColor: load(SETTINGS_KEYS.searchTextColor, "#ffffff"),
  searchRadius: load(SETTINGS_KEYS.searchRadius, 20),
  searchWidth: load(SETTINGS_KEYS.searchWidth, 560),
  searchShadow: load(SETTINGS_KEYS.searchShadow, 55),
  omniBgColor: load(SETTINGS_KEYS.omniBgColor, "#1f2028"),
  omniTextColor: load(SETTINGS_KEYS.omniTextColor, "#f5f5f7"),
  omniHighlightColor: load(SETTINGS_KEYS.omniHighlightColor, "#34c759"),
  omniRadius: load(SETTINGS_KEYS.omniRadius, 20),
  showClock: load(SETTINGS_KEYS.showClock, false),
  showDock: load(SETTINGS_KEYS.showDock, true),
  clock24h: load(SETTINGS_KEYS.clock24h, false),
  showSeconds: load(SETTINGS_KEYS.showSeconds, false),
  accentColor: load(SETTINGS_KEYS.accentColor, "#34C759"),
  themePreset: load(SETTINGS_KEYS.themePreset, "default"),
  fontFamily: load(SETTINGS_KEYS.fontFamily, "Inter"),
  bgMode: load(SETTINGS_KEYS.bgMode, "default"),
  bgSolidColor: load(SETTINGS_KEYS.bgSolidColor, "#131316"),
  bgGradientFrom: load(SETTINGS_KEYS.bgGradientFrom, "#0f172a"),
  bgGradientTo: load(SETTINGS_KEYS.bgGradientTo, "#1f2937"),
  wallpaper: load(SETTINGS_KEYS.wallpaper, ""),
  wallpaperDim: load(SETTINGS_KEYS.wallpaperDim, true),
  tabIcon: load(SETTINGS_KEYS.tabIcon, ""),
};

// Open/Close Settings
function openSettings() {
  console.log("Opening settings panel...");
  if (settingsOverlay) {
    settingsOverlay.classList.add("visible");
    console.log("Settings panel should be visible now");
  } else {
    console.log("ERROR: settingsOverlay is null!");
  }
  save(SETTINGS_KEYS.settingsOpen, true);
}

function closeSettingsPanel() {
  settingsOverlay.classList.remove("visible");
  save(SETTINGS_KEYS.settingsOpen, false);
}

function openShortcuts() {
  shortcutsOverlay.classList.add("visible");
}

function closeShortcutsPanel() {
  shortcutsOverlay.classList.remove("visible");
}

settingsToggle.addEventListener("click", openSettings);
settingsClose.addEventListener("click", closeSettingsPanel);
shortcutsClose.addEventListener("click", closeShortcutsPanel);

settingsOverlay.addEventListener("click", function(e) {
  if (e.target === settingsOverlay) closeSettingsPanel();
});

shortcutsOverlay.addEventListener("click", function(e) {
  if (e.target === shortcutsOverlay) closeShortcutsPanel();
});

// 1. Brand Name
var settingBrandName = $("#settingBrandName");
settingBrandName.value = settings.brandName;
settingBrandName.addEventListener("input", function() {
  settings.brandName = this.value || "Vasudev AI";
  save(SETTINGS_KEYS.brandName, settings.brandName);
  updateBrandName();
});

function updateBrandName() {
  var brandEl = $(".brand-name");
  if (brandEl) brandEl.textContent = settings.brandName;
}

function applyTitleColor() {
  var brandEl = $(".brand-name");
  if (!brandEl) return;

  var titleShadowStrength = Math.max(0, Math.min(100, parseInt(settings.titleShadow, 10) || 0));
  var titleShadowOpacity = (0.02 + titleShadowStrength * 0.003).toFixed(3);
  var titleShadowBlur = (4 + titleShadowStrength * 0.26).toFixed(1);
  var titleShadowY = (1 + titleShadowStrength * 0.09).toFixed(1);
  var titleShadowVar = titleShadowStrength === 0
    ? "none"
    : "0 " + titleShadowY + "px " + titleShadowBlur + "px rgba(0, 0, 0, " + titleShadowOpacity + ")";
  document.documentElement.style.setProperty("--title-shadow", titleShadowVar);

  var titleShadowValue = $("#titleShadowValue");
  if (titleShadowValue) titleShadowValue.textContent = titleShadowStrength + "%";

  if (settings.titleColor) {
    brandEl.style.background = "none";
    brandEl.style.webkitTextFillColor = settings.titleColor;
    brandEl.style.color = settings.titleColor;
  } else {
    brandEl.style.background = "";
    brandEl.style.webkitTextFillColor = "";
    brandEl.style.color = "";
  }
}

function buildSearchShadow(strength) {
  var safe = Math.max(0, Math.min(100, parseInt(strength, 10) || 0));
  if (safe === 0) return "none";

  var insetDark = (0.015 + safe * 0.0006).toFixed(3);
  var outerOneY = (3 + safe * 0.10).toFixed(1);
  var outerOneBlur = (10 + safe * 0.20).toFixed(1);
  var outerOneAlpha = (0.05 + safe * 0.0012).toFixed(3);
  var outerTwoY = (10 + safe * 0.18).toFixed(1);
  var outerTwoBlur = (28 + safe * 0.28).toFixed(1);
  var outerTwoAlpha = (0.08 + safe * 0.0016).toFixed(3);

  return "inset 0 2px 4px rgba(255, 255, 255, 0.55), " +
         "inset 0 -2px 6px rgba(0, 0, 0, " + insetDark + "), " +
         "0 " + outerOneY + "px " + outerOneBlur + "px rgba(0, 0, 0, " + outerOneAlpha + "), " +
         "0 " + outerTwoY + "px " + outerTwoBlur + "px rgba(0, 0, 0, " + outerTwoAlpha + ")";
}

function applySearchBarSettings() {
  document.documentElement.style.setProperty("--search-bar-bg", settings.searchBgColor);
  document.documentElement.style.setProperty("--search-bar-text", settings.searchTextColor);
  document.documentElement.style.setProperty("--search-bar-radius", settings.searchRadius + "px");
  document.documentElement.style.setProperty("--search-max-width", settings.searchWidth + "px");

  var searchShadowStrength = Math.max(0, Math.min(100, parseInt(settings.searchShadow, 10) || 0));
  document.documentElement.style.setProperty("--search-custom-shadow", buildSearchShadow(searchShadowStrength));
  document.documentElement.style.setProperty("--search-custom-shadow-hover", buildSearchShadow(Math.min(100, searchShadowStrength + 12)));

  var bg = settings.searchBgColor.replace("#", "");
  var placeholderColor = "rgba(255, 255, 255, 0.55)";
  if (bg.length === 6) {
    var r = parseInt(bg.slice(0, 2), 16);
    var g = parseInt(bg.slice(2, 4), 16);
    var b = parseInt(bg.slice(4, 6), 16);
    placeholderColor = "rgba(" + r + ", " + g + ", " + b + ", 0.55)";
    document.documentElement.style.setProperty("--search-placeholder", placeholderColor);
  }

  var searchRadiusValue = $("#searchRadiusValue");
  var searchWidthValue = $("#searchWidthValue");
  var searchShadowValue = $("#searchShadowValue");
  var searchPreviewBar = $("#searchPreviewBar");
  var searchPreviewPlaceholder = $("#searchPreviewPlaceholder");

  if (searchRadiusValue) searchRadiusValue.textContent = settings.searchRadius + "px";
  if (searchWidthValue) searchWidthValue.textContent = settings.searchWidth + "px";
  if (searchShadowValue) searchShadowValue.textContent = searchShadowStrength + "%";
  if (searchPreviewBar) {
    searchPreviewBar.style.background = settings.searchBgColor;
    searchPreviewBar.style.color = settings.searchTextColor;
    searchPreviewBar.style.borderRadius = settings.searchRadius + "px";
    searchPreviewBar.style.maxWidth = settings.searchWidth + "px";
    searchPreviewBar.style.boxShadow = buildSearchShadow(searchShadowStrength);
  }
  if (searchPreviewPlaceholder) {
    searchPreviewPlaceholder.style.color = placeholderColor;
  }
}

function applyOmniboxSettings() {
  document.documentElement.style.setProperty("--omni-custom-bg", settings.omniBgColor);
  document.documentElement.style.setProperty("--omni-custom-text", settings.omniTextColor);
  document.documentElement.style.setProperty("--omni-custom-radius", settings.omniRadius + "px");

  var textHex = settings.omniTextColor.replace("#", "");
  if (textHex.length === 6) {
    var tr = parseInt(textHex.slice(0, 2), 16);
    var tg = parseInt(textHex.slice(2, 4), 16);
    var tb = parseInt(textHex.slice(4, 6), 16);
    document.documentElement.style.setProperty("--omni-custom-subtle", "rgba(" + tr + ", " + tg + ", " + tb + ", 0.62)");
    document.documentElement.style.setProperty("--omni-custom-divider", "rgba(" + tr + ", " + tg + ", " + tb + ", 0.10)");
  }

  var h = settings.omniHighlightColor.replace("#", "");
  if (h.length === 6) {
    var hr = parseInt(h.slice(0, 2), 16);
    var hg = parseInt(h.slice(2, 4), 16);
    var hb = parseInt(h.slice(4, 6), 16);
    document.documentElement.style.setProperty("--omni-custom-hover", "rgba(" + hr + ", " + hg + ", " + hb + ", 0.18)");
    document.documentElement.style.setProperty("--omni-custom-accent", settings.omniHighlightColor);
  }

  var omniRadiusValue = $("#omniRadiusValue");
  if (omniRadiusValue) omniRadiusValue.textContent = settings.omniRadius + "px";
}

updateBrandName();
applyTitleColor();
applySearchBarSettings();
applyOmniboxSettings();

var settingTitleColor = $("#settingTitleColor");
var settingTitleShadow = $("#settingTitleShadow");
if (settingTitleColor) {
  settingTitleColor.value = settings.titleColor || "#34C759";
  settingTitleColor.addEventListener("input", function() {
    settings.titleColor = this.value;
    save(SETTINGS_KEYS.titleColor, settings.titleColor);
    applyTitleColor();
  });
}

if (settingTitleShadow) {
  settingTitleShadow.value = settings.titleShadow;
  settingTitleShadow.addEventListener("input", function() {
    settings.titleShadow = parseInt(this.value, 10) || 0;
    save(SETTINGS_KEYS.titleShadow, settings.titleShadow);
    applyTitleColor();
  });
}

var settingSearchBgColor = $("#settingSearchBgColor");
var settingSearchTextColor = $("#settingSearchTextColor");
var settingSearchRadius = $("#settingSearchRadius");
var settingSearchWidth = $("#settingSearchWidth");
var settingSearchShadow = $("#settingSearchShadow");
var settingOmniBgColor = $("#settingOmniBgColor");
var settingOmniTextColor = $("#settingOmniTextColor");
var settingOmniHighlightColor = $("#settingOmniHighlightColor");
var settingOmniRadius = $("#settingOmniRadius");

if (settingSearchBgColor) settingSearchBgColor.value = settings.searchBgColor;
if (settingSearchTextColor) settingSearchTextColor.value = settings.searchTextColor;
if (settingSearchRadius) settingSearchRadius.value = settings.searchRadius;
if (settingSearchWidth) settingSearchWidth.value = settings.searchWidth;
if (settingSearchShadow) settingSearchShadow.value = settings.searchShadow;
if (settingOmniBgColor) settingOmniBgColor.value = settings.omniBgColor;
if (settingOmniTextColor) settingOmniTextColor.value = settings.omniTextColor;
if (settingOmniHighlightColor) settingOmniHighlightColor.value = settings.omniHighlightColor;
if (settingOmniRadius) settingOmniRadius.value = settings.omniRadius;

if (settingSearchBgColor) {
  settingSearchBgColor.addEventListener("input", function() {
    settings.searchBgColor = this.value;
    save(SETTINGS_KEYS.searchBgColor, settings.searchBgColor);
    applySearchBarSettings();
  });
}

if (settingSearchTextColor) {
  settingSearchTextColor.addEventListener("input", function() {
    settings.searchTextColor = this.value;
    save(SETTINGS_KEYS.searchTextColor, settings.searchTextColor);
    applySearchBarSettings();
  });
}

if (settingSearchRadius) {
  settingSearchRadius.addEventListener("input", function() {
    settings.searchRadius = parseInt(this.value, 10) || 20;
    save(SETTINGS_KEYS.searchRadius, settings.searchRadius);
    applySearchBarSettings();
  });
}

if (settingSearchWidth) {
  settingSearchWidth.addEventListener("input", function() {
    settings.searchWidth = parseInt(this.value, 10) || 560;
    save(SETTINGS_KEYS.searchWidth, settings.searchWidth);
    applySearchBarSettings();
  });
}

if (settingSearchShadow) {
  settingSearchShadow.addEventListener("input", function() {
    settings.searchShadow = parseInt(this.value, 10) || 0;
    save(SETTINGS_KEYS.searchShadow, settings.searchShadow);
    applySearchBarSettings();
  });
}

if (settingOmniBgColor) {
  settingOmniBgColor.addEventListener("input", function() {
    settings.omniBgColor = this.value;
    save(SETTINGS_KEYS.omniBgColor, settings.omniBgColor);
    applyOmniboxSettings();
  });
}

if (settingOmniTextColor) {
  settingOmniTextColor.addEventListener("input", function() {
    settings.omniTextColor = this.value;
    save(SETTINGS_KEYS.omniTextColor, settings.omniTextColor);
    applyOmniboxSettings();
  });
}

if (settingOmniHighlightColor) {
  settingOmniHighlightColor.addEventListener("input", function() {
    settings.omniHighlightColor = this.value;
    save(SETTINGS_KEYS.omniHighlightColor, settings.omniHighlightColor);
    applyOmniboxSettings();
  });
}

if (settingOmniRadius) {
  settingOmniRadius.addEventListener("input", function() {
    settings.omniRadius = parseInt(this.value, 10) || 20;
    save(SETTINGS_KEYS.omniRadius, settings.omniRadius);
    applyOmniboxSettings();
  });
}

// 2. Clock Options
var settingShowClock = $("#settingShowClock");
var settingClock24h = $("#settingClock24h");
var settingShowSeconds = $("#settingShowSeconds");
var settingDarkTheme = $("#settingDarkTheme");
var timeSection = $(".time-section");

settingShowClock.checked = settings.showClock;
settingClock24h.checked = settings.clock24h;
settingShowSeconds.checked = settings.showSeconds;
settingDarkTheme.checked = document.documentElement.getAttribute("data-theme") === "dark";

settingShowClock.addEventListener("change", function() {
  settings.showClock = this.checked;
  save(SETTINGS_KEYS.showClock, settings.showClock);
  timeSection.style.display = settings.showClock ? "block" : "none";
});

timeSection.style.display = settings.showClock ? "block" : "none";

settingClock24h.addEventListener("change", function() {
  settings.clock24h = this.checked;
  save(SETTINGS_KEYS.clock24h, settings.clock24h);
});

settingShowSeconds.addEventListener("change", function() {
  settings.showSeconds = this.checked;
  save(SETTINGS_KEYS.showSeconds, settings.showSeconds);
});

settingDarkTheme.addEventListener("change", function() {
  applyTheme(this.checked ? "dark" : "light");
  save(KEYS.theme, this.checked ? "dark" : "light");
});

// 2b. Dock Visibility
var settingShowDock = $("#settingShowDock");

function applyDockVisibility() {
  dock.style.display = settings.showDock ? "flex" : "none";
}

settingShowDock.checked = settings.showDock;
settingShowDock.addEventListener("change", function() {
  settings.showDock = this.checked;
  save(SETTINGS_KEYS.showDock, settings.showDock);
  applyDockVisibility();
});

applyDockVisibility();

// 3. Accent Color
var colorSwatches = document.querySelectorAll(".color-swatch");
var settingCustomColor = $("#settingCustomColor");

function setAccentColor(color) {
  settings.accentColor = color;
  save(SETTINGS_KEYS.accentColor, color);
  document.documentElement.style.setProperty("--accent", color);
  var r = parseInt(color.slice(1, 3), 16);
  var g = parseInt(color.slice(3, 5), 16);
  var b = parseInt(color.slice(5, 7), 16);
  document.documentElement.style.setProperty("--accent-soft", "rgba(" + r + "," + g + "," + b + ",0.12)");
}

colorSwatches.forEach(function(swatch) {
  if (swatch.dataset.color === settings.accentColor) swatch.classList.add("active");
  swatch.addEventListener("click", function() {
    colorSwatches.forEach(function(s) {
      s.classList.remove("active");
    });
    this.classList.add("active");
    setAccentColor(this.dataset.color);
  });
});

settingCustomColor.value = settings.accentColor;
settingCustomColor.addEventListener("input", function() {
  colorSwatches.forEach(function(s) {
    s.classList.remove("active");
  });
  setAccentColor(this.value);
});

// 4. Theme Presets
var presetBtns = document.querySelectorAll("[data-preset]");

presetBtns.forEach(function(btn) {
  if (btn.dataset.preset === settings.themePreset) btn.classList.add("active");
  btn.addEventListener("click", function() {
    presetBtns.forEach(function(b) {
      b.classList.remove("active");
    });
    this.classList.add("active");
    settings.themePreset = this.dataset.preset;
    save(SETTINGS_KEYS.themePreset, settings.themePreset);
    document.documentElement.setAttribute("data-preset", settings.themePreset);
  });
});

document.documentElement.setAttribute("data-preset", settings.themePreset);

// 5. Font Selector (Custom Dropdown)
var fontDropdown = document.getElementById("fontDropdown");
var fontSelected = document.getElementById("fontSelected");
var fontOptions = fontDropdown.querySelectorAll(".dropdown-option");

fontSelected.textContent = settings.fontFamily;
fontOptions.forEach(function(opt) {
  if (opt.dataset.value === settings.fontFamily) opt.classList.add("selected");
});

fontSelected.addEventListener("click", function(e) {
  e.stopPropagation();
  fontDropdown.classList.toggle("open");
});

fontOptions.forEach(function(opt) {
  opt.addEventListener("click", function() {
    settings.fontFamily = this.dataset.value;
    save(SETTINGS_KEYS.fontFamily, settings.fontFamily);
    fontSelected.textContent = settings.fontFamily;
    fontOptions.forEach(function(o) { o.classList.remove("selected"); });
    this.classList.add("selected");
    fontDropdown.classList.remove("open");
    document.body.style.fontFamily = "'" + settings.fontFamily + "', -apple-system, BlinkMacSystemFont, sans-serif";
  });
});

document.addEventListener("click", function() {
  fontDropdown.classList.remove("open");
});

document.body.style.fontFamily = "'" + settings.fontFamily + "', -apple-system, BlinkMacSystemFont, sans-serif";

// 6. Background Mode (Default / Solid / Gradient)
var settingBgMode = $("#settingBgMode");
var settingBgSolidColor = $("#settingBgSolidColor");
var settingBgGradientFrom = $("#settingBgGradientFrom");
var settingBgGradientTo = $("#settingBgGradientTo");
var bgSolidRow = $("#bgSolidRow");
var bgGradientRow = $("#bgGradientRow");

function applyBackgroundMode() {
  if (bgGradient) bgGradient.style.display = settings.bgMode === "default" ? "" : "none";

  if (settings.bgMode === "solid") {
    document.documentElement.style.setProperty("--bg", settings.bgSolidColor);
    document.documentElement.style.setProperty("--bg-solid", settings.bgSolidColor);
  } else if (settings.bgMode === "gradient") {
    document.documentElement.style.setProperty("--bg", "linear-gradient(135deg, " + settings.bgGradientFrom + " 0%, " + settings.bgGradientTo + " 100%)");
    document.documentElement.style.setProperty("--bg-solid", settings.bgGradientFrom);
  } else {
    document.documentElement.style.removeProperty("--bg");
    document.documentElement.style.removeProperty("--bg-solid");
  }
}

function updateBackgroundModeUI() {
  if (!settingBgMode) return;
  if (bgSolidRow) bgSolidRow.style.display = settingBgMode.value === "solid" ? "flex" : "none";
  if (bgGradientRow) bgGradientRow.style.display = settingBgMode.value === "gradient" ? "block" : "none";
}

if (settingBgMode) {
  settingBgMode.value = settings.bgMode;
  settingBgSolidColor.value = settings.bgSolidColor;
  settingBgGradientFrom.value = settings.bgGradientFrom;
  settingBgGradientTo.value = settings.bgGradientTo;

  settingBgMode.addEventListener("change", function() {
    settings.bgMode = this.value;
    save(SETTINGS_KEYS.bgMode, settings.bgMode);
    updateBackgroundModeUI();
    applyBackgroundMode();
  });

  settingBgSolidColor.addEventListener("input", function() {
    settings.bgSolidColor = this.value;
    save(SETTINGS_KEYS.bgSolidColor, settings.bgSolidColor);
    if (settings.bgMode === "solid") applyBackgroundMode();
  });

  settingBgGradientFrom.addEventListener("input", function() {
    settings.bgGradientFrom = this.value;
    save(SETTINGS_KEYS.bgGradientFrom, settings.bgGradientFrom);
    if (settings.bgMode === "gradient") applyBackgroundMode();
  });

  settingBgGradientTo.addEventListener("input", function() {
    settings.bgGradientTo = this.value;
    save(SETTINGS_KEYS.bgGradientTo, settings.bgGradientTo);
    if (settings.bgMode === "gradient") applyBackgroundMode();
  });

  updateBackgroundModeUI();
}

applyBackgroundMode();

// 7. Custom Wallpaper
var settingWallpaper = $("#settingWallpaper");
var settingWallpaperDim = $("#settingWallpaperDim");
var wallpaperUpload = document.getElementById("wallpaperUpload");
var wallpaperClear = document.getElementById("wallpaperClear");

settingWallpaper.value = settings.wallpaper;
settingWallpaperDim.checked = settings.wallpaperDim;

function updateWallpaper() {
  if (settings.wallpaper) {
    wallpaperLayer.style.backgroundImage = "url('" + settings.wallpaper + "')";
    wallpaperLayer.classList.add("visible");
    if (settings.wallpaperDim) wallpaperLayer.classList.add("dim");
    else wallpaperLayer.classList.remove("dim");
  } else {
    wallpaperLayer.classList.remove("visible");
  }
}

settingWallpaper.addEventListener("input", function() {
  settings.wallpaper = this.value;
  save(SETTINGS_KEYS.wallpaper, settings.wallpaper);
  updateWallpaper();
});

settingWallpaperDim.addEventListener("change", function() {
  settings.wallpaperDim = this.checked;
  save(SETTINGS_KEYS.wallpaperDim, settings.wallpaperDim);
  updateWallpaper();
});

wallpaperUpload.addEventListener("change", function(e) {
  var file = e.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      settings.wallpaper = event.target.result;
      save(SETTINGS_KEYS.wallpaper, settings.wallpaper);
      settingWallpaper.value = "";
      updateWallpaper();
      wallpaperUpload.value = "";
    };
    reader.readAsDataURL(file);
  }
});

wallpaperClear.addEventListener("click", function() {
  settings.wallpaper = "";
  save(SETTINGS_KEYS.wallpaper, settings.wallpaper);
  settingWallpaper.value = "";
  wallpaperUpload.value = "";
  updateWallpaper();
});

updateWallpaper();

// 8. Custom Tab Icon
var settingTabIcon = $("#settingTabIcon");
var tabIconUpload = document.getElementById("tabIconUpload");
var tabIconClear = document.getElementById("tabIconClear");

function updateTabIcon() {
  var currentIcon = document.querySelector('link[rel="icon"]');
  if (settings.tabIcon) {
    if (!currentIcon) {
      currentIcon = document.createElement("link");
      currentIcon.rel = "icon";
      document.head.appendChild(currentIcon);
    }
    currentIcon.href = settings.tabIcon;
  } else if (currentIcon && currentIcon.parentNode) {
    currentIcon.parentNode.removeChild(currentIcon);
  }
}

if (settingTabIcon) {
  settingTabIcon.value = settings.tabIcon;
  settingTabIcon.addEventListener("input", function() {
    settings.tabIcon = this.value.trim();
    save(SETTINGS_KEYS.tabIcon, settings.tabIcon);
    updateTabIcon();
  });
}

if (tabIconUpload) {
  tabIconUpload.addEventListener("change", function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(event) {
      settings.tabIcon = event.target.result;
      save(SETTINGS_KEYS.tabIcon, settings.tabIcon);
      if (settingTabIcon) settingTabIcon.value = "";
      updateTabIcon();
      tabIconUpload.value = "";
    };
    reader.readAsDataURL(file);
  });
}

if (tabIconClear) {
  tabIconClear.addEventListener("click", function() {
    settings.tabIcon = "";
    save(SETTINGS_KEYS.tabIcon, settings.tabIcon);
    if (settingTabIcon) settingTabIcon.value = "";
    if (tabIconUpload) tabIconUpload.value = "";
    updateTabIcon();
  });
}

updateTabIcon();

// 18. Import/Export
var exportBtn = $("#exportSettings");
var importBtn = $("#importSettings");
var importFile = $("#importFile");

exportBtn.addEventListener("click", function() {
  var data = {};
  for (var key in localStorage) {
    if (key.startsWith("vasudev_")) {
      data[key] = localStorage.getItem(key);
    }
  }
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "vasudev-settings.json";
  a.click();
  URL.revokeObjectURL(url);
});

importBtn.addEventListener("click", function() {
  importFile.click();
});

importFile.addEventListener("change", function(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(evt) {
    try {
      var data = JSON.parse(evt.target.result);
      for (var key in data) {
        localStorage.setItem(key, data[key]);
      }
      alert("Settings imported! Please refresh the page.");
    } catch (err) {
      alert("Invalid file");
    }
  };
  reader.readAsText(file);
});

// 19. Reset
var resetBtn = $("#resetAllSettings");
resetBtn.addEventListener("click", function() {
  if (confirm("Reset all settings to default?")) {
    for (var key in localStorage) {
      if (key.startsWith("vasudev_")) {
        localStorage.removeItem(key);
      }
    }
    location.reload();
  }
});

// Keyboard shortcuts update
document.addEventListener("keydown", function(e) {
  if (e.key === "?" && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    openShortcuts();
  }
  if (e.key === "s" && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    openSettings();
  }
});

// ========================================
// SETTINGS PANEL END
// ========================================

})();
