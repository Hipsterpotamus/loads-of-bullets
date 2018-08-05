let player;
let P;
let heightP;
let Pbullets = [];
let Ebullets = [];
let BBBB;
let enemies = [];
let interval = 0,
    rinterval = 0;
let explosions = [];
let lowobstacles = [];
let highobstacles = [];
let floor;
let menu = "Home";
let menuGun;

function setup() {
    createCanvas(windowWidth, windowHeight); //init stuff
    P = windowWidth / 1920; //basic unit that converts pixel dimensions
    heightP = windowHeight / 1100; //same for height, used less
    menuGun = Math.floor(random(1, 6.999));

    frameRate(60);
    background(0);

}



function draw() {
    if (menu == "Game") {
        interval++;
        rinterval++;
        if (interval % 5 == 0) {
            passiveCheck();
        }
        background(0);
        player.move();
        player.show();






        if (player.Stats.CurrentWeapon.ammoReload >= 60 && mouseIsPressed) {

            player.Stats.CurrentWeapon.shoot();
        }

        player.Stats.CurrentWeapon.ammoReload += player.Stats.CurrentWeapon.reload * player.Stats.reload;

        for (let x = Pbullets.length - 1; x >= 0; x--) {

            if (Pbullets[x].update(Pbullets[x].vel)) {
                Pbullets.splice(x, 1);
            }

        }
        for (t in enemies) {

            enemies[t].update();
            enemies[t].show();

        }
        for (let y = enemies.length - 1; y >= 0; y--) {
            for (let z = Pbullets.length - 1; z >= 0; z--) {
                if (Pbullets[z].hit(enemies[y])) {

                    if (!Pbullets[z].pen) {
                        enemies[y].health -= Pbullets[z].damage;
                        Pbullets.splice(z, 1);
                    } else {
                        enemies[y].health -= Pbullets[z].damage * 0.33;
                    }

                }

            }
            if (enemies[y].health <= 0) {
                enemies.splice(y, 1);
            }
        }

        if (interval % 5 == 0) {
            for (let qq = enemies.length - 1; qq >= 0; qq--) {
                if (player.hit(enemies[qq]) && !player.INVINCIBLE()) {
                    player.HP -= enemies[qq].damage;
                    if (enemies[qq].suicide) {
                        enemies.splice(qq, 1);
                    }
                    player.invincible = interval;
                }
            }
        }
        // Enemy Bullet update, if the bullet isn't spliced, it checks if it is touching the player
        for (let k = Ebullets.length - 1; k >= 0; k--) {

            if (Ebullets[k].update(Ebullets[k].vel)) {
                Ebullets.splice(k, 1);
            } else {
                if (player.hit(Ebullets[k]) && !player.INVINCIBLE()) {
                    player.HP -= Ebullets[k].damage;
                    Ebullets.splice(k, 1);
                    player.invincible = interval + player.invinLength / 2;
                }
            }

        }
        for (let vv = explosions.length - 1; vv >= 0; vv--) {
            if (explosions[vv].age > 15) {
                explosions.splice(vv, 1)
            } else {
                noStroke();
                fill(255, 70, 10);

                ellipse(explosions[vv].pos.x * P, explosions[vv].pos.y * P, explosions[vv].r * 2 * P, explosions[vv].r * 2 * P);
                explosions[vv].age++;
            }

        }
        //Your welcome for confusing you with the Es
        let E = floor.rooms[floor.playerInside.x][floor.playerInside.y].exits
        for (EE in floor.rooms[floor.playerInside.x][floor.playerInside.y].exits) {
            E[EE].show();
            E[EE].playerHit();
        }
        if (enemies.length == 0 && floor.rooms[floor.playerInside.x][floor.playerInside.y].completed == false) {
            floor.rooms[floor.playerInside.x][floor.playerInside.y].completed = true;
            if (floor.rooms[floor.playerInside.x][floor.playerInside.y].type == "item") {
                gainItem();
            }
            if (floor.rooms[floor.playerInside.x][floor.playerInside.y].type == "boss") {
                gainGun(floor.level);
            }
            floor.rooms[floor.playerInside.x][floor.playerInside.y].type = "n";
            for (let xc = floor.keys.length - 1; xc >= 0; xc--) {
                if (floor.keys[xc].x == floor.playerInside.x && floor.keys[xc].y == floor.playerInside.y) {
                    floor.keys.splice(xc, 1);
                }
            }
            if (floor.keys.length == 0) {
                unlockAll();
            }
            revealExits();

        }
        rectMode(CORNER);
        noStroke();

        fill(255, 255, 50);
        rect(28 * P, 33 * P, ((30 * player.MAXHP) + 4) * P, 29 * P);
        fill(0);
        rect(30 * P, 35 * P, (30 * player.MAXHP) * P, 25 * P);

        fill(255, 50, 50);

        player.DisplayedHP += ((player.HP - player.DisplayedHP) * 0.1);
        if (player.HP - player.DisplayedHP < 0.0125 && player.HP - player.DisplayedHP > -0.0125) {
            player.DisplayedHP = player.HP
        }

        rect(30 * P, 35 * P, Math.floor((player.DisplayedHP / player.MAXHP) * 30 * player.MAXHP) * P, 25 * P);

        for (lO in lowobstacles) {
            lowobstacles[lO].show();
        }
        for (hO in highobstacles) {
            highobstacles[hO].show();
            if (rinterval % 3 == 0) {
                for (let mb = Ebullets.length - 1; mb >= 0; mb--) {

                    if (RectCircleColliding(Ebullets[mb], highobstacles[hO])) {
                        Ebullets.splice(mb, 1);
                    }
                }
                for (let mv = Pbullets.length - 1; mv >= 0; mv--) {

                    if (RectCircleColliding(Pbullets[mv], highobstacles[hO])) {
                        Pbullets.splice(mv, 1);
                    }
                }
            }

        }


        rectMode(CORNER);
        noStroke();

        //Bottom left corner which displays ammo, reload bar, and guns
        textAlign(LEFT);
        fillSet(player.color);
        rect(50 * P, 1000 * heightP, 25 * P, 50 * heightP);
        ellipse(62.5 * P, 1000 * heightP, 25 * P, 50 * heightP);
        textSize(50 * heightP);
        text(player.Stats.CurrentWeapon.ammo + "/" + player.Stats.CurrentWeapon.maxAmmo, 80 * P, 1012.5 * heightP)
        textSize(35 * heightP);
        text(player.Stats.CurrentWeapon.name, 80 * P, 1050 * heightP);
        textSize(25 * heightP);
        text(player.Stats.Weapons[1].name + " " + player.Stats.Weapons[1].ammo + " [SHIFT]", 120 * P, 1075 * heightP);
        if ((player.Stats.CurrentWeapon.ammoReload / 60) < 1) {
            rect(50 * P, 965 * heightP, ((player.Stats.CurrentWeapon.ammoReload / 60) * 150) * P, 2 * P);
        } else {
            rect(50 * P, 965 * heightP, 150 * P, 2 * P);
        }







        floor.showMiniMap();

        if (player.Stats.itemReceiveTime + 300 > interval) {
            textAlign(CENTER);
            fillSet(player.color);
            textSize(50 * heightP);
            text(player.Stats.newestItem.name, 960 * P, 900 * heightP);
            textSize(25 * heightP);
            text(player.Stats.newestItem.desc, 960 * P, 975 * heightP);
            textAlign(LEFT);

        }
        if (player.Stats.offeredGun) {
            textAlign(CENTER);
            fillSet(player.color);
            textSize(50 * heightP);
            text(player.Stats.offeredGun.name, 960 * P, 900 * heightP);
            textSize(25 * heightP);
            text("[TAB] Drop Equipped Gun for " + player.Stats.offeredGun.name, 960 * P, 975 * heightP);
            textAlign(LEFT);
        }
    } else if (menu == "Home") {
        background(0);
        noStroke();
        fillSet("yellow");
        textAlign(CENTER);
        textSize(100 * P);
        text("Loads of Bullets", 960 * P, 200 * heightP);




        rect(695 * P, 325 * heightP, 50 * P, 100 * heightP);
        ellipse(720 * P, 325 * heightP, 50 * P, 100 * heightP);

        rect(755 * P, 335 * heightP, 50 * P, 100 * heightP);
        ellipse(780 * P, 335 * heightP, 50 * P, 100 * heightP);

        rect(815 * P, 342 * heightP, 50 * P, 100 * heightP);
        ellipse(840 * P, 342 * heightP, 50 * P, 100 * heightP);

        rect(875 * P, 346 * heightP, 50 * P, 100 * heightP);
        ellipse(900 * P, 346 * heightP, 50 * P, 100 * heightP);

        rect(935 * P, 350 * heightP, 50 * P, 100 * heightP);
        ellipse(960 * P, 350 * heightP, 50 * P, 100 * heightP);

        rect(995 * P, 346 * heightP, 50 * P, 100 * heightP);
        ellipse(1020 * P, 346 * heightP, 50 * P, 100 * heightP);

        rect(1055 * P, 342 * heightP, 50 * P, 100 * heightP);
        ellipse(1080 * P, 342 * heightP, 50 * P, 100 * heightP);

        rect(1115 * P, 335 * heightP, 50 * P, 100 * heightP);
        ellipse(1140 * P, 335 * heightP, 50 * P, 100 * heightP);

        rect(1175 * P, 325 * heightP, 50 * P, 100 * heightP);
        ellipse(1200 * P, 325 * heightP, 50 * P, 100 * heightP);

        textSize(35 * P)
        if (menuGun == "Pistol" || menuGun == 1) {
            fillSet("teal");
        } else {
            fillSet("yellow");
        }
        text("[1] Pistol", 200 * P, 800 * heightP);
        if (menuGun == "Machine Gun" || menuGun == 2) {
            fillSet("teal");
        } else {
            fillSet("yellow");
        }
        text("[2] Machine Gun", 500 * P, 800 * heightP);
        if (menuGun == "Shotgun" || menuGun == 3) {
            fillSet("teal");
        } else {
            fillSet("yellow");
        }
        text("[3] Shotgun", 800 * P, 800 * heightP);
        if (menuGun == "Sniper Rifle" || menuGun == 4) {
            fillSet("teal");
        } else {
            fillSet("yellow");
        }
        text("[4] Sniper Rifle", 200 * P, 900 * heightP);
        if (menuGun == "Assault Rifle" || menuGun == 5) {
            fillSet("teal");
        } else {
            fillSet("yellow");
        }
        text("[5] Assault Rifle", 500 * P, 900 * heightP);
        if (menuGun == "Bazooka" || menuGun == 6) {
            fillSet("teal");
        } else {
            fillSet("yellow");
        }
        text("[6] Bazooka", 800 * P, 900 * heightP);
        textSize(60 * P);
        fillSet("yellow");
        text("[Enter] START", 1400 * P, 850 * heightP);
    }
    // removed Crosshair, if reimplemented, put cursor:none in the index.html file
    // noFill();
    // stroke(255);
    // strokeWeight(1 * P);
    // ellipse(mouseX, mouseY, 15 * P, 15 * P);
}


function startGame() {
    switch (menuGun) {
        case 1:
            player = new Player(25, Pistol());
            break;
        case 2:
            player = new Player(25, MachineGun());
            break;
        case 3:
            player = new Player(25, Shotgun());
            break;
        case 4:
            player = new Player(25, SniperRifle());
            break;
        case 5:
            player = new Player(25, AssaultRifle());
            break;
        case 6:
            player = new Player(25, Bazooka());
            break;
    }

    menu = "Game";
    floor = new Floor(1, 0);
    floor.createRooms();
    putUpObs(floor.level, floor.rooms[floor.playerInside.x][floor.playerInside.y].seed);
    Roomstart(floor.level, floor.rooms[0][0].seed, "r");
    
    gameGoing = true;

}
$(window).keydown(function (event) {
    switch (event.which) {
        case 65: //A key (left)
            player.vel.x = -1;
            break;
        case 68: //D key (right)
            player.vel.x = 1;
            break;
        case 87: //W key (up)
            player.vel.y = -1;
            break;
        case 83: //S key (down)
            player.vel.y = 1;
            break;
        case 16: //Shift key (switches to secondary)
            event.preventDefault();
            player.Stats.Weapons[0] = [player.Stats.Weapons[1], player.Stats.Weapons[1] = player.Stats.Weapons[0]][0];
            player.Stats.CurrentWeapon = player.Stats.Weapons[0];
            break;
        case 9: //Tab key (drops gun)
            event.preventDefault();
            if (player.Stats.offeredGun) {
                player.Stats.Weapons[0] = player.Stats.offeredGun;
                player.Stats.CurrentWeapon = player.Stats.Weapons[0];
                player.Stats.offeredGun = false;
            }

            break;
        case 49:
            menuGun = 1;
            break;
        case 50:
            menuGun = 2;
            break;
        case 51:
            menuGun = 3;
            break;
        case 52:
            menuGun = 4;
            break;
        case 53:
            menuGun = 5;
            break;
        case 54:
            menuGun = 6;
            break;
        case 13:
            if (menu == "Home") {
                startGame();
            }
            break;
    }
});
$(window).keyup(function (event) {
    switch (event.which) {
        case 65:
            if (player.vel.x < 0) {
                player.vel.x = 0;
            }
            break;
        case 68:
            if (player.vel.x > 0) {
                player.vel.x = 0;
            }

            break;
        case 87:
            if (player.vel.y < 0) {
                player.vel.y = 0;
            }

            break;
        case 83:
            if (player.vel.y > 0) {
                player.vel.y = 0;
            }


            break;
    }
});

function star(x, y, radius1, radius2, npoints) {
    angleMode(RADIANS)
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
    angleMode(DEGREES);
}