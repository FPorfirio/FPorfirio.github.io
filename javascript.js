import { projectCard } from "./card.js";
import { getCurrentTheme } from "./utils.js";
import { loadTheme } from "./utils.js";

//Dom elements;
const anchor = document.querySelectorAll(
  'a[href*="#"]:not([href="#"]):not([href="#0"])'
);
const body = document.getElementById("body");
const main = document.getElementById("main");
const nav = document.getElementById("nav");
const header = document.getElementsByTagName("header")[0];
const aside = document.getElementById("aside");
const grid = document.getElementById("grid");
const sections = main.querySelectorAll("section");
const themeBtn = document.getElementById("themeBtn");
const toggleNavIcon = toggleElement();
let clicked;

window.addEventListener("DOMContentLoaded", () => {
  loadTheme(getCurrentTheme());
  let theme = getCurrentTheme();
  if (theme == "light") {
    themeBtn.querySelector("img").src = "./assets/light.svg";
  } else {
    themeBtn.querySelector("img").src = "./assets/dark.svg";
  }
});

themeBtn.addEventListener("click", function (e) {
  const icon = themeBtn.querySelector("img");
  let theme = getCurrentTheme();
  if (theme == "light") {
    theme = "dark";
    icon.src = "./assets/dark.svg";
  } else {
    theme = "light";
    icon.src = "./assets/light.svg";
  }
  localStorage.setItem("theme", theme);
  loadTheme(theme);
});

//generate project card programmatically from projects.json
async function generateCards() {
  const projectsList = sections[2].querySelector("ul");
  const projectsContainer = document.createDocumentFragment();
  const response = await fetch("./projects.json");
  const projects = await response.json();

  projects.forEach((project) => {
    const card = projectCard(project);
    const listItem = document.createElement("li");
    listItem.appendChild(card);
    projectsContainer.appendChild(listItem);
  });
  projectsList.appendChild(projectsContainer);
}

generateCards();

//Nav links scroll function
nav.addEventListener("click", function (e) {
  e.preventDefault();
  clicked = true;
  const target = e.target.closest("a");
  const hash = target.hash.slice(1);
  const sectionElement = document.getElementById(hash);
  const destination = main.offsetTop + sectionElement.offsetTop;
  toggleNavIcon(target);
  scrollTo(document.body, destination, 600);
});

function scrollTo(element, to, duration) {
  if (duration <= 0) {
    clicked = false;
    return;
  }
  let difference = to - element.scrollTop;
  let perTick = (difference / duration) * 10;
  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick;

    scrollTo(element, to, duration - 10);
  }, 1);
}

//use from parameter to decide if make the calc from top, or bottom
function isOnVIew(element, from) {
  const scrollFull =
    Math.round(body.getBoundingClientRect().height - window.innerHeight) ==
    Math.round(body.scrollTop);

  if (scrollFull) {
    if (element.getBoundingClientRect().top < 0) {
      return false;
    }
    return true;
  }
  if (
    element.getBoundingClientRect().top +
      element.getBoundingClientRect().height >
    0
  ) {
    return true;
  }
}

function toggleElement() {
  let focusedElement;

  return function (element) {
    if (focusedElement !== element) {
      focusedElement?.classList.remove("isSelected");
      focusedElement = element;
      focusedElement.classList.add("isSelected");
      return;
    }
  };
}

//color navIcon based window scroll position matching respective hash section
function relativeFocus() {
  if (isOnVIew(sections[0])) {
    toggleNavIcon(anchor[0]);
    return;
  } else if (isOnVIew(sections[1])) {
    toggleNavIcon(anchor[1]);
    return;
  } else if (isOnVIew(sections[2])) {
    toggleNavIcon(anchor[2]);
    return;
  } else if (isOnVIew(sections[3])) {
    toggleNavIcon(anchor[3]);
  }
}

//Dynamic nav added based on windows width
let navOffset =
  nav.offsetTop +
  parseInt(window.getComputedStyle(nav).getPropertyValue("margin-top"));

function actualResizeHandler() {
  relativeFocus();
  let windowsWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );

  if (
    document.body.scrollTop >= navOffset &&
    windowsWidth > 609 &&
    nav.parentElement != aside
  ) {
    nav.id = "";
    nav.className = "navM";
    themeBtn.className = "themeBtn--side";
    aside.appendChild(nav);
    aside.appendChild(themeBtn);
    setTimeout(function () {
      nav.className += " navMTrigger";
    }, 200);
  } else if (
    document.body.scrollTop >= navOffset &&
    windowsWidth < 609 &&
    nav.parentElement != main
  ) {
    nav.id = "";
    nav.className = "navM";
    main.insertBefore(nav, main.firstChild);
    setTimeout(function () {
      nav.className += " navMTrigger";
    }, 200);
  } else if (
    document.body.scrollTop <= navOffset &&
    nav.parentElement != header
  ) {
    nav.id = "nav";
    nav.className = "navTrigger";
    themeBtn.className = "themeBtn--hero";
    header.appendChild(themeBtn);
    header.appendChild(nav);
    setTimeout(function () {
      nav.className = "navtrans";
      nav.className += " navTrigger1";
    }, 200);
  }
}

//36rem 28rem

//Event limiter function(throttle)
let resizeTimeout;
function resizeThrottler() {
  if (clicked) {
    return;
  }
  if (!resizeTimeout) {
    (resizeTimeout = setTimeout(function () {
      resizeTimeout = null;
      actualResizeHandler();
    })),
      500;
  }
}

//Window events
window.addEventListener("scroll", resizeThrottler, false);
window.addEventListener("resize", resizeThrottler);
