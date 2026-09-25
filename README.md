# Priyadharshini's Portfolio Website

## Run locally

```bash
npm install
npm run dev
```

## Contact form setup

The contact form submits to the Vercel serverless endpoint in `api/contact.js` and sends email through Resend. Copy `.env.example` to `.env.local` and supply these values:

```bash
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=Portfolio <hello@yourdomain.com>
CONTACT_TO_EMAIL=your-email@example.com
```

Verify the sending domain in Resend before using a custom `CONTACT_FROM_EMAIL`. Never commit `.env.local`.

## Deploy

1. Push this repository to GitHub.
2. Import it into Vercel.
3. Add the three environment variables above in **Project Settings → Environment Variables**.
4. Deploy, then submit the contact form to verify delivery.

Vercel builds the Vite site and automatically deploys `api/contact.js` as a serverless endpoint.
