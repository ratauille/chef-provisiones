# Villa catalog rollout

This branch is isolated from main to preserve the live provisioning form.

## Verified repository status
- Existing implementation is a static `index.html` catalog with category filtering and a cart.
- Order submission uses Formspree; confirm a real end-to-end test before production changes.
- The latest inspected GitHub Pages run (36587639965) failed; logs were not retrievable through the connected GitHub API.

## Next implementation steps
1. Diagnose Pages environment and deployment permissions in repository settings; rerun only after fixing the root cause.
2. Add responsive product imagery with a graceful fallback, search, accessible buttons, and cart count.
3. Preserve existing Formspree endpoint and order submission behavior.
4. Test mobile layouts and send one controlled test request.
5. Merge into main only after successful validation.

Do not replace the existing static Pages site with raw Next.js source; Next.js needs a static export build for GitHub Pages.
