class Floor {
    constructor(lvl, type) {
        this.level = lvl;
        this.type = type;
        this.keys = [];
        this.item = [];
        this.rooms = [];
        this.seed = Math.floor(random(1000, 10000));
        this.floorL = 4;
        this.floorH = 3;
        this.playerInside = createVector(0, 0);
        this.createRooms = function () {
            let RSEED;
            for (let xr = 0; xr < this.floorL; xr++) {
                this.rooms[xr] = [];
                for (let yr = 0; yr < this.floorH; yr++) {
                    switch (xr + yr) {
                        case 0:
                            RSEED = Math.floor(random(1, 6));
                            break;
                        case 1:
                            RSEED = Math.floor(random(1, 6));
                            break;
                        case 2:
                            RSEED = Math.floor(random(6, 11));
                            break;
                        case 3:
                            RSEED = Math.floor(random(11, 16));
                            break;
                        case 4:
                            RSEED = Math.floor(random(16, 21));
                            break;
                        case 5:
                            RSEED = Math.floor(random(1, 4)) + "B";
                            break;
                    }


                    this.rooms[xr][yr] = new Room(this.level, RSEED, "n", xr, yr);

                    if (xr == 0 && yr == 0) {
                        this.rooms[xr][yr].playerInside = true;
                    } else if (xr == this.floorL - 1 && yr == this.floorH - 1) {
                        this.rooms[xr][yr].type = "n";
                    }

                }
            }
            let KKEY, TRE, EMPTY;
            this.rooms[0][0].type = "entrance";
            this.rooms[this.floorL - 1][this.floorH - 1].type = "boss";

            while (this.keys.length < 3) { // Chooses a random room, if it's unused, put a key in it.
                KKEY = createVector(Math.floor(random(0, this.floorL)), Math.floor(random(0, this.floorH)))
                if (this.rooms[KKEY.x][KKEY.y].type == "n") {
                    this.keys.push(KKEY);
                    this.rooms[KKEY.x][KKEY.y].type = "key";
                }
            }
            while (true) { // Same as above but for items
                TRE = createVector(Math.floor(random(0, this.floorL)), Math.floor(random(0, this.floorH)))
                if (this.rooms[TRE.x][TRE.y].type == "n") {

                    this.rooms[TRE.x][TRE.y].type = "item";
                    break;
                }
            }
            while (true) { // Creates the empty room, and the removes the entrances from other rooms
                EMPTY = createVector(Math.floor(random(0, this.floorL)), Math.floor(random(0, this.floorH)));
                console.log(EMPTY);
                if (this.rooms[EMPTY.x][EMPTY.y].type == "n") {

                    this.rooms[EMPTY.x][EMPTY.y].type = "empty";
                    if(EMPTY.x>0){
                        console.log(this.rooms[EMPTY.x-1][EMPTY.y].exits)
                        for(let Er = 0; Er < this.rooms[EMPTY.x-1][EMPTY.y].exits.length; Er++){
                            if(this.rooms[EMPTY.x-1][EMPTY.y].exits[Er].direction=="r"){this.rooms[EMPTY.x-1][EMPTY.y].exits.splice(Er,1)}
                        }
                    }
                    if(EMPTY.x<this.floorL-1){
                        for(let El = 0; El < this.rooms[EMPTY.x+1][EMPTY.y].exits.length; El++){
                            if(this.rooms[EMPTY.x+1][EMPTY.y].exits[El].direction=="l"){this.rooms[EMPTY.x+1][EMPTY.y].exits.splice(El,1)}
                        }
                    }
                    if(EMPTY.y>0){
                        for(let Ed = 0; Ed < this.rooms[EMPTY.x][EMPTY.y-1].exits.length; Ed++){
                            if(this.rooms[EMPTY.x][EMPTY.y-1].exits[Ed].direction=="d"){this.rooms[EMPTY.x][EMPTY.y-1].exits.splice(Ed,1)}
                        }
                    }
                    if(EMPTY.y<this.floorH-1){
                        for(let Eu = 0; Eu < this.rooms[EMPTY.x][EMPTY.y+1].exits.length; Eu++){
                            if(this.rooms[EMPTY.x][EMPTY.y+1].exits[Eu].direction=="u"){this.rooms[EMPTY.x][EMPTY.y+1].exits.splice(Eu,1)}
                        }
                    }
                    break;
                }
            }

        }
        this.showMiniMap = function () {
        
            for (let xr = 0; xr < 4; xr++) {
                for (let yr = 0; yr < 3; yr++) {
                    rectMode(CORNER);
                    if (!this.rooms[xr][yr].completed) {
                        fill(200)
                    } else {
                        fill(180, 180, 15);
                    }
                    strokeWeight(1 * P)
                    stroke(255);
                    if(this.rooms[xr][yr].type != "empty"){
                        rect(1750 * P + (xr * 32 * P), 1000 * heightP + (yr * 24 * heightP), 30 * P, 22 * heightP);
                    }
                    

                    if (this.rooms[xr][yr].type == "key") {
                        push();
                        fillSet("white");
                        stroke(0);
                        strokeWeight(1.5 * P);
                        rect(1774 * P + (xr * 32 * P), 1009.5 * heightP + (yr * 24 * heightP), 2.5 * P, 10 * P);
                        rect(1770 * P + (xr * 32 * P), 1009.5 * heightP + (yr * 24 * heightP), 2.5 * P, 10 * P);
                        strokeWeight(2 * P);
                        
                        rectMode(CENTER);



                        rect(1770 * P + (xr * 32 * P), 1012 * heightP + (yr * 24 * heightP), 12.5 * P, 5 * P);
                        ellipse(1758 * P + (xr * 32 * P), 1024 * heightP + (yr * 24 * heightP) - 11.5 * heightP, 11 * P, 11 * P);



                        pop();
                    }
                    if (this.rooms[xr][yr].type === "item") {
                        push();
                        fillSet("yellow");
                        noStroke();
                        rectMode(CENTER);
                        star(1765 * P + (xr * 32 * P), 1011 * heightP + (yr * 24 * heightP), 5*P, 10*P, 5);
                        pop();
                    }
                    if (this.rooms[xr][yr].type === "boss"){
                        fillSet("red");
                        fillSet(this.color);
                        noStroke();
                        let POS = createVector(1765 * P + (xr * 32 * P), 1013 * heightP + (yr * 24 * heightP));

                        ellipse(POS.x, POS.y, 7.5 * 2 * P, 7.5 * 2 * P);
                        triangle((POS.x - 30 * 7.5 / 20), (POS.y - 30 * 7.5 / 20), (POS.x - 15 * 7.5 / 20), (POS.y - 7.5 * 7.5 / 20), (POS.x - 7.5 * 7.5 / 20), (POS.y - 15 * 7.5 / 20));
                        triangle((POS.x + 30 * 7.5 / 20), (POS.y - 30 * 7.5 / 20), (POS.x + 15 * 7.5 / 20), (POS.y - 7.5 * 7.5 / 20), (POS.x + 7.5 * 7.5 / 20), (POS.y - 15 * 7.5 / 20));
                    }
                    if (this.rooms[xr][yr].playerInside) {
                        stroke(0);
                        strokeWeight(2*P);
                        fillSet(player.color);
                        ellipse(1765 * P + (xr * 32 * P), 1011 * heightP + (yr * 24 * heightP), 15 * P, 15 * P);
                    }
                }
            }
        }
    }
}
class Room {
    constructor(CurrentFloor, EnemySeed, type, X, Y) {
        this.completed = false;
        this.floor = CurrentFloor;
        this.seed = EnemySeed;
        this.type = type;
        this.playerInside = false;
        this.X = X;
        this.Y = Y;
        this.exits = [];
        if (X > 0) {
            this.exits.push(new Exit(this.X, this.Y, "l"));
        }
        if (X < floor.floorL - 1) {
            this.exits.push(new Exit(this.X, this.Y, "r"));
        }
        if (Y > 0) {
            this.exits.push(new Exit(this.X, this.Y, "u"));
        }
        if (Y < floor.floorH - 1) {
            this.exits.push(new Exit(this.X, this.Y, "d"));
        }
        if (X == floor.floorL - 1 && Y == floor.floorH - 1) {
            this.exits.push(new Exit(this.X, this.Y, "nf"));
        } // Next floor
    }
}
class Exit {
    constructor(roomX, roomY, direction) {
        this.roomX = roomX;
        this.roomY = roomY;
        this.direction = direction;
        this.pos;
        this.width;
        this.height;
        this.leadsToX = roomX;
        this.leadsToY = roomY;
        this.active = false;
        this.locked;
        if ((roomX == floor.floorL - 2 && roomY == floor.floorH - 1 && direction == "r") || (roomY == floor.floorH - 2 && roomX == floor.floorL - 1 && direction == "d")) {
            this.locked = true;
        } else {
            this.locked = false;
        }
        switch (direction) {
            case "l": //Left
                this.pos = createVector(0, (height / 2 - 50) / P); //Top-left Corner
                this.width = 20;
                this.height = 100;
                this.leadsToX -= 1;
                break;
            case "r": //Right
                this.pos = createVector(1900, (height / 2 - 50) / P); //Top-left Corner
                this.width = 20;
                this.height = 100;
                this.leadsToX += 1;
                break;
            case "u": //Up
                this.pos = createVector(910, 0); //Top-left Corner
                this.width = 100;
                this.height = 20;
                this.leadsToY -= 1;
                break;
            case "d": //Down
                this.pos = createVector(910, (height - 20) / P); //Top-left Corner
                this.width = 100;
                this.height = 20;
                this.leadsToY += 1;
                break;
            case "nf": //Next Floor
                this.pos = createVector((width - 170) / P, (height/2)/P); //TL corner
                this.width = 20;
                this.height = 100;
                this.leadsToX = 0;
                this.leadsToY = 0;
                break;
        }
        this.show = function () {
            if (this.active) {

                noStroke();
                if (this.locked) {
                    fill(250, 80, 80, 50);
                } else {
                    fill(80, 250, 80, 50);
                }
                rect(this.pos.x * P, this.pos.y * P, this.width * P, this.height * P);
            }
        }
        this.playerHit = function () {
            if (player.pos.x + player.r > this.pos.x && player.pos.x - player.r < this.pos.x + this.width && player.pos.y + player.r > this.pos.y && player.pos.y - player.r < this.pos.y + this.height && this.active && !this.locked) {
                if(direction!="nf"||(floorTime>=21600&&floorTime<=21780)){
                    
                    floor.rooms[floor.playerInside.x][floor.playerInside.y].playerInside = false;
                    floor.playerInside.x = this.leadsToX;
                    floor.playerInside.y = this.leadsToY;
                    floor.rooms[floor.playerInside.x][floor.playerInside.y].playerInside = true;
                    switch (direction) {
                        case "r":
                            player.pos = createVector(player.r + this.width, 550);
                            break;
                        case "l":
                            player.pos = createVector(1920 - (player.r + this.width), 550);
                            break;
                        case "u":
                            player.pos = createVector(960, 1100 - (this.height + player.r));
                            break;
                        case "d":
                            player.pos = createVector(960, player.r + this.height);
                            break;
                        case "nf":
                            newFloor();
                            break;
                    }

                    enemies = [];
                    lowobstacles = [];
                    highobstacles = [];
                    putUpObs(floor.level, floor.rooms[floor.playerInside.x][floor.playerInside.y].seed);
                    if (!floor.rooms[floor.playerInside.x][floor.playerInside.y].completed) {
                        Roomstart(floor.level, floor.rooms[floor.playerInside.x][floor.playerInside.y].seed, direction);
                    }
                }
                

            }
        }
    }
}

function EnemySpawnPos() {
    let a = createVector(random(0, 1920), random(0, 1100));
    if (XhitsY(a, player.pos, 5, 100)) {

    }
}

function revealExits() {
    for (n in floor.rooms[floor.playerInside.x][floor.playerInside.y].exits) {
        floor.rooms[floor.playerInside.x][floor.playerInside.y].exits[n].active = true;
    }

}
function newFloor(){
    floor = new Floor(floor.level+1, 0);
    floorTime = 0;
    floor.createRooms();
    player.pos = createVector(1920 / 2, 100);
}
function unlockAll() {
    for (EX in floor.rooms) {
        for (EY in floor.rooms[EX]) {
            for (EE in floor.rooms[EX][EY].exits) {
                floor.rooms[EX][EY].exits[EE].locked = false;
            }
        }
    }
}