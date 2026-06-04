export function initDropdownFilter() {
    const toggleBtn = document.querySelector('[data-filter-toggle]');
    const menu = document.querySelector('[data-filter-menu]');

    if (!menu || !toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('is-open');
    });

    document.addEventListener('click', (e) => {
        if(menu.classList.contains('is-open') && !menu.contains(e.target) && e.target !== toggleBtn) {
            menu.classList.remove('is-open');
        }
    });
}