module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "blue-dark": "#03045E",
      blue: "#0077B6",
      "blue-light": "#90E0EF",
      "gray-dark": "#00333D",
      gray: "#6D8A90",
      "gray-light": "#DAE1E3",
      green: "#89C024",
      pink: "#B60075",
      white: "#FFFFFF",
      "white-azure": "#F0FFFF",
    },
    fontFamily: {
      header: ["Montserrat"],
      body: ["'Open Sans'"],
      graph: ["'Noto Sans'"],
    },
    fontSize: {
      xs: ["10px"],
      sm: ["14px", "18px"],
      base: ["16px", "24px"],
      xl: ["20px", "25px"],
      "2xl": ["28px", "35px"],
      "3xl": ["36px", "45px"],
      "4xl": ["44px", "48px"],
    },
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1536px",
      },
      dropShadow: {
        DEFAULT: "drop-shadow(0 0 8 rgba(109,138,144,.25))",
      },
    },
  },
  plugins: [],
};
