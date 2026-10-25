# Password Security Analyzer

A privacy-first React and Node.js educational project for a Web Security & Compliance (WSC) mini-project. It estimates password strength entirely in your browser. The Express API only exposes a health check and never receives password input.

## Features

- Live checklist for length, character classes, repeated characters, common passwords, and predictable sequences.
- Five-level strength estimate with actionable guidance; Enter and the Analyze button show the same result.
- Keyboard accessible show/hide and clear controls, visible focus, live announcements, and Escape to dismiss the result without clearing input.
- Responsive dark interface, privacy notice, and reduced-motion support.
- Minimal Express health API with Helmet, allowlisted CORS, rate limiting, and centralized error handling.
- No database, analytics, cookies, browser storage, external password API, or password submission endpoint.

## Stack

- React 19, Vite, Tailwind CSS, Lucide React
- Node.js, Express 5, Helmet, CORS, express-rate-limit
- npm

## Project structure

```text
password-security-analyzer/
├── client/                 # React + Vite UI and on-device estimator
│   └── src/
│       ├── utils/           # Heuristic and unit tests
│       ├── App.jsx
│       └── index.css
├── server/                 # Health-only Express API
│   ├── app.js
│   ├── server.js
│   └── .env.example
├── package.json            # Root scripts
└── README.md
```

## Requirements

Use Node.js 20.19+ or 22.12+ and npm. Check versions in PowerShell:

```powershell
node --version
npm --version
```

## Install and run (Windows PowerShell)

From the project folder:

```powershell
npm install
npm --prefix client install
npm --prefix server install
Copy-Item server/.env.example server/.env
npm run dev
```

The UI is at <http://127.0.0.1:5173> and the API health check is <http://127.0.0.1:4000/api/health>. The API binds to loopback by default. Press Ctrl+C to stop both processes.

To run each service separately, use two PowerShell windows:

```powershell
npm --prefix server run dev
```

```powershell
npm --prefix client run dev
```

## Configuration

Copy `server/.env.example` to `server/.env` and adjust only if needed:

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `4000` | Health API port |
| `NODE_ENV` | `development` | Controls detailed server-side error logging |
| `CLIENT_ORIGIN` | `http://127.0.0.1:5173` | Single allowed browser origin for CORS |

The server has no password analysis route and intentionally does not install a request body parser.

## Build and tests

```powershell
npm run build
npm test
```

The client tests cover basic strength heuristic behavior. Server tests check the health response/security headers and confirm an unknown analysis route is not available.

## Security choices and privacy

- Password state exists only in the React component's in-memory state while the page is open. Clearing or closing the page removes it; it is never written to local/session storage, cookies, URLs, logs, or a database.
- The analysis module is local JavaScript. The health API accepts only `GET /api/health`; it does not receive password data.
- Helmet sets HTTP security headers. CORS permits only the configured frontend origin. Rate limiting applies to API requests. Express hides its framework banner and returns generic 404/500 JSON responses.
- The API binds to `127.0.0.1` by default for local project use. Configure deployment networking deliberately if hosting it.
- No third-party analytics or breach lookup is performed. Google Fonts are used for presentation; the password is never included in font requests.

## How to interpret the estimate

This is a small educational heuristic. It looks at length, character classes, a short list of common passwords, repeated runs, and obvious sequences. It is not a formal entropy calculation, does not inspect breached-password databases, and cannot guarantee that a password is safe. Prefer a unique, randomly generated password or a long unique passphrase stored in a reputable password manager. Do not reuse a password just because this page rates it highly.

## WSC concepts demonstrated

- Data minimization and privacy by design
- HTTP security headers, CORS origin allowlisting, and request rate limiting
- Input handling without unsafe HTML rendering or evaluation
- Keyboard accessibility and secure handling of sensitive user input
- Security estimation limitations and avoiding unsupported security claims

## Possible future improvements

- Replace the small common-password list with a larger locally bundled dataset, without transmitting the entered value.
- Add optional localization and more assistive-technology usability checks.
- Add deployment-specific HTTPS and reverse-proxy guidance.
