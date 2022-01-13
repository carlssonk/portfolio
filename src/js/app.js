import { handleVideoError } from "./utils/handleVideoError.js";
import { spinnerHTML } from "./utils/spinnerHTML.js";
import { handleTitlePosition } from "./utils/handleTitlePosition.js";
import { handleScrollBtn } from "./utils/handleScrollButton.js";
import { mouseMoveReveal } from "./utils/mouseMoveReveal.js";
import { handleProjectInfo } from "./utils/handleProjectInfo.js";
import { handleDescriptionVisibility } from "./utils/handleDescriptionVisibility.js";
import { handleParticleIntro } from "./utils/handleParticleIntro.js";
import { handleFormSubmit } from "./utils/handleFormSubmit.js";

import "../css/style.scss"

const initIntro = () => {
  handleParticleIntro();

  // Start spinner/loader
  const spinnerWrapper = document.querySelector("[data-js=spinner-wrapper]");
  spinnerWrapper.innerHTML = spinnerHTML();

  // Remove spinner/loader
  setTimeout(() => {
    const spinner = document.querySelector("[data-js=spinner-box]")
    spinner.classList.add("scale-out")
    // Handle project cards and load images
    handleProjectInfo();
    // remove video if it has not been downloaded
    if (!videoIsSuccessful) handleVideoError();
  }, 2200)
}

// Init app
const init = () => {

  const initScroll = () => {
    // Enable scroll
    document.documentElement.style.overflowY = "scroll";
    document.documentElement.style.setProperty("--scroll-offset", "8px");
    // Show scroll button
    handleScrollBtn();
    // Handle description visibility
    handleDescriptionVisibility();
  }
  setTimeout(() => initScroll(), 3000);

  // Reveal particles when moving mouse
  mouseMoveReveal();
  // Handle title position
  handleTitlePosition();
  // Handle form submit
  handleFormSubmit();

  // Handle title click
  const title = document.querySelector("[data-js=title-container]");
  title.addEventListener("click", () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }))

  // Handle contact text click
  const contact = document.querySelector("[data-js=contact]");
  const form = document.querySelector("[data-js=form-anchor]");
  contact.addEventListener("click", () => {
    form.scrollIntoView({ behavior: "smooth" });
  })

  // Handle set footer current year
  document.querySelector("#current-year").innerText = new Date().getFullYear();
}

window.addEventListener("load", () => {
  appHasInited = true;
  // Init intro
  initIntro();
  // Init app
  init()
})

window.addEventListener("beforeunload", () => {
  document.querySelector("#root").style.display = "none";
  document.documentElement.style.overflowY = "hidden";
  window.scrollTo(0, 0)
});