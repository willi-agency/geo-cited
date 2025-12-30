// public/scripts/animations.js
// ⚡ Performance-first: Intersection Observer + CSS Transitions

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delayAnimation || 0;
        
        setTimeout(() => {
          entry.target.classList.add('animate');
          
          // Para counters
          if (entry.target.dataset.counter) {
            animateCounter(entry.target);
          }
        }, delay);
        
        // Para animações que só rodam uma vez
        if (!entry.target.classList.contains('animate-repeat')) {
          observer.unobserve(entry.target);
        }
      } else {
        // Reset para elementos com animate-repeat
        if (entry.target.classList.contains('animate-repeat')) {
          entry.target.classList.remove('animate');
        }
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -15% 0px'
  }
);

// Função para animar contadores
function animateCounter(element) {
  const target = parseInt(element.dataset.counter, 10);
  const duration = 1000; // 1 segundo
  const start = 0;
  const increment = target / (duration / 16); // ~60fps
  let current = start;
  
  const digits = target.toString().length;
  element.style.display = 'inline-block';
  element.style.minWidth = `${digits}ch`;
  element.style.textAlign = 'right';
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observa todos os elementos de animação
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.fade-in, .fade-up, .left-to-right, .right-to-left, .zoom-in, [data-counter]'
  );
  
  animatedElements.forEach((el) => observer.observe(el));
  
  // Spin infinito (não precisa de observer)
  const spinElements = document.querySelectorAll('.spin');
  spinElements.forEach((el) => {
    const delay = el.dataset.delayAnimation || 0;
    setTimeout(() => {
      el.classList.add('spinning');
    }, delay);
  });
});