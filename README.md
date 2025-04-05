# 🎨 Pixel-Peek

**Pixel-Peek** is a Chrome extension that allows users to identify the color of any pixel on the currently open webpage. It displays the RGB and HEX color values of the clicked pixel and copies the HEX code to the clipboard. Think of it as an eyedropper tool for the web.

---

## 🚀 Features

- 🖱️ Click on any webpage pixel to get its **RGB** and **HEX** color codes
- 📋 Automatically **copies the HEX** code to clipboard
- 👁️ Lightweight overlay with crosshair cursor
- 🧠 Maintains a **console-based color history**

---

## 📦 Installation

1. **Clone this repository**

   ```bash
   git clone https://github.com/akshiita07/Pixel-Peek.git
   cd Pixel-Peek
   ```

2. **Load it into Chrome**

   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Enable `Developer mode` (top-right)
   - Click on `Load unpacked`
   - Select the cloned `Pixel-Peek` folder

---

## 🧑‍💻 Usage

1. Click the **Pixel-Peek** icon in your Chrome toolbar.
2. In the popup, hit **Start Color Picker**.
3. Your screen will now display a crosshair overlay.
4. Click anywhere on the page to get color details:
   - An alert will show the RGB and HEX values
   - HEX code will be automatically copied to your clipboard
5. Open DevTools (F12) to view the logged color history in the console.

---

## 🗂️ Project Structure

```
Pixel-Peek/
│
├── manifest.json       # Extension configuration
├── popup.html          # UI for the extension popup
├── popup.js            # Injects the content script
├── background.js       # Handles screenshot capture
└── content.js          # Eyedropper logic on active tab
```

---

## 🛡️ Permissions

- `activeTab`: Access to the current tab
- `scripting`: To inject JavaScript into the page
- `tabs`: To manage and identify the current tab
- `captureVisibleTab`: To take a screenshot of the current view

---

## 🤝 Contributing

Found a bug or have a feature request? Feel free to open an [issue](https://github.com/akshiita07/Pixel-Peek/issues) or submit a [pull request](https://github.com/akshiita07/Pixel-Peek/pulls).

---


### Made with ❤️ by [@akshiita07](https://github.com/akshiita07)
