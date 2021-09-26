export const mouseMoveReveal = () => {
  const revealBox = document.querySelector("[data-js=reveal-box]");

  revealBox.style.transform = `translate(${(window.innerWidth/2) - (window.innerWidth*1.25)}px, ${(window.innerHeight/2) - (window.innerHeight*1.25)}px)`;

  let hasTransition = true;

  window.addEventListener("mousemove", (e) => {
    revealBox.style.transform = `translate(${e.clientX - (window.innerWidth*1.25)}px, ${e.clientY - (window.innerHeight*1.25)}px)`

    if (!hasTransition) return;
    setTimeout(() => revealBox.style.transition = "0ms", 200)
    hasTransition = false;
  })
}