/* =============================================
   Contact Form — Formspree fetch submission
   Endpoint: https://formspree.io/f/maqzllky
   ============================================= */

const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submitBtn');
const toast      = document.getElementById('formToast');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name)                     { showToast('Please enter your name.', 'error'); return; }
    if (!isValidEmail(email))      { showToast('Please enter a valid email address.', 'error'); return; }
    if (!message)                  { showToast('Please write a message.', 'error'); return; }

    submitBtn.textContent  = 'Sending…';
    submitBtn.disabled     = true;

    try {
      const res = await fetch('https://formspree.io/f/maqzllky', {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(form)
      });

      if (res.ok) {
        form.reset();
        showToast('✦ Message sent — I\'ll be in touch soon.', 'success');
      } else {
        const data = await res.json().catch(() => ({}));
        const msg  = data?.errors?.map(err => err.message).join(' ') || 'Something went wrong. Try emailing me directly.';
        showToast(msg, 'error');
      }
    } catch {
      showToast('Network error. Please email me at anketeshome@gmail.com', 'error');
    } finally {
      submitBtn.textContent = 'Send Message →';
      submitBtn.disabled    = false;
    }
  });
}

/* Show toast below form, then fade it out after 3 s */
function showToast(msg, type) {
  toast.textContent  = msg;
  toast.className    = 'form-toast form-toast--' + type + ' form-toast--visible';

  // After 3 s start the fade-out, then hide completely
  setTimeout(() => {
    toast.classList.add('form-toast--hiding');
    toast.addEventListener('transitionend', () => {
      toast.className = 'form-toast';
    }, { once: true });
  }, 3000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
