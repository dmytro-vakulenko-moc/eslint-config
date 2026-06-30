## ADDED Requirements

### Requirement: Release is triggered by a published GitHub Release

A GitHub Actions workflow SHALL publish the package to npm when a GitHub Release
is published, and SHALL also be runnable manually for recovery. It SHALL NOT
publish on ordinary pushes or pull requests.

#### Scenario: Publishing a GitHub Release runs the workflow

- **WHEN** a maintainer publishes a GitHub Release in the repository
- **THEN** the release workflow runs and attempts to publish the package to npm

#### Scenario: Manual dispatch is available

- **WHEN** a maintainer triggers the workflow via `workflow_dispatch`
- **THEN** the workflow runs the same publish job

#### Scenario: Ordinary pushes do not publish

- **WHEN** a commit is pushed to a branch or a pull request is opened
- **THEN** the release workflow does not run

### Requirement: The release tag must match the package version

For a published GitHub Release, the workflow SHALL verify that the release tag
matches `package.json` `version` (allowing an optional leading `v`) and SHALL fail
before publishing on a mismatch, so a misnamed tag can never publish the wrong
version. A manual `workflow_dispatch` run SHALL skip this strict check and publish
the checked-out `package.json` version as-is (recovery path), and SHALL NOT derive
the version from the dispatched branch name.

#### Scenario: Matching tag passes the gate

- **WHEN** a Release is published with tag `v2.2.0` (or `2.2.0`) and `package.json` version is `2.2.0`
- **THEN** the version-gate step passes and the workflow proceeds to publish

#### Scenario: Mismatched tag fails the run

- **WHEN** a Release is published with tag `v2.3.0` but `package.json` version is `2.2.0`
- **THEN** the version-gate step emits an error and the workflow fails without publishing

#### Scenario: Manual dispatch publishes the package.json version

- **WHEN** the workflow is run via `workflow_dispatch`
- **THEN** the strict tag check is skipped and the version declared in `package.json` is published, regardless of the branch the run was dispatched from

### Requirement: Prereleases do not become the default install

The workflow SHALL publish a prerelease GitHub Release under a non-`latest` npm
dist-tag, so a prerelease never displaces the `latest` version that consumers
install by default. Stable releases and manual dispatch runs SHALL publish under
`latest`.

#### Scenario: Prerelease publishes under a side tag

- **WHEN** a GitHub Release marked as a prerelease is published
- **THEN** the package is published with a non-`latest` dist-tag (e.g. `next`)

#### Scenario: Stable release publishes under latest

- **WHEN** a stable (non-prerelease) Release is published, or the workflow is dispatched manually
- **THEN** the package is published under the `latest` dist-tag

### Requirement: Publishing authenticates with the NPM token over OIDC-ready permissions

The workflow SHALL publish with `npm publish --access public`, authenticating via
`NODE_AUTH_TOKEN` sourced from the `NPM_TOKEN` GitHub Actions **secret**, with
`actions/setup-node` configured for the npm registry. The job SHALL grant
`contents: read` and `id-token: write` so OIDC trusted publishing can be adopted
later without changing the workflow's permissions.

#### Scenario: Token-authenticated publish

- **WHEN** the publish step runs with the `NPM_TOKEN` secret available
- **THEN** `npm publish --access public` authenticates via `NODE_AUTH_TOKEN` and publishes the package

#### Scenario: OIDC-ready permissions are granted

- **WHEN** the workflow's permissions are inspected
- **THEN** the job declares `contents: read` and `id-token: write`

### Requirement: Installation in CI is build-correct and hook-free

The workflow SHALL install with `npm ci` on Node 24 and SHALL disable husky git
hooks (`HUSKY: "0"`) so the `prepare` lifecycle builds `dist/` without attempting
to install git hooks in CI. The package's existing `prepublishOnly` build SHALL
produce the published `dist/`; no separate build step is required, and no extra
lint/test gate is added (those run in the local pre-push hook).

#### Scenario: CI install does not fail on git hooks

- **WHEN** `npm ci` runs in the workflow with `HUSKY: "0"`
- **THEN** the `prepare` script builds `dist/` and does not fail trying to install git hooks

#### Scenario: The published tarball is built by the publish lifecycle

- **WHEN** the publish step runs
- **THEN** `prepublishOnly` cleans and rebuilds `dist/`, and the workflow adds no separate build or test step
