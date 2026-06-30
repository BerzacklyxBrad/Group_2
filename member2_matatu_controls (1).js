// MEMBER 2: Matatu state, keyboard controls, braking, lane changes, and reset.

const keys = new Set();

const state = {
  lane: 1,
  x: laneCenter(1) - MATATU_W / 2,
  targetX: laneCenter(1) - MATATU_W / 2,
  speed: BASE_SPEED,
  braking: false,
  lastLaneChange: 0,
  obstacles: [],
  spawnTimer: 0,
  roadOffset: 0,
  distance: 0,
  elapsed: 0,
  avoided: 0,
  gameOver: false,
  collision: null,
  alertFlash: 0,
  lastTime: performance.now()
};

function laneCenter(lane) {
  return ROAD_X + lane * LANE_W + LANE_W / 2;
}

function matatuRect() {
  return { x: state.x, y: MATATU_Y, w: MATATU_W, h: MATATU_H };
}

function resetSimulation() {
  state.lane = 1;
  state.x = laneCenter(1) - MATATU_W / 2;
  state.targetX = state.x;
  state.speed = BASE_SPEED;
  state.braking = false;
  state.lastLaneChange = 0;
  state.obstacles = [];
  state.spawnTimer = 0;
  state.roadOffset = 0;
  state.distance = 0;
  state.elapsed = 0;
  state.avoided = 0;
  state.gameOver = false;
  state.collision = null;
  state.alertFlash = 0;
  state.lastTime = performance.now();
}

function changeLane(direction) {
  const now = performance.now();
  if (now - state.lastLaneChange < LANE_CHANGE_COOLDOWN) return;

  const next = Math.max(0, Math.min(LANE_COUNT - 1, state.lane + direction));
  if (next === state.lane) return;

  state.lane = next;
  state.targetX = laneCenter(next) - MATATU_W / 2;
  state.lastLaneChange = now;
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if ([" ", "arrowleft", "arrowright", "a", "d", "q", "escape"].includes(key)) {
    event.preventDefault();
  }

  keys.add(key);

  if (key === "q" || key === "escape") {
    state.gameOver = true;
    state.speed = 0;
    state.collision = { kind: "SESSION ENDED" };
  } else if (state.gameOver && key === " ") {
    resetSimulation();
  } else if (!state.gameOver && (key === "a" || key === "arrowleft")) {
    changeLane(-1);
  } else if (!state.gameOver && (key === "d" || key === "arrowright")) {
    changeLane(1);
  }
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});
