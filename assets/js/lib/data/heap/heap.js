import { swap, write } from "../../util/array";
import { compare_js } from "../../util/any";

function half(n) {
  return Math.floor(n / 2);
}

export default class Heap {
  constructor(compare = compare_js) {
    this._tree = [null];
    this._compare = compare;
  }

  static from_array(arr, compare = compare_js) {
    const heap = new Heap(compare);
    write(heap._tree, arr, 1);
    heap.sort();

    return heap;
  }

  clone() {
    return new Heap([...this._tree], this._compare);
  }

  to_array() {
    const arr = [...this._tree];
    swap(arr, 0, arr.length - 1);
    arr.pop();

    return arr;
  }

  sort() {
    for (let i = half(this.size()); i >= 1; i--) {
      this.bubble_down(i);
    }
  }

  *[Symbol.iterator]() {
    const heap = this.clone();

    while (!heap.empty()) {
      yield heap.remove();
    }

    return this;
  }

  size() {
    return this._tree.length - 1;
  }

  empty() {
    return this.size() < 1;
  }

  min() {
    return this.empty() ? null : this._tree[1];
  }

  add(value) {
    this._tree.push(value);
    this.bubble_up(this.size());
  }

  remove() {
    if (this.empty()) return null;
    const min = this._tree[1];
    swap(this._tree, 1, this._tree.length - 1);
    this._tree.pop();
    this.bubble_down(1);

    return min;
  }

  bubble_up(ci) {
    if (this.size() < 2) return;
    let pi = half(ci);
    while (pi > 0 && this._compare(this._tree[ci], this._tree[pi]) < 0) {
      swap(this._tree, pi, ci);
      ci = pi;
      pi = half(ci);
    }
  }

  bubble_down(pi) {
    const l = this._tree.length;

    while (true) {
      let mi = pi;
      const c0 = 2 * pi;

      if (c0 < l) {
        mi = this._compare(this._tree[c0], this._tree[mi]) < 0 ? c0 : mi;

        const c1 = c0 + 1;

        if (c1 < l) {
          mi = this._compare(this._tree[c1], this._tree[mi]) < 0 ? c1 : mi;
        }
      }

      if (pi == mi) break; // parent is min or leaf.

      swap(this._tree, pi, mi);
      pi = mi;
    }
  }
}
