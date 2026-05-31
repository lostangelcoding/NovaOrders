const partialCache = new Map();

export async function loadPartial(id, url) {
    try {
        const el = document.getElementById(id);
        if (!el) return;

        let html;

        if (partialCache.has(url)) {
            html = partialCache.get(url);
        } else {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response error.');

            html = await response.text();
            partialCache.set(url, html);
        }

        el.innerHTML = html;

    } catch (err) {
        console.error('Something went wrong:', err);
    }
}