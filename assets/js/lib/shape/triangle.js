import { random_integer } from "../util/random";

export default class Triangle {
  constructor(p0, p1, p2) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
  }

  draw(ctx) {
    ctx.beginPath();

    ctx.moveTo(this.p0.x, this.p0.y);
    ctx.lineTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);

    ctx.closePath();

    let r = random_integer(156, 250);
    let g = random_integer(156, 250);
    let b = random_integer(156, 250);

    ctx.fillStyle = `rgb(${r} ${g} ${b})`;
    ctx.fill();

    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  static from_vertex(v) {
    return new Triangle(v.prev().point, v.point, v.next().point);
  }
}
