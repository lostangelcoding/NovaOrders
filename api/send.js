// api/send.js (Działa w infrastrukturze brzegowej Vercel Edge)
export const config = {
  runtime: 'edge', // Gwarantuje błyskawiczne działanie i natychmiastowy dostęp do IP
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    // 1. Vercel automatycznie wstrzykuje tu PRAWDZIWE IP klienta, którego haker nie może sfałszować
    const userIp = request.headers.get('x-forwarded-for') || 'unknown_ip';

    // 2. Odbieramy dane z formularza przysłane z frontendu
    const contentType = request.headers.get('content-type');
    let bodyData;

    if (contentType.includes('application/json')) {
      bodyData = await request.json();
    } else {
      const formData = await request.formData();
      bodyData = Object.fromEntries(formData.entries());
    }

    // 3. Budujemy bezpieczną paczkę do Google Apps Script
    // Przenosimy Token tutaj! Teraz jest w 100% bezpieczny i niewidoczny w przeglądarce!
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(bodyData)) {
      params.append(key, value);
    }
    params.append('token', process.env.VITE_TOKEN_EMAIL); // Pobierane bezpiecznie po stronie serwera Vercel
    params.append('ip', userIp); // Prawdziwe IP

    // 4. Przekazujemy żądanie do Google Apps Script
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
