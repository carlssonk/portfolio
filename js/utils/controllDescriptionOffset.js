// Controlls window height for mobile browsers
const actualHeight = window.innerHeight;
let elementHeight = document.querySelector("[data-js=controll-height]").elementHeight
export const controllDescriptionOffset = () => {

  // Get element height
  elementHeight = elementHeight.clientHeight;

  // Get window browser address bar height
  const barHeight = elementHeight - actualHeight;

  document.documentElement.style.setProperty("--address-bar-height", `${barHeight}px`)

  
}