import type { ReactNode } from 'react';

import Link from 'next/link';

import { Counter } from './components/Counter';

// Internal navigation uses `next/link`, satisfying @next/next/no-html-link-for-pages.
export default function HomePage(): ReactNode {
  return (
    <main>
      <h1>Tasks</h1>
      <Counter />
      <Link href="/about">About</Link>
    </main>
  );
}
