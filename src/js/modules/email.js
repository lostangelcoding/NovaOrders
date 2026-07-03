const SCRIPT_URL = import.meta.env.VITE_EMAIL_API_URL;

export async function sendEmail(formData) {
  try {
    let userIp = "unknown_ip";
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      userIp = ipData.ip;
    } catch (ipErr) {
      console.warn('[IP Fetch Warning]: ', ipErr);
    }

    if (formData instanceof FormData) {
      formData.append('token', import.meta.env.VITE_TOKEN_EMAIL);
      formData.append('ip', userIp);
    } else {
      const params = new URLSearchParams(formData);
      params.append('token', import.meta.env.VITE_TOKEN_EMAIL);
      params.append('ip', userIp);
      formData = params;
    }

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors', 
      redirect: 'follow', 
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