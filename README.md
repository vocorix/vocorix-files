# Vocorix web platform

Next.js App Router / TypeScript marketing site with server-side API routes and a Supabase-ready data layer, keeping the current charcoal, cream, coral, and open-core brand identity.

## Stack

- Next.js App Router, React, TypeScript
- Server-side Route Handlers for health, contact submissions, and a future chatbot API contract
- Supabase Postgres for durable enquiries, rate limits, and future chat conversations/messages
- Optional Resend notifications, called only from the server
- Three.js hero visual, with reduced-motion support

## Local development

Copy `.env.example` to `.env.local`, fill the server-only Supabase project URL and secret key, then apply `supabase/migrations/20261026000000_initial.sql` using the Supabase SQL Editor or your migration workflow.

~~~sh
npm install
npm run dev
npm run typecheck
npm run build
~~~

## API routes

- `GET /api/health` — simple health response without exposing environment state.
- `POST /api/contact` — server-side validation, origin check, honeypot, database-backed rate limit, private lead insert, and optional email notification.
- `POST /api/chat` — future chatbot contract; it returns `503 chat_not_configured` until a provider is connected and implemented.

The contact form needs `SUPABASE_URL` and either `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY`. Apply the SQL migration before accepting submissions. `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are optional; verify the sender domain before enabling notifications. Notifications default to `swastik@vocorix.com`.

See `docs/CHATBOT-INTEGRATION.md` for the planned provider boundary and safety requirements.

## Safe deployment

This work lives on `feat/nextjs-supabase-backend`, not on `main`. Validate a Vercel Preview before merging. Configure required environment variables and apply the Supabase migration before promoting the new contact form to production. The Vercel project that owns `vocorix.com` may still be named `vokero-hq-files`; that internal project name does not affect website branding.

## Security baseline

- RLS is enabled on application tables; no public table access policies are created.
- The Supabase admin key is read only in a server-only module.
- Raw IP addresses are not stored in the rate-limit table; only salted hashes are persisted.
- Lead content is not logged, and email notification errors do not discard a stored lead.
- The chatbot is not active until a provider is implemented.

## Before production

- Configure Supabase credentials in the Vercel project that owns `vocorix.com` for Preview/Production as appropriate.
- Apply and verify the SQL migration.
- Confirm the `swastik@vocorix.com` mailbox exists.
- Verify the email sender domain before configuring Resend.
- Test submissions, error states, rate limiting, invalid payloads, mobile layouts, and reduced-motion behaviour.
