/data/README.md - Test_File.csv usage & data-driven Playwright snippet

This README explains how to use the provided Test_File.csv for enrichment and verification test cases,
which rows to use for specific scenarios, and includes a Playwright TypeScript snippet to iterate rows.

File location
- `data/Test_File.csv` (included in this package)

Columns found
- first_name, last_name, email, organization_primary_domain, linkedin_url, phone_number

Recommended rows for scenarios
- Valid row (positive path): Choose a row that has non-empty email, valid linkedin_url (http(s)://linkedin.com/...), and phone_number.
- Missing email (negative): Pick a row where `email` is empty or blank.
- Invalid LinkedIn (negative): Use any row and change `linkedin_url` to an intentionally malformed value (e.g., `htp://bad-url`).
- Invalid phone (negative): Modify `phone_number` to non-numeric or badly formatted value (e.g., `123-abc`).
- Duplicate test: Duplicate any valid row twice to validate dedupe logic.
- Empty file test: Create a CSV with headers only to test 'no data' behavior.

Playwright - Data-driven CSV iteration (TypeScript)
Place this snippet inside your Playwright tests to iterate rows from the CSV and run enrichment assertions.

```ts
import fs from 'fs';
import csvParse from 'csv-parse/lib/sync'; // npm i csv-parse
import { test, expect } from '@playwright/test';

const raw = fs.readFileSync('./data/Test_File.csv', 'utf8');
const records = csvParse(raw, { columns: true, skip_empty_lines: true });

for (const row of records) {
  test.describe(`Enrichment row: ${row.email || row.first_name}`, () => {
    test(`enrich - ${row.email || row.first_name}`, async ({ page }) => {
      // Example: POST single enrichment API
      const response = await page.request.post('/api/enrich/single', {
        data: {
          email: row.email,
          first_name: row.first_name,
          last_name: row.last_name,
          domain: row.organization_primary_domain,
          linkedin_url: row.linkedin_url,
          phone_number: row.phone_number
        }
      });
      expect([200,202]).toContain(response.status());
      const body = await response.json();
      // Add assertions based on expected enriched fields
      expect(body).toHaveProperty('results');
    });
  });
}
```

Notes:
- Install csv-parse: `npm i csv-parse`
- The snippet uses Playwright's APIRequestContext (`page.request`) available in Playwright v1.16+.
- Adjust endpoint paths if your API uses different routes.
- When running tests requiring authentication, set `TEST_EMAIL` & `TEST_PASSWORD` env vars or implement a login helper.

