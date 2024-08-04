import { clamp, between } from "../util/number";
import { area2 } from "../math";

export default class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  is_intersecting_line(line) {
    const
      { p1, p2 } = this,
      a0 = area2(p1, p2, line.p1),
      a1 = area2(p1, p2, line.p2),
      a2 = area2(line.p1, line.p2, p1),
      a3 = area2(line.p1, line.p2, p2);

    if (a0 == 0 || a1 == 0 || a2 == 0 || a3 == 0) {
      return (
        this.is_interior_point(line.p1) ||
        this.is_interior_point(line.p2) ||
        line.is_interior_point(p1) ||
        line.is_interior_point(p2)
      );
    }

    return a0 > 0 != a1 > 0 && a2 > 0 != a3 > 0;
  }

  is_interior_point(point) {
    // assumes p1-point is collinear to p1-p2
    const { p1, p2 } = this;
    return p1.x == p2.x
      ? between(point.y, p1.y, p2.y) // vertical
      : between(point.x, p1.x, p2.x);
  }

  closest_point(to_point) {

    const
      { p1, p2 } = this,
      v0 = p2.sub(p1),
      v1 = to_point.sub(p1),
      s = clamp(v1.scalar_project(v0), 0, 1),
      proj = v0.times(s),
      p = p1.add(proj);

    return p;
  }
}
