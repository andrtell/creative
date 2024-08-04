import Point from "./point";
import Vector from "./vector";

import { random_integer } from "../util/random";

export default class Particle extends Point {
  constructor(x, y, v, a) {
    super(x, y);
    this.v = v;
    this.a = a;
  }

  tick() {
    this.add(this.v);
    this.v.add(this.a);

    return this;
  }

  static make(x_min, y_min, x_max, y_max) {
    return new Particle(
      random_integer(x_min, x_max),
      random_integer(y_min, y_max),
      new Vector(1, 0).rotate(Math.PI * 2 * Math.random()),
      new Vector(0, 0),
    );
  }
}
