'use client';

import { type ReactNode, useState } from 'react';

// A client component exercising the React hooks rules under the Next stack.
export function Counter(): ReactNode {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
      type="button"
    >
      Count: {count}
    </button>
  );
}
