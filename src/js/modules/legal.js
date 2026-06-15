export async function initLegalModule(pageType) {
  const titleEl = document.getElementById('legal-title');
  const updatedEl = document.getElementById('legal-updated');
  const contentEl = document.getElementById('legal-content');

  if (!titleEl || !updatedEl || !contentEl) return;

  try {
    const response = await fetch('/data/legal.json');
    if (!response.ok) throw new Error(`Failed to fetch legal data: ${response.status}`);
    
    const data = await response.json();
    const pageData = data[pageType];

    if (!pageData) {
      console.warn(`[Legal] No data found for type: ${pageType}`);
      return;
    }

    titleEl.textContent = pageData.title;
    updatedEl.textContent = pageData.updated;

    contentEl.innerHTML = pageData.sections.map(section => `
      <section class="legal-section">
        <h2>${section.heading}</h2>
        <p>${section.text}</p>
      </section>
    `).join('');

  } catch (error) {
    console.error('[Legal Module Error]:', error);
    contentEl.innerHTML = `<p class="error-message">Failed to load document content. Please try again later.</p>`;
  }
}