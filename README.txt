EnrichMinion QA Assignment  
Comprehensive QA deliverable including manual test cases, bug reports, and automation (Playwright + Postman)



---

Project Overview
This repository contains the QA deliverables for **EnrichMinion**, a web app providing data enrichment and verification services.

Scope tested:
- User Signup & Login (Email + Google OAuth)
- Forgot Password flow
- Enrichment module (email/phone/linkedin)
- Verification module (email validity)
- API coverage for core authentication and enrichment endpoints

---

Deliverables

| File / Folder | Description |
|----------------|-------------|
| bug_report.md | Contains detailed bug documentation (3 verified issues with RCA) |
| ui_test_cases.xlsx | Manual UI test cases (Signup, Login, Enrichment, Verification) |
| api_test_cases.xlsx | API test cases (authentication, enrichment, validation) |
| screenshots/ | Evidence of the discovered bugs (desktop UI captures) |
| automation_suite/ | Playwright (TypeScript) + Postman automation suite |
| README.txt | Short project info for offline viewing |

---

Verified Bugs (RCA Included)
| ID | Title | Type | Root Cause |
|----|--------|------|-------------|
| BUG-001 | Signup: “Email rate limit exceeded” | Backend | Email provider rate-limiting issue |
| BUG-002 | Google Sign-in: “Unsupported provider” | Backend + Frontend | Provider disabled in Supabase; UI shows raw JSON error |
| BUG-003 | Forgot Password: success message, no email sent | Backend | Email queue or delivery failure |

Screenshots are attached in `/screenshots/`.

---

Automation Suite (Playwright + Postman)

Playwright (TypeScript)  
Located in: `automation_suite/tests/`

Included Tests
| Test | Description |
|------|--------------|
| `signup.spec.ts` | Valid signup flow (email registration) |
| `login.spec.ts` | Email login and dashboard redirection |
| `google.spec.ts` | Google sign-in negative case (provider disabled) |
| `forgot-password.spec.ts` | Password reset success message validation |

Run Locally
```bash
# Install dependencies
npm install
npx playwright install

# Run all tests headless
npm test
---

Postman API Tests
Located at: `automation_suite/automation/postman_collection.json`

Included Endpoints
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/providers`
- `POST /api/auth/forgot-password`

Each includes `pm.test()` assertions for:
- Response status
- Token existence
- JSON structure
- Negative validation

Runnable with Postman GUI or Newman CLI.

---

Evaluation Highlights
- Manual Test Design – Comprehensive UI + API coverage  
- Root Cause Analysis – Clear frontend vs backend attribution  
- Automation Initiative – Fully runnable TypeScript test suite  
- Reporting Quality – Structured, reproducible, professional format  

---

Author
Pruthviraj Patil- QA Engineer

Skilled in: Manual Testing • API Testing • Playwright • Postman • Root Cause Analysis • Reporting  

---

How to Use
1. Clone this repo  
   ```bash
   git clone https://github.com/<your-username>/enrichminion_qa_assignment.git
   cd enrichminion_qa_assignment
   ```
2. Review manual test cases & bug reports  
3. Run automation with:
   ```bash
   cd automation_suite
   npm install
   npm test
   ```
4. Import Postman collection and test API endpoints.  

---

Acknowledgments
Special thanks to **Brainholics QA Team** for providing the EnrichMinion QA assignment challenge.

---

> _“Good testers don’t just find bugs — they explain them, reproduce them, and understand where they live.”_
