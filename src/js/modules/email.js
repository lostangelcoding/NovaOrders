const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9SfqA_NLIS0h5jAX4-AWucXRNTV9_kD3JL6mMcyzJHmHnExFwbG-hoOPo8JZ052uj2A/exec';

export async function sendEmail(formData) {
  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });
    return true; 
  } catch (error) {
    console.error('[Email Service Error]:', error);
    return false; 
  }
}