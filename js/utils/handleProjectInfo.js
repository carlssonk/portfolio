import projects from "../../assets/projects.js"
import { generateCardsDOM } from "./generateCards.js";
// Handles hover and clicking on the project cards
export const handleProjectInfo = () => {

  // Generate project cards
  generateCardsDOM();
  
  const cards = document.querySelectorAll("[data-js=project-item]");
  const projectItemBig = document.querySelector("[data-js=project-item-big]");
  const clickCatcher = document.querySelector("[data-js=click-catcher]");

  const DOM = getItemDOM(projectItemBig);

  cards.forEach((card) => {
    const icons = card.querySelectorAll("[data-js=project-icon]");

    // Listen if user clicked on icon
    icons.forEach((icon) => {
      icon.addEventListener("click", (e) => e.stopPropagation())
    })

    // Listen if user clicked on card
    card.addEventListener("click", () => {
      handleCardPopup(card.dataset.name);
    });

    let mouseOver = false;
    // Listen for hover
    card.addEventListener("mouseenter", (e) => {
      mouseOver = true;
      setTimeout(() => {
        if (mouseOver) card.style.transform = "scale3d(1.1,1.1,1.1)";
      }, 1000)
    })
    card.addEventListener("mouseleave", (e) => {
      mouseOver = false;
      card.style.transform = "";
    })
  });


  // Handle card popup
  let isAnimating = false;
  const handleCardPopup = (name) => { 
    populateProjectItem(name);
    setIsAnimating();
    clickCatcher.classList.add("enable-click-catcher");
    projectItemBig.classList.add("scale-fade-in");
    // Remove scroll
    document.documentElement.style.overflowY = "hidden";
    document.documentElement.style.setProperty("--scroll-offset", "0px");
    document.documentElement.style.setProperty("--scroll-width", "8px");
  }

  // Handle card popdown
  clickCatcher.addEventListener("click", () => handleExitProject());
  DOM.exit.addEventListener("click", () => handleExitProject());

  const handleExitProject = () => {
    // Check if animating
    if (isAnimating) return;
    setIsAnimating();

    // Fade out
    fadeOutProjectItem();
    fadeOutClickCatcher();

    // Enable scroll
    document.documentElement.style.overflowY = "scroll";
    document.documentElement.style.setProperty("--scroll-offset", "8px");
    document.documentElement.style.setProperty("--scroll-width", "0px");
  }

  // Utils

  const fadeOutProjectItem = () => {
    projectItemBig.classList.add("scale-fade-out");
    setTimeout(() => {
      projectItemBig.classList.remove("scale-fade-out");
      projectItemBig.classList.remove("scale-fade-in");
      clearProjectItem();
    }, 400);
  }

  const fadeOutClickCatcher = () => {
    clickCatcher.classList.add("disable-click-catcher");
    setTimeout(() => {
      clickCatcher.classList.remove("enable-click-catcher");
      clickCatcher.classList.remove("disable-click-catcher");
    }, 400);
  }

  const setIsAnimating = () => {
    isAnimating = true;
    setTimeout(() => isAnimating = false, 400);
  }

  const populateProjectItem = (name) => {
    const data = projects[name];
    DOM.label.innerText = data.name;
    DOM.type.innerText = data.type;
    DOM.date.innerText = data.date;
    DOM.description.innerText = data.description;
    DOM.website.href = data.links.website;
    DOM.github.href = data.links.github;
    DOM.background.src = data.background;
  }

  const clearProjectItem = () => {
    DOM.label.innerText = "";
    DOM.type.innerText = "";
    DOM.date.innerText = "";
    DOM.description.innerText = "";
    DOM.website.href = "";
    DOM.github.href = "";
    DOM.background.src = "";
  }
}

const getItemDOM = (projectItemBig) => {
  const label = projectItemBig.querySelector("[data-js=project-label]");
  const type = projectItemBig.querySelector("[data-js=project-type]");
  const date = projectItemBig.querySelector("[data-js=project-date]");
  const description = projectItemBig.querySelector("[data-js=project-description]");
  const website = projectItemBig.querySelector("[data-js=project-website]");
  const github = projectItemBig.querySelector("[data-js=project-github]");
  const background = projectItemBig.querySelector("[data-js=project-background]");
  const exit = projectItemBig.querySelector("[data-js=project-exit]");
  return { label, type, date, description, website, github, background, exit }
}