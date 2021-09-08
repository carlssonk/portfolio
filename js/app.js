const initIntro = (leakText) => {
  leakText.innerHTML = "Oliver Carlsson";
  // const textArray = ["Web Developer", "Based In", "Stockholm, Sweden"];
  let current = 0;

  setTimeout(() => {
    leakText.innerHTML = "Web Developer";
    current++;
  }, 2000);

  setTimeout(() => {
    leakText.innerHTML = "Based In";
    current++;
  }, 4000);
  setTimeout(() => {
    leakText.innerHTML = "Stockholm, Sweden";
    current++;
  }, 5200);
};
