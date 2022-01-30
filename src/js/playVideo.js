// When this countdown hits 0 we should show the title
let timeUntilStart = 2700;

let countdown = setInterval(() => {
  timeUntilStart -= 100;
  if (timeUntilStart <= 0) clearInterval(countdown)
}, 100);

// Variable that checks that we have played the video
export let videoIsSuccessful = false;
// We only need to init function once, because somehow oncanplaythough fires multiple times, maybe because video is set on loop
let videoHasInited = false;
export const setVideoHasInited = (bool) => videoHasInited = bool;
// Global variable that will become true in app.js when page is fully loaded
export let appHasInited = false;
export const setAppHasInited = (bool) => appHasInited = bool;



export async function playVideo(e) {
  if (videoHasInited) return;
  videoHasInited = true;
  videoIsSuccessful = true;

  const video = e.target

  const prepareIntro = () => {
    video.oncanplaythrough = null;
    const titleContainer = document.querySelector("[data-js=title-container]")
    titleContainer.classList.add("fade-in")
  };

  const waitForPageToBeFullyLoaded = async () => {
    return await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (appHasInited) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  };

  const revealTitle = () => {
    setTimeout(() => {
      prepareIntro();
    }, 2700) // 2700 is the official time we should wait  before reveal
  }

  await waitForPageToBeFullyLoaded();

  revealTitle();

}


