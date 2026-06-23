import { NextResponse } from 'next/server';

interface HealthResponse {
  status: string;
}

// App Router Route Handler: an exported `GET` with no JSDoc. The Next stack
// turns off jsdoc/require-jsdoc for route.ts entry files.
export function GET(): NextResponse<HealthResponse> {
  return NextResponse.json({ status: 'ok' });
}
