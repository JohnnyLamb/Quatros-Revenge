var drawStart = function() {
    ctx.font = "14px Advanced Pixel LCD-7";
    ctx.fillStyle = "white";
    ctx.fillText("CLICK TO START", 240, 310);
};
//  DRAW SCORE TO SCREEN
var score = 0;
var drawscore = function() {
    ctx.font = "14px Advanced Pixel LCD-7";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 40);
};
//  DRAW YOU LOST TO SCREEN
var drawYouLost = function() {
    ctx.font = "14px Advanced Pixel LCD-7";
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER ", 240, 310);
    ctx.fillText("Your Score: " + score, 240, 360);
    ctx.fillText("CLICK TO RESTART", 240, 410);
    $(canvas).on("click", function() {
        document.location.reload();
    });
};
// PLAYER CODE ////////////////////////
var player = function player(x, y, w, h) {

    this.w = 30;
    this.h = 30;
    this.x = (canvas.width - this.w) / 2;
    this.y = canvas.height / 1.2;
    this.life = 1;
    this.state = 1;
};
player.prototype.drawlife = function() {
    ctx.font = "14px Advanced Pixel LCD-7";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("LIFE: " + this.life, 560, 40);
};
player.prototype.kill = function() {
    this.life -= 1;
};
player.prototype.addLife = function() {
    this.life += 1;
};

// try using drawImage()
player.prototype.drawPlayer = function() {
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

// BULLET CODE

var bullet = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 10;
};
bullet.prototype.moveBullet = function() {

    this.y -= 14;
};

bullet.prototype.draw = function() {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x + 10, this.y, 10, 10);
};

var bulletLeft = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 10;
};
bulletLeft.prototype.moveBulletLeft = function() {
    this.y -=20;
    this.x -=13;
};

bulletLeft.prototype.drawLeft = function() {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x + 10, this.y, 10, 10);
};

// bullet.prototype.moveBulletRight = function() {

//     this.x +=14;
// };

// bullet.prototype.moveBulletLeft = function() {

//
// };

// BADDIES CODE////////////////////////////
// var enemiesArray = [];
var baddies = function(x, y, w, h) {
    this.x = Math.random() * 600;
    this.y = Math.random() * -600;
    this.w = 30;
    this.h = 30;
};
baddies.prototype.moveBaddies = function() {
    this.y -= -4;
};
baddies.prototype.drawBaddie = function() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.w, this.h);
};
var life = function(x, y, w, h) {
    this.x = Math.random() * 600;
    this.y = Math.random() * -600;
    this.w = 30;
    this.h = 30;
};
life.prototype.moveLife = function() {
    this.y -= -12;
};
life.prototype.drawLife = function() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

var fatties = function(x, y, w, h) {
    this.x = Math.random() * 600;
    this.y = Math.random() * -600;
    this.w = 110;
    this.h = 110;
};
fatties.prototype.moveFatty = function() {
    this.y -= -5;
};
fatties.prototype.drawFatty = function() {
    ctx.fillStyle = "purple";
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

var skinnies = function(x, y, w, h) {
    this.x = Math.random() * 600;
    this.y = Math.random() * -600;
    this.w = 10;
    this.h = 50;
};
skinnies.prototype.moveSkinny = function() {
    this.y -= -15;
};
skinnies.prototype.drawSkinny = function() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.w, this.h);
};


