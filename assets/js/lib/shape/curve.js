import Line from "./line";
import List from "../data/list/list";
import Vertex from "./curve/vertex";

export default class Curve {
  constructor(points = []) {
    this._vertices = new List();
    if (points) {
      for (const p of points) {
        this._vertices.insert_last(new Vertex(p));
      }
    }
  }

  clone() {
    return new Curve().copy(this);
  }

  copy(other) {
    this._vertices = other._vertices.clone();

    return this;
  }

  vertices() {
    return this._vertices;
  }

  min() {
    let min;

    for (const v of this._vertices) {
      if (!min || v.point.compare_y(min.point) < 0) min = v;
    }

    return min;
  }

  is_intersecting_line(line, test_endpoints = true) {
    for (const v of this._vertices) {
      let
        p1 = v.point,
        p2 = v.next().point;

      if (
        test_endpoints ||
        !(
          p1.equal(line.p1) ||
          p1.equal(line.p2) ||
          p2.equal(line.p1) ||
          p2.equal(line.p2)
        )
      ) {
        if (line.is_intersecting_line(new Line(p1, p2))) {
          return v;
        }
      }
    }

    return false;
  }

  closest_point(to_point) {
    let distance = Number.MAX_VALUE;

    let
      p0 = null,
      v0 = null;

    for (const v of this._vertices) {
      const
        l = new Line(v.point, v.next().point),
        q = l.closest_point(to_point);

      if (distance < q.distance(to_point)) {
        p0 = q;
        v0 = v;
      }
    }

    return {
      vertex: v0,
      point: p0
    };
  }

  draw(ctx, color = 'black') {
    ctx.beginPath();

    const first = this.vertices().first();

    ctx.moveTo(first.point.x, first.point.y);

    let v = first.next();

    do {
      ctx.lineTo(v.point.x, v.point.y);
      v = v.next();
    } while (v != first);

    ctx.closePath();

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color;

    ctx.stroke();
  }
}
