# nest-app-example

A small NestJS + TypeScript service that consumes
[`@moc-global/eslint-config`](../../README.md): decorators, dependency
injection, class-validator DTOs, a `@/*` path alias, and centralized
configuration — all under type-aware linting.

## Layout

```
src/
  config/        environment-backed configuration (the only place process.env is read)
  common/        cross-cutting providers (logging interceptor)
  tasks/         tasks feature module (controller, service, DTOs, entity)
  users/         users feature module (controller, service, DTOs, entity)
  health/        liveness controller
  app.module.ts  root module
  main.ts        bootstrap
```

## Usage

```bash
npm install
npm run lint
npm run typecheck
```

The NestJS stack replaces the Node base internally and layers on
`@darraghor/eslint-plugin-nestjs-typed`. See `eslint.config.mjs`:

```js
import { moc } from '@moc-global/eslint-config';

export default moc(); // detects NestJS from @nestjs/core; reads the @/* alias
```
