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
