export const handleFormSubmit = () => {
  // // Handle contact form
  // const form = document.querySelector("[data-js=form]");
  // const formBtn = document.querySelector("[data-js=form-btn]");
  // // // inputs
  const nameInput = document.querySelector("[data-js=name-input]");
  const emailInput = document.querySelector("[data-js=email-input]");
  const messageInput = document.querySelector("[data-js=message-input]");
  // form.addEventListener("submit", () => handleFormSubmit());
  // formBtn.addEventListener("click", () => handleFormSubmit());

  // const handleFormSubmit = () => {
  //   // Submit form
  //     if(validateForm()) {
  //       nameInput.value = "";
  //       emailInput.value = "";
  //       messageInput.value = "";
  //     }

  // }
  // const validateForm = () => {
  //   if(
  //     nameInput.value.length > 0 && 
  //     emailInput.value.length > 0 &&
  //     messageInput.value.length > 0
  //     ) return true;
  //   return false;
  // }

  // We only need to clear form when page loads.
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
}