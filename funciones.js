function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  }


  function zoomIn(img) {
    img.style.transition = "transform 0.3s ease";
    img.style.transform = "scale(1.2)";
  }
  
  function zoomOut(img) {
    img.style.transition = "transform 0.3s ease";
    img.style.transform = "";
  }

const animatedTexts = document.querySelectorAll('.animated-text');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5, // 50% del elemento visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedTexts.forEach((text) => {
  observer.observe(text);
});


function scrollToSectionMargen(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del enlace
  var targetSection = document.querySelector(event.target.getAttribute('href'));
  var offset = 100;
  if (targetSection) {
    var targetOffset = targetSection.offsetTop - offset;
    window.scrollTo({
      top: targetOffset,
      behavior: 'smooth'
    });
  }
}