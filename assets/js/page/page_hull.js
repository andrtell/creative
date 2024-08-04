import Particle from "../lib/shape/particle";
import hull from "../lib/hull";

const elm = document.getElementById("canvas");
const rec = elm.getBoundingClientRect();
elm.height = rec.height;
elm.width = rec.width;
const ctx = elm.getContext("2d");

const h = rec.height;
const w = rec.width;

const NO_PARTICLES = 25;

const particles = [];

const x_min = w / 2 - w / 3;
const x_max = w / 2 + w / 3;
const y_min = h / 2 - h / 3;
const y_max = h / 2 + h / 3;

for (let i = 0; i < NO_PARTICLES; i++) {
  particles.push(
    Particle.make(
      x_min,
      y_min,
      x_max,
      y_max
    )
  );
}

let frq = null;

function animate(t) {
  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    p.tick();

    if (p.x < x_min || p.x > x_max) {
      p.v.x = -p.v.x;
    }

    if (p.y <= y_min || p.y >= y_max) {
      p.v.y = -p.v.y;
    }

    p.draw(ctx);
  }

  let the_hull = hull(particles);

  ctx.beginPath();

  ctx.moveTo(the_hull[0].x, the_hull[0].y);
  for (let i = 1; i < the_hull.length; i++) {
    ctx.lineTo(the_hull[i].x, the_hull[i].y);
  }

  ctx.closePath();

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#c77';
  ctx.stroke();

  frq = requestAnimationFrame(animate);
}

animate(0);
