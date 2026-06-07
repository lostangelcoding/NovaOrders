import { renderServices } from "./services.js";

export function initServiceFilters(allServices, containerId) {
    const filterMenu = document.querySelector('[data-filter-menu]');
    const clearBtn = document.querySelector('[data-filter-clear]');
    
    if (!filterMenu) return;

    function applyFilters() {
        // Tworzymy Set – wyszukiwanie w nim to O(1)
        const active = new Set();
        
        for (let input of filterMenu.querySelectorAll('input[type="checkbox"]:checked')) {
            active.add(input.value);
        }

        // Jeśli brak filtrów -> natychmiastowy zwrot, O(1)
        if (active.size === 0) {
            renderServices(containerId, allServices);
            return;
        }

        // Filtrowanie całej tablicy jednoprzebiegowo – czyste O(N)
        const filtered = allServices.filter(s => 
            active.has(s.category) || 
            (active.has("Popular") && s.popular) || 
            (active.has("Sales") && s.sales > 0)
        );

        renderServices(containerId, filtered);
    }

    filterMenu.addEventListener('change', applyFilters);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            for (let i of filterMenu.querySelectorAll('input[type="checkbox"]')) i.checked = false;
            renderServices(containerId, allServices);
        });
    }

    const filterToggle = document.querySelector('.filter-toggle');

    filterToggle.addEventListener('click', () => {

        filterToggle.classList.toggle('active');
    
    });
}

