export function between(n, a, b) {
  if (b < a) [a, b] = [b, a];
  return a <= n && n <= b;
}

export function clamp(n, a, b) {
  if (b < a) [a, b] = [b, a];
  if (n < a) return a;
  if (n > b) return b;
  return n;
}

export function nth(a, len) {
  if (a < 0) {
    return len + (a % len);
  }
  return a % len;
}
