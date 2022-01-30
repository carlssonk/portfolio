// The first 3 lines in the isMobile functions checks fo touch screen
// The fourth line checks that window is less than 760px
export const isMobile = () => {
  return "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0 &&
  window.matchMedia("only screen and (max-width: 760px)").matches
};

export const isTouchDevice = () => {
  return "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0
};