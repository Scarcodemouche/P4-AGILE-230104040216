---

### 3. Panduan Testing (`README.md`)

```markdown
## Run & Test

npm ci
npm run dev:orders    # http://127.0.0.1:5002
npm run dev:notif     # http://127.0.0.1:5003
npm test              # 2 passed, 5 tests
npx spectral lint openapi/api.yaml