export async function loadPartial(id, url) {
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('Network response error.');

        const html = await response.text()
        document.getElementById(id).innerHTML = html;
    } catch (err) {
        console.error('Something wen wrong, read this: ', err);
    }
}