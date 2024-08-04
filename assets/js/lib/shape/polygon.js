import Curve from "./curve";
import Line from "./line";
import Vector from "./vector";
import Point from "./point";

import { clamp } from "../util/number";

import { left, in_cone } from "../math";

export default class Polygon extends Curve {
  clone() {
    return new Polygon().copy(this);
  }

  is_ccw() {
    const
      min = this.min(),
      [a, b, c] = [min.prev().point, min.point, min.next().point];

    return left(a, b, c);
  }

  is_diagonal(v0, v1) {
    const
      [a, p0, c] = [v0.prev().point, v0.point, v0.next().point],
      [d, p1, f] = [v1.prev().point, v1.point, v1.next().point];

    return (
      in_cone(a, p0, c, p1) &&
      in_cone(d, p1, f, p0) &&
      !this.is_intersecting_line(new Line(p0, p1), false)
    );
  }

  static make(w, h, n = 9) {
    let
      unit = new Vector(0, 1),
      rad0 = Math.random() * 2 * Math.PI,
      step = (2 * Math.PI) / n,
      norm = Math.min(w, h) / 2;

    const points = [];

    for (let rad = rad0; rad < Math.PI * 2 + rad0 - step; rad += step) {

      let
        v2 = unit.clone().rotate(rad).times(norm * clamp(Math.random(), 0.3, 0.7)),
        x = Math.floor(w / 2 + v2.x),
        y = Math.floor(h / 2 + v2.y);

      points.push(new Point(x, y));
    }

    return new Polygon(points);
  }
}
