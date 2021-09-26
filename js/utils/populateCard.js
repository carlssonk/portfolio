import projects from "../../assets/projects.js"

export const populateCard = (card) => {
  const data = projects[card.dataset.name];
  const label = card.querySelector("[data-js=project-label]");
  const links = card.querySelectorAll("[data-js=project-icon]");
  const background = card.querySelector("[data-js=project-background]");

  label.innerText = data.name;
  links[0].href = data.links.website;
  links[1].href = data.links.github;
  background.src = data.background;
}