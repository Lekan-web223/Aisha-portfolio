const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const toast = (message) => {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('show');
  window.setTimeout(() => element.classList.remove('show'), 2400);
};

$('#menu-toggle').addEventListener('click', () => $('#mobile-menu').classList.toggle('open'));
$$('.mobile-menu a').forEach((link) => link.addEventListener('click', () => $('#mobile-menu').classList.remove('open')));

const modal = $('#appointment-modal');
$$('a[href="#appointment"]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}));
$('.modal-close').addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.classList.remove('open');
});

$$('.add-button').forEach((button) => button.addEventListener('click', () => {
  const message = encodeURIComponent(`Hello Adetayo Stitches, I am interested in the ${button.dataset.name}. Please share more details.`);
  window.open(`https://wa.me/2348088360901?text=${message}`, '_blank', 'noopener,noreferrer');
}));

$$('.wishlist').forEach((button) => button.addEventListener('click', () => {
  button.classList.toggle('selected');
  button.textContent = button.classList.contains('selected') ? '♥' : '♡';
  toast(button.classList.contains('selected') ? 'Saved to your wishlist' : 'Removed from your wishlist');
}));

$$('.filter').forEach((button) => button.addEventListener('click', () => {
  $$('.filter').forEach((filter) => filter.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  $$('.product-card').forEach((card) => {
    card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none';
  });
}));

$('#newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  $('#form-note').textContent = 'You are on the list. Welcome to the atelier.';
  event.target.reset();
});
$('#appointment-form').addEventListener('submit', (event) => {
  event.preventDefault();
  $('#appointment-note').textContent = 'Thank you. The studio will be in touch shortly.';
  event.target.querySelector('button').textContent = 'Request received';
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.classList.remove('open');
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js'));
}
