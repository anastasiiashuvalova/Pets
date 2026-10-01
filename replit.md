# Pets

Imported React 19 application using Vite, Tailwind CSS, React Router, and Supabase. Keep the existing frontend-only structure and Supabase data storage.

## Run on Replit

- Use Node.js 22 or newer (required by the locked Supabase dependencies).
- Install dependencies with `npm ci`.
- Run the `Start application` workflow (`npm run dev`).
- Vite listens on `0.0.0.0:5000` and accepts Replit's proxied preview host.
- Build with `npm run build`.

## Supabase configuration

The browser client requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, as listed in `.env.example`. Supply them through Replit Secrets, then restart the workflow. Vite embeds these values in the browser bundle: use only the project's public anon/publishable key, never a service-role or secret key.

The app expects:

- An `animals` table with `id`, `name`, `description`, `image_url`, and `created_at`, including defaults for `id` and `created_at` on insert.
- A public `animal-photos` storage bucket.
- Appropriate Row Level Security policies for public listing/detail reads and the intended creation/upload permissions.

An account-level Supabase connection is attached, but its authenticated proxy is not a replacement for these frontend environment variables. Do not expose connector credentials to the browser or add a server solely to bypass this configuration.

Without the two frontend variables the app intentionally displays a Supabase configuration message; listing and upload operations are unavailable.