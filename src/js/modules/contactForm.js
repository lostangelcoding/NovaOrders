import { sendEmail } from "/src/js/modules/email.js";
import { showToast } from "/src/js/utils/toast.js"; 
import { sanitizeInput, validateEmail } from "/src/js/utils/security.js";

function setFormLoadingState(formElement, isLoading) {
  const submitButton = formElement.querySelector('button[type="submit"]');
  if (!submitButton) return;

  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? 'Sending...' : 'Send Inquiry';
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  const emailInput = form.querySelector('input[name="email"]');
  const nameInput = form.querySelector('input[name="name"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  if (emailInput && !validateEmail(emailInput.value)) {
    showToast('❌ Please enter a valid email address.', 'error');
    return;
  }

  if (nameInput) nameInput.value = sanitizeInput(nameInput.value.trim());
  if (messageInput) messageInput.value = sanitizeInput(messageInput.value.trim());

  setFormLoadingState(form, true);

  const formData = new FormData(form);
  const success = await sendEmail(formData);

  if (success) {
    showToast('🚀 Inquiry sent successfully!', 'success');
    form.reset();
  } else {
    showToast('❌ Something went wrong. Please try again.', 'error');
  }

  setFormLoadingState(form, false);
}

export function initContactForm() {
  const form = document.getElementById('contact-order-form');
  if (!form) return;

  form.addEventListener('submit', handleFormSubmit);
}