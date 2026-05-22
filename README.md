# Bright Language Solutions

**Repo:** https://github.com/Bright-Language-Solutions/bls

ISO-certified translation, localisation, voice-over, and interpretation services platform. Clients submit quote requests through the public site; the admin console lets the team manage quote status via a protected dashboard.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | MongoDB (native driver, no ORM) |
| Validation | Zod |
| UI | shadcn/ui + Tailwind CSS v3 |
| Package manager | Yarn |

## Local Setup

```bash
git clone https://github.com/Bright-Language-Solutions/bls.git
cd bls
yarn install
cp .env.example .env.local
# Edit .env.local — fill in MONGO_URL and ADMIN_SECRET at minimum
yarn dev
```

Open http://localhost:3000.

## Folder Structure

```
app/(site)/        Public pages — Navbar + Footer + WhatsApp floating button
app/admin/         Admin console (middleware-protected, cookie auth)
app/api/           REST API — quotes CRUD, admin auth
components/        Shared React components (Navbar, Footer, QuoteForm, etc.)
data/              Static data files — services, industries, languages, locations
lib/               MongoDB client, Zod schemas, WhatsApp notification helper
public/assets/     SVG logos (mark.svg, logo.svg, wordmark.svg + dark variants)
tests/             Python backend API tests
```

## API Reference

### `POST /api/quotes`

Create a new language services quote request. Fires a WhatsApp notification (best-effort, non-blocking).

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| customerName | string | Yes | min 2 chars |
| phone | string | Yes | 10-digit Indian mobile, starts 6–9 |
| email | string | No | valid email |
| serviceType | string | Yes | See enum below |
| sourceLang | string | Yes | must differ from targetLang |
| targetLang | string | Yes | must differ from sourceLang |
| wordCount | integer | No | positive integer |
| projectDate | ISO date | Yes | today or future |
| notes | string | No | max 1000 chars |

`serviceType` values: `TRANSLATION` `INTERPRETATION` `VOICEOVER` `DUBBING` `SUBTITLING` `LOCALIZATION` `TRANSCRIPTION` `DTP` `EDITING` `TYPESETTING`

**Response `201`**
```json
{ "success": true, "quoteId": "uuid", "whatsappSent": false }
```

---

### `PATCH /api/quotes/:id`

Update a quote's status or notes. Requires the `admin_session` cookie.

**Request body** (at least one field)

| Field | Type | Notes |
|---|---|---|
| status | string | `RECEIVED` `IN_REVIEW` `QUOTED` `IN_PROGRESS` `DELIVERED` `CANCELLED` |
| notes | string | max 1000 chars, pass `null` to clear |

**Response `200`**
```json
{ "success": true, "lead": { ...quoteDocument } }
```

---

### `POST /api/admin/auth`

Authenticate as admin. Sets the `admin_session` HttpOnly cookie on success.

**Request body**
```json
{ "password": "string" }
```

**Response `200`** → `{ "success": true }` + `admin_session` cookie

---

### `DELETE /api/admin/auth`

Sign out. Clears the `admin_session` cookie.

**Response `200`** → `{ "success": true }`

---

## Live URLs

| | |
|---|---|
| **Live URL** | https://www.brightlanguagesolutions.com |
| **Admin URL** | https://www.brightlanguagesolutions.com/admin/login |
| **WhatsApp** | https://wa.me/918368440255 |

## Deployment

### Vercel

1. Import the GitHub repo at vercel.com/new
2. Vercel auto-detects Next.js — `vercel.json` is included and pre-configured
3. Add all environment variables listed below in **Settings → Environment Variables**

### MongoDB Atlas

1. Create a free M0 cluster at mongodb.com/atlas
2. Create a database user with **readWrite** on your database
3. Add `0.0.0.0/0` to the IP allowlist (or restrict to Vercel IPs for production)
4. Copy the connection string (`mongodb+srv://...`) into `MONGO_URL`

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MONGO_URL` | Yes | MongoDB connection string (`mongodb+srv://...`) |
| `DB_NAME` | No | Database name — defaults to `bls` |
| `NEXT_PUBLIC_BASE_URL` | Yes | Public site URL, e.g. `https://www.brightlanguagesolutions.com` |
| `ADMIN_SECRET` | Yes | Admin console password — change before deploying |
| `WHATSAPP_PROVIDER` | No | `twilio`, `interakt`, or `wati` — omit to disable notifications |
| `TWILIO_ACCOUNT_SID` | If `WHATSAPP_PROVIDER=twilio` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | If `WHATSAPP_PROVIDER=twilio` | Twilio auth token |
| `TWILIO_WHATSAPP_FROM` | If `WHATSAPP_PROVIDER=twilio` | Sender number (`whatsapp:+14155238886`) |
| `INTERAKT_API_KEY` | If `WHATSAPP_PROVIDER=interakt` | Interakt API key |
| `WATI_API_KEY` | If `WHATSAPP_PROVIDER=wati` | WATI API key |
| `WATI_API_ENDPOINT` | If `WHATSAPP_PROVIDER=wati` | WATI base URL |

## Running Tests

Start the dev server first (with `ADMIN_SECRET=bls-admin-change-me`), then:

```bash
pip install requests
python tests/backend_test.py
```

All 13 tests must pass.

## Contact

| | |
|---|---|
| **Company** | Bright Language Solutions |
| **Address** | Plot No. 153, 1st Floor, Block-D1, Mansa Ram Park, Uttam Nagar, New Delhi - 110059 |
| **Phone / WhatsApp** | +91 83684 40255 |
| **Email** | hello@brightlanguage.in |
