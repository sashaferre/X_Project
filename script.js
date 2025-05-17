document.addEventListener("DOMContentLoaded", () => {
  // ✨ Typing Animation
  const lines = [
    "Digital interfaces",
    "crafted with a designer’s vision",
    "and a writer’s touch"
  ];
  const speed = 20;
  const startDelay = 1000;
  // existing code...

// menu logic
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');

menuToggle.addEventListener('click', () => {
  menuOverlay.classList.add('open');
});

menuClose.addEventListener('click', () => {
  menuOverlay.classList.remove('open');
});

  const animateLine = (index) => {
    const el = document.getElementById(`line${index + 1}`);
    const text = lines[index];
    let charIndex = 0;

    const type = () => {
      if (charIndex <= text.length) {
        el.textContent = text.slice(0, charIndex);
        charIndex++;
        setTimeout(type, speed);
      } else {
        el.style.borderRight = "none";
        if (index + 1 < lines.length) animateLine(index + 1);
      }
    };

    type();
  };

  setTimeout(() => animateLine(0), startDelay);

  // ✨ Header Reveal
  setTimeout(() => {
    const header = document.querySelector(".custom-header");
    if (header) header.style.opacity = "1";
  }, 11350);

  // ✨ Canvas Scroll Animation
  const canvas = document.getElementById("scrollCanvas");
  const ctx = canvas.getContext("2d");
  const frameCount = 347;
  const images = [];
  let loadedImages = 0;

  const preloadImages = () => {
    return new Promise((resolve) => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `frames/frame${i}.gif`;
        img.onload = () => {
          loadedImages++;
          if (loadedImages === frameCount) {
            resolve();
          }
        };
        images.push(img);
      }
    });
  };

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const renderFrame = (index) => {
    const img = images[index];
    const scale = Math.min(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  const setupScroll = () => {
    const scrollContainer = document.querySelector(".scroll-canvas-container");
    const totalHeight = scrollContainer.offsetHeight - window.innerHeight;

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const relativeScroll = Math.max(0, Math.min(scrollTop, totalHeight));
    const progress = relativeScroll / totalHeight;
    const easedProgress = Math.pow(progress, 0.9); // ✨ easing for smoothness
    const frameIndex = Math.floor(easedProgress * (frameCount - 1));
      renderFrame(frameIndex);
    });
  };

  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
    renderFrame(0);
  });

  preloadImages().then(() => {
    renderFrame(0);
    setupScroll();
  });
});
const lines = document.querySelectorAll('.line');

const revealOnScroll = () => {
  lines.forEach((line) => {
    const rect = line.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      line.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // in case they’re already in view