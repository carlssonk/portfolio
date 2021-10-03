
// import { isMobile } from "./checkDevice.js";

// if (isMobile()) {
//   console.log("IS MOBILE")
// }

  // Init text video when most of the text video has loaded


export const playback = () => {

  setTimeout(() => {
    // if (!hasPlayed) handlePlaybackError();
  }, 2900);
  
  let hasPlayed = false;
  const handleStartTrack = async (video) => {
    if (hasPlayed === false) {
      hasPlayed = true;
  
      video.onplay = null;
  
      // Start
      let leakTitle = document.querySelector("[data-js=leak-title]");
      if (!leakTitle) leakTitle = await retrieveTitleElement();
  
      prepareIntro();
    }
  };
  
  const handlePlaybackError = () => {
    const video = document.querySelector("[data-js=video]");
    const gradientBackground = document.querySelector("[data-js=gradient-background]");
  
    hasPlayed = true;
    console.log(video, " REMOVE?")
    if(video) video.remove();
  
    gradientBackground.style.display = "block";
  
    prepareIntroFast();
  };
  
  const retrieveTitleElement = async () => {
    return await new Promise((resolve) => {
      const interval = setInterval(() => {
        const leakTitle = document.querySelector("[data-js=leak-title]");
        if (leakTitle) {
          clearInterval(interval);
          resolve(leakTitle);
        }
      }, 100);
    });
  };
  
  const createTitleElement = () => {
    return `
    <text
      class="leak-title"
      data-js="leak-title"
      x="50%"
      y="50%"
      text-anchor="middle"
      fill="blue"
    >
      Oliver Carlsson
    </text>`;
  };
  
  const prepareIntro = () => {
    const titleContainer = document.querySelector("[data-js=title-container]")
    setTimeout(() => {
      titleContainer.classList.add("fade-in")
    }, 2700);
  };
  
  const prepareIntroFast = () => {
    const titleContainer = document.querySelector("[data-js=title-container]")
    titleContainer.classList.add("fade-in")
  };



  // const videoElement = document.querySelector("[data-js=video]");
  // videoElement.addEventListener("canplaythrough", function() {
  //   console.log("CAN PLAY THROUGH")
  //   handleStartTrack(videoElement);
  // }, {once: true});
  // videoElement.addEventListener("load", function() {
  //   console.log("ONLOAD")
  //   handleStartTrack(videoElement);
  // }, {once: true});
  
}

