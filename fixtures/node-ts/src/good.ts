/**
 * Adds one to a finite number, or returns 0 for nullish input.
 * @param input - The value to increment.
 * @returns The incremented value, or 0.
 */
export function compute(input: number | null): number {
  if (input === null) {
    return 0;
  }

  return input + 1;
}
