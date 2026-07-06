# NovaOrders v1.1.2

A modern, fast, and fully modular digital services ordering platform. Built with vanilla JavaScript (ES6+), modular CSS architecture, and a serverless backend integration via Google Apps Script.

## 🚀 Features

- **Dynamic Routing & Rendering:** Centralized router (`index.js`) managing page-specific states and initialization via `data-page` attributes.
- **Data-Driven Architecture:** Services, FAQ, and legal pages are dynamically populated from localized JSON data stores.
- **Robust Security & Validation:** Client-side input validation and sanitization, supported by Content Security Policy (CSP), structure-based email validation, explicit digit/number prevention for names (without Unicode dependencies), and double-submit prevention via disabled button states.
- **Advanced Anti-Spam & Rate-Limiting:** Dual-layer traffic control utilizing client-side request throttling and serverless backend tracking (via `CacheService` inside Google Apps Script) restricting rapid automated dispatches per client IP address and email identity.
- **Serverless Mailer Backend:** Asynchronous integration with Google Apps Script API for automated, non-blocking email dispatch.
- **Clean UI Component Structure:** Custom-built toast notifications, service category filters, URL-bound live search, and unified CSS variables.


## 📁 Project Structure

```text
.
├── .env.example              # Template for required local environment variables
├── LICENSE                   # Project license file
├── README.md                 # Main project documentation
├── SECURITY.md               # Security policy guidelines
├── contact.html              # Contact form page
├── eslint.config.mjs         # ESLint configuration
├── faq.html                  # Frequently Asked Questions page
├── index.html                # Main homepage / Landing page
├── package-lock.json         # Locked versions of Node.js dependencies
├── package.json              # Project scripts and dependencies
├── privacy.html              # Privacy Policy view
├── service.html              # Dynamic checkout and order page
├── services.html             # Full directory of offered services
├── terms.html                # Terms of Service view
├── vercel.json               # Vercel configuration
├── vite.config.mjs           # Vite build tool configuration
│
├── public/                   # Static assets served directly as-is
│   ├── favicon.png           # Website favorite icon
│   ├── data/                 # Application data stores (JSON)
│   │   ├── faq.json          # FAQ section data
│   │   ├── legal.json        # Legal texts and compliance data
│   │   └── services.json     # Services catalog data
│   ├── images/               # Global graphic assets
│   │   └── novaorders_logo.png
│   ├── partials/             # Injectable HTML template fragments
│   │   ├── footer.html       # Shared page footer
│   │   ├── header-services.html
│   │   └── header.html       # Shared navigation header
│   └── services/             # Media and thumbnails for specific services
│       ├── analytics.jpg
│       ├── api.jpg
│       └── ... (other service-specific images)
│
└── src/                      # Application source code (processed by Vite)
    ├── css/                  # Application stylesheets
    │   ├── main.css          # Global entry point (imports other stylesheets)
    │   ├── utils.css         # Helper utility classes
    │   ├── components/       # Reusable UI component styles
    │   │   ├── badge.css, cta.css, filter.css, search.css, switch.css, toast.css
    │   ├── core/             # Base configurations and style tokens
    │   │   ├── animations.css, base.css, reset.css, typography.css, variables.css
    │   └── modules/          # View-specific styles for individual pages
    │       ├── about.css, contact.css, faq.css, features.css, footer.css, etc.
    └── js/                   # Frontend JavaScript application logic
        ├── index.js          # Main entry point and router
        ├── core/             # Core application engine (layout loaders)
        │   └── loadPartials.js
        ├── modules/          # Feature-specific business logic handlers
        │   ├── contactForm.js, dropdown.js, email.js, faq.js, legal.js, etc.
        └── utils/            # Helper scripts (metadata, security, notifications)
            ├── pageTitle.js, security.js, toast.js
```

**🛠️ Installation & Setup**

1. Clone the repository:

```Bash
git clone https://github.com/lostangelcoding/novaorders.git
cd novaorders
```

2. Install dependencies and generate lockfile:

This project requires a package-lock.json file for the automated GitHub Actions CI pipeline to run properly. Generate it locally by running:

```Bash
npm install
```

3. Configure Environment Variables:

Create a `.env` file in the root directory based on `.env.example` and populate it with your secure credentials:

```bash
VITE_SCRIPT_URL=your_google_apps_script_url_here
VITE_FORM_TOKEN=your_secret_handshake_token_here
```

⚠️ The .env file is excluded from version control via .gitignore and must never be committed to the repository.

4. Vite Development Server Execution

Because the project structure is now managed by Vite, native ECMAScript 6 (ES6) Modules (import/export directives) are compiled and bundled on-the-fly via Vite's internal Hot Module Replacement (HMR) engine.

To spin up the local development environment with an active network listener, run the following command:

```Bash
npm run dev
```

Once initialized, open your browser and navigate to the local loopback address provided in the terminal output (typically http://localhost:5173).

**🧪 Linting & Quality Assurance**

Code quality and style consistency are automatically enforced via ESLint. A GitHub Actions workflow ensures all checks pass before merges.

To execute code analysis manually:

```Bash
npm run lint
```

**⚠️ Educational Disclaimer & Incident Response**

To ensure operational stability and prevent misuse of the contact/ordering system, the application implements a lightweight protection layer designed to mitigate automated submissions and traffic abuse.

Protection mechanisms include:
- client-side input validation and sanitization
- basic request throttling
- token-based verification using environment variables (VITE_FORM_TOKEN)
- serverless endpoint isolation via Google Apps Script configuration

In case of abusive usage patterns (spam or automated form submissions), access to the submission endpoint may be temporarily disabled by revoking or rotating the configured API token or updating the deployment configuration.

**📌 Portfolio Notice**

This project is part of a personal software engineering portfolio.

It is shared publicly for educational and demonstration purposes only.  
Unauthorized copying of branding, structure, or commercial reuse without permission is discouraged.

**📄 License**

This project is open-source software licensed under the MIT License. Feel free to use, modify, and distribute as needed.
