## Context

`eslint-config-mocg` is published to npm manually today. The reference repo
`eslint-config-naming` already automates this with a release-triggered workflow,
and we want to copy that proven shape. Separately, the repo moved to the public
`moc-global/eslint-config`, but many files still reference the old owner
`dmytro-vakulenko-moc`, which 404s on the npm page and would block a future
`--provenance` publish. Constraints discovered during exploration (issue #7):

- The package is **not yet on npm** (`404`). The first publish must use a token —
  OIDC trusted publishing can only be configured after the package exists.
- `package.json` has `"prepare": "husky && npm run build"`, so a naive `npm ci`
  in CI tries to install git hooks; the existing `ci.yml`/`docs.yml` set `HUSKY: "0"`.
- `"prepublishOnly": "clean && build"` already builds `dist/` on publish.
- `engines` require Node `^22.21.0 || >=24.10.0`; `.nvmrc` is `24`.

## Goals / Non-Goals

**Goals:**
- A release/tag-driven workflow that builds and publishes to npm, matching the reference.
- A safety gate that refuses to publish when the tag and `package.json` version disagree.
- Correct, canonical, public repository metadata everywhere it appears in live files.

**Non-Goals:**
- Re-enabling automated lint/test CI (`ci.yml` stays manual-only; husky pre-push is the gate).
- Configuring OIDC trusted publishing or `--provenance` now (permissions are made ready; adoption is a follow-up tracked in #7).
- Editing archived OpenSpec history, the upstream `@see` link, or the package name.

## Decisions

- **Trigger on `release: published` (+ `workflow_dispatch`), not `push: tags`.** Matches
  the reference and yields GitHub-rendered release notes; manual dispatch covers recovery.
  Alternative (`push: tags: ['v*']`) was rejected as less informative and not the reference shape.
- **Node 24 + `id-token: write` now, token auth in practice.** Node 24 satisfies `engines`
  and the OIDC minimum (Node ≥ 22.14.0, npm ≥ 11.5.1). We declare `id-token: write` so OIDC
  can be turned on later with zero workflow churn, but the first/early publishes authenticate
  via `NODE_AUTH_TOKEN`/`NPM_TOKEN` because the package must exist before OIDC can be configured.
- **`HUSKY: "0"` at workflow scope.** Prevents `npm ci`'s `prepare` from installing git hooks
  in CI, consistent with the other two workflows.
- **No separate build step.** `prepublishOnly` (`clean && build`) builds `dist/` during
  `npm publish`; adding a build step would be redundant.
- **`repository.url` becomes `git+https://github.com/moc-global/eslint-config.git`.** npm's
  documented form, publicly cloneable, and required (case-sensitively) for any future
  `--provenance` publish. `moc-global/eslint-config` is all-lowercase, so the known npm URL
  normalization trap does not bite us. `homepage` points at the docs site
  `https://moc-global.github.io/eslint-config/`; `bugs` at the moc-global issues page.

## Risks / Trade-offs

- **`NPM_TOKEN` stored as a Variable instead of a Secret** → `secrets.NPM_TOKEN` resolves empty
  and auth fails. Mitigation: issue #7 has an explicit confirmation checklist item; the workflow
  references `secrets.NPM_TOKEN` exactly.
- **Tag/version drift publishing the wrong version** → mitigated by the version-gate step that
  fails before publish on mismatch.
- **No CI test gate before publish** → a bad release could ship. Accepted trade-off to match the
  reference; the husky pre-push hook (lint, typecheck, test:run, pack:check, verify:examples) is
  the safety net, and `ci.yml` can be re-enabled later.
- **Duplicate-version publish** → `npm publish` rejects an already-published version. Low risk:
  the package is currently unpublished and the gate ties the version to the tag.

## Migration Plan

1. Land the workflow and URL fixes on a branch and merge to `main`.
2. Confirm the `NPM_TOKEN` **Secret** exists with publish rights.
3. Cut the first release: tag `v2.2.0` matching `package.json`, publish a GitHub Release.
4. Verify the package appears on npm; optionally configure OIDC trusted publishing afterward,
   then (optionally) enable `--provenance`.
- **Rollback**: the workflow only publishes on an explicit Release/dispatch, so reverting the
  workflow file disables automation; an erroneously published version can be `npm deprecate`d.

## Open Questions

- Enable OIDC trusted publishing immediately after the first publish, or stay token-only? (Deferred; tracked in #7.)
