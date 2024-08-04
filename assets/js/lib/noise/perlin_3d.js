import mulberry from "./pseudo/mulberry";
import { clamp } from "../util/number";

function mix(a, b, t) {
  return (1 - t) * a + t * b;
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function mk_hash(seed, domain = 256, range = 12) {
  const
    random = mulberry(seed),
    perm = [...Array(domain).keys()];

  for (let i = domain - 1; i > 0; i--) {
    const j = Math.floor(random.next() * i);
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }

  const shuff = perm.concat(perm).concat(perm);

  return function(x, y, z) {
    return shuff[x + shuff[y + shuff[z]]] % range;
  }
}

const grad3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];

function dot3(g, x, y, z) {
  return g[0] * x + g[1] * y + g[2] * z;
}

export default function mk_perlin(seed) {
  const hash = mk_hash(seed);

  function perlin_3d(x, y, z) {
    let
      X = Math.floor(x),
      Y = Math.floor(y),
      Z = Math.floor(z);

    x = x - X;
    y = y - Y;
    z = z - Z;

    X = X & 255;
    Y = Y & 255;
    Z = Z & 255;

    const
      gi000 = hash(X, Y, Z),
      gi001 = hash(X, Y, Z + 1),
      gi010 = hash(X, Y + 1, Z),
      gi011 = hash(X, Y + 1, Z + 1),
      gi100 = hash(X + 1, Y, Z),
      gi101 = hash(X + 1, Y, Z + 1),
      gi110 = hash(X + 1, Y + 1, Z),
      gi111 = hash(X + 1, Y + 1, Z + 1);

    const
      n000 = dot3(grad3[gi000], x, y, z),
      n100 = dot3(grad3[gi100], x - 1, y, z),
      n010 = dot3(grad3[gi010], x, y - 1, z),
      n110 = dot3(grad3[gi110], x - 1, y - 1, z),
      n001 = dot3(grad3[gi001], x, y, z - 1),
      n101 = dot3(grad3[gi101], x - 1, y, z - 1),
      n011 = dot3(grad3[gi011], x, y - 1, z - 1),
      n111 = dot3(grad3[gi111], x - 1, y - 1, z - 1);

    const
      u = fade(x),
      v = fade(y),
      w = fade(z);

    const
      nx00 = mix(n000, n100, u),
      nx01 = mix(n001, n101, u),
      nx10 = mix(n010, n110, u),
      nx11 = mix(n011, n111, u);

    const
      nxy0 = mix(nx00, nx10, v),
      nxy1 = mix(nx01, nx11, v);

    const nxyz = mix(nxy0, nxy1, w);

    // normalize to [0, 1]
    const norm = clamp(0.5 + nxyz * 0.5, 0, 1);

    return norm;
  }

  return perlin_3d;
}
