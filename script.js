document.addEventListener("DOMContentLoaded", () => {
  const lines = [
    "Digital interfaces",
    "crafted with a designer’s vision",
    "and a writer’s touch"
  ];

  const startDelay = 6000; // Wait before animation starts
  const speed = 40;        // Typing speed (ms per character)

  const animateLine = (lineIndex) => {
    const element = document.getElementById(`line${lineIndex + 1}`);
    const text = lines[lineIndex];
    let charIndex = 0;

    const type = () => {
      if (charIndex <= text.length) {
        element.textContent = text.slice(0, charIndex);
        charIndex++;
        setTimeout(type, speed);
      } else {
        // 💥 remove caret when done
        element.style.borderRight = "none";

        // ⏩ go to next line if there is one
        if (lineIndex + 1 < lines.length) {
          animateLine(lineIndex + 1);
        }
      }
    };

    type();
  };

  setTimeout(() => {
    animateLine(0);
  }, startDelay);
});

 setTimeout(() => {
  const header = document.querySelector('.header');
  if (header) {
    header.style.opacity = '1';
  }
}, 11350);