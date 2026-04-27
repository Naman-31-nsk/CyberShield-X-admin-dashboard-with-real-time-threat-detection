/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg0:    "#080c14",
          bg1:    "#0d1421",
          bg2:    "#111927",
          bg3:    "#162035",
          border: "#1e2d4a",
          accent: "#00d4ff",
          green:  "#00ff88",
          red:    "#ff3b5c",
          orange: "#ff7a2f",
          yellow: "#ffd60a",
          purple: "#a855f7",
          text1:  "#e2eaf5",
          text2:  "#8ba0bc",
          text3:  "#4a6080",
        },
      },
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
        mono:     ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
