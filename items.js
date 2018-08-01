class StatItem {
    constructor(pickedUp, reload, damage, health, speed, bulletSpeed, range, size, ammo, name, desc, image) {
        this.pickedUp = pickedUp; //Whether the item's effect has been applied or not.
        this.reload = reload; //Buffs and Nerfs assigned to reload
        this.damage = damage; //How much damage a bullet does on impact
        this.health = health; //Boosts to the HP of the player
        this.speed = speed; //How fast the player moves
        this.bulletSpeed = bulletSpeed; //How fast the bullet moves
        this.range = range; //How far the bullet can travel
        this.size = size; //How big the bullet is
        this.ammo = ammo; //Extra Ammo Guns Start out with
        this.name = name;
        this.desc = desc;
        this.img = image;
    }
}

function gainItem(roomSeed) {
    let Count = 1, RS= ((floor.seed * roomSeed * Count) % player.Stats.Items.length); 
    while (player.Stats.Items[RS].pickedUp) {
        Count++;
        RS = ((floor.seed * roomSeed * Count) % player.Stats.Items.length);
        
        if(Count>25){
            RS = Math.floor(random(0,player.Stats.Items.length))
        }
    }

    player.Stats.Items[RS].pickedUp = true;
    player.Stats.reload = Math.floor(player.Stats.reload * player.Stats.Items[RS].reload * 100) / 100;
    player.Stats.damage = Math.floor(player.Stats.damage * player.Stats.Items[RS].damage * 100) / 100;
    player.MAXHP = Math.floor(player.MAXHP * player.Stats.Items[RS].health * 100) / 100;
    if (player.Stats.Items[RS].health > 1) {
        player.HP = player.MAXHP;
    }
    player.speed = Math.floor(player.speed * player.Stats.Items[RS].speed * 100) / 100;
    player.Stats.speed = Math.floor(player.Stats.speed * player.Stats.Items[RS].bulletSpeed * 100) / 100;
    player.Stats.range = Math.floor(player.Stats.range * player.Stats.Items[RS].range * 100) / 100;
    player.Stats.size = Math.floor(player.Stats.size * player.Stats.Items[RS].size * 100) / 100;
    player.Stats.maxAmmo = Math.floor(player.Stats.maxAmmo * player.Stats.Items[RS].ammo * 100) / 100;



    player.Stats.newestItem = player.Stats.Items[RS];
    player.Stats.itemReceiveTime = interval;
}

//-rl-dmg-hp-sp-blsp-rng-sz-ammo-------------------------------------------------
let STATITEMS = [
    slickOil = new StatItem(false, 1.25, 1, 1, 1, 1, 1, 1, 1, "Slick Oil", "Bullets slide in like butter"),
    fruitsnveggies = new StatItem(false, 1, 1.1, 1.15, 1, 1, 1, 1, 1,"fruits 'n veggies", "Help you grow"),
    rollerBlades = new StatItem(false, 1, 1, 1, 1.2, 1, 1, 1, 1, "Roller Blades", "Skating > Walking"),
    barrelBloater = new StatItem(false, 1, 1, 1, 1, 1, 1, 1.5, 1,"Barrel Bloater", "Bigger bullets"),
    monocle = new StatItem(false, 1, 1, 1, 1, 1, 1.15, 1, 1,"Monocle", "Helps you shoot")
];

