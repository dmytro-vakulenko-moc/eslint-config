// This file deliberately violates several rules. The integration test asserts
// that the config reports them. Do not "fix" it.
import { readFileSync } from 'node:fs';

export function compute(input) {
  var total = 0;
  const sameAsTotal = input == total;

  if (sameAsTotal) {
    return total;
  }

  total = total + 1;

  return total;
}
