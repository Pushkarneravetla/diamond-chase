var thiefsprite, thiefimage;
var bulletsprite, bulletimage;
var chestsprite, chestimage;
var police_standing_sprite, police_standing_image;
var police_gun_sprite, police_gun_image;
var buildingssprite, buildingsimage;
var bulletGroup, thiefGroup;
var heart_1, heart_2, heart_3, heart_1image, heart_2image, heart_3image;
var lives = 3; 


function preload () {

    thiefimage = loadImage("thief.png");
    bulletimage = loadImage("bullet.png");
    chestimage = loadImage("chest.png");
    police_standing_image = loadImage("policemen_standing.png");
    police_gun_image = loadImage("policemen_with_a_gun.png");
    buildingsimage = loadImage("Background.png");
    heart_1image = loadImage("heart_1.png");
    heart_2image = loadImage("heart_2.png");
    heart_3image = loadImage("heart_3.png");
}

function setup() {
createCanvas(windowWidth, windowHeight);

//buildingssprite = createSprite(550, 360, windowWidth, windowHeight);
//buildingssprite.addImage(buildingsimage);
//buildingssprite.scale = 8;

police_standing_sprite = createSprite(300, 300, 50, 75);
police_standing_sprite.addImage(police_standing_image);
police_standing_sprite.scale = 0.5;


bulletGroup = new Group();
thiefGroup = new Group();
}


function draw () {

    background("grey");
 
    heart_1 = createSprite(windowWidth-250, 40, 20, 20);
    //heart_1.visible = false;
    heart_1.addImage("heart_1.png",heart_1image);
    heart_1.scale = 0.4;

    heart_2 = createSprite(windowWidth-180, 40, 20, 20);
   // heart_2.visible = false;
    heart_2.addImage("heart_2.png",heart_2image);
    heart_2.scale = 0.4;

    heart_3 = createSprite(windowWidth-110, 40, 20, 20);
   // heart_3.visible = false;
    heart_3.addImage("heart_3.png",heart_3image);
    heart_3.scale = 0.4;

    if(lives === 3) {
        heart_3.visible = true;
        heart_2.visible = true;
        heart_1.visible = true;
    }

    
    if(lives === 2) {
        heart_2.visible = true;
        heart_3.visible = false;
        heart_1.visible = true;
    }

    
    if(lives === 1) {
        heart_3.visible = false;
        heart_2.visible = false;
        heart_1.visible = true;
    }



    if(keyDown("UP_ARROW")) {

        police_standing_sprite.y -= 30;

    }

    if(keyDown("DOWN_ARROW")) {

        police_standing_sprite.y += 30;
    }

    if(keyWentDown("space")){
        bulletsprite = createSprite(police_standing_sprite.x, police_standing_sprite.y-30, 20, 10);
        bulletsprite.velocityX = 20;
        bulletGroup.add(bulletsprite);
        bulletsprite.addImage(bulletimage);
        bulletsprite.scale = 0.2;
        police_standing_sprite.addImage(police_gun_image);

    }

    else if(keyWentUp("space")) {
        police_standing_sprite.addImage(police_standing_image)
    }

    if(thiefGroup.isTouching(bulletGroup)) {

        for(var i = 0; i < thiefGroup.length; i = i+1)
         {
            if(thiefGroup[i].isTouching(bulletGroup)){
                thiefGroup[i].destroy();
            bulletGroup[i].destroy();
            }

        }
    }

    if(thiefGroup.isTouching(police_standing_sprite)){

        for(i=0; i<thiefGroup.length; i++) {
    
            if(thiefGroup[i].isTouching(police_standing_sprite)){
            thiefGroup[i].destroy();
    
            lives = lives-1;
        }
        }
    }

  
    drawSprites();
    SpawnThieves();
}


function SpawnThieves() {

    if(World.frameCount % 100 === 0) {
        thiefsprite = createSprite(windowWidth, windowHeight/2, 50, 75);
        thiefsprite.addImage(thiefimage);
        thiefsprite.scale = 0.4;
        thiefsprite.velocityX = -6;
        thiefsprite.y = Math.round(random(50, windowHeight-100));
        thiefsprite.lifetime = 1000;
        thiefGroup.add(thiefsprite);

    }


}

