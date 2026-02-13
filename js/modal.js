// KNQ Website — Contact Form Modal

export function initModal() {
  const modal = document.getElementById('contact-modal');
  const overlay = document.getElementById('modal-overlay');
  const modalCard = document.getElementById('modal-card');
  const closeBtn = document.getElementById('modal-close');
  const form = document.getElementById('contact-form');
  const thankYou = document.getElementById('modal-thank-you');

  if (!modal) return;

  // All CTA buttons that open the modal
  const triggers = document.querySelectorAll('[data-modal="contact"]');
  let previousFocus = null;

  function openModal(prefilledMessage = '') {
    previousFocus = document.activeElement;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Pre-fill message if needed
    const messageField = form?.querySelector('[name="message"]');
    if (messageField && prefilledMessage) {
      messageField.value = prefilledMessage;
    }

    // Reset form state
    if (form) form.classList.remove('hidden');
    if (thankYou) thankYou.classList.add('hidden');

    // Animate in
    requestAnimationFrame(() => {
      overlay?.classList.add('modal-visible');
      modalCard?.classList.add('modal-card-visible');
    });

    // Focus first input
    setTimeout(() => {
      const firstInput = form?.querySelector('input, textarea');
      if (firstInput) firstInput.focus();
    }, 300);
  }

  function closeModal() {
    overlay?.classList.remove('modal-visible');
    modalCard?.classList.remove('modal-card-visible');

    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      if (previousFocus) previousFocus.focus();
    }, 200);
  }

  // Trigger buttons
  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefill = btn.dataset.prefill || '';
      openModal(prefill);
    });
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Focus trap
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, input, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Form submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Client-side validation
      const name = form.querySelector('[name="name"]');
      const company = form.querySelector('[name="company"]');
      const email = form.querySelector('[name="email"]');
      let valid = true;

      [name, company, email].forEach((field) => {
        if (field && !field.value.trim()) {
          field.classList.add('input-error');
          valid = false;
        } else if (field) {
          field.classList.remove('input-error');
        }
      });

      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('input-error');
        valid = false;
      }

      if (!valid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          form.classList.add('hidden');
          if (thankYou) thankYou.classList.remove('hidden');
          setTimeout(closeModal, 3000);
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        const errorEl = form.querySelector('.form-error');
        if (errorEl) {
          errorEl.textContent = 'Something went wrong. Please try again or email us directly.';
          errorEl.classList.remove('hidden');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
      }
    });
  }
}
