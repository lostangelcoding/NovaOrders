let serviceCache = null;

export async function fetchServices() {
    if (serviceCache) return serviceCache;

    try {
        const response = await fetch('/data/services.json');
        
        if (!response.ok) {
            console.error(`❌ Network Error: Failed to load services JSON. Status: ${response.status}`);
            serviceCache = []; 
            return serviceCache;
        }

        const data = await response.json();

        serviceCache = data.services || []; 
        
        return serviceCache;

    } catch (error) {
        console.error("❌ Fetch Error: Something went wrong while parsing JSON:", error);
        serviceCache = [];
        return serviceCache;
    }
}

export async function getAllServices() {
    return serviceCache || [];
}

export function renderServices(id, servicesList, isSingleView = false) {
    const el = document.getElementById(id);
    if (!el) return;

    el.innerHTML = servicesList.map(service => {
        let badges = '';
        
        if (service.popular) {
            badges += '<span class="badge badge-popular" aria-label="Popular item"><span aria-hidden="true">🔥</span> Popular</span>';
        }

        if (service.sales && service.sales > 0) {
            badges += `<span class="badge badge-discount" aria-label="Discounted by ${service.sales} percent"><span aria-hidden="true">🏷️</span> Sales -${service.sales}%</span>`;
        }

        let priceHTML;

        if (service.sales && service.sales > 0) {
            const newPriceFrom = service.priceFrom * (1 - service.sales / 100);
            const newPriceTo = service.priceTo * (1 - service.sales / 100);

            // aria-hidden ukrywa przekreślone cyfry, a czytelne etykiety tłumaczą sytuację czytnikowi ekranu
            priceHTML = `
                <p class="service-price">
                    Price: 
                    <span style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">Original price: ${Math.round(service.priceFrom)}$ to ${Math.round(service.priceTo)}$.</span>
                    <span class="old-price" aria-hidden="true">${Math.round(service.priceFrom)}$ - ${Math.round(service.priceTo)}$</span> 
                    <span style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">Current sale price:</span>
                    <span class="new-price">${Math.round(newPriceFrom)}$ - ${Math.round(newPriceTo)}$</span>
                </p>
            `;
        } else {
            priceHTML = `
                <p class="service-price">Price: ${service.priceFrom}$ - ${service.priceTo}$</p>
            `;
        }

        const cardHTML = `
            <div class="service-card" data-services-id='${service.id}'>
                <div class="badges-container" aria-label="Service tags">${badges}</div>
                <h3>${service.title}</h3>
                <img src="${service.image}" alt="Preview icon for ${service.title}" loading='lazy' aria-hidden="true">
                <h4 class="service-category">${service.category}</h4>
                <p class="service-description">${service.description}</p>
                ${priceHTML}
            </div>
        `;

        if (isSingleView) {
            return cardHTML;
        }

        return `
            <a href="/service.html?id=${service.id}" style="text-decoration: none;" aria-label="View details for ${service.title} service">
                ${cardHTML}
            </a>
        `;
    }).join('\n');
}