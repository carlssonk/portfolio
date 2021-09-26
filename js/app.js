import { handleTitlePosition } from "./utils/handleTitlePosition.js";
import { handleScrollBtn } from "./utils/handleScrollButton.js";
import { mouseMoveReveal } from "./utils/mouseMoveReveal.js";
import { handleProjectInfo } from "./utils/handleProjectInfo.js";
import { handleDescriptionVisibility } from "./utils/handleDescriptionVisibility.js";
import { handleParticleIntro } from "./utils/handleParticleIntro.js";

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

  // Load particles
  particlesJS.load('particles-js', 'assets/particles.json');
  // Reveal particles when moving mouse
  mouseMoveReveal();
  // Handle title position
  handleTitlePosition();
  // Handle project cards
  handleProjectInfo();

  // Handle title click
  const title = document.querySelector("[data-js=title-container]");
  title.addEventListener("click", () => window.scrollTo({top: 0, left: 0, behavior: "smooth"}))

  // Handle contact form
  // const form = document.querySelector("[data-js=form]");
  // const formBtn = document.querySelector("[data-js=form-btn]");
  // // inputs
  // const nameInput = document.querySelector("[data-js=name-input]");
  // const emailInput = document.querySelector("[data-js=email-input]");
  // const messageInput = document.querySelector("[data-js=message-input]");
  // form.addEventListener("submit", (e) => handleFormSubmit(e));
  // formBtn.addEventListener("click", (e) => handleFormSubmit(e));

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   if(!validateForm()) return e.preventDefault();

  // }
  // const validateForm = () => {
  //   if(
  //     nameInput.value.length > 0 && 
  //     emailInput.value.length > 0 &&
  //     messageInput.value.length > 0
  //     ) return true;
  //   return false;
  // }
}



// Init app
init()
// Init intro
initIntro();




