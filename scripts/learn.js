function displayMsg(msgText) {
  const html = document.querySelector("html");
  const panel = document.createElement("div");

  const text = document.createElement("p");
  text.textContent = msgText;
  panel.appendChild(text);

  const btn = document.createElement("button");
  btn.textContent = "delete";
  btn.onclick = () => {
    panel.parentNode.removeChild(panel);
  };
  panel.appendChild(btn);
  html.appendChild(panel);
}

//displayMsg("this is a new panel");

const canvas = document.querySelector("canvas");

function random(i) {
  return Math.floor(Math.random() * i);
}


const WIDTH = document.documentElement.clientWidth;
const HEIGHT = document.documentElement.clientHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;


const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  return (
    "rgb(" +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ")"
  );
}

class Ball {
  x;
  y;
  vx;
  vy;
  size;
  color;

  constructor(x, y, vx, vy, size, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy= vy;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.vx = -this.vx;
    }

    if (this.x - this.size <= 0) {
      this.vx = -this.vx;
    }

    if (this.y + this.size >= height) {
      this.vy = -this.vy;
    }

    if (this.y - this.size <= 0) {
      this.vy = -this.vy;
    }

    this.x += this.vx;
    this.y += this.vy;
  }
}

const num_balls = 100;
const balls = [];
for (let i = 0; i < num_balls; i++) {
  let size = random(10, 20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    size,
    randomColor(),
  );
  balls.push(ball);
}

function loop() {
    
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }

  requestAnimationFrame(loop);
}

loop();
