
setTimeout(() => {
  if (!hasPlayed) handlePlaybackError();
}, 2900);


let hasPlayed = false;
const handleStartTrack = async (event) => {
  if (hasPlayed === false) {
    hasPlayed = true;

    let video = event.target;
    video.onplay = null;

    // Start
    let leakTitle = document.querySelector("[data-js=leak-title]");
    if (!leakTitle) leakTitle = await retrieveTitleElement();

    prepareIntro();
  }
};

const handlePlaybackError = () => {
  const video = document.querySelector("[data-js=video]");
  const container = document.querySelector("[data-js=svg-title-container]");
  const gradientBackground = document.querySelector("[data-js=gradient-background]");

  hasPlayed = true;
  if(video) video.remove();

  container.innerHTML = createTitleElement();

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
