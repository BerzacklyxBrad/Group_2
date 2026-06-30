// MEMBER 5: Conductor dashboard, camera feed, metrics, and game-over screen.

function drawLeftPanel() {
  ctx.fillStyle = C.panel;
  ctx.fillRect(0, 0, LEFT_PANEL, BASE_H);
  ctx.fillStyle = C.line;
  ctx.fillRect(LEFT_PANEL - 2, 0, 2, BASE_H);

  text("CONTROL PANEL", 22, 24, 28, C.white, "700");
  text("CONDUCTOR MODE", 22, 58, 18, C.muted);
  metric(24, 112, "Speed", `${state.speed.toFixed(1).padStart(5, "0")} px/s`, state.braking ? C.red : C.green);
  metric(24, 186, "Distance", `${state.distance.toFixed(1).padStart(6, "0")} m`, C.cyan);
  metric(24, 260, "Time", formatTime(state.elapsed), C.amber);
  metric(24, 334, "Lane", lanes[state.lane], C.purple);

  text("Controls", 24, 438, 21, C.white);
  [
    ["SPACE", "Brake / stop"],
    ["A / LEFT", "Change left"],
    ["D / RIGHT", "Change right"],
    ["Q / ESC", "End session"]
  ].forEach(([key, action], i) => {
    const y = 480 + i * 42;
    roundedRect(24, y, 92, 28, 5, "#0e1218", C.line);
    text(key, 34, y + 7, 15, C.white);
    text(action, 130, y + 5, 18, C.muted);
  });

  const detected = detectedObstacles().length;
  roundedRect(24, 690, LEFT_PANEL - 48, 40, 8, detected ? C.red : C.green);
  text(detected ? "ALERT: OBSTACLE" : "SYSTEM NORMAL", 38, 701, 18, C.black, "700");
}

function metric(x, y, label, value, color) {
  roundedRect(x, y, LEFT_PANEL - 48, 54, 8, C.panel2, C.line);
  text(label.toUpperCase(), x + 12, y + 8, 15, C.muted);
  text(value, x + 12, y + 27, 21, color);
}

function drawRightPanel() {
  ctx.fillStyle = C.panel;
  ctx.fillRect(ROAD_RIGHT, 0, RIGHT_PANEL, BASE_H);
  ctx.fillStyle = C.line;
  ctx.fillRect(ROAD_RIGHT, 0, 2, BASE_H);

  const x = ROAD_RIGHT + 24;
  text("CAMERA FEED", x, 24, 28, C.white, "700");
  text("FORWARD OBSTACLE VIEW", x, 58, 18, C.muted);
  drawCameraPreview(x, 102);
  drawDetectionList(x, 382);
  drawStats(x, 642);
}

function drawCameraPreview(x, y) {
  roundedRect(x, y, RIGHT_PANEL - 48, 230, 8, "#0b0f14", C.line);
  const inner = { x: x + 14, y: y + 12, w: RIGHT_PANEL - 76, h: 206 };
  roundedRect(inner.x, inner.y, inner.w, inner.h, 4, "#1e2227");

  ctx.fillStyle = "#e1be38";
  ctx.fillRect(inner.x + inner.w / 2 - 1, inner.y, 2, inner.h);
  ctx.fillStyle = C.white;
  ctx.fillRect(inner.x + 8, inner.y, 2, inner.h);
  ctx.fillRect(inner.x + inner.w - 10, inner.y, 2, inner.h);

  for (const obstacle of detectedObstacles()) {
    const distance = Math.max(1, MATATU_Y - (obstacle.y + obstacle.h));
    const normalized = Math.max(0, Math.min(1, distance / DETECTION_DISTANCE));
    const markerY = inner.y + inner.h - normalized * inner.h;

    if (obstacle.kind === "VEHICLE") {
      const laneX = inner.x + (obstacle.lane + 0.5) * inner.w / LANE_COUNT;
      roundedRect(laneX - 19, markerY - 13, 38, 26, 5, C.red);
    } else {
      roundedRect(inner.x + 14, markerY - 10, inner.w - 28, 20, 3, obstacle.cleared ? C.green : C.white);
    }
  }

  circle(x + RIGHT_PANEL - 66, y + 18, 6, state.alertFlash > 0 ? C.red : C.green);
  text("LIVE", x + RIGHT_PANEL - 114, y + 11, 15, state.alertFlash > 0 ? C.red : C.green);
}

function drawDetectionList(x, y) {
  const detected = detectedObstacles();
  text("Detected Obstacles", x, y, 21, C.white);
  text(`${detected.length} in camera range`, x, y + 30, 18, C.muted);

  if (!detected.length) {
    roundedRect(x, y + 70, RIGHT_PANEL - 48, 58, 8, C.panel2);
    text("Road clear", x + 16, y + 89, 18, C.green);
    return;
  }

  detected.forEach((obstacle, i) => {
    const rowY = y + 66 + i * 48;
    roundedRect(x, rowY, RIGHT_PANEL - 48, 38, 7, C.panel2, i === 0 ? C.red : C.line);
    const distance = Math.max(0, MATATU_Y - (obstacle.y + obstacle.h));
    const lane = obstacle.lane === null ? "ALL" : lanes[obstacle.lane];
    const status = obstacle.cleared ? "  OK" : `${distance.toFixed(0).padStart(4)}px`;
    text(`${obstacle.kind.padEnd(8)} ${lane.padEnd(6)} ${status}`, x + 10, rowY + 11, 15, C.white);
  });
}

function drawStats(x, y) {
  text("Session Metrics", x, y, 21, C.white);
  [
    ["Avoided", String(state.avoided)],
    ["Final Speed", state.speed.toFixed(1)],
    ["Mode", state.braking ? "BRAKING" : "AUTO"]
  ].forEach(([label, value], i) => {
    const yy = y + 42 + i * 34;
    text(label, x, yy, 18, C.muted);
    text(value, x + 170, yy, 18, C.white);
  });
}

function drawGameOver() {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0, 0, BASE_W, BASE_H);

  const box = { x: 320, y: 235, w: 560, h: 330 };
  roundedRect(box.x, box.y, box.w, box.h, 12, "#181e26", C.red, 3);
  text("COLLISION DETECTED", box.x + box.w / 2, box.y + 36, 44, C.red, "700", "center");

  const object = state.collision ? state.collision.kind : "UNKNOWN";
  [
    `Impact object: ${object}`,
    `Distance traveled: ${state.distance.toFixed(1)} m`,
    `Time survived: ${formatTime(state.elapsed)}`,
    `Obstacles avoided: ${state.avoided}`,
    `Final speed: ${state.speed.toFixed(1)} px/s`
  ].forEach((line, i) => {
    text(line, box.x + 74, box.y + 112 + i * 34, 21, C.white);
  });

  text("Press SPACE to restart", box.x + box.w / 2, box.y + box.h - 52, 21, C.amber, "400", "center");
}
