import { sendEmail } from "/src/js/modules/email.js";
import { showToast } from "/src/js/utils/toast.js"; 
import { sanitizeInput, validateEmail, checkRateLimit } from "/src/js/utils/security.js";

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

function startButtonCountdown(formElement, timeLeftSeconds) {
    const submitButton = formElement.querySelector('button[type="submit"]'); 
    if (!submitButton) return;

    let secondsLeft = timeLeftSeconds;
    submitButton.disabled = true;

    if (formElement.countdownInterval) {
        clearInterval(formElement.countdownInterval);
    }

    formElement.countdownInterval = setInterval(() => {
        if (secondsLeft <= 0) {
            clearInterval(formElement.countdownInterval);
            submitButton.disabled = false;
            submitButton.textContent = 'Send Inquiry';
        } else {
            submitButton.textContent = `Wait ${secondsLeft}s`;
            secondsLeft--;
        }
    }, 1000);
}

// FUNCTION: Main submit handler (Validates, sanitizes, and sends data)
async function handleFormSubmit(event) {
    // Step 1: Stop the browser from reloading the page
    event.preventDefault(); 
    const form = event.target;

    // Step 1.5: Check Rate limit (POPRAWIONE: porównanie form.id ze stringiem)
    const cooldown = form.id === 'service-form' ? 60000 : 30000;
    const rateLimit = checkRateLimit(form, cooldown, true);

    if (rateLimit.isLimited) {
        showToast(`⏳ Please wait ${rateLimit.timeLeft}s before submitting again.`, 'error');
        startButtonCountdown(form, rateLimit.timeLeft);
        return;
    } 

    // Step 2: Grab input fields from the form
    const emailInput = form.querySelector('input[name="email"]');
    const nameInput = form.querySelector('input[name="name"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    // Step 3: Validate email address format
    if (emailInput && !validateEmail(emailInput.value)) {
        showToast('❌ Please enter a valid email address.', 'error');
        return;
    }

    // Step 4: Clean up inputs (Opcjonalnie: sanityzacja przed wysyłką)
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

        startButtonCountdown(form, cooldown / 1000);
    } else {
        showToast('❌ Something went wrong. Please try again.', 'error');
        localStorage.removeItem(`limit_${form.id}`);

        setFormLoadingState(form, false);
    }
}

// FUNCTION: Find the form on the page and attach the submit listener
function initOrderForm() {
    const form = document.getElementById('service-form'); 
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);
}

// SAFE INITIALIZATION
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initOrderForm, 100));
} else {
    setTimeout(initOrderForm, 100);
}