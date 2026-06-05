export function sanitizeInput(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function preventDoubleSubmit(submitButton, timeout = 3000) {
  submitButton.disabled = true;
  setTimeout(() => {
    submitButton.disabled = false;
  }, timeout);
}