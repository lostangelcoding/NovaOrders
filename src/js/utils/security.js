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

export function checkRateLimit(formId, cooldownMs = 60000, isUpdate = false) {
  const now = Date.now();
  const lockKey = `limit_${formId}`;
  const lockExpiry = localStorage.getItem(lockKey);

  if (lockExpiry && now < parseInt(lockExpiry, 10)) {
    const timeLeft = Math.ceil((parseInt(lockExpiry, 10) - now) / 1000);
    return { isLimited: true, timeLeft };
  }

  if (isUpdate) {
    localStorage.setItem(lockKey, now + cooldownMs);
  }

  return { isLimited: false, timeLeft: 0 };
}