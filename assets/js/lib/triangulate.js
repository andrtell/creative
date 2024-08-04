export default function triangulate(poly, cb) {
  poly = poly.clone();

  if (!poly.is_ccw()) poly.vertices().reverse();

  for (const v of poly.vertices()) {
    v.ear = poly.is_diagonal(v.prev(), v.next());
  }

  const ear = () => poly.vertices().find((v) => v.ear);

  for (let v = ear(); v && poly.vertices().size() > 3; v = ear()) {
    cb(v);

    v.prev().ear = poly.is_diagonal(v.prev().prev(), v.next());
    v.next().ear = poly.is_diagonal(v.next().next(), v.prev());

    poly.vertices().remove(v);
  }

  cb(poly.vertices().first());
}
