const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9SfqA_NLIS0h5jAX4-AWucXRNTV9_kD3JL6mMcyzJHmHnExFwbG-hoOPo8JZ052uj2A/exec';

export async function sendEmail(formData) {
  try {
    // Zmieniamy na zwykły fetch z poprawną obsługą CORS
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors', 
    });

    if (response.ok) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('[Email Service Error]:', error);
    return false; 
  }
}