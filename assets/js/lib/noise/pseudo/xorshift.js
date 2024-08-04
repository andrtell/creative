export default function xorshift(seed) {
  let x = seed;

  function next() {
    x = x ^ (x << 13);
    x = x ^ (x >> 17);
    x = x ^ (x << 5);

    return (x >>> 0) / 4294967296;
  };

  function fork() {
    return xorshift(next() * 4294967296, t + 1);
  }

  return {
    next,
    fork
  };
}
