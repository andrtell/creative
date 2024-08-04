export default function mulberry(s) {
  let x = s | 0;

  function next() {
    x = (x + 0x6d2b79f5) | 0;
    let t = Math.imul(x ^ (x >>> 15), 1 | x);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  function fork() {
    return mulberry(next() * 4294967296);
  }

  return {
    next,
    fork
  };
}
