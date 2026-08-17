# NovaOrders v1.1.3

> ⚠️ **Project Status: Archived / Discontinued**  
> Active development on this project has been concluded due to lack of bandwidth and resources for future maintenance and updates. The codebase remains publicly available as an archived reference and portfolio project.

---

A modern, fast, and fully modular digital services ordering platform. Built with vanilla JavaScript (ES6+), modular CSS architecture, and a serverless backend integration via Google Apps Script.

## 🚀 Features

- **Dynamic Routing & Rendering:** Centralized router (`index.js`) managing page-specific states and initialization via `data-page` attributes.
- **Data-Driven Architecture:** Services, FAQ, and legal pages are dynamically populated from localized JSON data stores.
- **Robust Security & Defensive Validation:** Implements strict client-side input sanitization via RegExp-driven HTML Stripping to block Stored XSS mutations inside mail clients, enforced by a rigorous English-only character name whitelist (`/^[A-Za-z]+( [A-Za-z]+)*$/`), and double-submit prevention.
- **Elite Network Security & CSP:** Validated with a **115/100 (A+) score on Mozilla Observatory**. Hardened via rigorous HTTP security headers, including strict Content Security Policy (CSP), HTTP Strict Transport Security (HSTS) preloading, X-Frame-Options (via CSP frame-ancestors), and X-Content-Type-Options (`nosniff`).
- **Advanced Anti-Flood & Asymmetric Honeypot:** Powered by a multi-layered security cluster featuring a visually-hidden, accessible-isolated honeypot barrier (`b_username`) to silently drop bot traffic. Supported by an infrastructure circuit breaker (Global Rate Limit) and client-bound IP tracking utilizing Google Apps Script `CacheService` to enforce strict request thresholds per client IP address.
- **Hardened Error Handling:** Completely suppresses raw serverless system exception traces to eliminate *Information Disclosure* vulnerabilities. High-fidelity diagnostic traces are safely piped into Google Cloud Console while returning secure, generic JSON payloads to the client.
- **Serverless Mailer Backend:** Asynchronous integration with Google Apps Script API for automated, non-blocking email dispatch.
- **Clean UI Component Structure:** Custom-built toast notifications, service category filters, URL-bound live search, and unified CSS variables.


## 📁 Project Structure

```
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

🛠️ Installation & Setup

1. Clone the repository:
```bash
git clone [https://github.com/lostangelcoding/novaorders.git](https://github.com/lostangelcoding/novaorders.git)
cd novaorders
```

2. Install dependencies and generate lockfile:

This project requires a package-lock.json file for the automated GitHub Actions CI pipeline to run properly. Generate it locally by running:
```bash
npm install
```
3. Configure Environment Variables:

Create a .env file in the root directory based on .env.example and populate it with your secure credentials:
```Bash
VITE_EMAIL_API_URL=[https://script.google.com/macros/.../exec](https://script.google.com/macros/.../exec)
VITE_TOKEN_EMAIL=your_cryptographic_authorization_token_here
```

⚠️ The .env file is excluded from version control via .gitignore and must never be committed to the repository.

4. Vite Development Server Execution & API Proxying

Because the project structure is managed by Vite, native ECMAScript 6 (ES6) Modules are compiled and bundled on-the-fly.

To bypass HTTP 404/405 file-mapping errors during local development, the environment utilizes a local developer-endpoint router (/api/send) managed via Vite Server Proxy (configured in vite.config.js). Vite intercepts frontend fetch calls and automatically reroutes the entire network payload stream securely to the remote serverless backend.

To spin up the local development environment with the active proxy configuration, run:
```bash
npm run dev
```

Once initialized, open your browser and navigate to the local loopback address provided in the terminal output (typically http://localhost:5173).

**🧪 Linting & Quality Assurance**

Code quality and style consistency are automatically enforced via ESLint. A GitHub Actions workflow ensures all checks pass before merges.

To execute code analysis manually:
```bash
npm run lint
```

**⚠️ AppSec Engineering Disclaimer & Incident Response**

To ensure operational stability and prevent infrastructure abuse, the platform implements an advanced, production-grade Application Security (AppSec) framework designed to enforce Defense-in-Depth paradigms.

Protection mechanisms include:
- Client-side input whitelisting and structural HTML stripping
- Dual-layer asynchronous request throttling (Client-side & Serverless-side)
- Secure local proxy routing preventing client-side network target exposure
- Asymmetric Honeypot deception filters running silently on both endpoints
- Automated global circuit-breaker locks guarding cloud resource limits

In case of abusive usage patterns or coordinated flooding attempts, the infrastructure automatically triggers isolated rate-limit cooling windows, drops malicious payload streams with spoofed success responses, and registers forensic logs for auditing without interrupting user availability.

**📌 Portfolio Notice**

This project is part of a personal software engineering portfolio.

It is shared publicly for educational and demonstration purposes only.
Unauthorized copying of branding, structure, or commercial reuse without permission is discouraged.

**📄 License**

This project is open-source software licensed under the MIT License. Feel free to use, modify, and distribute as needed.