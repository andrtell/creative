export function area2(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
}

export function left(a, b, c) {
  return area2(a, b, c) > 0;
}

export function right(a, b, c) {
  return area2(a, b, c) < 0;
}

export function collinear(a, b, c) {
  return area2(a, b, c) == 0;
}

export function left_on(a, b, c) {
  return area2(a, b, c) >= 0;
}

export function in_cone(a, b, c, point) {
  // convex
  if (left_on(b, c, a)) {
    return left(b, point, a) && left(point, b, c);
  }
  // not convex
  return !(left_on(b, point, c) && left_on(point, b, a));
}
