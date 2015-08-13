var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// canvas dimensions
var x = canvas.width / 2;
var y = canvas.height - 30;
var updateX = 0;
var updateY = -1;
// keyboard movement
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;



// player dimensions and position
var playerHeight = 30;
var playerWidth = 30;
var playerX = (canvas.width - playerWidth) / 2;
var playerY = y / 1.2;

// bullet
// var bulletposX = playerX;
var bulletposY = y / 1.2;





function drawBullet() {
    ctx.beginPath();
    ctx.rect(playerX+10, bulletposY, 10, 10);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newBullet();
    drawPlayer();

    if (rightPressed) {
        playerX += 7;
    } else if (leftPressed) {
        playerX -= 7;
    }
    if (downPressed) {
        playerY += 7;
    } else if (upPressed) {
        playerY -= 7;
    }

    function newBullet(){

    if (spacePressed) {
        console.log('newBullet function');
        drawBullet();
    }

    // bulletposY += updateY;
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
// up arrow is 38, down arrow is 40, space bar is 32
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

setInterval(draw, 10);
