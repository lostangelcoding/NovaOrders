import { fetchServices, renderServices } from "./services.js";

export async function handleSearchFromURL(containerId) {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (!searchQuery) return;

    const query = searchQuery.toLowerCase().trim();
    
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.value = searchQuery;
    }

    const allServices = await fetchServices();

    const filtered = allServices.filter(service => {
        const titleMatch = service.title ? service.title.toLowerCase().includes(query) : false;
        const descMatch = service.description ? service.description.toLowerCase().includes(query) : false;
        
        return titleMatch || descMatch;
    });

    const container = document.getElementById(containerId);
    if (!container) return;

    if (filtered.length === 0) {
        container.innerHTML = `<h2 class="not-found-message">Not Found</h2>`;
        return;
    }

    renderServices(containerId, filtered);
}