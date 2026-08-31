document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', syncHeader, { passive: true }); syncHeader();

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Ouvrir le menu');
    mobileMenu.classList.remove('open');
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Ouvrir le menu' : 'Fermer le menu');
    mobileMenu?.classList.toggle('open', !open);
    if (!open) mobileMenu?.querySelector('a')?.focus();
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); menuButton?.focus(); } });

  document.querySelectorAll('.amount-grid').forEach(group => {
    group.querySelectorAll('label').forEach(label => label.addEventListener('click', () => {
      group.querySelectorAll('label').forEach(l => l.classList.remove('selected'));
      label.classList.add('selected');
      const input = label.querySelector('input');
      const custom = group.closest('.donation-card')?.querySelector('.custom-amount input');
      if (custom) { custom.value = input?.value === 'other' ? '' : input?.value || ''; if (input?.value === 'other') custom.focus(); }
    }));
  });

  document.querySelectorAll('.donation-card .segmented button').forEach(button => button.addEventListener('click', () => {
    const group = button.closest('.segmented');
    group?.querySelectorAll('button').forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-pressed','false'); });
    button.classList.add('selected'); button.setAttribute('aria-pressed','true');
  }));

  document.querySelectorAll('[data-donation-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    window.location.href = 'http://helloasso.com/associations/a-p-tits-pas';
  }));

  document.querySelectorAll('[data-contact-form]').forEach(form => {
    const message = form.querySelector('.form-message');
    if (message) message.setAttribute('aria-live','polite');
  });

  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('selected-filter', b === button));
    document.querySelectorAll('[data-category]').forEach(card => card.hidden = value !== 'all' && card.dataset.category !== value);
  }));

  const year = document.querySelector('[data-year]'); if (year) year.textContent = new Date().getFullYear();
});
