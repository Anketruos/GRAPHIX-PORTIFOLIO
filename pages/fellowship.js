/* =============================================
   Fellowship Graphics — Gallery + Lightbox
   ============================================= */

const galleryItems  = document.querySelectorAll('.gallery-item');
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

let currentIndex = 0;
const items = Array.from(galleryItems);

function openLightbox(index) {
  currentIndex = index;
  const item = items[index];
  const img  = item.querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = item.dataset.title + ' — ' + item.dataset.tag;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % items.length;
  openLightbox(currentIndex);
}

items.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   showPrev();
  if (e.key === 'ArrowRight')  showNext();
});
