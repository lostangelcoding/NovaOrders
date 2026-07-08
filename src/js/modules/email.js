export async function sendEmail(formData) {
  try {
    
    if (formData instanceof FormData) {
      formData.append('token', import.meta.env.VITE_TOKEN_EMAIL);
      formData.append('ip', '127.0.0.1'); 
    } else {
      formData.token = import.meta.env.VITE_TOKEN_EMAIL;
      formData.ip = '127.0.0.1';
    }

    const response = await fetch('/api/send', {
      method: 'POST',
      body: formData 
    });

    if (response.ok) {
      const result = await response.json();
      if (result.result === "success") {
        return true;
      } else {
        console.error('[Backend Validation Error]:', result.error);
        return false;
      }
    }
    return false;
    
  } catch (error) {
    console.error('[Email Service Error]:', error);
    return false; 
  }
}
