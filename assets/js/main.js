const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const serviceCards = Array.from(document.querySelectorAll('[data-service-card]'));
const detailTitle = document.getElementById('serviceDetailTitle');
const detailSummary = document.getElementById('serviceDetailSummary');
const detailImage = document.getElementById('serviceDetailImage');
const detailOutcomes = document.getElementById('serviceDetailOutcomes');
const detailContact = document.getElementById('serviceDetailContact');
const detailPanel = document.querySelector('.service-detail');

function setService(card) {
  if (!card || !detailTitle || !detailSummary || !detailImage || !detailOutcomes || !detailContact) return;

  serviceCards.forEach((item) => item.classList.toggle('active', item === card));
  if (detailPanel) detailPanel.classList.add('is-changing');

  window.setTimeout(() => {
    const title = card.dataset.title || '';
    const summary = card.dataset.summary || '';
    const image = card.dataset.image || '';
    const contact = card.dataset.contact || title;
    const outcomes = (card.dataset.outcomes || '').split('|').filter(Boolean);

    detailTitle.textContent = title;
    detailSummary.textContent = summary;
    detailImage.src = image;
    detailImage.alt = card.querySelector('img')?.alt || '';
    detailContact.href = `contact.html?interest=${encodeURIComponent(contact)}`;
    detailOutcomes.innerHTML = outcomes.map((item) => `<li>${item}</li>`).join('');

    if (detailPanel) detailPanel.classList.remove('is-changing');
  }, 120);
}

serviceCards.forEach((card) => {
  card.addEventListener('click', () => setService(card));
});

const servicePrev = document.querySelector('[data-service-prev]');
const serviceNext = document.querySelector('[data-service-next]');
function stepService(direction) {
  const activeIndex = Math.max(0, serviceCards.findIndex((card) => card.classList.contains('active')));
  const nextIndex = (activeIndex + direction + serviceCards.length) % serviceCards.length;
  serviceCards[nextIndex]?.focus();
  setService(serviceCards[nextIndex]);
}
if (servicePrev && serviceNext && serviceCards.length) {
  servicePrev.addEventListener('click', () => stepService(-1));
  serviceNext.addEventListener('click', () => stepService(1));
}

const interestParam = new URLSearchParams(window.location.search).get('interest');
const interestSelect = document.querySelector('select[name="interest"]');
if (interestParam && interestSelect) {
  const target = Array.from(interestSelect.options).find((option) => option.textContent === interestParam);
  if (target) interestSelect.value = target.value;
}
