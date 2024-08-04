export function swap(a, i, j) {
  const tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}

export function nth(a, len) {
  // assume len > 0
  if (a < 0) {
    return len + (a % len);
  }
  return a % len;
}

export function write(dst, src, start = 0) {
  for (let i = 0; i < src.length; i++) {
    dst[i + start] = src[i];
  }
}

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
