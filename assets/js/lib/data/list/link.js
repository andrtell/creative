export default class Link {
  constructor() {
    this._next = this;
    this._prev = this;
  }

  clone() {
    return new Link();
  }

  has_next() {
    return this._next != this;
  }

  next() {
    return this._next;
  }

  prev() {
    return this._prev;
  }
}
