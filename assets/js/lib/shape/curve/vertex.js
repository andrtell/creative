import Link from "../../data/list/link";

export default class Vertex extends Link {
  constructor(point) {
    super();
    this.point = point;
  }

  clone() {
    return new Vertex(this.point);
  }
}
