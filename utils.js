export const getElementHeight = (element) => {
  const elementMargin =
    parseInt(window.getComputedStyle(element).getPropertyValue("margin-top")) +
    parseInt(
      window.getComputedStyle(element).getPropertyValue("margin-bottom")
    );
  const elementHeight = Math.round(elementMargin + element.offsetHeight);
  return elementHeight;
};

export const getCurrentTheme = () => {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  localStorage.getItem("theme") == "dark" ? (theme = "dark") : null;
  return theme;
};

export const loadTheme = (theme) => {
  const root = document.querySelector(":root");
  root.setAttribute("color-scheme", `${theme}`);
};

//box shadow props -1px 0px 11px 3px #222831
