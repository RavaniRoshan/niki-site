## 2026-08-16 - [Reverse Tabnabbing]
**Vulnerability:** Found multiple `target="_blank"` anchor tags missing `rel="noopener noreferrer"`.
**Learning:** React 18 mitigates the `noopener` portion by default for `target="_blank"`, but adding both `noopener noreferrer` is still a good security practice, especially for older browser compat and ensuring no referrer leakage to untrusted third parties.
**Prevention:** Enforce eslint rules or use components to enforce `rel="noopener noreferrer"` for external links.
