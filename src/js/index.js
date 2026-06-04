// Imports 
import { handleSearchFromURL } from "/src/js/modules/search.js";
import { initServiceFilters } from "/src/js/modules/serviceFilter.js";
import { initDropdownFilter } from "/src/js/modules/dropdown.js";
import { fetchServices, renderServices } from "/src/js/modules/services.js";
import { loadPartial } from "/src/js/core/loadPartials.js";

const page = document.body.dataset.page;

// Functions
function handleServicesRendering(page, allServices) {
    if (page === 'services') {
        renderServices('services-list', allServices);
    } else if (page === 'home') {
        const popularOnly = allServices.filter(service => service.popular);
        renderServices('services-preview', popularOnly);
    }
}

async function initPartials(page) {
    await loadPartial('header', '/src/partials/header.html');
    await loadPartial('footer', '/src/partials/footer.html');
    
    if(page === "services") {
        await loadPartial('header-services', '/src/partials/header-services.html');
    }
}

async function initServicesModule(page) {
    if(page !== 'home' && page !== 'services') return;
    
    try {
        const allServices = await fetchServices();

        handleServicesRendering(page, allServices);

        if (page === 'services') {
            initServiceFilters(allServices, 'services-list');
            handleSearchFromURL('services-list');
        }
    } catch(error) {
        console.error("Critical Error: Failed to initialize the services module:", error);
    }
}

// DOM Setup 
addEventListener('DOMContentLoaded', async () => {
    // Partials
    await initPartials(page);

    // Services
    await initServicesModule(page);

    // Dropdown
    initDropdownFilter();
});

