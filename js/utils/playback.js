setTimeout(() => {
  if (!hasPlayed) handlePlaybackError();
}, 1000);

let hasPlayed = false;
const handleStartTrack = async (event) => {
  if (hasPlayed === false) {
    hasPlayed = true;

    let video = event.target;
    video.onplay = null;

    // Start
    let leakText = document.querySelector("[data-js=leak-ext]");
    if (!leakText) leakText = await retrieveTextElement();

    prepareIntro(leakText);
  }
};

const handlePlaybackError = () => {
  const video = document.querySelector("[data-js=video]");
  const container = document.querySelector("[data-js=svg-text-container]");

  hasPlayed = true;
  video.src = "";

  container.innerHTML = createTextElement();

  const leakText = document.querySelector("[data-js=leak-text]");

  prepareIntro(leakText);
};

const retrieveTextElement = async () => {
  return await new Promise((resolve) => {
    const interval = setInterval(() => {
      const leakText = document.querySelector("[data-js=leak-text]");
      if (leakText) {
        clearInterval(interval);
        resolve(leakText);
      }
    }, 100);
  });
};

const createTextElement = () => {
  return `
  <text
    class="leak-text"
    data-js="leak-text"
    x="50%"
    y="50%"
    text-anchor="middle"
    fill="blue"
  >
    Oliver Carlsson
  </text>`;
};

const prepareIntro = (leakText) => {
  setTimeout(() => {
    leakText.classList.add("intro-animation");
    setTimeout(() => initIntro(leakText), 50); // timeout after classList add to prevent font size bug
  }, 500);
};
