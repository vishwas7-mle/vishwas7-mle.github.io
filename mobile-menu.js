const menuButton = document.getElementById('mobile-menu-toggle');
const menuLinks = document.getElementById('site-navigation-links');
const mobileMenuBreakpoint = window.matchMedia('(max-width: 800px)');

const setMenuOpen = (isOpen) => {
  menuLinks.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  menuButton.innerHTML = `<i class="fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}" aria-hidden="true"></i>`;
};

const updateMenuMode = () => {
  const isMobile = mobileMenuBreakpoint.matches;
  document.body.classList.toggle('mobile-menu-ready', isMobile);
  menuButton.hidden = !isMobile;
  setMenuOpen(false);
};

menuButton.addEventListener('click', () => {
  if (mobileMenuBreakpoint.matches) {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  }
});

menuLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    setMenuOpen(false);
  }
});

document.addEventListener('click', (event) => {
  if (mobileMenuBreakpoint.matches && !event.target.closest('.greedy-nav')) {
    setMenuOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (mobileMenuBreakpoint.matches && event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});

window.addEventListener('resize', updateMenuMode);
updateMenuMode();