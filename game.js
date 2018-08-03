class Player {
    constructor(radius,StartingGun) {
        this.r = radius;
        this.vel = createVector(0, 0);
        this.pos = createVector(1920 / 2, 100);
        this.speed = 5 * P;
        this.HP = 10;
        this.DisplayedHP = 10;
        this.MAXHP = 10;
        this.invinLength = 90;
        this.invincible = -100;
        this.color = "yellow";
        this.passives = PASSIVEITEMS;
        this.show = function () {
            fillSet(this.color);
            if (this.INVINCIBLE()) {
                fill(250, 250, 50, 100);
            }
            noStroke();
            ellipse(this.pos.x * P, this.pos.y * P, this.r * P * 2, this.r * P * 2);
            stroke(255, 255, 255);
        };
        this.move = function () {
            let velocity = createVector(this.vel.x, this.vel.y);
            this.pos.add(velocity.setMag(this.speed));
        };
        this.Stats = new Stats(StartingGun);
        this.hit = function (object) {
            if (dist(object.pos.x, object.pos.y, this.pos.x, this.pos.y) <= this.r + object.r) {
                return true;
            }
        };
        this.INVINCIBLE = function () {
            if (interval < this.invincible + this.invinLength) {
                return true;
            }
        };
    }
}





class Stats {
    constructor(gun) {

        this.Weapons = [gun, ToyGun()];
        this.CurrentWeapon = this.Weapons[0];
        this.reload = 1; //Buffs and Nerfs assigned to reload
        this.damage = 1; //How much damage a bullet does on impact
        this.speed = 10; //How fast the bullet moves
        this.range = 250; //How far the bullet can travel
        this.size = 5; //How big the bullet is
        this.ammo = 100; //Extra Ammo Guns Start out with

        this.newestItem;
        this.itemReceiveTime = -300;
        this.Items = STATITEMS;

        this.offeredGun = false;
    }
}


//----------------------------------------------------------------------------------------------------------



class Gun {
    constructor(name, reload, damage, speed, range, size, color, maxAmmo, penetrative, explosion) {
        this.name = name;
        this.reload = reload;
        this.damage = damage;
        this.speed = speed;
        this.range = range;
        this.size = size;
        this.color = color;
        this.ammo = maxAmmo;
        this.maxAmmo = maxAmmo;

        this.ammoReload = 60; //Value incremented by reload and reload change every frame, at 60 gun can fire.

        //----------------------------------------------------------------------------
        this.penetrative = penetrative;
        this.explosion = explosion;



        this.shoot = function () {
            switch (this.name) {
                case "Shotgun":
                    this.reload = 0.5;
                    //Loops and shoots 5 bullets with SG, start rotated -10 degrees and adds 5 per shot
                    for (let sg = 0; sg < 7; sg++) {
                        Pbullets.push(new Bullet(player.Stats.size * this.size, player.Stats.damage * this.damage, player.Stats.speed * this.speed, player.Stats.range * this.range, RotateVector(FindPlayerDirection(), ((5 * sg) - 15) + random(-7, 7)), this.color, createVector(player.pos.x, player.pos.y), this.penetrative, this.explosion));
                    }
                    //Creates a jolt which sends you backwards when you fire. Will probably be removed, reworked, or placed into a function and repeated
                    let pushBackDIR = createVector(-FindPlayerDirection().x, -FindPlayerDirection().y);
                    pushBackDIR.setMag(15 * P);
                    player.pos.add(pushBackDIR);
                    break;

                default:
                    Pbullets.push(new Bullet(player.Stats.size * this.size, player.Stats.damage * this.damage, player.Stats.speed * this.speed, player.Stats.range * this.range, FindPlayerDirection(), this.color, createVector(player.pos.x, player.pos.y), this.penetrative, this.explosion))
                    break;
            }
            if (this.ammo < 1) {
                if (player.HP > (player.MAXHP / this.maxAmmo)) {
                    player.HP -= (player.MAXHP / this.maxAmmo);
                }
            } else {
                this.ammo -= 1;
            }


            this.ammoReload = 0;
        }
    }
}


//name, reload, damage, speed, range, size, color, maxAmmo, penetrative, explosion


ToyGun = function () {
    return new Gun("Toy Gun", 1, 0.8, 0.66, 0.9, 0.75, "yellow", 1000, 0, 0);
}
Pistol = function () {
    return new Gun("Pistol", 1.5, 1, 1, 1, 1, "yellow", 100, 0, 0);
}
MachineGun = function () {
    return new Gun("Machine Gun", 6, 0.25, 1.25, 1, 0.75, "yellow", 500, 0, 0);
}
Shotgun = function () {
    return new Gun("Shotgun", 0.5, 0.66, 1, 0.75, 0.66, "yellow", 75, 0, 0);
}
SniperRifle = function () {
    return new Gun("Sniper Rifle", 0.33, 8, 3, 3, 0.5, "yellow", 50, 0, 0);
}
AssaultRifle = function () {
    return new Gun("Assault Rifle", 3, 0.75, 1.5, 1.5, 0.75, "yellow", 150, 0, 0);
}
Bazooka = function () {
    return new Gun("Bazooka", 0.125, 12, 4, 3, 2.5, "yellow", 50, 0, new exploOBJ(60, 2));
}

let OneGuns = [
    Crossbow = function(){
        return new Gun("Crossbow", 0.8, 2.5, 1.1, 1.2, 1.4, "yellow", 100, false, 0);
    },
    Minigun = function () {
        return new Gun("Mini Gun", 5, 0.5, 1.25, 1, 1, "yellow", 500, 0, 0);
    }

];
GodGun = function () {
    return new Gun("God Gun", 60, 150, 6, 10, 8, "yellow", 100000000, 0, 0);
}

class Bullet {
    constructor(size, damage, speed, range, direction, color, startPos, Penetrative, Explosion) {
        this.pos = startPos;
        this.startPos = createVector(this.pos.x, this.pos.y);
        this.r = size;
        this.damage = damage;
        this.speed = speed;
        this.range = range;
        this.color = color;
        this.pen = Penetrative;
        this.explosion = Explosion;
        if (direction) {
            this.vel = direction.setMag(this.speed);
        } else {
            this.vel;
        }

        this.update = function (velocity) {

            this.pos.add(velocity);



            fillSet(this.color);
            noStroke();
            ellipse(this.pos.x * P, this.pos.y * P, this.r * P * 2, this.r * P * 2);

            if (dist(this.pos.x, this.pos.y, this.startPos.x, this.startPos.y) > this.range * P) {
                return true;
            }
            return false;
        };
        this.hit = function (object) {
            if (dist(object.pos.x, object.pos.y, this.pos.x, this.pos.y) <= this.r + object.r) {
                if (this.explosion) {
                    this.explosion.pos = createVector(this.pos.x, this.pos.y);
                    Explode(this.explosion);
                }
                return true;
            }
        };
    }
}


class Enemy {
    constructor(name, render, radius, speed, moveType, damage, health, startPos, color, shootAlg, bullet, suicide) {
        this.name = name;
        this.render = render;
        this.r = radius;
        this.speed = speed * P;
        this.moveType = moveType;
        this.damage = damage;
        this.health = health;
        this.damage = damage;
        this.pos = startPos;
        this.color = color;
        this.shootAlg = shootAlg;
        this.bullet = bullet;
        this.suicide = suicide;
        this.currentTarget = false;

        this.vel;
        this.show = function () {
            switch (this.render) {

                case "Circle":
                    noStroke();
                    fillSet(this.color);
                    ellipse(this.pos.x * P, this.pos.y * P, this.r * 2 * P, this.r * 2 * P);
                    break;
                case "Bully":
                    push();
                    noStroke();
                    translate(this.pos.x * P, this.pos.y * P);


                    rotate(atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x) + 90);
                    translate(-this.pos.x * P, -this.pos.y * P);
                    fillSet(this.color);
                    ellipse(this.pos.x * P, this.pos.y * P, this.r * 2 * P, this.r * 2 * P);
                    triangle((this.pos.x - 30 * this.r / 20) * P, (this.pos.y - 30 * this.r / 20) * P, (this.pos.x - 15 * this.r / 20) * P, (this.pos.y - 7.5 * this.r / 20) * P, (this.pos.x - 7.5 * this.r / 20) * P, (this.pos.y - 15 * this.r / 20) * P);
                    triangle((this.pos.x + 30 * this.r / 20) * P, (this.pos.y - 30 * this.r / 20) * P, (this.pos.x + 15 * this.r / 20) * P, (this.pos.y - 7.5 * this.r / 20) * P, (this.pos.x + 7.5 * this.r / 20) * P, (this.pos.y - 15 * this.r / 20) * P);

                    pop();
                    break;
                case "Eye":
                    push();
                    noStroke();
                    translate(this.pos.x * P, this.pos.y * P);


                    rotate(atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x) + 90);
                    translate(-this.pos.x * P, -this.pos.y * P);
                    fillSet(this.color);
                    ellipse(this.pos.x * P, this.pos.y * P, this.r * 2 * P, this.r * 2 * P);
                    fill(255, 255, 255);
                    ellipse((this.pos.x) * P, (this.pos.y - this.r / 2) * P, this.r * P, this.r * P);
                    fill(0);
                    ellipse((this.pos.x) * P, (this.pos.y - this.r / 2) * P, this.r * 0.75 * P, this.r * 0.75 * P);
                    pop();
                    break;
                case "FourCircle":
                    noStroke();
                    fillSet(this.color);
                    ellipse(this.pos.x * P, this.pos.y * P, this.r * 2 * P, this.r * 2 * P);
                    fillSet(this.bullet.color);
                    ellipse((this.pos.x - this.r) * P, this.pos.y * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//L
                    ellipse((this.pos.x + this.r) * P, this.pos.y * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//R
                    ellipse(this.pos.x * P, (this.pos.y - this.r) * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//T
                    ellipse(this.pos.x * P, (this.pos.y + this.r) * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//B
                    break;
                case "EightCircle":
                    noStroke();
                    fillSet(this.color);
                    ellipse(this.pos.x * P, this.pos.y * P, this.r * 2 * P, this.r * 2 * P);
                    fillSet(this.bullet.color);
                    ellipse((this.pos.x - this.r) * P, this.pos.y * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//L
                    ellipse((this.pos.x - this.r * 0.7) * P, (this.pos.y + this.r * 0.7) * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//B-L
                    ellipse(this.pos.x * P, (this.pos.y + this.r) * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//B
                    ellipse((this.pos.x + this.r * 0.7) * P, (this.pos.y + this.r * 0.7) * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//B-R
                    ellipse((this.pos.x + this.r) * P, this.pos.y * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//R
                    ellipse((this.pos.x + this.r * 0.7) * P, (this.pos.y - this.r * 0.7) * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//T-R
                    ellipse(this.pos.x * P, (this.pos.y - this.r) * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//T
                    ellipse((this.pos.x - this.r * 0.7) * P, (this.pos.y - this.r * 0.7) * P, this.bullet.r * 2 * P, this.bullet.r * 2 * P);//T-L
                    
                    
                    break;
                case "CircleV":
                    push();


                    translate(this.pos.x * P, this.pos.y * P);
                    rotate(atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x) + 90);
                    translate(-this.pos.x * P, -this.pos.y * P);
                    noStroke();
                    fillSet(this.color);
                    ellipse(this.pos.x * P, this.pos.y * P, this.r * 2 * P, this.r * 2 * P);
                    stroke(15);
                    strokeWeight(4 * P)
                    line(this.pos.x * P, this.pos.y * P, (this.pos.x + (this.r * 1.415 / 2)) * P, (this.pos.y - (this.r * 1.415 / 2)) * P);
                    line(this.pos.x * P, this.pos.y * P, (this.pos.x - (this.r * 1.415 / 2)) * P, (this.pos.y - (this.r * 1.415 / 2)) * P);


                    pop();
                    break;
                case "Sixy":
                    push();

                    noStroke();
                    translate(this.pos.x*P, this.pos.y*P);
                    rotate(45);
                    translate(-this.pos.x*P, -this.pos.y*P);
                    fillSet(this.color);
                    ellipse(this.pos.x * P, this.pos.y * P, this.r * 2 * P, this.r * 2 * P);


                    fill(255, 255, 255);
                    ellipse((this.pos.x) * P, (this.pos.y - this.r / 1.5) * P, this.r * 0.35 * P, this.r * 0.35 * P); //TOP
                    ellipse((this.pos.x - this.r * 1.415 / 3) * P, (this.pos.y - this.r * 1.415 / 3) * P, this.r * 0.35 * P, this.r * 0.35 * P); //TOP LEFT
                    ellipse((this.pos.x + this.r * 1.415 / 3) * P, (this.pos.y - this.r * 1.415 / 3) * P, this.r * 0.35 * P, this.r * 0.35 * P); //TOP RIGHT
                    ellipse((this.pos.x) * P, (this.pos.y + this.r / 1.5) * P, this.r * 0.35 * P, this.r * 0.35 * P); //BOTTOM
                    ellipse((this.pos.x - this.r * 1.415 / 3) * P, (this.pos.y + this.r * 1.415 / 3) * P, this.r * 0.35 * P, this.r * 0.35 * P); //BOTTOM LEFT
                    ellipse((this.pos.x + this.r * 1.415 / 3) * P, (this.pos.y + this.r * 1.415 / 3) * P, this.r * 0.35 * P, this.r * 0.35 * P); //BOTTOM RIGHT
                    fill(0);
                    ellipse((this.pos.x) * P, (this.pos.y - this.r / 1.33) * P, this.r * 0.12 * P, this.r * 0.12 * P); //TOP
                    ellipse((this.pos.x - this.r * 1.415 / 2.66) * P, (this.pos.y - this.r * 1.415 / 2.66) * P, this.r * 0.12 * P, this.r * 0.12 * P); //TOP LEFT
                    ellipse((this.pos.x + this.r * 1.415 / 2.66) * P, (this.pos.y - this.r * 1.415 / 2.66) * P, this.r * 0.12 * P, this.r * 0.12 * P); //TOP RIGHT
                    ellipse((this.pos.x) * P, (this.pos.y + this.r / 1.33) * P, this.r * 0.12 * P, this.r * 0.12 * P); //BOTTOM
                    ellipse((this.pos.x - this.r * 1.415 / 2.66) * P, (this.pos.y + this.r * 1.415 / 2.66) * P, this.r * 0.12 * P, this.r * 0.12 * P); //BOTTOM LEFT
                    ellipse((this.pos.x + this.r * 1.415 / 2.66) * P, (this.pos.y + this.r * 1.415 / 2.66) * P, this.r * 0.12 * P, this.r * 0.12 * P); //BOTTOM RIGHT

                    pop();
                    break;
                case "Dark Horse":
                    push();

                    noStroke();
                    translate(this.pos.x * P, this.pos.y * P);
                    rotate(atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x) - 90);
                    translate(-this.pos.x * P, -this.pos.y * P);
                    fillSet(this.color);
                    ellipse(this.pos.x * P, this.pos.y * P, this.r * 1.75 * P, this.r * 2.5 * P);
                    rectMode(CENTER);
                    rect((this.pos.x) * P, this.pos.y + this.r * 1.5, this.r * 1.5, this.r * 3);




                    pop();
                    break;
                case "Red Pappa":
                    push();

                    noStroke();
                    translate(this.pos.x * P, this.pos.y * P);
                    rotate(atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x) - 90);
                    translate(-this.pos.x * P, -this.pos.y * P);
                    fillSet(this.color);
                    ellipse(this.pos.x * P, this.pos.y * P, this.r * 2 * P, this.r * 2 * P);
                    rectMode(CENTER);
                    rect((this.pos.x) * P, this.pos.y + this.r * 1.5, this.r * 0.8, this.r * 1.3);




                    pop();
                    break;
                case "Purple Prince":
                    push();
                    noStroke();
                    fillSet(this.color);
                    ellipse(this.pos.x * P, this.pos.y * P, this.r * 2 * P, this.r * 2 * P);
                    fillSet("yellow");
                    beginShape();
                    vertex((this.pos.x - this.r * 0.5) * P, (this.pos.y - this.r*0.9) * P);
                    vertex((this.pos.x - this.r * 0.5) * P, (this.pos.y - this.r*1.4) * P);
                    vertex((this.pos.x - this.r * 0.25) * P, (this.pos.y - this.r*1.15) * P);
                    vertex((this.pos.x) * P, (this.pos.y - this.r*1.4) * P);
                    vertex((this.pos.x + this.r * 0.25) * P, (this.pos.y - this.r*1.15) * P);
                    vertex((this.pos.x + this.r * 0.5) * P, (this.pos.y - this.r*1.4) * P);
                    vertex((this.pos.x + this.r * 0.5) * P, (this.pos.y - this.r*0.9) * P);
                    
                    
                    endShape(CLOSE);
                    pop();
                    break;
                case "Clockra":
                    push();
                    noStroke();
                    fillSet(this.color);
                    ellipse(this.pos.x * P, this.pos.y * P, this.r * 2 * P, this.r * 2 * P);
                    
                    stroke(0);
                    strokeWeight(24*P);
                    line((this.pos.x) * P,(this.pos.y - this.r) * P,this.pos.x * P,this.pos.y * P);
                    translate(this.pos.x*P, this.pos.y*P);
                    rotate(Math.floor((rinterval % 300)/5) * 6 - 25);
                   
                    translate(-this.pos.x*P, -this.pos.y*P);
                    line((this.pos.x) * P,(this.pos.y - this.r) * P,this.pos.x * P,this.pos.y * P);
                    fill(255);
                    stroke(0);
                    strokeWeight(2*P);
                    ellipse((this.pos.x - this.r*0.5) * P, this.pos.y * P, this.r * 0.75 * P, this.r * 0.75 * P)
                    ellipse((this.pos.x + this.r*0.5) * P, this.pos.y * P, this.r * 0.75 * P, this.r * 0.75 * P)
                    fill(0);
                    ellipse((this.pos.x - this.r*0.5) * P, this.pos.y * P, this.r * 0.4 * P, this.r * 0.4 * P)
                    ellipse((this.pos.x + this.r*0.5) * P, this.pos.y * P, this.r * 0.4 * P, this.r * 0.4 * P)
                    
                    
                    
                    
                    pop();
                    break;
                case "The Ace":
                    push();
                    noStroke();
                    translate(this.pos.x * P, this.pos.y * P);


                    rotate(atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x) + 90);
                    translate(-this.pos.x * P, -this.pos.y * P);
                    rectMode(CENTER);
                    fillSet(this.color);
                    rect(this.pos.x * P,this.pos.y * P,this.r * 4 * P,this.r * 1.25 * P,20*P);
                    rect(this.pos.x * P,this.pos.y * P,this.r * 1 * P,this.r * 4 * P,20*P);
                    fillSet("red")
                    ellipse((this.pos.x - 40) * P,(this.pos.y - this.r * 0.5) * P,this.r * 0.2,this.r * 0.8);
                    ellipse((this.pos.x + 40) * P,(this.pos.y - this.r * 0.5) * P,this.r * 0.2,this.r * 0.8);
                    ellipse((this.pos.x - 80) * P,(this.pos.y - this.r * 0.5) * P,this.r * 0.2,this.r * 0.8);
                    ellipse((this.pos.x + 80) * P,(this.pos.y - this.r * 0.5) * P,this.r * 0.2,this.r * 0.8);
                    pop();
                    break;
            }
        };
        this.update = function (noExecute) {
            let CURRENTTARGET, Direction;
            switch (this.moveType) {
                case "Follow":
                    CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                    Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));

                    Direction.setMag(this.speed * P);
                    break;

                case "FollowShoot":
                    if ((rinterval % 600) > 400) {
                        if (rinterval % 60 == 0) {
                            Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, this.shoot(), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        }
                        Direction = createVector(0, 0);
                    } else {
                        CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                        Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));
                        Direction.setMag(this.speed * P);
                    }
                    break;

                case "FollowShootShotG":
                    if ((rinterval % 600) > 400) {
                        if (rinterval % 60 == 0) {
                            for (let sg = 0; sg < 5; sg++) {
                                Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), ((5 * sg) - 10) + random(-7, 7)), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                            }
                        }
                        Direction = createVector(0, 0);
                    } else {
                        CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                        Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));
                        Direction.setMag(this.speed * P);
                    }
                    break;

                case "FollowFourShoot":
                    if (rinterval % 180 == 0) {
                        for (let ii = 0; ii < 4; ii++) {
                            Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), 90 * ii), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        }


                    }


                    CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                    Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));
                    Direction.setMag(this.speed * P);

                    break;

                case "FollowEightShoot":
                    if(rinterval % 360 == 0){
                        for (let dd = 0; dd < 4; dd++) {
                            Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), 45 + 90 * dd), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        }
                    }else if (rinterval % 180 == 0) {
                        for (let oo = 0; oo < 4; oo++) {
                            Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), 90 * oo), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        }


                    }


                    CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                    Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));
                    Direction.setMag(this.speed * P);

                    break;

                case "FollowShootV":
                    if ((rinterval % 720) >= 630) {

                        if (rinterval % 30 == 0) {
                            Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), -45), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                            Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), 45), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        }
                        Direction = createVector(0, 0);
                    } else {
                        CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                        Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));
                        Direction.setMag(this.speed * P);
                    }
                    break;
                case "SeekAndFlee":
                    if(dist(this.pos.x,this.pos.y,player.pos.x,player.pos.y)>player.Stats.range+20){
                        CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                        Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));

                        Direction.setMag(this.speed/4 * P);
                    }else{
                        CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                        Direction = RotateVector(CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y)),180);

                        Direction.setMag(this.speed/4 * P);
                    }
                    if(rinterval%60==0){
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, this.shoot(), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                    }
                    break;
                case "Encircle":
                    

                    if(!inScreen(this.pos.x,this.pos.y)){
                        CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                        Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));

                        Direction.setMag(this.speed * P);
                    }else{
                        if (!this.vel) {
                            this.vel = createVector(0, -1)
                        }
                        CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                        Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));
    
                        Direction = RotateVector(Direction, -88);
                        Direction.setMag(this.speed * P * (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) / 250));
                    }
                    
                    break;

                case "RandomA":
                    if (dist(this.pos.x, this.pos.y, this.currentTarget.x, this.currentTarget.y) < 25 * P) {
                        this.currentTarget = false;
                    }
                    if (!this.currentTarget) {
                        let CT;
                        while (true) {
                            CT = createVector(random(480 * P, 1440 * P), random(280, 840 * P));
                            if (dist(CT.x, CT.y, this.pos.x, this.pos.y) > 300 * P) {
                                this.currentTarget = CT;
                                break;
                            }
                        }

                    }
                    CURRENTTARGET = createVector(this.currentTarget.x, this.currentTarget.y);
                    Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));

                    Direction.setMag(this.speed * P);
                    break;

                case "Sentry":
                    if (rinterval % 60 == 0) {
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, this.shoot(), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                    }
                    break;

                case "Steelman":
                    CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                    Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));

                    
                    if(rinterval%901>=800){
                        if(rinterval%900==0){
                            this.r = Math.floor(this.r / Math.pow(1.05,5) * 200)/200;
                            for (let sm = 0; sm < 8; sm++) {
                                Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), 45 * sm), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                            }
                        }else if(rinterval%10==0){
                            this.r = Math.floor(this.r * 1.05 * 200)/200;
                        }
                        Direction.setMag(0);
                    }else{
                        Direction.setMag(this.speed * P);
                    }
                            
                            
                            
                    break;
                case "Sixy":
                    // Bounces Sixy off of walls, he always has a velocity of either 1,1 -1,1 1,-1 -1,-1 Rotates 90 or -90 degrees when it approaches the walls
                    if (!this.vel) {
                        Direction = createVector(-1, -1);
                        this.vel = createVector(-1, -1);
                    } else {
                        Direction = createVector(this.vel.x, this.vel.y);
                    }
                    if (this.pos.x + Direction.x - this.r <= 0 || this.pos.x + Direction.x + this.r >= 1920) {
                        if (this.vel.y > 0 && this.vel.x < 0 || this.vel.y < 0 && this.vel.x > 0) {
                            Direction = RotateVector(this.vel, -90);
                        } else {
                            Direction = RotateVector(this.vel, 90);
                        }
                    } else if (this.pos.y + Direction.y - this.r <= 0 || this.pos.y + Direction.y + this.r >= 1100) {
                        if (this.vel.y > 0 && this.vel.x < 0 || this.vel.y < 0 && this.vel.x > 0) {
                            Direction = RotateVector(this.vel, 90);
                        } else {
                            Direction = RotateVector(this.vel, -90);
                        }
                    }
                    if (rinterval % 60 == 0) {
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, this.shoot(), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), 45), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), 90), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), -90), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), -135), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), 180), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        if (rinterval % 600 == 0) {
                            Pink(createVector(this.pos.x, this.pos.y));

                        }
                    }
                    Direction.setMag(this.speed * P);
                    break;
                case "Dark Horse":
                    
                    if(rinterval%120==0||!this.vel||!inScreen(this.pos.x + this.vel.x, this.pos.y + this.vel.y, this.r)){
                        this.vel = createVector(player.pos.x,player.pos.y).sub(createVector(this.pos.x, this.pos.y));
                    }
                    
                    


                    Direction = createVector(this.vel.x,this.vel.y)
                    Direction.setMag(this.speed * P);
                    break;
                case "Red Pappa":
                    if (dist(this.pos.x, this.pos.y, this.currentTarget.x, this.currentTarget.y) < 25 * P) {
                        this.currentTarget = false;
                    }
                    if(rinterval%1800>=1740&&rinterval%20==0){
                        Bully(createVector(this.pos.x,this.pos.y));
                    }else if(rinterval%900>=840&&rinterval%20==0){   
                        RedFast(createVector(this.pos.x,this.pos.y));
                    }
                    
                    if (!this.currentTarget) {
                        let CT;
                        while (true) {
                            CT = createVector(random(240 * P, 1680 * P), random(140, 980 * P));
                            if (dist(CT.x, CT.y, this.pos.x, this.pos.y) > 300 * P) {
                                this.currentTarget = CT;
                                break;
                            }
                        }

                    }
                    CURRENTTARGET = createVector(this.currentTarget.x, this.currentTarget.y);
                    Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));

                    Direction.setMag(this.speed * P);
                    break;
                case "Purple Prince":
                    if(rinterval%1440<720){
                        if(dist(this.pos.x,this.pos.y,player.pos.x,player.pos.y)>player.Stats.range+22){
                            CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                            Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));

                            Direction.setMag(this.speed/4 * P);
                        }else{
                            CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                            Direction = RotateVector(CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y)),180);

                            Direction.setMag(this.speed/4 * P);
                        }
                        if(rinterval%60==0){
                            Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, this.shoot(), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        }
                    }else if(rinterval%720==0&&rinterval!=0){
                        this.r = 0;
                        Direction = createVector(0,0);
                        for(let PPPP = 0;PPPP < 10;PPPP++){Purple(enemRand());}
                    }else if(rinterval%1440>1315&&rinterval%5==0){
                        this.r+=1;
                        Direction = createVector(0,0);
                    }else if(rinterval%1440==1439){
                        for(let PuP = enemies.length-1; PuP >= 0; PuP--){
                            if(enemies[PuP].name=="Purple"){
                                enemies.splice(PuP,1);
                            }
                        }
                        Direction = createVector(0,0);
                    }else{
                        Direction = createVector(0,0);
                    }
                    break;
                case "Clockra":
                    if(rinterval%5==0){
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, RotateVector(this.shoot(), Math.floor((rinterval % 300)/5) * 6), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, this.shoot(), this.bullet.color, createVector(this.pos.x, this.pos.y), this.bullet.pen, this.bullet.explosion));
                    }
                    Direction = createVector(0,0);
                    break;
                case "The Ace":
                    CURRENTTARGET = createVector(player.pos.x, player.pos.y);
                    Direction = CURRENTTARGET.sub(createVector(this.pos.x, this.pos.y));

                    Direction.setMag(this.speed * P);
                    if(rinterval%60==0){
                        let NDirection = RotateVector(createVector(Direction.x,Direction.y),90);NDirection.setMag(40*P)
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, this.shoot(), this.bullet.color, createVector(this.pos.x+NDirection.x, this.pos.y + NDirection.y), this.bullet.pen, this.bullet.explosion));
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, this.shoot(), this.bullet.color, createVector(this.pos.x-NDirection.x, this.pos.y - NDirection.y), this.bullet.pen, this.bullet.explosion));
                        NDirection.setMag(80*P)
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, this.shoot(), this.bullet.color, createVector(this.pos.x+NDirection.x, this.pos.y + NDirection.y), this.bullet.pen, this.bullet.explosion));
                        Ebullets.push(new Bullet(this.bullet.r, this.bullet.damage, this.bullet.speed, this.bullet.range, this.shoot(), this.bullet.color, createVector(this.pos.x-NDirection.x, this.pos.y - NDirection.y), this.bullet.pen, this.bullet.explosion));
                    }
                    break;
            }
            

            if (this.name != "Sixy"&&this.name != "Dark Horse"&&this.name != "Red Pappa") {
                if (this.speed > 0.5) {
                    // Very basic algorithm that rotates enemies back and forth if they would hit another enemy.
                    let degrees = 0;
                    while (degrees < 360) {
                        if (hitsAnyEnemy(this.pos.x + Direction.x, this.pos.y + Direction.y, this.r, this.pos) || !inScreen(this.pos.x + Direction.x, this.pos.y + Direction.y, this.r)) {
                            degrees *= -1;
                            if (degrees >= 0) {
                                if (degrees > 15) {
                                    degrees += 5;
                                } else {
                                    degrees += 1;
                                }
                                Direction = RotateVector(Direction, degrees);
                            }
                        } else {
                            break;
                        }
                        if (degrees > 360) {
                            degrees = random(0, 360);
                            break;
                        }
                    }

                }
            }
            if (noExecute) {
                return Direction
            } else {
                this.vel = Direction;
                this.pos.add(this.vel);
            }

        };
        this.shoot = function () {
            let PLAYERPOS, Direction;
            switch (this.shootAlg) {
                case "Basic":
                    PLAYERPOS = createVector(player.pos.x, player.pos.y);
                    Direction = PLAYERPOS.sub(createVector(this.pos.x, this.pos.y));
                    Direction.setMag(this.bullet.speed);
                    return Direction;
                case "Up":
                    Direction = createVector(0, -1);
                    Direction.setMag(this.bullet.speed);
                    return Direction;
            }
        };
    }
}



function RotateVector(Vector, Degrees) {
    angleMode(DEGREES);
    return createVector(Vector.x * cos(Degrees) - Vector.y * sin(Degrees), Vector.x * sin(Degrees) + Vector.y * cos(Degrees));
}

//Finds the bullet direction for bullets shot by the player
function FindPlayerDirection() {
    let BV = createVector(mouseX, mouseY).sub(createVector(player.pos.x * P, player.pos.y * P));
    
    return createVector(BV.x/P, BV.y/P);
}

class exploOBJ {
    constructor(radius, damage) {
        this.pos;
        this.r = radius;
        this.DMG = damage;
        this.age = 0;
    }
}

function Explode(explo) {
    if (XhitsY(player.pos, explo.pos, player.r, explo.r)) {
        player.HP -= explo.DMG;
    }
    for (let y = enemies.length - 1; y >= 0; y--) {

        if (XhitsY(enemies[y].pos, explo.pos, enemies[y].r, explo.r)) {

            enemies[y].health -= explo.DMG;

        }

    }
    explosions.push(explo);
}

function XhitsY(xPos, yPos, xR, yR) {
    if (dist(xPos.x, xPos.y, yPos.x, yPos.y) <= xR + yR) {
        return true;
    }
}

function hitsAnyEnemy(OBJECTX, OBJECTY, OBJECTR, Skip) {
    for (x in enemies) {
        if (XhitsY(createVector(OBJECTX, OBJECTY), enemies[x].pos, OBJECTR, enemies[x].r)) {
            if (enemies[x].pos !== Skip) { //When making sure an enemy isn't going to collide with another enemy, skip is used to make sure that the enemy isn't taking into account itself.
                return true;
            }
        }
    }
    return false;
}

function inScreen(x, y, r) {
    if ((x + r) * P > width || (x - r) * P < 0 || (y + r) * P > height * P || (y - r) * P < 0) {
        return false;
    }
    return true;
}