---
name: Browser verification
description: Browser compatibility for interactive checks in the Replit NixOS environment.
---

Prefer the environment-provided Chromium over Playwright-downloaded browser binaries for local interactive verification.

**Why:** Downloaded Linux browser binaries can fail on NixOS because their shared-library assumptions do not match the environment, even while Replit's screenshot browser works.

**How to apply:** Check for an existing system browser before downloading a browser or changing system dependencies. Keep verification tooling outside the app's dependencies unless automated tests are part of the requested work.