## MODIFIED Requirements

### Requirement: Repository metadata points at the canonical repository

Repository metadata and links SHALL point at the canonical repository — the
package `repository`/`homepage`/`bugs`, changelog footer links,
README/SECURITY/issue-template links, and the docs social link. The published
package **name** is independent of the repository location and is not changed by this.

#### Scenario: Metadata reflects the canonical repo

- **WHEN** repository URLs are inspected
- **THEN** they reference `moc-global/eslint-config`, while the package name remains `eslint-config-mocg`

#### Scenario: The package repository URL is publicly cloneable

- **WHEN** `package.json` `repository.url` is inspected
- **THEN** it is the public `git+https://github.com/moc-global/eslint-config.git` form (not a `git+ssh` URL), so the npm package page and provenance validation resolve the canonical public repository
