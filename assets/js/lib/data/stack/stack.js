import { nth } from "../../util/array";

export default class Stack {
  constructor(data = []) {
    this._data = data;
  }

  static from_array(arr) {
    return new Stack([...arr]);
  }

  clone() {
    return new Stack([...this._data]);
  }

  to_array() {
    return [...this._data];
  }

  size() {
    return this._data.length;
  }

  push(val) {
    this._data.push(val);
  }

  pop() {
    return this._data.pop();
  }

  peek(n = 0) {
    if (0 <= n && n < this.size()) {
      return this._data[this._data.length - 1 - n];
    }
    throw Error("Bad peek, out of bounds");
  }
}
