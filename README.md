# NovaOrders

A modern, fast, and fully modular digital services ordering platform. Built with vanilla JavaScript (ES6+), component-based CSS architecture, and a serverless backend integration via Google Apps Script.

## 🚀 Features

- **Dynamic Routing & Rendering:** Centralized router (`index.js`) managing page-specific states and initialization via `data-page` attributes.
- **Data-Driven Architecture:** Services, FAQ, and legal pages are dynamically populated from localized JSON data stores.
- **Robust Security & Validation:** Client-side input sanitization (XSS mitigation), email format validation, and double-submit prevention.
- **Serverless Mailer Backend:** Asynchronous integration with Google Apps Script API for automated, non-blocking email dispatch.
- **Clean UI Component Structure:** Custom-built toast notifications, service category filters, URL-bound live search, and unified CSS variables.

## 📁 Project Structure

```text
├── .github/
│   └── workflows/
│       └── ci.yml         # CI Pipeline (GitHub Actions)
├── src/
│   ├── assets/            # Static assets (favicons, images, branding)
│   │   ├── favicon.png
│   │   ├── images/
│   │   └── services/
│   ├── css/
│   │   ├── main.css       # Global stylesheet (imports manager)
│   │   ├── utils.css      # Utility classes
│   │   ├── components/    # Reusable UI component styles
│   │   │   ├── badge.css
│   │   │   ├── cta.css
│   │   │   ├── filter.css
│   │   │   ├── search.css
│   │   │   ├── switch.css
│   │   │   └── toast.css
│   │   ├── core/          # Base configurations
│   │   │   ├── animations.css
│   │   │   ├── base.css
│   │   │   ├── reset.css
│   │   │   ├── typography.css
│   │   │   └── variables.css
│   │   └── modules/       # Page-specific views styling
│   │       ├── about.css
│   │       ├── contact.css
│   │       ├── faq.css
│   │       ├── features.css
│   │       ├── footer.css
│   │       ├── header.css
│   │       ├── hero.css
│   │       ├── order-form.css
│   │       └── services.css
│   ├── js/
│   │   ├── index.js       # Main entry point & application router
│   │   ├── core/          # Core engine (layout & template loaders)
│   │   │   └── loadPartials.js
│   │   ├── data/          # App state & data stores (JSON)
│   │   │   ├── faq.json
│   │   │   ├── legal.json
│   │   │   └── services.json
│   │   ├── modules/       # Business logic handlers
│   │   │   ├── contactForm.js
│   │   │   ├── dropdown.js
│   │   │   ├── email.js
│   │   │   ├── faq.js
│   │   │   ├── legal.js
│   │   │   ├── orderForm.js
│   │   │   ├── search.js
│   │   │   ├── serviceFilter.js
│   │   │   └── services.js
│   │   └── utils/         # Helper utilities (security, toasts, metadata)
│   │       ├── pageTitle.js
│   │       ├── security.js
│   │       └── toast.js
│   └── partials/          # Injectable HTML layouts
│       ├── footer.html
│       ├── header-services.html
│       └── header.html
├── .gitattributes
├── .gitignore
├── contact.html           # Contact Form Page
├── eslint.config.mjs      # Linter configuration
├── faq.html               # Frequently Asked Questions Page
├── index.html             # Homepage / Landing Page
├── package.json           # Node.js dependencies and scripts configuration
├── package-lock.json      # Locked versions for consistent CI environments
├── privacy.html           # Privacy Policy View
├── service.html           # Dynamic Order Checkout Page
├── services.html          # Full Services Directory
└── terms.html             # Terms of Service View
```

**🛠️ Installation & Setup**

1. Clone the repository:

```Bash
git clone [https://github.com/your-username/novaorders.git](https://github.com/your-username/novaorders.git)
cd novaorders
```

2. Install dependencies and generate lockfile:

This project requires a package-lock.json file for the automated GitHub Actions CI pipeline to run properly. Generate it locally by running:

```Bash

npm install

```

3. Configure Backend Endpoint:

Open src/js/modules/email.js and set your Google Apps Script production URL (/exec endpoint):

```JavaScript
const SCRIPT_URL = "[https://script.google.com/macros/s/.../exec](https://script.google.com/macros/s/.../exec)";
```

4. Serve the Application Locally:

Since the project uses ES6 Modules (import/export), it cannot be opened directly via file://. You must serve it using a local HTTP server.

- If using VS Code, install the Live Server extension and click "Go Live".
- Alternatively, run via terminal:

```Bash
npx serve
```

**🧪 Linting & Quality Assurance**

Code quality and style consistency are automatically enforced via ESLint. A GitHub Actions workflow ensures all checks pass before merges.

To execute code analysis manually:

```Bash

npm run lint
```

**⚠️ Educational Disclaimer & Incident Response**

This repository is an open-source educational project developed for portfolio and R&D purposes. It serves as a testing ground for vanilla web technologies and security practices. 

In the event of anomalous traffic or spam detection on the production API gateway, an automated/manual Incident Response procedure is in place to instantly archive the current deployment deployment, rotate the endpoint keys, and mitigate service abuse.

**📄 License**

This project is open-source software licensed under the MIT License. Feel free to use, modify, and distribute as needed.
