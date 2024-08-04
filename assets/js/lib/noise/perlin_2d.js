import mulberry from "./pseudo/mulberry";
import { clamp } from "../util/number";

function mix(a, b, t) {
  return (1 - t) * a + t * b;
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function mk_hash(seed, domain = 256, range = 8) {
  const
    random = mulberry(seed),
    perm = [...Array(domain).keys()];

  for (let i = domain - 1; i > 0; i--) {
    const j = Math.floor(random.next() * i);
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }

  const shuff = perm.concat(perm);

  return function(x, y) {
    return shuff[x + shuff[y]] % range;
  }
}

const it = Math.cos(Math.PI / 4);

const grad2 = [
  [1, 0], [-1, 0], [0, 1], [0, -1],
  [it, it], [-it, it], [it, -it], [-it, -it],
];

function dot2(g, x, y) {
  return g[0] * x + g[1] * y;
}

export default function mk_perlin_2d(seed) {
  const hash = mk_hash(seed);

  function perlin_2d(x, y) {
    let
      X = Math.floor(x),
      Y = Math.floor(y);

    x = x - X;
    y = y - Y;

    X = X & 255;
    Y = Y & 255;

    const
      gi00 = hash(X, Y),
      gi01 = hash(X, Y + 1),
      gi10 = hash(X + 1, Y),
      gi11 = hash(X + 1, Y + 1);

    const
      n00 = dot2(grad2[gi00], x, y),
      n10 = dot2(grad2[gi10], x - 1, y),
      n01 = dot2(grad2[gi01], x, y - 1),
      n11 = dot2(grad2[gi11], x - 1, y - 1);

    const
      u = fade(x),
      v = fade(y);

    const
      nx0 = mix(n00, n10, u),
      nx1 = mix(n01, n11, u);

    const nxy = mix(nx0, nx1, v);

    // normalize to [0, 1]
    const norm = clamp(0.5 + nxy * 0.7, 0, 1)

    return norm;
  }

  return perlin_2d;
}
