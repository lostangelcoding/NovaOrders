// Imports 
import { fetchServices, getAllServices, renderServices } from "/src/js/modules/services.js";
import { loadPartial } from "/src/js/core/loadPartials.js";

// Setup
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

    // Services
    try {
        const allServices = await fetchServices();

        if(page === 'services') {
            renderServices('services-list', allServices);
        } else if (page === 'home') {
            const popularOnly = allServices.filter(services => services.popular);
            renderServices('services-preview', popularOnly);
        }

    } catch(error) {
        console.error("Critical Error: Failed to initialize the services module:", error);
    }
});

