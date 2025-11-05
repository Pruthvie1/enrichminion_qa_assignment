# EnrichMinion Automation (Playwright + Postman)

## Playwright (TypeScript)
Requires Node.js >=16
Installation:
```bash
npm install
npx playwright install
```

Run tests:
```bash
# run all tests headless
npm test

# run in headed mode
npm run test:headed

# run debug mode
npm run test:debug
```

Environment variables:
- BASE_URL: base URL of app (defaults to https://enrichminion.vercel.app)
- TEST_EMAIL, TEST_PASSWORD: credentials for a test account if you want to run login/forgot-password flows

Notes:
- Selectors assume labels and semantic roles exist. If the app uses different attributes, update selectors in tests accordingly.
- The Google SSO test inspects the network response for provider errors. It will pass if the backend returns a JSON error (e.g., validation_failed).

## Postman
A basic Postman collection is included at `automation/postman_collection.json`. Import it into Postman and add requests as needed.
