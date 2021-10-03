// Controlls window height for mobile browsers
export const controllDescriptionOffset = (controllElement) => {

  // Get element height
  const elementHeight = controllElement.clientHeight;

  // Get window browser address bar height
  const barHeight = elementHeight - window.innerHeight;

  document.documentElement.style.setProperty("--address-bar-height", `${barHeight/2}px`)

}