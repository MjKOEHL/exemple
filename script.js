// script.js

// Scroll fluide
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Fade-in au scroll
  const sections = document.querySelectorAll('section');
  
  const reveal = () => {
    const triggerBottom = window.innerHeight * 0.85;
  
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top < triggerBottom) {
        section.classList.add('visible');
      }
    });
  };
  
  window.addEventListener('scroll', reveal);
  window.addEventListener('load', reveal);
  

  // Pour le carrousel : 

  let currentSlide = 1;
const carrousel = document.querySelector('.carrousel');
const slides = document.querySelectorAll('.competence-slide');
const navDots = document.querySelectorAll('.nav-dot');
const totalSlides = slides.length;

// Clone des extrémités
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
carrousel.appendChild(firstClone);
carrousel.insertBefore(lastClone, slides[0]);

// Positionner sur la 1ère vraie slide
carrousel.style.transform = `translateX(-100%)`;

function updateCarousel() {
  carrousel.style.transition = 'transform 0.5s ease';
  carrousel.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Met à jour les billes (ignore les clones)
  navDots.forEach(dot => dot.classList.remove('active'));
  const realIndex = (currentSlide - 1 + navDots.length) % navDots.length;
  navDots[realIndex].classList.add('active');
}

// Suivi des extrémités pour boucle fluide
carrousel.addEventListener('transitionend', () => {
  if (currentSlide === 0) {
    carrousel.style.transition = 'none';
    currentSlide = totalSlides;
    carrousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  if (currentSlide === totalSlides + 1) {
    carrousel.style.transition = 'none';
    currentSlide = 1;
    carrousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
});

// Boutons de navigation
document.getElementById('next').addEventListener('click', () => {
  if (currentSlide <= totalSlides) {
    currentSlide++;
    updateCarousel();
  }
});

document.getElementById('prev').addEventListener('click', () => {
  if (currentSlide >= 0) {
    currentSlide--;
    updateCarousel();
  }
});

// Bille de navigation
navDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index + 1;
    updateCarousel();
  });
});

// Auto-slide (optionnel)
setInterval(() => {
  currentSlide++;
  updateCarousel();
}, 5000); // Change toutes les 5 secondes
