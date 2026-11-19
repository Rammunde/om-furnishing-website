# OM Furnishing & Sofa Maker

A responsive React + Vite homepage for a custom sofa and home furnishing business. It uses React and CSS only; no backend or additional packages are needed.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, and check code style with `npm run lint`.

## Update business details and content

Edit [`src/config.js`](./src/config.js) to add your phone number, WhatsApp number (country code and digits), email, address, Google Maps URL, opening hours, YouTube channel URL and ID, and social links. The contact address and “Open in Maps” link both use the configured Google Maps URL. Replace the sample furnishing imagery in the `services` and `gallery` lists with photos of your actual work before publishing.

To show videos, add real YouTube video IDs, titles and categories to the `videos` list. Video IDs can be found after `v=` in a YouTube watch URL. The homepage intentionally shows a setup message until genuine videos are configured; it does not invent video content, subscriber counts or customer testimonials.

The inquiry form opens a prefilled WhatsApp chat when a WhatsApp number is configured, or an email draft when only an email address is configured. Without either contact method, the form explains which setting is missing.

## Before launch

- Replace `https://www.example.com/` in `public/sitemap.xml` and `public/robots.txt` with the deployed domain.
- Add your canonical URL and Google Search Console verification token in `index.html`.
- Add a Google Analytics tag only after configuring your property and any required consent.
- Use your own business, project and customer details; do not publish placeholder values as real information.
- Embedded videos and website visits do not guarantee YouTube monetization or eligibility. Follow YouTube's current Partner Program and monetization policies.
