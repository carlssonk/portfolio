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





//  // 1. This code loads the IFrame Player API code asynchronously.
//  var tag = document.createElement("script");
//  console.log(tag)

//  tag.src = "https://www.youtube.com/iframe_api";
//  var firstScriptTag = document.getElementsByTagName('script')[0];
//  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//  console.log(firstScriptTag)

//  // 2. This function creates an <iframe> (and YouTube player)
//  //    after the API code downloads.

//  var player;
//  function onYouTubeIframeAPIReady() {
//    player = new YT.Player('player', {
//      height: '390',
//      width: '640',
//      videoId: 'nY-Ah8HRPHg',
//      playerVars: {
//        'playsinline': 1
//      },
//      events: {
//        'onReady': onPlayerReady,
//        'onStateChange': onPlayerStateChange
//      }
//    });
//  }

//  // 3. The API will call this function when the video player is ready.
//  function onPlayerReady(event) {
//    event.target.playVideo();
//  }


//  // 4. The API calls this function when the player's state changes.
//  //    The function indicates that when playing a video (state=1),
//  //    the player should play for six seconds and then stop.
//  var done = false;
//  function onPlayerStateChange(event) {
//    if (event.data == YT.PlayerState.PLAYING && !done) {
//      setTimeout(stopVideo, 6000);
//      done = true;
//    }
//  }
//  function stopVideo() {
//    player.stopVideo();
//  }


//  setInterval(() => {
//    console.log(player)
//  }, 1000)