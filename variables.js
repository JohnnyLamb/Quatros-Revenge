var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// canvas dimensions and variables to work with
var x = canvas.width / 2;
var y = canvas.height - 400;
var startGame = 0;

// SOUND EFFECTS///////////
var song = new Audio('assets/We\'re all under the stars.mp3');
var shoot = new Audio('assets/player shoots.m4a');
var enemyDies = new Audio('assets/enemy dies.m4a');
var playerHit = new Audio('assets/player gets hit.m4a');
var death = new Audio('assets/player dies.m4a');
var extraLife = new Audio('assets/extra life.m4a');
// keyboard movement
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
