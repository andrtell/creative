export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  copy(other) {
    this.x = other.x;
    this.y = other.y;

    return this;
  }

  // Query

  is_zero() {
    return this.x == 0 && this.y == 0;
  }

  equal(v) {
    return this.x == v.x && this.y == v.y;
  }

  dot_product(v) {
    return this.x * v.x + this.y * v.y;
  }

  norm() {
    return Math.sqrt(this.dot_product(this));
  }

  // Update

  times(s) {
    this.x *= s;
    this.y *= s;

    return this;
  }

  add(v) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;

    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  normalize() {
    let norm = this.norm();

    this.x *= 1 / norm;
    this.y *= 1 / norm;

    return this;
  }

  rotate(rad) {
    const
      c = Math.cos(rad),
      s = Math.sin(rad),
      x = this.x * c - this.y * s,
      y = this.x * s + this.y * c;

    this.x = x;
    this.y = y;

    return this;
  }

  flip_x() {
    this.x = -this.x;
  }

  flip_y() {
    this.y = -this.y;
  }

  // Make

  project(v) {
    const s = this.scalar_project(v);

    return v.clone().times(s);
  }

  reject(v) {
    const proj = this.project(v);

    return this.clone().sub(proj);
  }

  scalar_project(v) {
    if (v.is_zero()) return 0;

    const v_dot_2 = v.dot_product(v);

    return this.dot_product(v) / v_dot_2;
  }
}
