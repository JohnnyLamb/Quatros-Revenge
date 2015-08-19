
var fattyArray = [new fatties()];
var livesArray = [new life()];

var enemyArray = [new baddies(), new baddies(), new baddies(),
    new baddies(), new baddies(), new baddies(), new baddies(),
    new baddies(), new baddies(),
    new baddies(), new baddies(), new baddies(),
    new baddies(), new baddies(), new baddies()
];
var bullets = [];
var player1 = new player();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player1.drawPlayer();
    player1.drawlife();

    for (var f = 0; f < fattyArray.length; f++) {
        fattyArray[f].drawFatty();
        fattyArray[f].moveFatty();
    }

    function fattyCollision(player, fattyArray) {
        for (var i = 0; i < fattyArray.length; i++) {
            if (player.x < fattyArray[i].x + fattyArray[i].w &&
                player.x + player.w > fattyArray[i].x &&
                player.y < fattyArray[i].y + fattyArray[i].h &&
                player.y + player.h > fattyArray[i].y
            ) {
                fattyArray.splice(i, 1);
                player1.w +=30;
                player1.h +=30;
                fattyArray.push(new fatties(),new fatties());
                extraLife.play();
                score += 50;
            }
        }
    }
    fattyCollision(player1, fattyArray);

// if fatty is too far down screen respawn at top
    for (var e = 0; e < fattyArray.length; e++) {
        if (fattyArray[e].y > 1400) {
            fattyArray.shift();
            fattyArray.push(new fatties());
        }
    }


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
                livesArray.push(new life());
            }
        }
    }
    lifeCollision(player1, livesArray);

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
    // this checks if player collides with enemies and if so, decrements player life until zero and then resets the game loop with score on screen///
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
                    death.play();
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
        startGame = setInterval(gameLoop, 20);
        // var counter = 1;
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
