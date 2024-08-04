import Vector from "./vector";
import { area2 } from "../math";

const { abs } = Math;

export default class Point extends Vector {
  constructor(x, y) {
    super(x, y);
  }

  distance(p) {
    return this.clone().sub(p).norm();
  }

  compare_y(b) {
    if (this.y < b.y || (this.y == b.y && this.x > b.x)) return -1;
    if (this.y > this.y) return 1;
    return 0;
  }

  compare_angle(p0, b) {
    const area = area2(p0, this, b);

    if (area > 0) return -1;
    if (area < 0) return 1;

    let
      dx = abs(this.x - p0.x) - abs(b.x - p0.x),
      dy = abs(this.y - p0.y) - abs(b.y - p0.y);

    // 'this' is closer => sort as greater.
    if (dx < 0 || dy < 0) return 1;

    // b is closer => sort as lesser;
    if (dx > 0 || dy > 0) return -1;

    // same point
    return 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}
