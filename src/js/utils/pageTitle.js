const TITLES_MAP = {
  home: "NovaOrders | Professional Digital Services",
  services: "Our Services | NovaOrders",
  service: "Order Service | NovaOrders",
  contact: "Contact Us | NovaOrders",
  faq: "Frequently Asked Questions | NovaOrders",
  privacy: "Privacy Policy | NovaOrders",
  terms: "Terms of Service | NovaOrders"
};

export function initPageTitle() {
  const pageType = document.body.dataset.page;
  if (!pageType) return;

  const baseTitle = TITLES_MAP[pageType] || "NovaOrders";
  document.title = baseTitle;
}