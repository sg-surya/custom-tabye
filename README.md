# Minimal Tab - Premium Chrome New Tab Dashboard

<p align="center">
  <img src="icons/icon128.png" alt="Minimal Tab Icon" width="128" height="128">
</p>

<p align="center">
  <a href="https://github.com/sg-surya/custom-tabye/releases">
    <img src="https://img.shields.io/github/v/release/sg-surya/custom-tabye?style=flat" alt="GitHub Release">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/sg-surya/custom-tabye?style=flat" alt="License: MIT">
  </a>
</p>

---

Replace your default Chrome new tab with a beautiful, feature-rich dashboard. Minimal Tab brings Apple-inspired design with 20+ customization options directly to your browser.

- **Live Demo:** [search.vasudev.online](http://search.vasudev.online/)
- **Download:** [GitHub Releases](https://github.com/sg-surya/custom-tabye/releases)
- **Version:** 1.1.0

---

## Features

### Core Features
- Live Clock with 12h/24h format toggle
- Personalized Greeting (Good morning/afternoon/evening + Your Name)
- Google Search with Omnibox autocomplete
- Dark/Light Theme toggle
- Notes, Tasks & Calendar widgets
- Customizable Dock (add/remove websites)
- Apple-style 3D animations & floating gradient background

### Settings Panel (20+ Customization Options)
| # | Feature | Description |
|---|---------|-------------|
| 1 | User Name Greeting | Personalize with your name |
| 2 | Accent Color Picker | 8 preset colors + custom color |
| 3 | Clock Options | Show/hide, 12h/24h, seconds |
| 4 | Focus Mode | Hide everything except search |
| 5 | Quotes Widget | Daily motivation quotes |
| 6 | Theme Presets | Midnight, Ocean, Sunset, Forest, Mono |
| 7 | Font Selector | Inter, Poppins, Space Grotesk, Outfit, JetBrains Mono |
| 8 | Layout Options | Center, Compact, Minimal |
| 9 | Weather Widget | OpenWeather API integration |
| 10 | Pomodoro Timer | Focus/work timer |
| 11 | Quick Links | Custom shortcut grid |
| 12 | Custom Wallpaper | Upload your own background |
| 13 | Habit Tracker | Track daily habits |
| 14 | Bookmark Shortcuts | Dock-based bookmarks |
| 15 | Ambient Sound | Built-in sound player |
| 16 | Import/Export | JSON settings backup |

---

## Getting Started

### Step 1: Star This Repository

If you find this project useful, please consider starring the repository!

👉 [Star on GitHub](https://github.com/sg-surya/custom-tabye/stargazers)

Starring helps the project gain visibility and encourages further development.

### Step 2: Download the Source Code

Choose one of the following methods:

#### Option A: Clone with Git (Recommended)
```bash
git clone https://github.com/sg-surya/custom-tabye.git
cd custom-tabye
```

#### Option B: Download ZIP
1. Go to [GitHub Repository](https://github.com/sg-surya/custom-tabye)
2. Click the green **Code** button
3. Click **Download ZIP**
4. Extract the ZIP file

### Step 3: Run Locally (Optional for Testing)

To test the new tab locally before installing:

1. Open `index.html` in your browser, OR
2. Use a local server:
```bash
# If you have Python installed
python -m http.server 8000
# Then open http://localhost:8000
```

---

## Installation

### Load Unpacked (Developer Mode)

For manual installation:

1. Download the source code (see Step 2 above)
2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer Mode** (toggle in top-right corner)
4. Click **"Load unpacked"**
5. Select the `custom-tabye` folder
6. The extension will be installed and ready

> **Note:** When using manual install, you'll need to manually update the extension when new versions are released.

---

## Screenshots

### Light Theme
![Light Theme](screenshoots/light.png)

### Dark Theme
![Dark Theme](screenshoots/dark.png)

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search bar |
| `T` | Toggle theme |
| `W` | Toggle widgets |
| `S` | Open settings |
| `?` | Show shortcuts |
| `F` | Toggle focus mode |
| `Esc` | Close panel |

---

## Tech Stack

| Technology | Purpose |
|-------------|---------|
| HTML5 | Structure |
| CSS3 | Styling, glassmorphism, animations |
| JavaScript (Vanilla) | All functionality |
| Chrome Manifest V3 | Extension configuration |
| Google Fonts | Typography |
| localStorage | Data persistence |

---

## Troubleshooting

- **New tab doesn't change?** Try restarting Chrome
- **Extension not loading?** Make sure it's enabled in `chrome://extensions`
- **Seeing errors?** Check the extension page for warning messages
- **Customize not saving?** Ensure browser cookies/storage are not blocked

---

## Future Roadmap

- [x] Weather widget
- [x] Pomodoro timer
- [x] Custom wallpaper
- [x] Accent color picker
- [x] Quotes widget
- [x] Habit tracker
- [ ] Browser sync across devices
- [ ] Multi-language support

---

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## Support

If you find this project useful:

- ⭐ **Star** the repository on GitHub
- 🐛 **Report bugs** via [GitHub Issues](https://github.com/sg-surya/custom-tabye/issues)
- 💡 **Suggest features** via [GitHub Issues](https://github.com/sg-surya/custom-tabye/issues)
- 📖 **Share** with friends and colleagues

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Links

- **Live Demo:** [search.vasudev.online](http://search.vasudev.online/)
- **GitHub:** [github.com/sg-surya/custom-tabye](https://github.com/sg-surya/custom-tabye)
- **Website:** [vasudev.online](https://vasudev.online)

---

<p align="center">
  Built with ❤️ by <a href="https://vasudev.online">Vasudev AI</a>
</p>