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
    "modalAdd", "omniboxDropdown", "githubBadge",
    // Gmail Profile
    "gmailProfile", "profilePic", "bottomControls",
    // Apps Menu
    "appsMenu", "appsGridBtn", "appsDropdown",
    // Settings Modal elements
    "settingsToggle", "settingsOverlay", "settingsModal", "settingsClose", "settingsSidebar", "settingsContent",
    "settingDarkMode",
    "settingUserName", "settingShowClock", "settingClock24h", "settingShowSeconds",
    "settingCustomColor", "settingFont", "fontDropdown", "fontSelected", "settingFocusMode", "settingShowQuotes",
    "settingShowWeather", "settingWeatherCity", "settingWeatherCelsius",
    "settingShowPomodoro", "settingPomoDuration", "settingPomoBreak",
    "settingShowQuickLinks", "settingShowHabits", "settingWallpaper", "settingWallpaperDim",
    "settingShowAnalytics", "settingShowAmbient",
    "qlName", "qlUrl", "qlList", "qlAdd",
    "exportSettings", "importSettings", "importFile", "resetAllSettings",
    "shortcutsOverlay", "shortcutsModal", "shortcutsClose",
    // Widgets
    "quotesWidget", "quoteText", "quoteAuthor",
    "weatherWidget", "weatherIcon", "weatherTemp", "weatherDesc", "weatherCity",
    "pomodoroWidget", "pomoDisplay", "pomoLabel", "pomoStart", "pomoReset",
    "habitWidget", "habitList", "habitAddBtn",
    "quickLinksWidget", "quickLinksGrid",
    "ambientWidget", "ambientPlayBtn", "ambientSoundName", "ambientProgressFill", 
    "ambientSoundBtn", "ambientSoundMenu", "ambientVolume", "volumePercent",
    // Overlays
    "wallpaperLayer", "wallpaperUpload", "wallpaperClear", "focusOverlay",
    // Analytics
    "analyticsDisplay", "analyticsTabCount", "analyticsTotal"
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
        node.classList.contains("blob4") ||
        // Gmail Profile
        node.classList.contains("gmail-profile") ||
        node.classList.contains("gmail-link") ||
        node.classList.contains("gmail-icon") ||
        node.classList.contains("profile-pic") ||
        node.classList.contains("dock-btn") ||
        node.classList.contains("bottom-controls") ||
        // Settings Modal
        node.classList.contains("settings-modal") ||
        node.classList.contains("settings-header") ||
        node.classList.contains("settings-main") ||
        node.classList.contains("settings-sidebar") ||
        node.classList.contains("settings-tab") ||
        node.classList.contains("settings-content") ||
        node.classList.contains("settings-category") ||
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
        node.classList.contains("tab-icon") ||
        node.classList.contains("tab-label") ||
        // Widgets
        node.classList.contains("quotes-widget") ||
        node.classList.contains("weather-widget") ||
        node.classList.contains("pomodoro-widget") ||
        node.classList.contains("habit-widget") ||
        node.classList.contains("quicklinks-widget") ||
        node.classList.contains("ambient-widget") ||
        // Shortcuts modal
        node.classList.contains("shortcuts-overlay") ||
        node.classList.contains("shortcuts-modal") ||
        node.classList.contains("shortcuts-body") ||
        node.classList.contains("shortcuts-grid") ||
        node.classList.contains("shortcuts-grid-lg") ||
        // Overlays
        node.classList.contains("wallpaper-layer") ||
        node.classList.contains("focus-overlay") ||
        // Analytics
        node.classList.contains("analytics-display") ||
        node.classList.contains("analytics-stat") ||
        node.classList.contains("analytics-num") ||
        node.classList.contains("analytics-label") ||
        // Quick Links
        node.classList.contains("quicklink-inputs") ||
        node.classList.contains("ql-list") ||
        // Other
        node.classList.contains("quote-text") ||
        node.classList.contains("quote-author") ||
        node.classList.contains("weather-icon") ||
        node.classList.contains("weather-info") ||
        node.classList.contains("weather-temp") ||
        node.classList.contains("weather-desc") ||
        node.classList.contains("weather-city") ||
        node.classList.contains("pomo-display") ||
        node.classList.contains("pomo-label") ||
        node.classList.contains("pomo-controls") ||
        node.classList.contains("pomo-btn") ||
        node.classList.contains("habit-header") ||
        node.classList.contains("habit-title") ||
        node.classList.contains("habit-add-btn") ||
        node.classList.contains("habit-list") ||
        node.classList.contains("quicklinks-header") ||
        node.classList.contains("quicklinks-title") ||
        node.classList.contains("quicklinks-grid") ||
        node.classList.contains("ambient-label") ||
        node.classList.contains("ambient-select") ||
        node.classList.contains("ambient-volume")) return true;
  }
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
    node.closest("#settingsModal") ||
    node.closest("#settingsSidebar") ||
    node.closest("#settingsContent") ||
    node.closest(".settings-category") ||
    node.closest("#shortcutsOverlay") ||
    node.closest("#shortcutsModal") ||
    node.closest(".quotes-widget") ||
    node.closest(".weather-widget") ||
    node.closest(".pomodoro-widget") ||
    node.closest(".habit-widget") ||
    node.closest(".quicklinks-widget") ||
    node.closest(".ambient-widget") ||
    node.closest(".wallpaper-layer") ||
    node.closest(".focus-overlay")
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
    // Check 24h from localStorage
    var is24h = localStorage.getItem("vasudev_clock_24h");
    var use24h = is24h === null ? true : is24h === "true";
    
    var hStr = use24h 
      ? (h < 10 ? "0" + h : "" + h)
      : (h === 0 ? "12" : h > 12 ? "" + (h - 12) : "" + h);
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
    if (e.key === "s" && !isInputFocused) {
      if (settingsOverlay && settingsOverlay.classList.contains("visible")) {
        closeSettingsPanel();
      } else {
        openSettings();
      }
    }
});

// ========================================
// SETTINGS PANEL - All 20 Features
// ========================================
var SETTINGS_KEYS = {
  userName: "vasudev_user_name",
  brandName: "vasudev_brand_name",
  customPageTitle: "vasudev_custom_page_title",
  faviconUrl: "vasudev_favicon_url",
  showClock: "vasudev_show_clock",
  clock24h: "vasudev_clock_24h",
  showSeconds: "vasudev_show_seconds",
  accentColor: "vasudev_accent_color",
  themePreset: "vasudev_theme_preset",
  fontFamily: "vasudev_font_family",
  layout: "vasudev_layout",
  focusMode: "vasudev_focus_mode",
  showQuotes: "vasudev_show_quotes",
  showWeather: "vasudev_show_weather",
  weatherCity: "vasudev_weather_city",
  weatherCelsius: "vasudev_weather_celsius",
  showPomodoro: "vasudev_show_pomodoro",
  pomoDuration: "vasudev_pomo_duration",
  pomoBreak: "vasudev_pomo_break",
  showQuickLinks: "vasudev_show_quicklinks",
  quickLinks: "vasudev_quicklinks",
  showHabits: "vasudev_show_habits",
  habits: "vasudev_habits",
  wallpaper: "vasudev_wallpaper",
  wallpaperDim: "vasudev_wallpaper_dim",
  showAnalytics: "vasudev_show_analytics",
  analytics: "vasudev_analytics_data",
  showAmbient: "vasudev_show_ambient",
  ambientSound: "vasudev_ambient_sound",
  ambientVolume: "vasudev_ambient_volume",
  settingsOpen: "vasudev_settings_open"
};

// Elements
var settingsToggle = $("#settingsToggle");
var settingsOverlay = $("#settingsOverlay");
var settingsModal = $("#settingsModal");
var settingsClose = $("#settingsClose");
var shortcutsOverlay = $("#shortcutsOverlay");
var shortcutsClose = $("#shortcutsClose");
var focusOverlay = $("#focusOverlay");
var wallpaperLayer = $("#wallpaperLayer");

// Settings state
var settings = {
  userName: load(SETTINGS_KEYS.userName, ""),
  brandName: load(SETTINGS_KEYS.brandName, "Vasudev AI"),
  customPageTitle: load(SETTINGS_KEYS.customPageTitle, ""),
  faviconUrl: load(SETTINGS_KEYS.faviconUrl, ""),
  showClock: load(SETTINGS_KEYS.showClock, false),
  clock24h: load(SETTINGS_KEYS.clock24h, true),
  showSeconds: load(SETTINGS_KEYS.showSeconds, false),
  accentColor: load(SETTINGS_KEYS.accentColor, "#34C759"),
  themePreset: load(SETTINGS_KEYS.themePreset, "default"),
  fontFamily: load(SETTINGS_KEYS.fontFamily, "Inter"),
  layout: load(SETTINGS_KEYS.layout, "center"),
  focusMode: load(SETTINGS_KEYS.focusMode, false),
  showQuotes: load(SETTINGS_KEYS.showQuotes, false),
  showWeather: load(SETTINGS_KEYS.showWeather, false),
  weatherCity: load(SETTINGS_KEYS.weatherCity, ""),
  weatherCelsius: load(SETTINGS_KEYS.weatherCelsius, true),
  showPomodoro: load(SETTINGS_KEYS.showPomodoro, false),
  pomoDuration: load(SETTINGS_KEYS.pomoDuration, 25),
  pomoBreak: load(SETTINGS_KEYS.pomoBreak, 5),
  showQuickLinks: load(SETTINGS_KEYS.showQuickLinks, false),
  quickLinks: load(SETTINGS_KEYS.quickLinks, []),
  showHabits: load(SETTINGS_KEYS.showHabits, false),
  habits: load(SETTINGS_KEYS.habits, []),
  wallpaper: load(SETTINGS_KEYS.wallpaper, ""),
  wallpaperDim: load(SETTINGS_KEYS.wallpaperDim, true),
  showAnalytics: load(SETTINGS_KEYS.showAnalytics, false),
  showAmbient: load(SETTINGS_KEYS.showAmbient, false),
  ambientSound: load(SETTINGS_KEYS.ambientSound, ""),
  ambientVolume: load(SETTINGS_KEYS.ambientVolume, 50)
};

// Open/Close Settings
function openSettings() {
  if (settingsOverlay) {
    settingsOverlay.classList.add("visible");
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

// ========================================
// CATEGORY TAB SWITCHING
// ========================================
var settingsTabs = document.querySelectorAll(".settings-tab");
var settingsCategories = document.querySelectorAll(".settings-category");

settingsTabs.forEach(function(tab) {
  tab.addEventListener("click", function() {
    var category = this.getAttribute("data-category");
    
    // Update active tab
    settingsTabs.forEach(function(t) { t.classList.remove("active"); });
    this.classList.add("active");
    
    // Show corresponding category
    settingsCategories.forEach(function(cat) {
      if (cat.getAttribute("data-category") === category) {
        cat.classList.add("active");
      } else {
        cat.classList.remove("active");
      }
    });
  });
});

// ========================================
// DARK MODE TOGGLE IN SETTINGS
// ========================================
var settingDarkMode = $("#settingDarkMode");
if (settingDarkMode) {
  var currentTheme = document.documentElement.getAttribute("data-theme");
  settingDarkMode.checked = currentTheme === "dark";
  
  settingDarkMode.addEventListener("change", function() {
    var theme = this.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    save(KEYS.theme, theme);
    
    // Update theme icon
    var path = themeIcon.querySelector("path");
    if (path) {
      path.setAttribute("d", theme === "dark" ? moonPath : sunPath);
    }
  });
}

// ========================================
// ESC KEY TO CLOSE SETTINGS
// ========================================
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    if (settingsOverlay && settingsOverlay.classList.contains("visible")) {
      closeSettingsPanel();
    }
    if (shortcutsOverlay && shortcutsOverlay.classList.contains("visible")) {
      closeShortcutsPanel();
    }
  }
});

// 1. Greeting with User Name
var settingUserName = $("#settingUserName");
settingUserName.value = settings.userName;
settingUserName.addEventListener("input", function() {
  settings.userName = this.value;
  save(SETTINGS_KEYS.userName, settings.userName);
  updateGreeting();
});

// 1b. Brand Name
var settingBrandName = $("#settingBrandName");
settingBrandName.value = settings.brandName;
settingBrandName.addEventListener("input", function() {
  settings.brandName = this.value || "Vasudev AI";
  save(SETTINGS_KEYS.brandName, settings.brandName);
  updateBrandName();
});

// 1c. Custom Page Title
var settingCustomPageTitle = $("#settingCustomPageTitle");
settingCustomPageTitle.value = settings.customPageTitle;
settingCustomPageTitle.addEventListener("input", function() {
  settings.customPageTitle = this.value;
  save(SETTINGS_KEYS.customPageTitle, settings.customPageTitle);
  updateCustomPageTitle();
});

// 1d. Custom Favicon
var settingFaviconUrl = $("#settingFaviconUrl");
settingFaviconUrl.value = settings.faviconUrl;
settingFaviconUrl.addEventListener("input", function() {
  settings.faviconUrl = this.value;
  save(SETTINGS_KEYS.faviconUrl, settings.faviconUrl);
  updateCustomFavicon();
});

// Favicon Upload
var settingFaviconUpload = $("#settingFaviconUpload");
var clearFaviconBtn = $("#clearFavicon");

settingFaviconUpload.addEventListener("change", function(e) {
  var file = e.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      settings.faviconUrl = event.target.result;
      save(SETTINGS_KEYS.faviconUrl, settings.faviconUrl);
      settingFaviconUrl.value = "";
      updateCustomFavicon();
    };
    reader.readAsDataURL(file);
  }
});

clearFaviconBtn.addEventListener("click", function() {
  settings.faviconUrl = "";
  save(SETTINGS_KEYS.faviconUrl, "");
  settingFaviconUrl.value = "";
  settingFaviconUpload.value = "";
  updateCustomFavicon();
});

function updateBrandName() {
  var brandEl = $(".brand-name");
  if (brandEl) brandEl.textContent = settings.brandName;
}

function updateCustomPageTitle() {
  if (settings.customPageTitle) {
    document.title = settings.customPageTitle;
  }
}

function updateCustomFavicon() {
  var existingFavicon = document.querySelector("link[rel*='icon']");
  if (settings.faviconUrl) {
    if (!existingFavicon) {
      existingFavicon = document.createElement("link");
      existingFavicon.rel = "icon";
      document.head.appendChild(existingFavicon);
    }
    existingFavicon.href = settings.faviconUrl;
  } else {
    if (!existingFavicon) {
      existingFavicon = document.createElement("link");
      existingFavicon.rel = "icon";
      document.head.appendChild(existingFavicon);
    }
    existingFavicon.href = "icons/icon128.png";
  }
}

function updateGreeting() {
  var now = new Date();
  var h = now.getHours();
  var greeting = "";
  if (h >= 5 && h < 12) greeting = "Good morning";
  else if (h >= 12 && h < 17) greeting = "Good afternoon";
  else if (h >= 17 && h < 21) greeting = "Good evening";
  else greeting = "Good night";
  if (settings.userName) greeting += ", " + settings.userName;
  greetingEl.textContent = greeting;
}

updateGreeting();
updateBrandName();
updateCustomPageTitle();
updateCustomFavicon();

// Apps Menu Toggle
var appsGridBtn = $("#appsGridBtn");
var appsDropdown = $("#appsDropdown");

if (appsGridBtn && appsDropdown) {
  appsGridBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    appsDropdown.classList.toggle("show");
  });

  document.addEventListener("click", function(e) {
    if (!appsDropdown.contains(e.target) && e.target !== appsGridBtn) {
      appsDropdown.classList.remove("show");
    }
  });
}

// 2. Clock Options
var settingShowClock = $("#settingShowClock");
var settingClock24h = $("#settingClock24h");
var settingShowSeconds = $("#settingShowSeconds");
var timeSection = $(".time-section");

settingShowClock.checked = settings.showClock;
settingClock24h.checked = settings.clock24h;
settingShowSeconds.checked = settings.showSeconds;

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

// 6. Layout Options
var layoutBtns = document.querySelectorAll("[data-layout]");

layoutBtns.forEach(function(btn) {
  if (btn.dataset.layout === settings.layout) btn.classList.add("active");
  btn.addEventListener("click", function() {
    layoutBtns.forEach(function(b) {
      b.classList.remove("active");
    });
    this.classList.add("active");
    settings.layout = this.dataset.layout;
    save(SETTINGS_KEYS.layout, settings.layout);
    applyLayout();
  });
});

function applyLayout() {
  var main = $(".main-container");
  if (settings.layout === "compact") {
    main.style.padding = "20px 16px";
    $(".brand-name").style.fontSize = "36px";
  } else if (settings.layout === "minimal") {
    main.style.padding = "10px";
    $(".brand-name").style.fontSize = "28px";
    $(".widgets-container").style.display = "none";
  } else {
    main.style.padding = "";
    $(".brand-name").style.fontSize = "";
    if (widgetsVisible) $(".widgets-container").style.display = "grid";
  }
}

// 7. Focus Mode
var settingFocusMode = $("#settingFocusMode");

settingFocusMode.checked = settings.focusMode;
settingFocusMode.addEventListener("change", function() {
  settings.focusMode = this.checked;
  save(SETTINGS_KEYS.focusMode, settings.focusMode);
  toggleFocusMode();
});

function toggleFocusMode() {
  if (settings.focusMode) {
    document.body.classList.add("focus-mode");
    focusOverlay.classList.add("visible");
  } else {
    document.body.classList.remove("focus-mode");
    focusOverlay.classList.remove("visible");
  }
}

toggleFocusMode();

// 8. Quotes Widget
var quotesWidget = $("#quotesWidget");
var quoteText = $("#quoteText");
var quoteAuthor = $("#quoteAuthor");
var settingShowQuotes = $("#settingShowQuotes");

var quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

function showRandomQuote() {
  var quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = "— " + quote.author;
}

showRandomQuote();

settingShowQuotes.checked = settings.showQuotes;
settingShowQuotes.addEventListener("change", function() {
  settings.showQuotes = this.checked;
  save(SETTINGS_KEYS.showQuotes, settings.showQuotes);
  quotesWidget.classList.toggle("visible", settings.showQuotes);
});

quotesWidget.classList.toggle("visible", settings.showQuotes);

// 9. Weather Widget
var weatherWidget = $("#weatherWidget");
var weatherIcon = $("#weatherIcon");
var weatherTemp = $("#weatherTemp");
var weatherDesc = $("#weatherDesc");
var weatherCity = $("#weatherCity");
var settingShowWeather = $("#settingShowWeather");
var settingWeatherCity = $("#settingWeatherCity");
var settingWeatherCelsius = $("#settingWeatherCelsius");

settingShowWeather.checked = settings.showWeather;
settingWeatherCity.value = settings.weatherCity;
settingWeatherCelsius.checked = settings.weatherCelsius;

function fetchWeather() {
  if (!settings.weatherCity) return;
  var city = encodeURIComponent(settings.weatherCity);
  var units = settings.weatherCelsius ? "metric" : "imperial";
  // OpenWeatherMap API - you'll need an API key
  // For demo, using a placeholder
  weatherIcon.textContent = "⛅";
  weatherTemp.textContent = "22°";
  weatherDesc.textContent = "Partly cloudy";
  weatherCity.textContent = settings.weatherCity;
}

settingShowWeather.addEventListener("change", function() {
  settings.showWeather = this.checked;
  save(SETTINGS_KEYS.showWeather, settings.showWeather);
  weatherWidget.classList.toggle("visible", settings.showWeather);
  if (settings.showWeather) fetchWeather();
});

weatherWidget.classList.toggle("visible", settings.showWeather);

settingWeatherCity.addEventListener("change", function() {
  settings.weatherCity = this.value;
  save(SETTINGS_KEYS.weatherCity, settings.weatherCity);
  if (settings.showWeather) fetchWeather();
});

settingWeatherCelsius.addEventListener("change", function() {
  settings.weatherCelsius = this.checked;
  save(SETTINGS_KEYS.weatherCelsius, settings.weatherCelsius);
  if (settings.showWeather) fetchWeather();
});

// 10. Pomodoro Timer
var pomodoroWidget = $("#pomodoroWidget");
var pomoDisplay = $("#pomoDisplay");
var pomoLabel = $("#pomoLabel");
var pomoStart = $("#pomoStart");
var pomoReset = $("#pomoReset");
var settingShowPomodoro = $("#settingShowPomodoro");
var settingPomoDuration = $("#settingPomoDuration");
var settingPomoBreak = $("#settingPomoBreak");

var pomoTime = settings.pomoDuration * 60;
var pomoRunning = false;
var pomoInterval = null;
var pomoPhase = "focus";

settingShowPomodoro.checked = settings.showPomodoro;
settingPomoDuration.value = settings.pomoDuration;
settingPomoBreak.value = settings.pomoBreak;

function updatePomoDisplay() {
  var m = Math.floor(pomoTime / 60);
  var s = pomoTime % 60;
  pomoDisplay.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}

function startPomo() {
  if (pomoRunning) {
    clearInterval(pomoInterval);
    pomoRunning = false;
    pomoStart.innerHTML = "&#9654;";
  } else {
    pomoRunning = true;
    pomoStart.innerHTML = "&#10074;&#10074;";
    pomoInterval = setInterval(function() {
      pomoTime--;
      if (pomoTime <= 0) {
        clearInterval(pomoInterval);
        pomoRunning = false;
        pomoStart.innerHTML = "&#9654;";
        if (pomoPhase === "focus") {
          pomoPhase = "break";
          pomoTime = settings.pomoBreak * 60;
          pomoLabel.textContent = "Break";
        } else {
          pomoPhase = "focus";
          pomoTime = settings.pomoDuration * 60;
          pomoLabel.textContent = "Focus";
        }
      }
      updatePomoDisplay();
    }, 1000);
  }
}

pomoStart.addEventListener("click", startPomo);
pomoReset.addEventListener("click", function() {
  clearInterval(pomoInterval);
  pomoRunning = false;
  pomoPhase = "focus";
  pomoTime = settings.pomoDuration * 60;
  pomoLabel.textContent = "Focus";
  pomoStart.innerHTML = "&#9654;";
  updatePomoDisplay();
});

settingPomoDuration.addEventListener("change", function() {
  settings.pomoDuration = parseInt(this.value) || 25;
  save(SETTINGS_KEYS.pomoDuration, settings.pomoDuration);
  if (!pomoRunning) {
    pomoTime = settings.pomoDuration * 60;
    updatePomoDisplay();
  }
});

settingPomoBreak.addEventListener("change", function() {
  settings.pomoBreak = parseInt(this.value) || 5;
  save(SETTINGS_KEYS.pomoBreak, settings.pomoBreak);
});

settingShowPomodoro.addEventListener("change", function() {
  settings.showPomodoro = this.checked;
  save(SETTINGS_KEYS.showPomodoro, settings.showPomodoro);
  pomodoroWidget.classList.toggle("visible", settings.showPomodoro);
});

pomodoroWidget.classList.toggle("visible", settings.showPomodoro);
updatePomoDisplay();

// 11. Quick Links
var quickLinksWidget = $("#quickLinksWidget");
var quickLinksGrid = $("#quickLinksGrid");
var settingShowQuickLinks = $("#settingShowQuickLinks");
var qlName = $("#qlName");
var qlUrl = $("#qlUrl");
var qlAdd = $("#qlAdd");
var qlList = $("#qlList");

settingShowQuickLinks.checked = settings.showQuickLinks;

function renderQuickLinks() {
  quickLinksGrid.innerHTML = "";
  qlList.innerHTML = "";
  settings.quickLinks.forEach(function(link, i) {
    var a = document.createElement("a");
    a.href = link.url;
    a.title = link.name;
    a.innerHTML = '<img src="https://www.google.com/s2/favicons?domain=' + link.domain + '&sz=64" alt="">' + link.name;
    quickLinksGrid.appendChild(a);

    var li = document.createElement("li");
    li.innerHTML = '<span>' + link.name + '</span><button data-i="' + i + '">Remove</button>';
    li.querySelector("button").addEventListener("click", function() {
      settings.quickLinks.splice(i, 1);
      save(SETTINGS_KEYS.quickLinks, settings.quickLinks);
      renderQuickLinks();
    });
    qlList.appendChild(li);
  });
}

qlAdd.addEventListener("click", function() {
  var name = qlName.value.trim();
  var url = qlUrl.value.trim();
  if (!name || !url) return;
  var domain = url.replace(/^https?:\/\//, "").split("/")[0];
  settings.quickLinks.push({ name: name, url: url, domain: domain });
  save(SETTINGS_KEYS.quickLinks, settings.quickLinks);
  qlName.value = "";
  qlUrl.value = "";
  renderQuickLinks();
});

settingShowQuickLinks.addEventListener("change", function() {
  settings.showQuickLinks = this.checked;
  save(SETTINGS_KEYS.showQuickLinks, settings.showQuickLinks);
  quickLinksWidget.classList.toggle("visible", settings.showQuickLinks);
});

quickLinksWidget.classList.toggle("visible", settings.showQuickLinks);
renderQuickLinks();

// 12. Habit Tracker
var habitWidget = $("#habitWidget");
var habitList = $("#habitList");
var habitAddBtn = $("#habitAddBtn");
var settingShowHabits = $("#settingShowHabits");

settingShowHabits.checked = settings.showHabits;

function renderHabits() {
  habitList.innerHTML = "";
  settings.habits.forEach(function(habit, i) {
    var li = document.createElement("li");
    li.innerHTML = '<div class="habit-checkbox ' + (habit.done ? "checked" : "") + '"></div><span>' + habit.name + '</span>';
    li.querySelector(".habit-checkbox").addEventListener("click", function() {
      settings.habits[i].done = !settings.habits[i].done;
      save(SETTINGS_KEYS.habits, settings.habits);
      renderHabits();
    });
    habitList.appendChild(li);
  });
}

habitAddBtn.addEventListener("click", function() {
  var name = prompt("Enter habit name:");
  if (name) {
    settings.habits.push({ name: name, done: false });
    save(SETTINGS_KEYS.habits, settings.habits);
    renderHabits();
  }
});

settingShowHabits.addEventListener("change", function() {
  settings.showHabits = this.checked;
  save(SETTINGS_KEYS.showHabits, settings.showHabits);
  habitWidget.classList.toggle("visible", settings.showHabits);
});

habitWidget.classList.toggle("visible", settings.showHabits);
renderHabits();

// 13. Custom Wallpaper
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
    };
    reader.readAsDataURL(file);
  }
});

wallpaperClear.addEventListener("click", function() {
  settings.wallpaper = "";
  save(SETTINGS_KEYS.wallpaper, settings.wallpaper);
  settingWallpaper.value = "";
  updateWallpaper();
});

updateWallpaper();

// 15. Analytics
var settingShowAnalytics = $("#settingShowAnalytics");
var analyticsDisplay = $("#analyticsDisplay");
var analyticsTabCount = $("#analyticsTabCount");
var analyticsTotal = $("#analyticsTotal");

var analyticsData = load(SETTINGS_KEYS.analytics, { today: new Date().toDateString(), count: 0, total: 0 });
if (analyticsData.today !== new Date().toDateString()) {
  analyticsData.today = new Date().toDateString();
  analyticsData.count = 0;
}
analyticsData.count++;
analyticsData.total++;
save(SETTINGS_KEYS.analytics, analyticsData);

settingShowAnalytics.checked = settings.showAnalytics;
analyticsTabCount.textContent = analyticsData.count;
analyticsTotal.textContent = analyticsData.total;

settingShowAnalytics.addEventListener("change", function() {
  settings.showAnalytics = this.checked;
  save(SETTINGS_KEYS.showAnalytics, settings.showAnalytics);
  analyticsDisplay.style.display = settings.showAnalytics ? "flex" : "none";
});

analyticsDisplay.style.display = settings.showAnalytics ? "flex" : "none";

// 16. Ambient Sound
var ambientWidget = $("#ambientWidget");
var ambientPlayBtn = document.getElementById("ambientPlayBtn");
var ambientSoundName = document.getElementById("ambientSoundName");
var ambientProgressFill = document.getElementById("ambientProgressFill");
var ambientSoundBtn = document.getElementById("ambientSoundBtn");
var ambientSoundMenu = document.getElementById("ambientSoundMenu");
var ambientVolume = document.getElementById("ambientVolume");
var volumePercent = document.getElementById("volumePercent");
var settingShowAmbient = $("#settingShowAmbient");

var ambientAudio = null;
var ambientIsPlaying = false;
var ambientProgressInterval = null;

var soundNames = {
  "": "Select Sound",
  "rain": "Rain",
  "ocean": "Ocean",
  "fire": "Fire",
  "birds": "Birds",
  "wind": "Wind",
  "cafe": "Cafe"
};

var soundUrls = {
  "rain": "https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3",
  "ocean": "https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3",
  "fire": "https://assets.mixkit.co/active_storage/sfx/2521/2521-preview.mp3",
  "birds": "https://assets.mixkit.co/active_storage/sfx/2430/2430-preview.mp3",
  "wind": "https://assets.mixkit.co/active_storage/sfx/2528/2528-preview.mp3",
  "cafe": "https://assets.mixkit.co/active_storage/sfx/2508/2508-preview.mp3"
};

function updateAmbientUI() {
  ambientSoundName.textContent = soundNames[settings.ambientSound] || "Select Sound";
  volumePercent.textContent = settings.ambientVolume + "%";
  ambientVolume.value = settings.ambientVolume;
  
  document.querySelectorAll(".sound-option").forEach(function(opt) {
    opt.classList.toggle("active", opt.dataset.sound === settings.ambientSound);
  });
  
  if (ambientAudio) {
    ambientAudio.volume = settings.ambientVolume / 100;
  }
}

function loadAmbientSound(sound) {
  if (ambientAudio) {
    ambientAudio.pause();
    ambientAudio = null;
  }
  if (ambientIsPlaying) {
    ambientIsPlaying = false;
    ambientPlayBtn.classList.remove("playing");
    clearInterval(ambientProgressInterval);
  }
  
  if (sound && soundUrls[sound]) {
    ambientAudio = new Audio(soundUrls[sound]);
    ambientAudio.loop = true;
    ambientAudio.volume = settings.ambientVolume / 100;
  }
}

function toggleAmbientPlay() {
  if (!settings.ambientSound || !ambientAudio) return;
  
  if (ambientIsPlaying) {
    ambientAudio.pause();
    ambientIsPlaying = false;
    ambientPlayBtn.classList.remove("playing");
    clearInterval(ambientProgressInterval);
  } else {
    ambientAudio.play().catch(function() {});
    ambientIsPlaying = true;
    ambientPlayBtn.classList.add("playing");
    ambientProgressFill.style.width = "0%";
    ambientProgressInterval = setInterval(function() {
      if (ambientAudio && ambientAudio.duration) {
        var progress = (ambientAudio.currentTime / ambientAudio.duration) * 100;
        ambientProgressFill.style.width = progress + "%";
      }
    }, 500);
  }
}

ambientPlayBtn.addEventListener("click", toggleAmbientPlay);

ambientSoundBtn.addEventListener("click", function(e) {
  e.stopPropagation();
  ambientSoundMenu.classList.toggle("open");
});

document.querySelectorAll(".sound-option").forEach(function(opt) {
  opt.addEventListener("click", function() {
    settings.ambientSound = this.dataset.sound;
    save(SETTINGS_KEYS.ambientSound, settings.ambientSound);
    loadAmbientSound(settings.ambientSound);
    ambientSoundMenu.classList.remove("open");
    updateAmbientUI();
  });
});

ambientVolume.addEventListener("input", function() {
  settings.ambientVolume = parseInt(this.value, 10);
  save(SETTINGS_KEYS.ambientVolume, settings.ambientVolume);
  volumePercent.textContent = settings.ambientVolume + "%";
  if (ambientAudio) {
    ambientAudio.volume = settings.ambientVolume / 100;
  }
});

document.addEventListener("click", function(e) {
  if (!ambientSoundMenu.contains(e.target) && e.target !== ambientSoundBtn) {
    ambientSoundMenu.classList.remove("open");
  }
});

settingShowAmbient.checked = settings.showAmbient;
settingShowAmbient.addEventListener("change", function() {
  settings.showAmbient = this.checked;
  save(SETTINGS_KEYS.showAmbient, settings.showAmbient);
  ambientWidget.classList.toggle("visible", settings.showAmbient);
});

ambientWidget.classList.toggle("visible", settings.showAmbient);
loadAmbientSound(settings.ambientSound);
updateAmbientUI();

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
  if (e.key === "f" && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    settings.focusMode = !settings.focusMode;
    save(SETTINGS_KEYS.focusMode, settings.focusMode);
    settingFocusMode.checked = settings.focusMode;
    toggleFocusMode();
  }
});

// ========================================
// SETTINGS PANEL END
// ========================================

})();
