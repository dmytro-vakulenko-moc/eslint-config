## 1. Release workflow

- [x] 1.1 Add `.github/workflows/release.yml` triggered by `release: published` and `workflow_dispatch`, with `permissions: contents: read` + `id-token: write` and a workflow-level `env: HUSKY: "0"`.
- [x] 1.2 Add the publish job: `actions/checkout@v4` (`fetch-depth: 0`), `actions/setup-node@v4` (Node 24, `cache: npm`, `registry-url: https://registry.npmjs.org`), then `npm ci`.
- [x] 1.3 Add the version-gate step: read `package.json` version, derive the tag from `github.event.release.tag_name` (release) or `GITHUB_REF_NAME` (dispatch), strip a leading `v`, and fail with `::error::` on mismatch.
- [x] 1.4 Add the publish step: `npm publish --access public` with `env: NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}` (no separate build step — `prepublishOnly` builds `dist/`).

## 2. Repository URL cleanup (dmytro-vakulenko-moc → moc-global)

- [x] 2.1 `package.json`: set `repository.url` to `git+https://github.com/moc-global/eslint-config.git`, `homepage` to `https://moc-global.github.io/eslint-config/`, and `bugs.url` to `https://github.com/moc-global/eslint-config/issues`.
- [x] 2.2 `README.md`: update the `git+ssh` install snippet to `moc-global` and the "Published" docs link to `https://moc-global.github.io/eslint-config/`.
- [x] 2.3 `docs/.vitepress/config.mjs`: update the GitHub social link to `https://github.com/moc-global/eslint-config`.
- [x] 2.4 `docs/guide/getting-started.md`: update the `git+ssh` install snippet to `moc-global`.
- [x] 2.5 `CHANGELOG.md`: update the versioning-policy link and the `[Unreleased]`/compare/release footer links to `moc-global`.
- [x] 2.6 `.github/ISSUE_TEMPLATE/config.yml`: update the docs tree link to `moc-global`.

## 3. Verification

- [x] 3.1 Lint the workflow YAML (valid syntax) and confirm no remaining reference to `dmytro-vakulenko-moc` in shipped product files via `git grep` (excluding `openspec/changes/archive/**`, the live `openspec/specs/**` tree — rewritten on archive from this change's delta — and the upstream `@see` link).
- [x] 3.2 Run the local gate where applicable: `npm run typecheck`, `npm run lint`, `npm run docs:build` (the docs link change must not break the build), and `npm run pack:check`.
- [x] 3.3 Dry-run the release flow end-to-end where possible (e.g. simulate the version-gate logic for matching and mismatched tags) to confirm it passes on a match and fails on a mismatch.
