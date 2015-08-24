var fattyArray = [new fatties(), new fatties()];
var livesArray = [new life()];

var enemyArray = [new baddies(), new baddies(), new baddies(),
    new baddies(), new baddies(), new baddies(), new baddies(),
    new baddies(), new baddies(),
    new baddies(), new baddies(), new baddies(),
    new baddies(), new baddies(), new baddies()
];
var bullets = [];
var bulletsLeft = [];
var player1 = new player();

var skinnyArray = [new skinnies()];
document.addEventListener("keypress", spaceBar, false);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player1.drawPlayer();
    player1.drawlife();
    // commented out for experimentation with matching fatties with score markers
    //     if(score = 50){
    //     fattyArray.push(new fatties(),new fatties());
    // }

    for (var f = 0; f < skinnyArray.length; f++) {
        skinnyArray[f].drawSkinny();
        skinnyArray[f].moveSkinny();
    }

    function skinnyCollision(player, skinnyArray) {
        for (var i = 0; i < skinnyArray.length; i++) {
            if (player.x < skinnyArray[i].x + skinnyArray[i].w &&
                player.x + player.w > skinnyArray[i].x &&
                player.y < skinnyArray[i].y + skinnyArray[i].h &&
                player.y + player.h > skinnyArray[i].y
            ) {
                skinnyArray.splice(i, 1);
                player1.w = 30;
                player1.h = 30;
                // skinnyArray.push(new skinnies());
                fattyArray.shift();
                extraLife.play();

            }
        }
    }
    skinnyCollision(player1, skinnyArray);
    // if skinnies are too far off screen take some off
    for (var e = 0; e < skinnyArray.length; e++) {
        if (skinnyArray[e].y > 2400) {
            skinnyArray.shift();
            skinnyArray.push(new skinnies());
        }
    }

    // if (score >=50 && score <=51) {
    //     skinnyArray.push(new skinnies());
    // }

    // move and draw fatties
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
                player1.w += 30;
                player1.h += 30;
                skinnyArray.push(new skinnies());
                extraLife.play();
                score += 50;
            }
        }
    }
    fattyCollision(player1, fattyArray);

    // if fatty is too far down screen respawn at top
    for (var e = 0; e < fattyArray.length; e++) {
        if (fattyArray[e].y > 2400) {
            fattyArray.shift();
            fattyArray.push(new fatties(), new fatties());
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
                player.state = 2;
                extraLife.play();
                livesArray.push(new life());
            }
        }
    }
    lifeCollision(player1, livesArray);

    for (var z = 0; z < livesArray.length; z++) {
        if (livesArray[z].y > 6400) {
            livesArray.shift();

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
            // bullets[k].moveBulletRight();
            // bullets[k].moveBulletLeft();
            bullets[k].draw();
            if (bullets[k].y < -10) {
                bullets.shift();
            }
        }
    }
    if (bulletsLeft.length) {
        for (var k = 0; k < bulletsLeft.length; k++) {

            bulletsLeft[k].moveBulletLeft();
            // bulletsLeft[k].moveBulletRight();
            // bulletsLeft[k].moveBulletLeft();
            bulletsLeft[k].drawLeft();
            if (bulletsLeft[k].y < -10) {
                bulletsLeft.shift();
            }
        }
    }
    // checks for bullet collision/////////
    for (var b = 0; b < enemyArray.length; b++) {
        for (var j = 0; j < bullets.length; j++) {
            if (bullets[j].x < enemyArray[b].x + enemyArray[b].w &&
                bullets[j].x + bullets[j].w > enemyArray[b].x &&
                bullets[j].y < enemyArray[b].y + enemyArray[b].h &&
                bullets[j].y + bullets[j].h > enemyArray[b].y
            ) {
                enemyArray.splice(b, 1);
                score++;
                enemyDies.play();
            }
        }
    }
    //  destroys the enemy if they are too far off the screen////////////
    for (var n = 0; n < enemyArray.length; n++) {
        if (enemyArray[n].y > 1400) {
            enemyArray.shift();
        }
    }
    // limits the amount of bullets in the bullets array///
    if (bullets.length > 80) {
        bullets.shift();
    }
    // player movement and shooting////////////////////
    if (rightPressed && player1.x + player1.w < 680) {
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

    if (spacePressed && player1.state === 2) {
        bullets.push(new bullet(player1.x, player1.y));
        bulletsLeft.push(new bulletLeft(player1.x, player1.y));
        shoot.play();
    }



    // var fireRate = function() {
    // };
    // setInterval(fireRate(), 0);
    // requestAnimationFrame(gameLoop);
    drawscore();




}
// gameLoop();

    function spaceBar(event) {
        if (event.keyCode === 32) {
            bullets.push(new bullet(player1.x, player1.y));
            shoot.play();
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
