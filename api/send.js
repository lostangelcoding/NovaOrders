export const config = {
  runtime: 'edge', 
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const userIp = request.headers.get('x-forwarded-for') || 'unknown_ip';

    const contentType = request.headers.get('content-type');
    let bodyData;

    if (contentType.includes('application/json')) {
      bodyData = await request.json();
    } else {
      const formData = await request.formData();
      bodyData = Object.fromEntries(formData.entries());
    }

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(bodyData)) {
      params.append(key, value);
    }
    params.append('token', process.env.VITE_TOKEN_EMAIL); 
    params.append('ip', userIp); 

    const googleResponse = await fetch(process.env.VITE_EMAIL_API_URL, {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const googleResult = await googleResponse.text();
    return new Response(googleResult, {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch {
    return new Response(JSON.stringify({ result: 'error', error: 'Proxy error' }), { status: 500 });
  }
}
