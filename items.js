class StatItem {
    constructor(pickedUp, reload, damage, health, speed, bulletSpeed, range, size, ammo, name, desc, image, itemNumber) {
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
        this.itemNumber = itemNumber;
    }
}

class PassiveItem {
    constructor(pickedUp, storedNumA, storedNumB, storedNumC, name, desc, img, itemNumber) {
        this.pickedUp = pickedUp;
        this.SNA = storedNumA;
        this.SNB = storedNumB;
        this.SNC = storedNumC;
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.itemNumber = itemNumber + STATITEMS.length;
    }
}

function gainItem() {
    let Count = 1;
    let RS = ((floor.seed * Count) % player.Stats.Items.length);
    if(floor.rooms[floor.playerInside.x][floor.playerInside.y].seed%2==0){
        RS = ((floor.seed * Count) % player.passives.length);
        while (player.passives[RS].pickedUp) {
            Count++;
            RS = ((floor.seed * Count) % player.passives.length);

            if (Count > 25) {
                RS = Math.floor(random(0, player.passives.length))
            }
        }
        player.passives[RS].pickedUp = true;

        player.Stats.newestItem = player.passives[RS];
    }else{
        
        while (player.Stats.Items[RS].pickedUp) {
            Count++;
            RS = ((floor.seed * Count) % player.Stats.Items.length);

            if (Count > 25) {
                RS = Math.floor(random(0, player.Stats.Items.length))
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

        
    }
    
    player.Stats.itemReceiveTime = interval;
}

//-rl-dmg-hp-sp-blsp-rng-sz-ammo-------------------------------------------------
let STATITEMS = [
    slickOil = new StatItem(false, 1.25, 1, 1, 1, 1, 1, 1, 1, "Slick Oil", "Bullets slide in like butter", 0, 1),
    fruitsnveggies = new StatItem(false, 1, 1.1, 1.15, 1, 1, 1, 1, 1, "fruits 'n veggies", "Help you grow", 0, 2),
    rollerBlades = new StatItem(false, 1, 1, 1, 1.2, 1, 1, 1, 1, "Roller Blades", "Skating > Walking", 0, 3),
    barrelBloater = new StatItem(false, 1, 1, 1, 1, 1, 1, 1.5, 1, "Barrel Bloater", "Bigger bullets", 0, 4),
    monocle = new StatItem(false, 1, 1, 1, 1, 1, 1.15, 1, 1, "Monocle", "Helps you shoot", 0, 5),
    proteinMix = new StatItem(false, 1, 1, 1.25, 1, 1, 1, 1, 1, "Protein Mix", "Add some protein", 0, 6),
    olympicMedal = new StatItem(false, 1, 1, 1, 1.2, 1.5, 1, 1, 1, "Olympic Medal", "Herculian speeds", 0, 7),
    goldBullets = new StatItem(false, 0.8, 1.5, 1, 1, 0.66, 1, 1, 1, "Gold Bullets", "Touched by the King", 0, 8),
    rocketPropellers = new StatItem(false, 1, 1.05, 1, 1, 1.5, 1.25, 1, 1, "Rocket Propellers", "Requires a rocket scientist", 0, 9)
];

let PASSIVEITEMS = [
    bottledRage = new PassiveItem(false, 1, 0, 0, "Bottled Rage", "My pain is your pain", 0, 1),
    lotsOfBullets = new PassiveItem(false, 1, 0, 0, "Lots of Bullets", "More Bullets, More Damage", 0, 2),
    emergencyAmmo = new PassiveItem(false, 2, 0, 0, "Emergency Ammo", "Reloads two empty guns", 0, 3),
    livingBullets = new PassiveItem(false, 0, 0, 0, "Living Bullets", "Watch them grow", 0, 4),
    
];

function passiveCheck() {
    if (player.passives[0].pickedUp) { //Bottled Rage
        player.Stats.damage = Math.floor(player.Stats.damage / player.passives[0].SNA * 1000) / 1000;
        player.passives[0].SNA = Math.floor((player.MAXHP/player.HP) * 100) / 150;
        if(player.passives[0].SNA<1){player.passives[0].SNA=1;}else if(player.passives[0].SNA>4){player.passives[0].SNA=4;}
        player.Stats.damage = Math.floor(player.Stats.damage * player.passives[0].SNA * 1000) / 1000;
    }
    if (player.passives[1].pickedUp) { //Lots of Bullets
        player.Stats.damage = Math.floor(player.Stats.damage / player.passives[1].SNA * 1000) / 1000;
        player.passives[1].SNA = (Math.floor((Pbullets.length + Ebullets.length) * 100) / 2000 )+ 1;
        if(player.passives[1].SNA<1){player.passives[1].SNA=1;}else if(player.passives[1].SNA>4){player.passives[1].SNA=4;}
        player.Stats.damage = Math.floor(player.Stats.damage * player.passives[1].SNA * 1000) / 1000;
    }
    if (player.passives[2].pickedUp) { //Emergency Ammo
        if (player.Stats.CurrentWeapon.ammo == 0 && player.passives[2].SNA > 0) {
            player.passives[2].SNA -= 1;
            player.Stats.CurrentWeapon.ammo = player.Stats.CurrentWeapon.maxAmmo
        }
    }
    if (player.passives[3].pickedUp) { //Living Bullets
        for(bbb in Pbullets){
            if(player.Stats.CurrentWeapon.name == "Seedling Shooter"){Pbullets[bbb].r += 1/(0.3/(Math.floor(((player.Stats.speed/10)+player.Stats.CurrentWeapon.speed)/0.2)/10));}else{//Seedling Shooter Synergy
                Pbullets[bbb].r += 1/(0.8/(Math.floor(((player.Stats.speed/10)+player.Stats.CurrentWeapon.speed)/0.2)/10));//Adjusts growth so that slower bullets don't grow more and faster bullets do
            }
            
        }
    }
}