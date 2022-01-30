import { isMobile } from "./checkDevice.js";

export const handleParticleIntro = async () => {

  if (isMobile()) return;


  // Load particles
  particlesJS.load('particles-js', './assets/particles.json');

  // IF pJSDom is NOT loaded, Wait for pJSDom to load
  const waitUntilLoaded = async () => {
    return await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (pJSDom[0]) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }
  if (!pJSDom[0]) await waitUntilLoaded();

  // Slow down particle speed
  let speed = pJSDom[0].pJS.particles.move.speed;
  const interval = setInterval(() => {
    speed -= 1;
    pJSDom[0].pJS.particles.move.speed = speed;
    if (speed <= 2) {
      clearInterval(interval);
      finishIntro();
    }
  }, 65)

  const finishIntro = () => {
    slowDownParticleSpeedEvenMore();
    showParticleLines();
  }

  // Slow down particle speed even more but smoother (from 1 to 0.5)
  const slowDownParticleSpeedEvenMore = () => {
    const interval = setInterval(() => {
      speed -= 0.1;
      pJSDom[0].pJS.particles.move.speed = parseFloat(speed.toFixed(1));
      if (speed <= 0.6) clearInterval(interval);
    }, 100)
  }

  // Show particle lines
  const showParticleLines = () => {
    setTimeout(() => {
      let opacity = 0;
      const interval = setInterval(() => {
        opacity += 0.05;
        const o = parseFloat(opacity.toFixed(2));
        pJSDom[0].pJS.particles.line_linked.opacity = o;
        if (o >= 0.4) clearInterval(interval);
      }, 100)

    }, 900)
  }
}