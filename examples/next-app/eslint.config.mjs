import { moc } from '@moc-global/eslint-config';

// Zero-config: the Next stack is auto-detected from this project's `next`
// dependency and supersedes the React stack (Next = React + Next rules). The
// `@/*` path alias is read from tsconfig.json.
export default moc();
