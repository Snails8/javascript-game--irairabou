const width = 300;
const height = 300;
const pointNumber = 10;
const lineWidth = 10;

const init = () => {    
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  
  const message = document.createElement("span");
  document.body.appendChild(message);
//   message.innerHTML = "<br>test";
  
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  
  // 曲線描写
  let lastX = width * 0.05;
  let interval = (width * 0.9) / pointNumber;
  let lastY = (Math.random() * 0.5 + 0.25) * height;
  let lastCpy = lastY + (Math.random() * 2 - 1) * 0.25

  const startX = lastX;
  const startY = lastY;

  ctx.moveTo(lastX, lastY);
  for (let i = 0; i < pointNumber; i++) {
      let cp1x = lastX + interval / 3;
      let cp1y = lastY + (lastY - lastCpy);
      let x = lastX + interval;
      let y = (Math.random() * 0.5 + 0.25) * height;
      let cp2x = lastX + (interval / 3) * 2;
      let cp2y = y + (Math.random() * 2 - 1) * 0.25 * height;
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      lastX = x;
      lastY = y;
      lastCpy = cp2y;
  }
  ctx.strokeStyle = "#ff0";
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(startX, startY, lineWidth / 2 * 1.5, 0, Math.PI * 2);
  ctx.fillStyle = "#f00";
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(lastX, lastY, lineWidth / 2 * 1.5, 0, Math.PI * 2);
  ctx.fillStyle = "#0ff";
  ctx.fill();
  
  // タイマーの描写
  let isInGame = false;
  let isGameOver = false;
  canvas.onpointermove = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const data = ctx.getImageData(x, y, 1, 1).data;
    if (!isInGame) {
        if (data[0] === 252 && data[1] === 0 && data[2] === 0) {
            isInGame = true;
            const startTime = Date.now();
            const tick = () => {
                requestAnimation(tick);
                if (!isGameOver) {
                  const elaspedTime = Date.now() - startTime;
                  message.innerHTML = `<br>${(elaspedTime /1000).toFixed(3)}`   
                }
            }
            tick();
        }
    }
  }
}

window.onload = () => {
  init();
}