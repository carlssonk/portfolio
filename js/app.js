import { handleTitlePosition } from "./utils/handleTitlePosition.js";
import { handleScrollBtn } from "./utils/handleScrollButton.js";
import { mouseMoveReveal } from "./utils/mouseMoveReveal.js";
import { handleProjectInfo } from "./utils/handleProjectInfo.js";
import { handleDescriptionVisibility } from "./utils/handleDescriptionVisibility.js";
import { handleParticleIntro } from "./utils/handleParticleIntro.js";
import { handleFormSubmit } from "./utils/handleFormSubmit.js";

const initIntro = () => {
  handleParticleIntro();
  // Remove spinner/loader
  setTimeout(() => {
    const spinner = document.querySelector("[data-js=spinner-box]")
    spinner.classList.add("scale-out")
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
  // Handle project cards
  handleProjectInfo();
  // Handle form submit
  handleFormSubmit();

  // Handle title click
  const title = document.querySelector("[data-js=title-container]");
  title.addEventListener("click", () => window.scrollTo({top: 0, left: 0, behavior: "smooth"}))

  // Handle contact text click
  const contact = document.querySelector("[data-js=contact]");
  const form = document.querySelector("[data-js=form]");
  contact.addEventListener("click", () => {
    form.scrollIntoView({ behavior: "smooth" });
  })
}


window.addEventListener("load", () => {
  // Init app
  init()
  // Init intro
  initIntro();
})




// PLAY VIDEO
const videoElement = document.querySelector(".video");
videoElement.addEventListener("canplaythrough", function() {
  console.log("READY");
});

videoElement.oncanplay = function() {
  console.log("CAN START PLAY");
};