const SCRIPT_URL = import.meta.env.VITE_EMAIL_API_URL;

export async function sendEmail(formData) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors', 
      body: formData,
      token: import.meta.env.VITE_TOKEN_EMAIL
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