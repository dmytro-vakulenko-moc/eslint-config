import type { ReactNode } from 'react';

import type { GetServerSideProps } from 'next';

interface LegacySsrProps {
  now: string;
}

// Pages Router page: `getServerSideProps` is exported alongside the default
// component. The Next stack allows this export name (Pages Router) too.
export const getServerSideProps: GetServerSideProps<LegacySsrProps> = () => Promise.resolve({ props: { now: new Date().toISOString() } });

export default function LegacySsr({ now }: Readonly<LegacySsrProps>): ReactNode {
  return <main>Rendered at {now}</main>;
}
