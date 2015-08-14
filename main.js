var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// canvas dimensions and variables to work with
var x = canvas.width / 2;
var y = canvas.height - 400;


// keyboard movement
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;


// BADDIE DIMENSIONS AND POSITIONS
var baddieX = 340-50;
var baddieY = y - 700;
var baddieWidth = 50;
var baddieHeight = 50;



// player dimensions and position
var playerHeight = 30;
var playerWidth = 30;
var playerX = (canvas.width - playerWidth) / 2;
var playerY = y / 1.2;


// for keeping track of all the bullets


// PLAYER CODE ////////////////////////
var player = function drawPlayer() {
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    this.life = 3;
};
player.prototype.kill = function() {
    this.life = -1;
};

// BULLET CODE
var bullets = [];
var bullet = function(x, y) {
    this.x = x;
    this.y = y;
};
bullet.prototype.moveBullet = function() {
    this.y -= 16;
};
bullet.prototype.draw = function() {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x + 10, this.y, 10, 10);
};
// BADDIES CODE////////////////////////////
// var enemiesArray = [];
var baddies = function(x, y) {
    this.x = x;
    this.y = y;
};
baddies.prototype.moveBaddies = function() {
    this.y -= -2;
};
baddies.prototype.drawBaddie = function() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 50, 50);
};

var enemy1 = new baddies(340, 190);

// var enemy2 = new baddies(ba, baddieY);


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // PLAYER sides

    var playerTopleft = playerX;
    var playerTopright = playerX + playerWidth;
    var playerBottomleft = playerX - playerHeight;
    var playerBottomright = playerX - playerHeight + playerWidth;


    var baddieTopleft = baddieX;
    var baddieTopright = baddieX + baddieWidth;
    var baddieBottomleft = baddieX - baddieHeight;
    var baddieBottomright = baddieTopright - baddieHeight;





    // enemy1.moveBaddies();
    enemy1.drawBaddie();
    console.log(enemy1.x);
    // console.log(x,y);

    player();


    // console.log("x position " + playerX + " y position " + playerY);



     console.log(playerY);
     console.log(playerX);


    //horizantol


     if (playerY > baddieTopleft&& playerY < baddieTopleft + 50){
            console.log('horizantol')
    }


    // moves and draws new bullets to screen////////////
    if (bullets.length) {
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].moveBullet();
            bullets[i].draw();
        }
    }
    // limits the amount of bullets in the bullets array///
    if (bullets.length > 80) {
        bullets.shift();
    }
    // player movement and shooting////////////////////

    if (rightPressed && playerX < 648) {
        playerX += 7;
    } else if (leftPressed && playerX > 0) {
        playerX -= 7;
    }


    if (downPressed && playerY < 588) {
        playerY += 7;
    } else if (upPressed && playerY > 0) {
        playerY -= 7;
    }
    if (spacePressed) {
        bullets.push(new bullet(playerX, playerY));
    }
}



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
    if (event.keyCode == 38) {
        upPressed = true;
    } else if (event.keyCode == 40) {
        downPressed = true;
    }
    if (event.keyCode == 37) {
        leftPressed = true;
    } else if (event.keyCode == 39) {
        rightPressed = true;
    }
    if (event.keyCode == 32) {
        spacePressed = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode == 38) {
        upPressed = false;
    } else if (event.keyCode == 40) {
        downPressed = false;
    }
    if (event.keyCode == 37) {
        leftPressed = false;
    } else if (event.keyCode == 39) {
        rightPressed = false;
    }
    if (event.keyCode == 32) {
        spacePressed = false;
    }
}
setInterval(draw, 20);
