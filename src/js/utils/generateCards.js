import projects from "../../assets/projects.js"

export const generateCardsDOM = () => {
  const list = document.querySelector("[data-js=projects-list]");

  for (let name in projects) {
    const x = projects[name];
    list.insertAdjacentHTML("beforeend",
      `
      <li class="project-item" data-js="project-item" data-name="${name}">
        <div class="top-bar-wrapper">
          <div class="top-bar">
            <label data-js="project-label">${x.name}</label>
            <i tabindex="0" class="fas fa-info-circle info-icon"></i>
          </div>
          <div class="blur"></div>
        </div>
        ${x.links ? (
        `
            <div class="links-container">
              <a data-js="project-icon" target="_blank" href="${x.links.website}"><i class="fas fa-globe"></i></a>
              <a data-js="project-icon" target="_blank" href="${x.links.github}"><i class="fab fa-github"></i></a>
            </div>
            `
      ) : ''}
        <img data-js="project-background" loading="lazy" src="${x.background}" alt="project background image">
      </li>     
      `
    )
  }
}