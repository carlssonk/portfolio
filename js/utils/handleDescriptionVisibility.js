import { isTouchDevice } from "./checkDevice.js";
import { controllDescriptionOffset } from "./controllDescriptionOffset.js";

// Handles visibility of description text when scrolling
export const handleDescriptionVisibility = () => {
  const description = document.querySelector("[data-js=description]");
  const descriptionOverlay = document.querySelector("[data-js=description-overlay]");
  const projectsLabel = document.querySelector("[data-js=projects-label]");

  description.classList.add("fade-in");

  const descriptionBottom = description.getBoundingClientRect().bottom;
  const descriptionHeight = description.offsetHeight;

  const controllElement = document.querySelector("[data-js=controll-height]");
  controllDescriptionOffset(controllElement);

  const handleVisibility = () => {

    if (isTouchDevice()) return controllDescriptionOffset(controllElement);

    console.log("DONT GO")

    const labelTop = projectsLabel.getBoundingClientRect().top;
    const coverAmount = (descriptionBottom - (labelTop - 20)) / descriptionHeight

    // Smooth animation whilst scrolling through description element
    if (coverAmount >= 0 && coverAmount <= 1) {
      const percentage = ((1 - coverAmount) * 100).toFixed(3);
      const descriptionPercentage = parseFloat((coverAmount * 100).toFixed(3));

      description.style.clipPath = `polygon(0 0, 100% 0, 100% ${percentage}%, 0 ${percentage}%)`

      descriptionOverlay.style.background = `linear-gradient(0deg, rgba(0,0,0,1) ${descriptionPercentage}%, rgba(255,255,255,0) ${descriptionPercentage + 20}%)`
    }

    // Make sure to hide description fully
    if (coverAmount > 1) {
      description.style.clipPath = "polygon(0 0, 100% 0, 100% 0%, 0 0%)"
    }

    // Make sure to show description fully
    if (coverAmount < 0) {
      description.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      descriptionOverlay.style.background = ``
    }
  }

  if (isTouchDevice()) {
    descriptionOverlay.style.display = "none";
    const main = document.querySelector("[data-js=main]");
    main.style.backgroundColor = "black";
    main.style.background = "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 98%, rgba(0,0,0,0) 100%)";
    main.style.paddingTop = "40px";
    description.style.zIndex = "2";
  } 

  window.addEventListener('scroll', handleVisibility);
  window.addEventListener('resize', handleVisibility);
}