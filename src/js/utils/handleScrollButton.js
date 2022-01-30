// Reveals arrow pointing down if user does not scroll after x seconds.
export const handleScrollBtn = () => {
  let willDisplay = true;
  const btn = document.querySelector("[data-js=scroll-btn]");
  const titleWrapper = document.querySelector("[data-js=title-wrapper]");



  const scrollOffset = window.innerWidth < 400 ? 70 : 120;

  btn.addEventListener("click", () => {
    document.documentElement.scrollTo({ top: titleWrapper.offsetHeight - scrollOffset, behavior: 'smooth' });
  })

  setTimeout(() => {
    if (document.documentElement.scrollTop !== 0) return willDisplay = false;
    btn.style.display = "block"
    setTimeout(() => btn.style.opacity = "1", 50)
  }, 2000)

  const handleScroll = () => {
    if (!willDisplay) return
    btn.style.opacity = ""
    setTimeout(() => btn.style.display = "", 1000);
  }

  window.onscroll = handleScroll;
}