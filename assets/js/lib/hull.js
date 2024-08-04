import Heap from "./data/heap/heap";
import Stack from "./data/stack/stack";

import { left, collinear } from "./math";

export default function hull(points) {
  const heap = Heap.from_array(points, (a, b) => a.compare_y(b));

  const p0 = heap.remove();

  heap._compare = (a, b) => a.compare_angle(p0, b);
  heap.sort();

  const p1 = heap.remove();

  const stack = new Stack();

  stack.push(p0);
  stack.push(p1);

  while (!heap.empty() && stack.size() >= 2) {
    let
      e1 = stack.peek(1),
      e2 = stack.peek();

    if (left(e1, e2, heap.min())) {
      let p = heap.remove();
      while (!heap.empty() && collinear(p0, p, heap.min())) heap.remove();
      stack.push(p);
    } else {
      stack.pop();
    }
  }

  return stack.to_array();
}
