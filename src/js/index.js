// Imports
import { setSelectedService } from "/src/js/modules/orderForm.js";
import { handleSearchFromURL } from "/src/js/modules/search.js";
import { initServiceFilters } from "/src/js/modules/serviceFilter.js";
import { initDropdownFilter } from "/src/js/modules/dropdown.js";
import { fetchServices, renderServices } from "/src/js/modules/services.js";
import { loadPartial } from "/src/js/core/loadPartials.js";
import { initLegalModule } from "/src/js/modules/legal.js";
import { initFaqModule } from "/src/js/modules/faq.js";
import { initContactForm } from "/src/js/modules/contactForm.js";
import { initPageTitle } from "/src/js/utils/pageTitle.js";

const page = document.body.dataset.page; 

// Functions
function handleServicesRendering(page, allServices) {
    if (page === 'services') {
        renderServices('services-list', allServices);

    } else if (page === 'home') {
        const popularOnly = allServices.filter(service => service.popular);
        renderServices('services-preview', popularOnly);

    } else if (page === 'service') {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedId = parseInt(urlParams.get('id'), 10);

        if (selectedId) {
            const matchedService = allServices.find(s => s.id === selectedId);
            
            if (matchedService) {
                renderServices('service', [matchedService], true);
                setSelectedService(matchedService.title);
            } else {
                console.warn(`[Services] No service found with ID: ${selectedId}`);
                document.getElementById('service').innerHTML = `<p>Service not found.</p>`;
            }
        }
    }
}

async function initPartials(page) {
    await loadPartial('header', '/partials/header.html');
    await loadPartial('footer', '/partials/footer.html');

    if (page === "services" || page === "service") {
        await loadPartial('header-services', '/partials/header-services.html');
    }
}

async function initServicesModule(page) {
    if (page !== 'home' && page !== 'services' && page !== 'service') return;
    
    try {
        const allServices = await fetchServices();

        handleServicesRendering(page, allServices);

        if (page === 'services') {
            initServiceFilters(allServices, 'services-list');
            handleSearchFromURL('services-list');
        }
    } catch (error) {
        console.error("Critical Error: Failed to initialize the services module:", error);
    }
}

// DOM Setup
addEventListener('DOMContentLoaded', async () => {
    initPageTitle();

    await initPartials(page);

    await initServicesModule(page);

    initDropdownFilter();

    if (page === 'privacy' || page === 'terms') {
        initLegalModule(page);
    }

    if (page === 'faq') {
        initFaqModule();
    }

    if (page === 'contact') {
        initContactForm();
    }
});