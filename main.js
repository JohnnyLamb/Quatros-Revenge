var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// canvas dimensions and variables to work with
var x = canvas.width / 2;
var y = canvas.height - 400;
var startGame = 0;

// SOUND EFFECTS///////////
var song = new Audio('We\'re all under the stars.mp3');
var shoot = new Audio('player shoots.m4a');
var enemyDies = new Audio('enemy dies.m4a');
var playerHit = new Audio('player gets hit.m4a');
var death = new Audio('player dies.m4a');
var extraLife = new Audio('extra life.m4a');
// keyboard movement
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
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
    ctx.fillStyle = "#0095DD";
    ctx.fillText("You Lose, you score is" + score, 8, 40);
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
    this.y -= 16;
};
bullet.prototype.draw = function() {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x + 10, this.y, 10, 10);
};
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

var livesArray = [new life()];

var enemyArray = [new baddies(), new baddies(), new baddies(),
    new baddies(), new baddies(), new baddies(), new baddies(), new baddies(), new baddies(),
    new baddies(), new baddies(), new baddies(), new baddies(), new baddies(), new baddies()
];
var bullets = [];
var player1 = new player();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player1.drawPlayer();
    player1.drawlife();


    // draws and moves the Extra lives
    for (var l = 0; l < livesArray.length; l++) {
        livesArray[l].drawLife();
        livesArray[l].moveLife();
    }

    function lifeCollision(player, livesArray) {
        for (var i = 0; i < livesArray.length; i++) {
            if (player.x < livesArray[i].x + livesArray[i].w &&
                player.x + player.w > livesArray[i].x &&
                player.y < livesArray[i].y + livesArray[i].h &&
                player.y + player.h > livesArray[i].y
            ) {
                livesArray.splice(i, 1);
                player.addLife();
                extraLife.play();
            }
        }
    }
    lifeCollision(player1, livesArray);
    //     for (var e = 0; e < livesArray.length; e++) {
    //     if (player1.life <= 1) {
    //         livesArray.push(new life());
    //     }
    // }
    for (var e = 0; e < livesArray.length; e++) {
        if (livesArray[e].y > 6400) {
            livesArray.shift();
            livesArray.push(new life());
        }
    }

    // this instantiates new baddies so the game continues//////////
    if (enemyArray.length < 15) {
        enemyArray.push(new baddies());
    }
    // this draws the array of baddies and moves the baddies down the screen///////////
    for (var i = 0; i < enemyArray.length; i++) {
        enemyArray[i].drawBaddie();
        enemyArray[i].moveBaddies();
    }
    // this checks if player collides with enemies and if so, decrements player life until zero and then resets///
    function checkCollision(player, enemyArray) {
        for (var i = 0; i < enemyArray.length; i++) {
            if (player.x < enemyArray[i].x + enemyArray[i].w &&
                player.x + player.w > enemyArray[i].x &&
                player.y < enemyArray[i].y + enemyArray[i].h &&
                player.y + player.h > enemyArray[i].y
            ) {
                if (player1.life > 0) {
                    player1.y += 35;
                    player1.kill();
                    playerHit.play();
                    livesArray.push(new life());

                } else if (player1.life <= 0) {
                    clearInterval(startGame);
                    drawYouLost();

                }
            }
        }
    }
    checkCollision(player1, enemyArray);

    // moves and draws new bullets to screen////////////


    if (bullets.length) {
        for (var k = 0; k < bullets.length; k++) {
            bullets[k].moveBullet();
            bullets[k].draw();
            if (bullets[k].y < -10) {
                bullets.shift();
            }
        }
    }

    // checks for bullet collision/////////
    for (var f = 0; f < enemyArray.length; f++) {
        for (var j = 0; j < bullets.length; j++) {
            if (bullets[j].x < enemyArray[f].x + enemyArray[f].w &&
                bullets[j].x + bullets[j].w > enemyArray[f].x &&
                bullets[j].y < enemyArray[f].y + enemyArray[f].h &&
                bullets[j].y + bullets[j].h > enemyArray[f].y
            ) {
                enemyArray.splice(f, 1);
                score++;
                enemyDies.play();
            }
        }
    }
    //  destroys the enemy if they are too far off the screen////////////
    for (var e = 0; e < enemyArray.length; e++) {
        if (enemyArray[e].y > 1400) {
            enemyArray.shift();
        }
    }
    // limits the amount of bullets in the bullets array///
    if (bullets.length > 80) {
        bullets.shift();
    }



    // player movement and shooting////////////////////
    if (rightPressed && player1.x < 648) {
        player1.x += 7;
    } else if (leftPressed && player1.x > 0) {
        player1.x -= 7;
    }
    if (downPressed && player1.y < 588) {
        player1.y += 7;
    } else if (upPressed && player1.y > 0) {
        player1.y -= 7;
    }
    if (spacePressed) {
        bullets.push(new bullet(player1.x, player1.y));
        shoot.play();
    }

    // var fireRate = function() {
    // };
    // setInterval(fireRate(), 0);

    // requestAnimationFrame(gameLoop);
    drawscore();
}
// gameLoop();
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

$(document).on("ready", function() {
    drawStart();
    song.play();
    $(canvas).on("click", function() {

        drawStart();
        // var counter = 1;
       startGame = setInterval(gameLoop, 20);
        // console.log("Level " + counter);
        // counter += 1;
    });
});

// function bulletCollision(bulletsArray, enemyArray) {
//     for (var i = 0; i < enemyArray.length; i++) {
//         for (var j = 0; j < bulletsArray.length; j++) {
//             if (bulletsArray[j].x < enemyArray[i].x + enemyArray[i].w &&
//                 bulletsArray[j].x + bulletsArray[j].w > enemyArray[i].x &&
//                 bulletsArray[j].y < enemyArray[i].y + enemyArray[i].h &&
//                 bulletsArray[j].y + bulletsArray[j].h > enemyArray[i].y
//             ) {
//                 console.log("bullet collision");
//             }
//         }
//     }
// }
// bulletCollision(bullets, enemyArray);

// function bulletCollision(bulletsArray, enemyArray) {
//     for (var i = 0; i < bulletsArray.length; i++) {
//         checkCollision(bulletsArray[i], enemyArray);
//         // console.log('hey');
//     }
// }
// bulletCollision(bullets, enemyArray);
