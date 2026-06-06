import { sendEmail } from "./email.js";
import { showToast } from "../utils/toast.js"; 
import { sanitizeInput, validateEmail } from "../utils/security.js";

// FUNCTION: Update the hidden input field with the chosen service name
export function setSelectedService(serviceTitle) {
  const hiddenInput = document.getElementById('selected-service');
  if (!hiddenInput) return; 
  
  hiddenInput.value = serviceTitle;
}

// FUNCTION: Change the submit button text and disabled state during API call
function setFormLoadingState(formElement, isLoading) {
  const submitButton = formElement.querySelector('button[type="submit"]');
  if (!submitButton) return;

  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? 'Sending...' : 'Send Inquiry';
}

// FUNCTION: Main submit handler (Validates, sanitizes, and sends data)
async function handleFormSubmit(event) {
  // Step 1: Stop the browser from reloading the page (Prevents 405 error)
  event.preventDefault(); 
  const form = event.target;

  // Step 2: Grab input fields from the form
  const emailInput = form.querySelector('input[name="email"]');
  const nameInput = form.querySelector('input[name="name"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  // Step 3: Validate email address format
  if (emailInput && !validateEmail(emailInput.value)) {
    showToast('❌ Please enter a valid email address.', 'error');
    return;
  }

  // Step 4: Clean up inputs to prevent XSS attacks
  if (nameInput) nameInput.value = sanitizeInput(nameInput.value.trim());
  if (messageInput) messageInput.value = sanitizeInput(messageInput.value.trim());

  // Step 5: Show loading status on the button
  setFormLoadingState(form, true);

  // Step 6: Send data to Google Apps Script email service
  const formData = new FormData(form);
  const success = await sendEmail(formData);

  // Step 7: Show success or error message to the user
  if (success) {
    showToast('🚀 Inquiry sent successfully!', 'success');
    form.reset(); // Clear form fields
  } else {
    showToast('❌ Something went wrong. Please try again.', 'error');
  }

  // Step 8: Remove loading status from the button
  setFormLoadingState(form, false);
}

// FUNCTION: Find the form on the page and attach the submit listener
function initOrderForm() {
  // Check for both possible form IDs dynamically
  const form = document.getElementById('order-form') || document.getElementById('contact-order-form');
  
  // Exit if no form is found on the current subpage
  if (!form) {
    console.warn('[NovaOrders]: Form element not found on this page.');
    return;
  }

  // Listen for the submit event
  form.addEventListener('submit', handleFormSubmit);
}

// SAFE INITIALIZATION: Run the script safely whether DOM is ready or still loading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOrderForm);
} else {
  initOrderForm();
}