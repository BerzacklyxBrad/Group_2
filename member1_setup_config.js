// MEMBER 1: Project setup, canvas, constants, colors, and shared drawing helpers.

const canvas = document.getElementById("sim");
const ctx = canvas.getContext("2d");

const BASE_W = 1200;
const BASE_H = 800;
const LEFT_PANEL = 260;
const RIGHT_PANEL = 300;
const ROAD_X = LEFT_PANEL;
const ROAD_W = BASE_W - LEFT_PANEL - RIGHT_PANEL;
const ROAD_RIGHT = ROAD_X + ROAD_W;
const LANE_COUNT = 3;
const LANE_W = ROAD_W / LANE_COUNT;

const MATATU_W = 86;
const MATATU_H = 122;
const MATATU_Y = BASE_H - 180;

const BASE_SPEED = 200;
const BRAKE_DECEL = 300;
const RECOVERY_ACCEL = 70;
const SPAWN_INTERVAL = 2.0;
const DETECTION_DISTANCE = 300;
const LANE_CHANGE_COOLDOWN = 120;
const CROSSING_CLEAR_SPEED = 12;
const CROSSING_CLEAR_DISTANCE = 90;

const C = {
  bg: "#080a0d",
  road: "#1c1f23",
  roadShadow: "#121417",
  panel: "#161c24",
  panel2: "#1c242e",
  line: "#3e4c5c",
  white: "#f0f4f8",
  muted: "#9cabb8",
  yellow: "#ffc72c",
  matatuYellow: "#fad63b",
  matatuBlue: "#2d7ddd",
  cyan: "#58dceb",
  green: "#36d377",
  red: "#ef4444",
  amber: "#ffab2e",
  purple: "#9c76ff",
  black: "#080a0d"
};

const lanes = ["LEFT", "CENTER", "RIGHT"];

function resizeCanvas() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function roundedRect(x, y, w, h, r, fill, stroke, lineWidth = 1) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function circle(x, y, r, fill) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}
