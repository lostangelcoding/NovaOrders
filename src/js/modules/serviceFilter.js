import { renderServices } from "./services.js";

// Filter Logic
function getActiveFilters(filterMenu) {
    const checked = filterMenu.querySelectorAll('input[type="checkbox"]:checked');
    return new Set(Array.from(checked, input => input.value));
}

function matchService(service, active) {
    return active.has(service.category) || 
           (active.has("Popular") && service.popular) || 
           (active.has("Sales") && service.sales > 0);
}

function applyFilters(allServices, containerId, filterMenu) {
    const active = getActiveFilters(filterMenu);
    
    const filtered = active.size === 0 
        ? allServices 
        : allServices.filter(s => matchService(s, active));

    renderServices(containerId, filtered);
}

// UI Interactions
function setupOutsideClick(filterToggle, filterMenu) {
    document.addEventListener('click', (e) => {
        if (!filterToggle.contains(e.target) && !filterMenu.contains(e.target)) {
            filterToggle.classList.remove('active');
            filterMenu.classList.remove('open');
        }
    });
}

// Main Initialization
export function initServiceFilters(allServices, containerId) {
    const filterMenu = document.querySelector('[data-filter-menu]');
    const clearBtn = document.querySelector('[data-filter-clear]');
    const filterToggle = document.querySelector('.filter-toggle');
    
    if (!filterMenu) return;

    filterMenu.addEventListener('change', () => applyFilters(allServices, containerId, filterMenu));

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            filterMenu.querySelectorAll('input[type="checkbox"]').forEach(i => i.checked = false);
            renderServices(containerId, allServices);
        });
    }

    if (filterToggle) {
        filterToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            filterToggle.classList.toggle('active');
            filterMenu.classList.toggle('open');
        });
        setupOutsideClick(filterToggle, filterMenu);
    }
}