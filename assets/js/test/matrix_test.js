// import Matrix from "../lib/matrix.js";
//
// function rand_int(from = 1, to = 7) {
//   return from + Math.floor(Math.random() * (to - from));
// }
//
// function equal_arrays(a, b) {
//   if (a.length != b.length) return false;
//   for (let i = 0; i < a.length; i++) {
//     if (a[i] != b[i]) return false;
//   }
//   return true;
// }
//
// class MatrixTest {
//   run() {
//     for (let t = 0; t < 20; t++) {
//       Object.getOwnPropertyNames(this.__proto__).forEach((p) => {
//         if (p.startsWith("test_")) {
//           if (!this[p]()) {
//             console.warn(`[FAILED] (${t}): MatrixTest.${p}`);
//           }
//         }
//       });
//     }
//   }
//
//   test_000() {
//     /* A = A */
//     const A = Matrix.random();
//     return A.eq(A);
//   }
//
//   test_001() {
//     /* clone */
//     const A = Matrix.random();
//     const B = A.clone();
//     return A.eq(B) && B.eq(A);
//   }
//
//   test_002() {
//     /* A + B = B + A */
//     const A = Matrix.random();
//     const B = Matrix.random(A.rows, A.cols);
//     const D = A.add(B);
//     const E = B.add(A);
//     return D.eq(E);
//   }
//
//   test_003() {
//     /* (A + B) + C = A + (B + C) */
//     const A = Matrix.random();
//     const B = Matrix.random(A.rows, A.cols);
//     const C = Matrix.random(A.rows, A.cols);
//     const D = A.add(B).add(C);
//     const E = A.add(B.add(C));
//     return D.eq(E);
//   }
//
//   test_004() {
//     /* (AB)C = A(BC) */
//     const A = Matrix.random();
//     const B = Matrix.random(A.cols);
//     const C = Matrix.random(B.cols);
//     const D = A.mul(B).mul(C);
//     const E = A.mul(B.mul(C));
//     return D.eq(E);
//   }
//
//   test_005() {
//     /* A(B + C) = AB + AC */
//     const A = Matrix.random();
//     const B = Matrix.random(A.cols);
//     const C = Matrix.random(B.rows, B.cols);
//     const D = A.mul(B.add(C));
//     const E = A.mul(B).add(A.mul(C));
//     return D.eq(E);
//   }
//
//   test_006() {
//     /* (B + C)A = BA + CA */
//     const A = Matrix.random();
//     const B = Matrix.random(rand_int(), A.rows);
//     const C = Matrix.random(B.rows, A.rows);
//     const D = B.add(C).mul(A);
//     const E = B.mul(A).add(C.mul(A));
//     return D.eq(E);
//   }
//
//   test_007() {
//     /* A(B - C) = AB - AC */
//     const A = Matrix.random();
//     const B = Matrix.random(A.cols);
//     const C = Matrix.random(B.rows, B.cols);
//     const D = A.mul(B.sub(C));
//     const E = A.mul(B).sub(A.mul(C));
//     return D.eq(E);
//   }
//
//   test_008() {
//     /* (B - C)A = BA - CA */
//     const A = Matrix.random();
//     const B = Matrix.random(rand_int(1, 5), A.rows);
//     const C = Matrix.random(B.rows, A.rows);
//     const D = B.sub(C).mul(A);
//     const E = B.mul(A).sub(C.mul(A));
//     return D.eq(E);
//   }
//
//   test_009() {
//     /* a(B + C) = aB + aC */
//     const a = rand_int();
//     const B = Matrix.random();
//     const C = Matrix.random(B.rows, B.cols);
//     const D = B.add(C).scale(a);
//     const E = B.scale(a).add(C.scale(a));
//     return D.eq(E);
//   }
//
//   test_010() {
//     /* a(B - C) = aB - aC */
//     const a = rand_int();
//     const B = Matrix.random();
//     const C = Matrix.random(B.rows, B.cols);
//     const D = B.sub(C).scale(a);
//     const E = B.scale(a).sub(C.scale(a));
//     return D.eq(E);
//   }
//
//   test_011() {
//     /* a(bC) = (ab)C */
//     const a = rand_int();
//     const b = rand_int();
//     const C = Matrix.random();
//     const D = C.scale(b).scale(a);
//     const E = C.scale(a * b);
//     return D.eq(E);
//   }
//
//   test_012() {
//     /* a(BC) = (aB)C = B(aC) */
//     const a = rand_int();
//     const B = Matrix.random();
//     const C = Matrix.random(B.cols);
//     const D = B.mul(C).scale(a);
//     const E = B.scale(a).mul(C);
//     const F = B.mul(C.scale(a));
//     return D.eq(E) && D.eq(F) && E.eq(F);
//   }
//
//   test_013() {
//     /* A - A = 0 */
//     const A = Matrix.random();
//     const Z = new Matrix(A.rows, A.cols);
//     const D = A.sub(A);
//     return D.eq(Z);
//   }
//
//   test_014() {
//     /* A + 0 = A */
//     const A = Matrix.random();
//     const Z = new Matrix(A.rows, A.cols);
//     const D = A.add(Z);
//     return D.eq(A);
//   }
//
//   test_015() {
//     /* A * 0 = 0 */
//     const A = Matrix.random();
//     const Z1 = new Matrix(A.cols, A.rows);
//     const Z2 = new Matrix(A.rows, Z1.cols);
//     const D = A.mul(Z1);
//     return D.eq(Z2);
//   }
//
//   test_016() {
//     /* I * I = I */
//     const I = Matrix.identity(rand_int());
//     const D = I.mul(I);
//     return D.eq(I);
//   }
//
//   test_017() {
//     /* A * I = A */
//     const dim = rand_int();
//     const A = Matrix.random(dim, dim);
//     const I = Matrix.identity(A.rows);
//     const D = A.mul(I);
//     const E = I.mul(A);
//     return D.eq(A) && E.eq(A);
//   }
//
//   test_018() {
//     /* T(T(A)) = A */
//     const dim = rand_int();
//     const A = Matrix.random(dim, dim);
//     const T = A.transpose();
//     return T.transpose().eq(A);
//   }
//
//   test_019() {
//     /* det(A) = det(T(A)) */
//     const dim = rand_int();
//     const A = Matrix.random(dim, dim);
//     return Matrix.scalar_eq(A.det(), A.transpose().det());
//   }
//
//   test_020() {
//     /* det(kA) = k^dim * det(A) */
//     const dim = rand_int();
//     const A = Matrix.random(dim, dim);
//     const k = rand_int();
//     return Matrix.scalar_eq(A.scale(k).det(), Math.pow(k, A.rows) * A.det());
//   }
//
//   test_021() {
//     /* det(AB) = det(A) * det(B) */
//     const dim = rand_int();
//     const A = Matrix.random(dim, dim);
//     const B = Matrix.random(dim, dim);
//     return Matrix.scalar_eq(A.mul(B).det(), A.det() * B.det());
//   }
//
//   test_022() {
//     /* swap row */
//     const A = Matrix.random();
//     const B = A.clone();
//     const r1 = rand_int(0, A.rows);
//     let r2 = 0;
//     while ((r2 = rand_int(0, A.rows) != r1));
//     B.swap_row(r1, r2);
//     return (
//       equal_arrays(A.get_row(r1), B.get_row(r2)) &&
//       equal_arrays(A.get_row(r2), B.get_row(r1))
//     );
//   }
//
//   test_023() {
//     /* scale row */
//     const A = Matrix.random();
//     const B = A.clone();
//     const r = rand_int(0, A.rows);
//     const s = rand_int();
//     B.scale_row(r, s);
//     return equal_arrays(
//       A.get_row(r).map((e) => e * s),
//       B.get_row(r),
//     );
//   }
//
//   test_024() {
//     /* add row */
//     const A = Matrix.random();
//     const B = A.clone();
//     const f = rand_int(0, A.rows);
//     const t = rand_int(0, A.rows);
//     const s = rand_int();
//     B.add_row(f, t, s);
//     for (let i = 0; i < B.cols; i++) {
//       if (B.get(t, i) != A.get(t, i) + A.get(f, i) * s) {
//         return false;
//       }
//     }
//     return true;
//   }
//
//   test_025() {
//     /* I^(-1) == I */
//     const A = Matrix.identity(rand_int(1, 5));
//     return A.eq(A.inv());
//   }
//
//   test_026() {
//     /* A * A^(-1) == I */
//     const dim = rand_int(2, 5);
//     const I = Matrix.identity(dim);
//     const A = Matrix.random(dim, dim);
//     const B = A.inv();
//     if (B) {
//       return A.mul(B).eq(I) && B.mul(A).eq(I);
//     }
//     return true;
//   }
//
//   test_027() {
//     /* det(A) = 1/det(A^(-1)) */
//     const dim = rand_int(2, 5);
//     const A = Matrix.random(dim, dim);
//     const B = A.inv();
//     if (B) {
//       return Matrix.scalar_eq(B.det() * A.det(), 1);
//     }
//     return true;
//   }
// }
//
// new MatrixTest().run();
