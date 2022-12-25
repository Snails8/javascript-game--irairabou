const width = 300;
const height = 300;

const init = () => {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
}

window.onload = () => {
  init();
}