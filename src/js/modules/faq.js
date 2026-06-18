export async function initFaqModule() {
  const faqContentEl = document.getElementById('faq-content');

  if (!faqContentEl) return;

  try {
      const response = await fetch('/data/faq.json');
      if (!response.ok) throw new Error(`Failed to fetch FAQ data: ${response.status}`);

      const data = await response.json();
      const faqList = data.faq;

      if (!faqList || faqList.length === 0) {
        console.warn('[FAQ] No data found.');
        return;
      }

      const categories = [...new Set(faqList.map(item => item.category))];

      faqContentEl.innerHTML = categories.map((category, catIndex) => {
        const categoryItems = faqList.filter(item => item.category === category);

        return `
          <div class="faq-category-group">
            <h2 class="faq-category-title">${category.toUpperCase()}</h2>
            <div class="faq-list">
              ${categoryItems.map((item, itemIndex) => {
                const uniqueId = `faq-ans-${catIndex}-${itemIndex}`;
                return `
                  <div class="faq-item">
                    <button class="faq-question flex" aria-expanded="false" aria-controls="${uniqueId}">
                      <span>${item.question}</span>
                      <i class="fa-solid fa-chevron-down faq-icon" aria-hidden="true"></i>
                    </button>
                    <div id="${uniqueId}" class="faq-answer" aria-hidden="true">
                      <p>${item.answer}</p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('');

      const questions = faqContentEl.querySelectorAll('.faq-question');
      questions.forEach(question => {
        question.addEventListener('click', () => {
          const faqItem = question.parentElement;
          const answerPanel = faqItem.querySelector('.faq-answer');

          const isCurrentlyExpanded = question.getAttribute('aria-expanded') === 'true';

          question.setAttribute('aria-expanded', !isCurrentlyExpanded);
          if (answerPanel) {
            answerPanel.setAttribute('aria-hidden', isCurrentlyExpanded);
          }

          faqItem.classList.toggle('active');
        });
      });

  } catch (error) {
    console.error('[FAQ Module Error]:', error);
    faqContentEl.innerHTML = `<p class="error-message">Failed to load FAQ content. Please try again later.</p>`;
  } 
}