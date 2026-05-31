import { loadPartial } from "/src/js/core/loadPartials.js";

const page = document.body.dataset.page;

addEventListener('DOMContentLoaded', async () => {
    // Partials
    await loadPartial('header', '/src/partials/header.html');
    await loadPartial('footer', '/src/partials/footer.html');
    
    if(page === "services") {
        await loadPartial('header-services', '/src/partials/header-services.html');

    } else if(page === "service") {
        await loadPartial('', '');
        
    } else if(page === "contact") {
        await loadPartial('', '');
    }

});