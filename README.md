# The Consciousness Project Website

A lightweight, static site for The Consciousness Project designed to be hosted on GitHub Pages.

## Features

- Hero landing page with project mission statement and call to action.
- Sections for initiatives, community programming, and curated resources with deep-dive detail pages.
- Accessible newsletter, community interest, and event RSVP forms wired to [FormSubmit](https://formsubmit.co/) endpoints (AJAX + graceful fallback).
- Subtle gradients, glassmorphism accents, and responsive layout.

## Local Development

1. Clone the repository and change into the project directory:
   ```bash
   git clone https://github.com/<your-account>/consciousness-project-site.git
   cd consciousness-project-site
   ```
2. Open `index.html` in your browser (double-click the file or serve via a lightweight static server such as `npx serve`).

## Deploying to GitHub Pages

1. Create a new repository on GitHub named `consciousness-project-site` (or any name you prefer).
2. Push the project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: bootstrap consciousness project site"
   git branch -M main
   git remote add origin git@github.com:<your-account>/<your-repo>.git
   git push -u origin main
   ```
3. In the repository settings on GitHub, locate **Pages** under the **Code and automation** section.
4. Choose the `main` branch and the `/ (root)` folder as the source, then click **Save**.
5. GitHub Pages will build the site and provide a live URL (typically `https://<your-account>.github.io/<your-repo>/`).

### Form integrations

- The forms post to FormSubmit using AJAX requests (see `index.html` and `assets/js/main.js`). Replace the placeholder emails (`support@consciousness.project`, etc.) with your own addresses and confirm them with FormSubmit to receive submissions.
- If you prefer another provider (Mailchimp, Airtable, custom backend), update each form's `action`/`data-endpoint` attributes and adjust the fetch call in `assets/js/main.js`.
- Remove or adapt the client-side `enhanceForm` helper if you want the browser to handle form submissions without JavaScript.

### Mailboxes

- Default addresses used across the site: `j.henrix.cole@`, `admin@`, `governance@`, `support@`, and `nonprofit@` (all at `consciousness.project`).
- To make them functional, provision mailboxes or forwarding aliases with your email provider, then verify each address with FormSubmit so submissions are delivered.
- Update the `mailto:` links or form endpoints if you decide to route messages elsewhere.

### Resource library

- Long-form resource pages live under `resources/` and share content files in `assets/resources/`.
- Update or replace the Markdown documents in `assets/resources/` when you have new syllabi, forum guides, or notebook volumes.
- Adjust the hero CTAs or add downloads by editing the relevant file under `resources/`.

## Customization Tips

- **Branding:** Replace the placeholder logomark (`◎`) in the header with an SVG or image in `assets/img/` and update the markup accordingly.
- **Copy:** Update the text content in each section to reflect your latest initiatives, research focus, and community programs.
- **Links:** Swap the `href="#"` placeholders with live URLs for your forms, documents, or community platforms.
- **Analytics or Forms:** To wire the forms into a backend or service (e.g., Netlify Forms, Airtable, Mailchimp), add the relevant `action` attributes or JavaScript fetch calls in `assets/js/main.js`.

## License

This project is released under the [MIT License](LICENSE).
