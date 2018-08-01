Red = function (startPos) {
    enemies.push(new Enemy("Red", "Circle", 15, 3, "Follow", 1, 3, startPos, "red", 0, 0, false));
}
Blue = function (startPos) {
    enemies.push(new Enemy("Blue", "Circle", 15, 1.5, "FollowShoot", 0, 2, startPos, "blue", "Basic", new Bullet(5, 1, 3, 200, false, "blue", 0, false, false), false));
}
Green = function (startPos) {
    enemies.push(new Enemy("Green", "Circle", 15, 2, "Encircle", 1, 4, startPos, "green", false, false, false));
}
Orange = function (startPos) {
    enemies.push(new Enemy("Orange", "Circle", 15, 5, "RandomA", 1.5, 2, startPos, "orange", false, false, false));
}
Teal = function (startPos) {
    enemies.push(new Enemy("Teal", "Circle", 15, 1.5, "FollowShootShotG", 0, 2, startPos, "teal", "Basic", new Bullet(5, 0.5, 3, 200, false, "teal", 0, false, false), false));
}
Pink = function (startPos){
    enemies.push(new Enemy("Pink", "FourCircle", 15, 1, "FollowFourShoot", 0, 2, startPos, "pink", "Up", new Bullet(5, 1, 2, 200, false, "pink", 0, false, false), false));
}
Bully = function (startPos) {
    enemies.push(new Enemy("Bully", "Bully", 20, 3.5, "Follow", 1.51, 4, startPos, "red", 0, 0, false));
}
Eyeman = function (startPos) {
    enemies.push(new Enemy("Eyeman", "Eye", 20, 0, "Sentry", 0, 3, startPos, "green", "Basic", new Bullet(5, 1, 10, 400, false, "green", 0, false, false), false));
}
Tinman = function (startPos) {
    enemies.push(new Enemy("Tinman", "Circle", 35, 0.8, "Follow", 3, 10, startPos, "light grey", 0, 0, false));
}
BlueV = function (startPos){
    enemies.push(new Enemy("BlueV", "CircleV", 25, 1.2, "FollowShootV", 0, 6, startPos, "blue", "Basic", new Bullet(8, 2, 7.5, 300, false, "blue", 0, false, false), false));
}













//      Bosses-------------------------------------------------------------------------------------------



Sixy = function (startPos){
    enemies.push(new Enemy("Sixy", "Sixy", 160, 1, "Sixy", 3, 50, startPos, "pink", "Up", new Bullet(7.5, 1.5, 10, 800, false, "pink", 0, false, false), false));
}
DarkHorse = function(startPos){
    enemies.push(new Enemy("Dark Horse", "Dark Horse", 40, 12, "Dark Horse", 2, 10, startPos, "dark grey", 0, 0, false));
}
RedPappa = function(startPos){
    enemies.push(new Enemy("Red Pappa", "Red Pappa", 80, 2, "Red Pappa", 2, 30, startPos, "red", 0, 0, false));
}
    RedFast = function (startPos) {
        enemies.push(new Enemy("Red", "Circle", 15, 5, "Follow", 1, 1.5, startPos, "red", 0, 0, false));
    }
