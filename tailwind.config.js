/**
 * Enables variable coloring with opacity.
 * @param {String} variableName - The CSS variable name.
 * @returns The function that allows opacity configuration.
 */
function withOpacity(variableName) {
  return ({ opacityValue }) =>
    opacityValue !== undefined
      ? `rgba(var(${variableName}), ${opacityValue})`
      : `rgba(var(${variableName}))`;
}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      header: "var(--font-family-header)",
      body: "var(--font-family-body)",
      graph: "var(--font-family-graph)",
    },
    fontSize: {
      xs: ["10px", "14px"],
      sm: ["14px", "18px"],
      md: ["16px", "24px"],
      xl: ["20px", "25px"],
      "2xl": ["28px", "35px"],
      "3xl": ["36px", "45px"],
      "4xl": ["44px", "48px"],
      button: ["14px", "24px"],
    },
    textColor: {
      base: withOpacity("--color-text-base"),
      muted: withOpacity("--color-text-muted"),
      inverted: withOpacity("--color-text-inverted"),
      disabled: withOpacity("--color-text-disabled"),
      highlight: withOpacity("--color-text-highlight"),
      utility: withOpacity("--color-text-utility"),
      warning: withOpacity("--color-text-warning"),
    },
    screens: {
      sm: "var(--screen-size-sm)",
      md: "var(--screen-size-md)",
      lg: "var(--screen-size-lg)",
      xl: "var(--screen-size-xl)",
      "2xl": "var(--screen-size-2xl)",
    },
    extend: {
      divideColor: {
        DEFAULT: withOpacity("--color-divide-muted"),
      },
      boxShadow: {
        DEFAULT: "0px 0px 8px rgba(var(--color-text-muted), 0.25)",
      },
      animation: {
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) 4",
        dim: "dim 0.3s ease-in-out forwards",
        undim: "undim 0.3s ease-in-out forwards",
        slideIn: "slideIn 0.3s ease-in-out forwards",
        slideOut: "slideOut 0.3s ease-in-out forwards",
      },
      keyframes: {
        ping: {
          "75%, 100%": { transform: "scale(1.4)", opacity: 0 },
        },
        dim: {
          from: { backgroundColor: "rgba(var(--color-overlay-base), 0)" },
          to: { backgroundColor: "rgba(var(--color-overlay-base), 0.5)" },
        },
        undim: {
          from: { backgroundColor: "rgba(var(--color-overlay-base), 0.5)" },
          to: { backgroundColor: "rgba(var(--color-overlay-base), 0)" },
        },
        slideIn: {
          "0%": { right: "calc(-100%)" },
          "100%": { right: 0 },
        },
        slideOut: {
          "0%": { right: 0 },
          "100%": { right: "calc(-100%)" },
        },
      },
      backgroundColor: {
        skin: {
          base: withOpacity("--color-background-base"),
          inverted: withOpacity("--color-background-inverted"),
          highlight: withOpacity("--color-background-highlight"),
        },
        pill: {
          ready: withOpacity("--color-pill-ready"),
          loading: withOpacity("--color-pill-loading"),
          waiting: withOpacity("--color-pill-waiting"),
          warning: withOpacity("--color-pill-warning"),
        },
        button: {
          base: withOpacity("--color-button-base"),
          muted: withOpacity("--color-button-muted"),
          inactive: withOpacity("--color-button-inactive"),
          active: withOpacity("--color-button-active"),
          warning: withOpacity("--color-button-warning"),
          blank: withOpacity("--color-button-blank"),
        },
        dropdown: {
          base: withOpacity("--color-dropdown-base"),
          selected: withOpacity("--color-dropdown-selected"),
          hover: withOpacity("--color-dropdown-hover"),
        },
        input: {
          base: withOpacity("--color-input-base"),
        },
        navbar: {
          base: withOpacity("--color-navbar-base"),
        },
        overlay: {
          base: withOpacity("--color-overlay-base"),
        },
        scrollbar: {
          track: withOpacity("--color-scrollbar-track"),
          thumb: withOpacity("--color-scrollbar-thumb"),
        },
      },
      borderColor: {
        button: {
          base: withOpacity("--color-button-base"),
          muted: withOpacity("--color-button-muted"),
          inactive: withOpacity("--color-button-inactive"),
          active: withOpacity("--color-button-active"),
          warning: withOpacity("--color-button-warning"),
          blank: withOpacity("--color-button-blank"),
        },
        input: {
          base: withOpacity("--color-input-base"),
        },
        searchbar: {
          base: withOpacity("--color-searchbar-base"),
        },
        dropdown: {
          divide: withOpacity("--color-dropdown-divide"),
        },
        divide: {
          base: withOpacity("--color-divide-base"),
        },
      },
    },
  },
  plugins: [],
};
