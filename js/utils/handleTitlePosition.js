
export const handleTitlePosition = () => {
  const main = document.querySelector("main")
  const titleWrapper = document.querySelector("[data-js=title-wrapper]");
  const titleContainer = document.querySelector("[data-js=title-container]");
  const nav = document.querySelector("[data-js=nav]");

  let isCentered = true;

  // Center Title
  const centerTitlePos = () => {
    if(!isCentered) return;

    const height = titleWrapper.offsetHeight;
    const width = titleWrapper.offsetWidth;
  
    const titleHeight = titleContainer.offsetHeight;
    const titleWidth = titleContainer.offsetWidth;

    const offset = 100;
    let scale = 5;
    if(width < 1200) {
      scale = (width/250);
    }

    titleContainer.style.transform = `translate(${(width/2) - (titleWidth/2)}px, ${(height/2 - offset) - (titleHeight/2)}px) scale(${scale.toFixed(3)})`
  }
  centerTitlePos();
  window.onresize = centerTitlePos;

  // Handle Scroll
  const handleScroll =() => {
    const posData = main.getBoundingClientRect();

    const maxTop = titleWrapper.offsetHeight * 0.75;

    // Un-center Title
    if(isCentered && posData.top < maxTop) {
      isCentered = false;
      titleContainer.style.transform = `translate(10px,20px) scale(1)`;
      nav.style.opacity = "1";
    }
    // Center Title
    if(!isCentered && posData.top > maxTop) {
      isCentered = true;
      centerTitlePos();
      nav.style.opacity = "0";
    }
  }
  document.addEventListener("scroll", handleScroll)

  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
    titleWrapper.style.opacity = "0";
  }
};