# Contributing to Rupees-TS

Thank you for your interest in contributing to **Rupees-TS**! We welcome bug reports, feature requests, and pull requests.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies using your preferred package manager (we recommend `pnpm`):
   ```bash
   pnpm install
   ```
3. Run tests in watch mode to make sure your changes don't break existing functionality:
   ```bash
   pnpm run test
   ```
4. Update the documentation in the `www/` folder if you are adding new features.

## Submitting Pull Requests

- Keep pull requests focused on a single issue.
- Make sure to run the linter and tests before submitting:
  ```bash
  pnpm run lint
  pnpm run test
  ```
- Write clear and descriptive commit messages.

## Publishing

This project uses `bumpp` for release management. Maintainers can release a new version by running:
```bash
pnpm run release
```

Thanks again for contributing!
