class Obstacle {
    constructor(high, x, y, width, height) {
        this.high = high;
        this.pos = createVector(x, y);
        this.w = width;
        this.h = height;
        this.show = function () {
            if (this.high) {
                fill(250, 250, 50, 180)
            } else {
                fill(250, 250, 50, 33)
            }
            rect(this.pos.x * P, this.pos.y * P, this.w * P, this.h * P);
        }
    }
}

function hittingObstacles(x, y, r) {
    let circle = {
        pos: createVector(x, y),
        r: r
    }
    for (LO in lowobstacles) {
        if (RectCircleColliding(circle, lowobstacles[LO])) {
            return true;
        }
    }
    for (HO in highobstacles) {
        if (RectCircleColliding(circle, highobstacles[HO])) {
            return true;
        }
    }
    return false;
}

function putUpObs(floor, seed) {
    switch (floor+"-"+seed) {
        case "1-1":
            if(floor.seed%15<8){
                twoTall(false, 300);
            }
            break;
        case "1-2":
            if(floor.seed%2==1){
                twoWide(true, 200);
            }
            break;
        case "1-6":
            fourPillars();
            break;
        case "1-9":
            twoWide(false, 250);
            break;
        case "1-11":
            if(floor.seed%8>2){
                fourPillars();
            }
            break;
        case "1-18":
            twelvePillars();
            break;
        case "2-2":
            if(floor.seed%15<8){
                twoTall(false, 300);
            }else{
                twoWide(true, 200);
            }
            break;
        case "2-3":
            if(floor.seed%8<3){
                fourPillars();
            }
            break;
        case "2-9":
            if(floor.seed%2==0){
                centerPillar();
            }
            break;
        case "2-11":
            if(floor.seed%2==1){
                twoWide(true, 200);
            }
            break;
        case "2-13":
            tallAndWide(true, 300, 200);
            break;
        case "2-14":
            twelvePillars();
            break;
        case "2-18":
            twoWide(false, 200);
            break;
        case "2-3B":
            if(floor.seed%2==1){
                centerPillar();
            }
            break;
    }
}

function twoWide(high, distance) {
    if(high){
        highobstacles.push(new Obstacle(high, 400, distance / P, 1120, 25 / P));
        highobstacles.push(new Obstacle(high, 400, (1075 - distance) / P, 1120, 25 / P));
    }else{
        lowobstacles.push(new Obstacle(high, 400, distance / P, 1120, 25 / P));
        lowobstacles.push(new Obstacle(high, 400, (1075 - distance) / P, 1120, 25 / P));     
    }
    
}

function twoTall(high, distance) {
    if(high){
        highobstacles.push(new Obstacle(high, distance, 200 / P, 25, 700 / P));
        highobstacles.push(new Obstacle(high, 1895 - distance, 200 / P, 25, 700 / P));
    }else{
        lowobstacles.push(new Obstacle(high, distance, 200 / P, 25, 700 / P));
        lowobstacles.push(new Obstacle(high, 1895 - distance, 200 / P, 25, 700 / P));
    }

    
}

function tallAndWide(high, distanceX, distanceY){
    if(high){
        highobstacles.push(new Obstacle(high, 600, distanceY / P, 720, 25 / P));
        highobstacles.push(new Obstacle(high, 600, (1075 - distanceY) / P, 720, 25 / P));
        highobstacles.push(new Obstacle(high, distanceX, 300 / P, 25, 500 / P));
        highobstacles.push(new Obstacle(high, 1895 - distanceX, 300 / P, 25, 500 / P));
    }else{
        lowobstacles.push(new Obstacle(high, 600, distanceY / P, 720, 25 / P));
        lowobstacles.push(new Obstacle(high, 600, (1075 - distanceY) / P, 720, 25 / P));     
        lowobstacles.push(new Obstacle(high, distanceX, 300 / P, 25, 500 / P));
        lowobstacles.push(new Obstacle(high, 1895 - distanceX, 300 / P, 25, 500 / P));
    }
}
function fourPillars() {
    highobstacles.push(new Obstacle(true, 175, 175 / P, 150, 150));
    highobstacles.push(new Obstacle(true, 1445, 175 / P, 150, 150));
    highobstacles.push(new Obstacle(true, 175, 775 / P, 150, 150));
    highobstacles.push(new Obstacle(true, 1445, 850 / P, 150, 150));
}

function twelvePillars() {
    highobstacles.push(new Obstacle(true, 350, 297 / P, 75, 75));
    highobstacles.push(new Obstacle(true, 350, 517 / P, 75, 75));
    highobstacles.push(new Obstacle(true, 350, 737 / P, 75, 75));
    highobstacles.push(new Obstacle(true, 737, 297 / P, 75, 75));
    highobstacles.push(new Obstacle(true, 737, 517 / P, 75, 75));
    highobstacles.push(new Obstacle(true, 737, 737 / P, 75, 75));
    highobstacles.push(new Obstacle(true, 1087, 297 / P, 75, 75));
    highobstacles.push(new Obstacle(true, 1087, 517 / P, 75, 75));
    highobstacles.push(new Obstacle(true, 1087, 737 / P, 75, 75));
    highobstacles.push(new Obstacle(true, 1473, 297 / P, 75, 75));
    highobstacles.push(new Obstacle(true, 1473, 517 / P, 75, 75));
    highobstacles.push(new Obstacle(true, 1473, 737 / P, 75, 75));
}
function centerPillar(){
    highobstacles.push(new Obstacle(true, 420, 200/P, 1080, 700/P));
}