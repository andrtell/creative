import mk_perlin from "../lib/noise/perlin_2d";

perlin0 = mk_perlin(Math.random() * 4111);

const can = document.getElementById("canvas");
const bcr = can.getBoundingClientRect();
can.height = bcr.height;
can.width = bcr.width;
const ctx = can.getContext("2d");
const dat = ctx.createImageData(bcr.width, bcr.height);

const freq0 = Math.PI * 1 / 50;

for (let x = 0; x < can.width; x++) {
  for (let y = 0; y < can.height; y++) {

    const v0 = perlin0(x * freq0, y * freq0);

    let idx = (x + y * dat.width) * 4;

    dat.data[idx + 0] = Math.trunc(v0 * 255);
    dat.data[idx + 1] = Math.trunc(v0 * 255);
    dat.data[idx + 2] = Math.trunc(v0 * 255);
    dat.data[idx + 3] = 255;
  }
}

ctx.putImageData(dat, 0, 0);
