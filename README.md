# Eman Jewelers Admin Panel

Private React/Vite dashboard for authorized administrators.

## Local setup
1. Run `npm install`.
2. Copy `.env.example` to `.env` and set `VITE_API_URL`.
3. Start with `npm run dev`.

Create the first admin from the backend repository using its protected provisioning script: set ADMIN_NAME, ADMIN_EMAIL and a strong ADMIN_PASSWORD (12+ characters) in the backend environment, then run `npm run admin:create`. There is no public admin registration.

Features: admin sign-in, session check, customer count metrics, searchable/paginated customer list, view/edit customer contact and delivery details, and permanent customer deletion. API authorization is enforced server-side; hiding UI is not treated as security.
