export default class List {
  constructor() {
    this._head = null;
    this._size = 0;
  }

  clone() {
    return new List().copy(this);
  }

  copy(other) {
    if (other._head) {
      this._head = other._head.clone();

      let th = this._head;
      let oh = other._head.next();

      while (oh != other._head) {
        this.insert_after(th, oh.clone());
        th = th.next();
        oh = oh.next();
      }
    }

    this._size = other._size;

    return this;
  }

  *[Symbol.iterator]() {
    if (!this._head) return;

    let th = this._head;

    do {
      yield th;
      th = th.next();
    } while (th != this._head);

    return;
  }

  size() {
    return this._size;
  }

  empty() {
    return this.size() < 1;
  }

  first() {
    return this._head;
  }

  remove(link) {
    if (link == this._head) {
      this._head = this._head.has_next() ? this._head.next() : null;
    }

    link._prev._next = link._next;
    link._next._prev = link._prev;

    link._next = null;
    link._prev = null;

    this._size--;
  }

  insert_after(anchor, link) {
    if (anchor) {
      link._next = anchor._next;
      link._prev = anchor;

      anchor._next._prev = link;
      anchor._next = link;

      this._size++;
    }

    return this;
  }

  insert_before(anchor, link) {
    if (anchor) {
      link._next = anchor;
      link._prev = anchor._prev;
      anchor._prev._next = link;
      anchor._prev = link;
      this._size++;
    }

    return this;
  }

  insert_last(link) {
    if (this._head) {
      this.insert_before(this._head, link);
    } else {
      this._head = link;
      this._size = 1;
    }

    return this;
  }

  insert_first(link) {
    if (this._head) {
      this.insert_before(this._head, link);
    }

    this._head = link;
    this._size++;

    return this;
  }

  reverse() {
    if (this._head) {
      let head = this._head;

      do {
        let tmp = head._prev;
        head._prev = head._next;
        head._next = tmp;
        head = head._prev;
      } while (head != this._head);

      this._head = this._head.next();
    }

    return this;
  }

  find(t) {
    let n = 0;
    for (const v of this) {
      if (t(v, n)) return v;
      n++;
    }
    return null;
  }
}
