# Changelog - Vasudev AI New Tab

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2025-04-25

### Added
- **New Settings Panel Design**
  - Center popup card design (ChatGPT-style)
  - Category-based sidebar (5 categories)
  - Smooth scale + fade animations
  - Mobile responsive (horizontal tabs on small screens)
  - Click outside to close
  - ESC key support

- **5 Settings Categories**
  - General: User Name, Brand Name, Page Title, Favicon
  - Appearance: Theme, Accent Color, Presets, Font, Layout, Background
  - Widgets: Clock, Quotes, Weather, Pomodoro, Quick Links, Habits, Sound, Analytics
  - Dock: Bookmark Shortcuts
  - Advanced: Import/Export, Shortcuts, Reset

- **4 Search Bar Styles**
  - Default (rounded with reflection)
  - Minimal (clean flat design)
  - Rounded (fully rounded)
  - Pill (pill shape)
  - Each style updates the suggestions dropdown to match

- **Focus Mode Improvements**
  - Smooth fade transitions
  - Search bar centered on screen
  - All other elements hidden
  - Press `F` to toggle

- **Gmail Profile Sync**
  - Shows your profile picture in the dock area

- **Additional Features**
  - Custom font selection (Inter, Poppins, Space Grotesk, Outfit, JetBrains Mono)
  - Theme presets: Default, Midnight, Ocean, Sunset, Forest, Mono
  - Layout options: Center, Compact, Minimal

### Fixed
- Settings panel positioning (now centered)
- Smooth animations throughout
- Settings close on overlay click
- Search bar styles consistent with dropdown
- Mobile responsive layouts
- JavaScript syntax errors
- CSS brace imbalance

### Removed
- Old sidebar settings panel
- Duplicate code sections

---

## [1.2.0] - Previous Versions

### Core Features (from v1.x)
- Live Clock with 12h/24h format
- Personalized Greeting
- Google Search with Omnibox
- Dark/Light Theme
- Notes, Tasks & Calendar
- Customizable Dock
- 3D animations & gradient background

### Settings (20+ Options)
- User Name Greeting
- Custom Page Title
- Custom Favicon
- Accent Color Picker
- Clock Options
- Focus Mode
- Quotes Widget
- Theme Presets
- Font Selector
- Layout Options
- Weather Widget
- Pomodoro Timer
- Quick Links
- Custom Wallpaper
- Habit Tracker
- Ambient Sound
- Import/Export

---

## Upgrading from v1.x to v2.0

1. **Backup your settings** (Settings → Advanced → Export JSON)
2. **Uninstall old extension**
3. **Install new extension** (see README.md)
4. **Import settings** (if backed up)

---

## Known Issues

- Some features require Chrome with host permissions
- Weather widget may not work without API key
- Ambient sounds require internet connection

---

## Credits

Built with ❤️ by [Vasudev AI](https://vasudev.online)

---

<p align="center">
  <a href="https://vasudev.online">Vasudev AI</a> • 
  <a href="https://github.com/sg-surya/custom-tabye">GitHub</a> •
  <a href="https://search.vasudev.online">Live Demo</a>
</p>