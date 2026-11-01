# Eman Jewelers Admin Panel

Private React/Vite dashboard for authorized Eman Jewelers administrators.

## Local development

1. Install dependencies: `npm install`
2. Start Vite: `npm run dev`
3. The Vite development server proxies `/api/*` to the production API at `https://82-25-105-184.sslip.io`.

The admin UI uses relative `/api/admin` requests. In production, `vercel.json` rewrites these requests to the backend API so the browser can use a same-origin HTTP-only session cookie. Do not set a public JWT or expose backend secrets in Vite environment variables.

## Admin provisioning

There is no public admin registration. Create the first administrator from the backend repository using its protected provisioning script. Set `ADMIN_NAME`, `ADMIN_EMAIL`, and a strong `ADMIN_PASSWORD` (12+ characters) in the backend environment, then run `npm run admin:create`.

## Live dashboard features

- Secure sign-in, session restoration and sign-out using the backend HTTP-only cookie.
- Customer listing, profile editing and account deletion.
- Product creation, editing, archiving and restoring.
- Browser-side product image resizing/compression before API upload.
- Order listing, order detail view and status updates.
- Categories derived from active catalogue products; category renames update the associated products.

## Current API limitations

- Customer and order screens load the latest 100 records because the current backend API exposes pagination but the UI currently requests the first 100.
- Dashboard totals are based on those loaded records, not lifetime aggregate statistics.
- Categories are not a separate database collection. A category becomes visible when an active product uses it.
- Store settings are not saved because the backend does not currently expose a store-settings endpoint.
- Product images are stored in the product document as image data/URL. Browser compression keeps uploaded image data under the backend model's 2 MB field limit.

## Build

`npm run build`
