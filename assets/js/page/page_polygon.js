import Triangle from "../lib/shape/triangle";
import Polygon from "../lib/shape/polygon";
import triangulate from "../lib/triangulate";
import { random_integer } from "../lib/util/random";

const elm = document.getElementById("canvas");
const rec = elm.getBoundingClientRect();
elm.height = rec.height;
elm.width = rec.width;
const ctx = elm.getContext("2d");

const h = rec.height;
const w = rec.width;

const p = Polygon.make(w, h, 13);

const ts = [];
triangulate(p, (v) => ts.push(Triangle.from_vertex(v)));

function draw() {
  ctx.clearRect(0, 0, rec.width, rec.height);
  ts.forEach((t) => t.draw(ctx));
  p.draw(ctx);
}

draw();
