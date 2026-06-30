// MEMBER 4: Road, matatu, obstacle, and canvas rendering.

function drawSimulation() {
  const sx = window.innerWidth / BASE_W;
  const sy = window.innerHeight / BASE_H;
  const scale = Math.min(sx, sy);
  const ox = (window.innerWidth - BASE_W * scale) / 2;
  const oy = (window.innerHeight - BASE_H * scale) / 2;

  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);

  drawRoad();
  for (const obstacle of state.obstacles) drawObstacle(obstacle);
  drawMatatu();
  drawLeftPanel();
  drawRightPanel();
  if (state.gameOver) drawGameOver();

  ctx.restore();
}

function drawRoad() {
  ctx.fillStyle = C.roadShadow;
  ctx.fillRect(ROAD_X - 10, 0, ROAD_W + 20, BASE_H);
  ctx.fillStyle = C.road;
  ctx.fillRect(ROAD_X, 0, ROAD_W, BASE_H);

  ctx.fillStyle = C.white;
  ctx.fillRect(ROAD_X + 12, 0, 5, BASE_H);
  ctx.fillRect(ROAD_RIGHT - 16, 0, 5, BASE_H);

  ctx.fillStyle = C.yellow;
  for (let laneLine = 1; laneLine < LANE_COUNT; laneLine++) {
    const x = ROAD_X + laneLine * LANE_W - 3;
    for (let y = -80 + state.roadOffset; y < BASE_H; y += 80) {
      roundedRect(x, y, 6, 44, 3, C.yellow);
    }
  }

  roundedRect(ROAD_X + 30, BASE_H - 34, ROAD_W - 60, 26, 13, "#20252b");
  text("AUTONOMOUS LANE CAMERA SIMULATION", ROAD_X + ROAD_W / 2, BASE_H - 27, 15, C.muted, "400", "center");
}

function drawObstacle(obstacle) {
  if (obstacle.kind === "VEHICLE") {
    roundedRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h, 7, obstacle.color, "#821e1e", 2);
    roundedRect(obstacle.x + 12, obstacle.y + 9, obstacle.w - 24, 17, 3, "#96dceb");
    roundedRect(obstacle.x + 15, obstacle.y + 36, 18, 12, 2, "#ebf5ff");
    roundedRect(obstacle.x + obstacle.w - 33, obstacle.y + 36, 18, 12, 2, "#ebf5ff");
    circle(obstacle.x + 13, obstacle.y + obstacle.h - 10, 8, C.black);
    circle(obstacle.x + obstacle.w - 13, obstacle.y + obstacle.h - 10, 8, C.black);
    if (obstacle.detected) roundedRect(obstacle.x - 5, obstacle.y - 5, obstacle.w + 10, obstacle.h + 10, 8, null, C.red, 3);
    return;
  }

  roundedRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h, 2, "#2a2d31");
  for (let x = obstacle.x + 12; x < obstacle.x + obstacle.w - 12; x += 44) {
    roundedRect(x, obstacle.y + 9, 28, obstacle.h - 18, 3, C.white);
  }
  roundedRect(obstacle.x + obstacle.w / 2 - 82, obstacle.y + obstacle.h / 2 - 14, 164, 28, 4, C.white);
  text(obstacle.cleared ? "CLEARED" : "ZEBRA CROSSING", obstacle.x + obstacle.w / 2, obstacle.y + obstacle.h / 2 - 8, 15, C.black, "700", "center");

  if (obstacle.cleared) {
    roundedRect(obstacle.x - 1, obstacle.y - 3, obstacle.w + 2, obstacle.h + 6, 4, null, C.green, 3);
  } else if (obstacle.detected) {
    roundedRect(obstacle.x - 1, obstacle.y - 3, obstacle.w + 2, obstacle.h + 6, 4, null, C.red, 3);
  }
}

function drawMatatu() {
  const matatu = matatuRect();
  roundedRect(matatu.x + 8, matatu.y + 10, matatu.w, matatu.h, 12, "rgba(0,0,0,0.6)");
  roundedRect(matatu.x, matatu.y, matatu.w, matatu.h, 12, C.matatuYellow, "#8c680a", 3);
  roundedRect(matatu.x + 10, matatu.y + 14, matatu.w - 20, 38, 8, C.matatuBlue);
  roundedRect(matatu.x + 17, matatu.y + 20, matatu.w - 34, 26, 5, C.cyan);

  for (let i = 0; i < 3; i++) {
    roundedRect(matatu.x + 12 + i * 22, matatu.y + 62, 16, 18, 3, "#a6e5ee");
  }

  roundedRect(matatu.x + 16, matatu.y + matatu.h - 28, 18, 10, 3, "#ffee75");
  roundedRect(matatu.x + matatu.w - 34, matatu.y + matatu.h - 28, 18, 10, 3, "#ffee75");
  circle(matatu.x + 14, matatu.y + 34, 8, C.black);
  circle(matatu.x + matatu.w - 14, matatu.y + 34, 8, C.black);
  circle(matatu.x + 14, matatu.y + matatu.h - 24, 8, C.black);
  circle(matatu.x + matatu.w - 14, matatu.y + matatu.h - 24, 8, C.black);

  roundedRect(matatu.x, matatu.y - 16, matatu.w, 8, 4, state.braking ? C.red : C.green);
  text("ISUZU PSV", matatu.x + matatu.w / 2, matatu.y + 94, 15, C.black, "700", "center");
}
