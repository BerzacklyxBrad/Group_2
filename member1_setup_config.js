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
