## Why

Publishing `eslint-config-mocg` to npm is currently a manual, from-a-workstation step — error-prone and unauditable. We want a tag/release-driven GitHub Actions workflow that builds and publishes the package automatically, mirroring the proven approach in the `eslint-config-naming` reference repo. At the same time, the repository moved from `dmytro-vakulenko-moc/eslint-config` to the canonical, public `moc-global/eslint-config`, leaving stale URLs across package metadata, docs, and the changelog that must be corrected (they would otherwise 404 on the npm package page and break a future `--provenance` publish). See issue moc-global/eslint-config#7.

## What Changes

- **Add `.github/workflows/release.yml`** that publishes to npm:
  - Triggers on `release: published` (primary) and `workflow_dispatch` (manual fallback).
  - Runs on Node 24 with `actions/setup-node` (`registry-url: https://registry.npmjs.org`); grants `contents: read` + `id-token: write` (OIDC-ready for later).
  - Sets `HUSKY: "0"` so `npm ci`'s `prepare` hook (`husky && npm run build`) does not try to install git hooks in CI.
  - **Version gate**: fails the run unless the release tag (optional leading `v` stripped) equals `package.json` `version`.
  - Publishes via `npm publish --access public` with `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}`; the existing `prepublishOnly` (`clean && build`) produces `dist/`.
  - No lint/test gate in the release workflow (consistent with the reference repo and the existing husky pre-push gate; `ci.yml` stays manual-only).
- **Fix stale repository URLs** (`dmytro-vakulenko-moc` → `moc-global`) across live files: `package.json` (`repository`/`homepage`/`bugs`), `README.md`, `docs/.vitepress/config.mjs`, `docs/guide/getting-started.md`, `CHANGELOG.md` footer/policy links, and `.github/ISSUE_TEMPLATE/config.yml`. `repository.url` adopts the idiomatic public `git+https://github.com/moc-global/eslint-config.git`; docs links point at `https://moc-global.github.io/eslint-config/`.
- Out of scope: archived OpenSpec history, the upstream `@see` link to `DrSmile444/eslint-config-naming`, and the `extract-shareable-eslint-config` change records. The package **name** (`eslint-config-mocg`) is unchanged. `--provenance` is a noted optional follow-up, not part of this change.

## Capabilities

### New Capabilities
- `release-automation`: a CI workflow that builds and publishes the package to npm on a GitHub Release/tag, with a tag↔version gate, token-based auth (OIDC-ready), and CI-safe install.

### Modified Capabilities
- `documentation-publishing`: the "Repository metadata points at the canonical repository" requirement changes its canonical repository from `dmytro-vakulenko-moc/eslint-config` to `moc-global/eslint-config`.

## Impact

- **New files**: `.github/workflows/release.yml`.
- **Edited files**: `package.json`, `README.md`, `docs/.vitepress/config.mjs`, `docs/guide/getting-started.md`, `CHANGELOG.md`, `.github/ISSUE_TEMPLATE/config.yml`.
- **External setup (out of repo, tracked in #7)**: `NPM_TOKEN` must exist as a GitHub Actions **Secret** (not a Variable) with publish rights; the first publish must use this token because OIDC trusted publishing cannot be configured until the package exists on npm (the package is currently unpublished — `404`).
- No runtime/source code or consumer-facing API changes.
