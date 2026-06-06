const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9SfqA_NLIS0h5jAX4-AWucXRNTV9_kD3JL6mMcyzJHmHnExFwbG-hoOPo8JZ052uj2A/exec';

export async function sendEmail(formData) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors', 
      body: formData 
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