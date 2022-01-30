import { setVideoHasInited } from "../playVideo.js"

export const handleVideoError = () => {
  setVideoHasInited(true)

  const video = document.querySelector("[data-js=video]")
  const titleContainer = document.querySelector("[data-js=title-container]")
  const gradientBackground = document.querySelector("[data-js=gradient-background]")

  video.remove();
  titleContainer.classList.add("fade-in")
  gradientBackground.style.display = "block";

}

