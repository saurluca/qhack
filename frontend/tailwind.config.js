export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#FF0B14",
        "main-secondary": "#D80012",
        second: "#228E00",
        "second-secondary": "#235B09",
        gray: "#C9C6C3",
        yellow: "#FBD92B",
        green: "#308807",
        pink: "#E7454B",
        background: "#FFFFFF",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
