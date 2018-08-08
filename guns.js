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
            let pushBackDIR;
            switch (this.name) {
                case "Shotgun":
                    this.reload = 0.5;
                    //Loops and shoots 7 bullets with SG, start rotated -15 degrees and adds 5 per shot
                    for (let sg = 0; sg < 7; sg++) {
                        Pbullets.push(new Bullet(player.Stats.size * this.size, player.Stats.damage * this.damage, player.Stats.speed * this.speed, player.Stats.range * this.range, RotateVector(FindPlayerDirection(), ((5 * sg) - 15) + random(-7, 7)), this.color, createVector(player.pos.x, player.pos.y), this.penetrative, this.explosion));
                    }
                    pushBack(15*P);
                    break;
                case "Quad Shotgun":
                    this.reload = 0.5;
                    //Loops and shoots 14 bullets with SG, start rotated -15 degrees and adds 2.5 per shot
                    for (let qsg = 0; qsg < 14; qsg++) {
                        Pbullets.push(new Bullet(player.Stats.size * this.size, player.Stats.damage * this.damage, player.Stats.speed * this.speed, player.Stats.range * this.range, RotateVector(FindPlayerDirection(), ((2.5 * qsg) - 15) + random(-5, 5)), this.color, createVector(player.pos.x, player.pos.y), this.penetrative, this.explosion));
                    }
                    
                    pushBack(30*P);
                    break;
                case "Deagle":
                    pushBack(5*P);Pbullets.push(new Bullet(player.Stats.size * this.size, player.Stats.damage * this.damage, player.Stats.speed * this.speed, player.Stats.range * this.range, FindPlayerDirection(), this.color, createVector(player.pos.x, player.pos.y), this.penetrative, this.explosion));
                    break;
                default:
                    Pbullets.push(new Bullet(player.Stats.size * this.size, player.Stats.damage * this.damage, player.Stats.speed * this.speed, player.Stats.range * this.range, FindPlayerDirection(), this.color, createVector(player.pos.x, player.pos.y), this.penetrative, this.explosion));
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
    return new Gun("Pistol", 1.5, 1, 1, 1, 1, "yellow", 150, 0, 0);
}
MachineGun = function () {
    return new Gun("Machine Gun", 6, 0.25, 1.25, 1, 0.75, "yellow", 700, 0, 0);
}
Shotgun = function () {
    return new Gun("Shotgun", 0.5, 0.75, 1, 0.75, 0.66, "yellow", 125, 0, 0);
}
SniperRifle = function () {
    return new Gun("Sniper Rifle", 0.33, 8, 3, 3, 0.75, "yellow", 45, true, 0);
}
AssaultRifle = function () {
    return new Gun("Assault Rifle", 3, 0.75, 1.5, 1.5, 0.75, "yellow", 225, 0, 0);
}
Bazooka = function () {
    return new Gun("Bazooka", 0.125, 12, 4, 3, 2.5, "yellow", 75, 0, new exploOBJ(60, 2));
}

let OneGuns = [
    
    new Gun("Crossbow", 0.8, 2.5, 1.6, 1.2, 1.4, "yellow", 100, false, 0),

    new Gun("Mini Gun", 5, 0.5, 1.25, 1, 1, "yellow", 500, 0, false),

    new Gun("Fire Hose", 15, 0.2, 0.5, 1.5, 0.8, "blue", 1500, 0, false),

    new Gun("Quad Shotgun", 0.5, 0.66, 1, 0.75, 0.66, "yellow", 75, 0, false),

    new Gun("Precision Sniper", 0.33, 14, 3, 3, 0.75, "yellow", 30, true, 0),

    new Gun("Rapid Fire RPG", 0.5, 6, 4, 3, 2.5, "yellow", 100, 0, new exploOBJ(60, 2)),

    new Gun("Seedling Shooter", 3, 0.75, 1.25, 1, 0.75, "brown", 200, true, false),

    new Gun("Deagle", 1.5, 3, 1.1, 1, 1, "yellow", 100, false, false)
];
GodGun = function () {
    return new Gun("God Gun", 60, 150, 6, 10, 8, "yellow", 100000000, 0, 0);
}



function gainGun(level){
    let Rgun;
    switch(level){
        case 1:
            Rgun = Math.floor(random(0,OneGuns.length));
            player.Stats.offeredGun = OneGuns[Rgun];
            break;
    }

}
function pushBack(mag){ //Creates a kickback effect with certain guns
    return player.pos.add(createVector(-FindPlayerDirection().x, -FindPlayerDirection().y).setMag(mag));
}