document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('[data-trigger]');
    const closeTriggers = document.querySelectorAll('[data-close-trigger]');
    const closeOnOutside = [];
  
    triggers.forEach(trigger => {
      const targetId = trigger.getAttribute('data-trigger');
  
      trigger.addEventListener('click', e => {
        const targets = document.querySelectorAll(`[data-rec-trigger="${targetId}"]`);
        targets.forEach(target => {
          target.classList.toggle('hidden');
  
          if (target.dataset.closeOnOutsideClick === 'true') {
            if (!closeOnOutside.includes(target)) {
              closeOnOutside.push(target);
            }
          }
        });
      });
    });
  
    closeTriggers.forEach(trigger => {
      const targetId = trigger.getAttribute('data-close-trigger');
  
      trigger.addEventListener('click', () => {
        const targets = document.querySelectorAll(`[data-rec-trigger="${targetId}"]`);
        targets.forEach(target => {
          target.classList.add('hidden');
        });
      });
    });
  
    document.addEventListener('click', (event) => {
      closeOnOutside.forEach(target => {
        const isInsideTarget = target.contains(event.target);
        const isTrigger = document.querySelector(`[data-trigger][data-trigger="${target.dataset.recTrigger}"]`)?.contains(event.target);
        const isCloseTrigger = document.querySelector(`[data-close-trigger="${target.dataset.recTrigger}"]`)?.contains(event.target);
  
        if (!isInsideTarget && !isTrigger && !isCloseTrigger) {
          target.classList.add('hidden');
        }
      });
    });
  });
  