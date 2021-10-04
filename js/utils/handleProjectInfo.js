import projects from "../../assets/projects.js"
import { generateCardsDOM } from "./generateCards.js";
import { isTouchDevice } from "./checkDevice.js";
// import { handleProjectCarousel } from "./handleProjectCarousel.js";
// Handles hover and clicking on the project cards
export const handleProjectInfo = () => {

  // Generate project cards
  generateCardsDOM();

  const cards = document.querySelectorAll("[data-js=project-item]");
  const projectItemBig = document.querySelector("[data-js=project-item-big]");
  const clickCatcher = document.querySelector("[data-js=click-catcher]");
  const backgroundWrapper = document.querySelector("[data-js=background-wrapper]");
  const backgroundOverlay = document.querySelector("[data-js=background-overlay]");

  const DOM = getItemDOM(projectItemBig);

  let iframeTimeout;

  cards.forEach((card) => {
    const icons = card.querySelectorAll("[data-js=project-icon]");

    // Listen if user clicked on icon
    icons.forEach((icon) => {
      icon.addEventListener("click", (e) => e.stopPropagation())
    })

    // Listen if user clicked on card
    card.addEventListener("click", () => {
      handleCardPopup(card.dataset.name);
    });

    if (isTouchDevice()) return;

    let mouseOver = false;
    let hasIframe = false;
    // Listen for hover
    card.addEventListener("mouseenter", () => {
      mouseOver = true;
      const videos = projects[card.dataset.name].videos
      
      // Prepare iframe video
      setTimeout(() => {
        if (mouseOver && videos) {
          card.insertAdjacentHTML("beforeend", 
          `<iframe class="iframe-preview" src="https://www.youtube-nocookie.com/embed/${videos[0].id}?autoplay=1&mute=1&controls=0" allowfullscreen></iframe>`)
          hasIframe = true;
          iframeTimeout = setTimeout(() => {
            removePreviewIframe(card, hasIframe);
          }, videos[0].time)
        }

      }, 500)

      setTimeout(() => {
        if (mouseOver) {
          card.style.transform = "scale3d(1.1,1.1,1.1)";

          // Fade out image
          if(videos) {
            setTimeout(() => {
              card.querySelector("[data-js=project-background]").classList.add("fade-out-project-background")
            }, 300)
          }
        } 
      }, 1000)

      
    })
    // gny4B5YOV0s
    // <iframe class="iframe-preview"
    // src="https://www.youtube.com/embed/nY-Ah8HRPHg?autoplay=1&mute=1&controls=0">
    // </iframe>



    card.addEventListener("mouseleave", (e) => {
      removePreviewIframe(card, hasIframe);
      mouseOver = false;
      card.style.transform = "";
    })
  });

  const removePreviewIframe = (card, hasIframe) => {
    if (hasIframe) {
      hasIframe = false;
      clearTimeout(iframeTimeout);
      const background = card.querySelector("[data-js=project-background]");
      background.classList.add("fade-in-project-background");
      setTimeout(() => {
        const iframes =  document.querySelectorAll(".iframe-preview")
        iframes.forEach(elm => elm.remove());
        background.classList.remove("fade-in-project-background", "fade-out-project-background");
      }, 400) 
    }
  }



  // Handle card popup
  let isAnimating = false;
  const handleCardPopup = (name) => { 
    populateProjectItem(name);
    setIsAnimating();
    clickCatcher.classList.add("enable-click-catcher");
    projectItemBig.classList.add("scale-fade-in");
    // Remove scroll
    document.documentElement.style.overflowY = "hidden";
    document.documentElement.style.setProperty("--scroll-offset", "0px");
    document.documentElement.style.setProperty("--scroll-width", "8px");
    document.documentElement.style.setProperty("--scroll-width", "8px");
    document.documentElement.style.setProperty("touch-action", "none");
  }

  // Handle card popdown
  clickCatcher.addEventListener("click", () => handleExitProject());
  DOM.exit.addEventListener("click", () => handleExitProject());

  const handleExitProject = () => {
    // Check if animating
    if (isAnimating) return;
    setIsAnimating();

    // Fade out
    fadeOutProjectItem();
    fadeOutClickCatcher();

    // Enable scroll
    document.documentElement.style.overflowY = "scroll";
    document.documentElement.style.setProperty("--scroll-offset", "8px");
    document.documentElement.style.setProperty("--scroll-width", "0px");
    document.documentElement.style.setProperty("touch-action", "");
  }

  // Utils

  const fadeOutProjectItem = () => {
    projectItemBig.classList.add("scale-fade-out");
    setTimeout(() => {
      carouselWrapper.style.display = "none";
      backgroundOverlay.style.visibility = "visible";
      projectItemBig.classList.remove("scale-fade-out");
      projectItemBig.classList.remove("scale-fade-in");
      clearProjectItem();
    }, 400);
  }

  const fadeOutClickCatcher = () => {
    clickCatcher.classList.add("disable-click-catcher");
    setTimeout(() => {
      clickCatcher.classList.remove("enable-click-catcher");
      clickCatcher.classList.remove("disable-click-catcher");
    }, 400);
  }

  const setIsAnimating = () => {
    isAnimating = true;
    setTimeout(() => isAnimating = false, 400);
  }

  const populateProjectItem = (name) => {
    const data = projects[name];
    DOM.label.innerText = data.name;
    DOM.type.innerText = data.type;
    DOM.date.innerText = data.date;
    DOM.description.innerHTML = data.description;
    data.links ? DOM.website.href = data.links.website : null;
    data.links ? DOM.github.href = data.links.github : null;
    setBackground(data);
    // Handles carousel if project has multiple images/videos;
    if (data.images) initCarousel();
  }

  const setBackground = (data) => {

    // Populate images
    if (data.images) {
      for (let i = 0; i < data.images.length; i++) {
        backgroundWrapper.insertAdjacentHTML("beforeend",`
          <img class="slide ${!i ? 'active' : ''}" data-js="project-background" src="${data.images[i]}" alt="project background image">`);
      }
    }

    // Populate images
    if (data.videos) {
      for (let i = 0; i < data.videos.length; i++) {
        backgroundWrapper.insertAdjacentHTML("beforeend",`
        <iframe 
          class="slide" 

          srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style>
          <a href=https://www.youtube.com/embed/${data.videos[i].id}?autoplay=1&enablejsapi=1&version=3&playerapiid=ytplayer>
            <img src=https://img.youtube.com/vi/${data.videos[i].id}/hqdefault.jpg>
            <span>▶</span>
          </a>"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
      }     
    }

    // Populate default background if has no images nor videos
    if (!data.images && !data.videos) {
      backgroundWrapper.innerHTML = `<img data-js="project-background" src="${data.background}" alt="project background image">`
    }

  }

  const clearProjectItem = () => {
    DOM.label.innerText = "";
    DOM.type.innerText = "";
    DOM.date.innerText = "";
    DOM.description.innerHTML = "";
    DOM.website.href = "";
    DOM.github.href = "";
    DOM.background ? DOM.background.src = "" : backgroundWrapper.innerHTML = "";
  }

  function getItemDOM(projectItemBig) {
    const label = projectItemBig.querySelector("[data-js=project-label]");
    const type = projectItemBig.querySelector("[data-js=project-type]");
    const date = projectItemBig.querySelector("[data-js=project-date]");
    const description = projectItemBig.querySelector("[data-js=project-description]");
    const website = projectItemBig.querySelector("[data-js=project-website]");
    const github = projectItemBig.querySelector("[data-js=project-github]");
    const background = projectItemBig.querySelector("[data-js=project-background]");
    const exit = projectItemBig.querySelector("[data-js=project-exit]");
    return { label, type, date, description, website, github, background, exit }
  }

  // ########################################
  // ############### CAROUSEL ###############
  // ########################################

  // Change to change slide speed
  const SLIDETIME = 300; //ms

  // Variables that will have event listeners, we dont want to invoke event listeners multiple times
  const nextBtn = document.querySelector("[data-js=carousel-next]");
  const prevBtn = document.querySelector("[data-js=carousel-prev]");

  const carouselWrapper = document.querySelector("[data-js=carousel-wrapper]");
  // Select all slides and convert node to array for easy handling

  let currentIdx = 0;
  let clickable = true;
  let active = null;
  let allSlides = [];

  const initCarousel = () => {
    backgroundOverlay.style.visibility = "hidden";
    carouselWrapper.style.display = "block";
    allSlides = [...document.querySelectorAll('.slide')];
    currentIdx = 0;

    // Set the CSS transition on the slides to the value we specified in SLIDETIME above
    allSlides.forEach(slide => {
      slide.setAttribute(
        'style',
        `transition: transform ${SLIDETIME}ms ease; animation-duration: ${SLIDETIME}ms; filter: unset`,
      ),
      slide.addEventListener("animationend", () => handleSlideStopped(slide))
    });

  }

  const handleChangeSlide = (step) => {
    if (!clickable) return;
    clickable = false;
    // Current slide image
    active = backgroundWrapper.children[currentIdx];

    // Pause video when switching to another slide
    if (active.tagName === "IFRAME") {
      console.log(active)
      active.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    }

    // Set current index
    currentIdx = (currentIdx + step) % allSlides.length;
    currentIdx < 0 && (currentIdx = allSlides.length - 1);

    // New slide image
    const newActive = backgroundWrapper.children[currentIdx];

    const newActiveClass = newActive.tagName === "IMG" ? "active" : "active-video"

    // If we go forward
    if (step === 1) {
      active.classList.add("slide-out-left");
      newActive.classList.add("slide-in-right", newActiveClass);
    } else {
      active.classList.add("slide-out-right");
      newActive.classList.add("slide-in-left", newActiveClass);
    }



  }

  const handleSlideStopped = (slide) => {
    // Check for the old active transition and if clickable is false
    // to not trigger it more than once
    if (slide === active && !clickable) {
      clickable = true;
      // Remove all CSS animation classes on old active
      active.className = "slide";
    }
  }

  nextBtn.addEventListener("click", () => handleChangeSlide(1));
  prevBtn.addEventListener("click", () => handleChangeSlide(-1));
}







