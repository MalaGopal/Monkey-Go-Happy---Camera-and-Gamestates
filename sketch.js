var backGround, backGroundimg;
var ground;
var monkey, monkeyimg;
var stone, stoneimg, stonegroup;
var banana, bananagroup, bananaImage;
var score;
var gameState = "play";

function preload() {
  backGroundimg = loadImage("jungle.jpg");
  stoneimg = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
  monkeyimg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

}

function setup() {
  createCanvas(1200, 600);

  backGround = createSprite(300, 300, 600, 800);
  backGround.addImage(backGroundimg);
  backGround.scale = 1.5

  ground = createSprite(200, 550, 400, 10);
  ground.visible = false;

  monkey = createSprite(90, 490, 10, 10);
  monkey.addAnimation("MONKEY", monkeyimg);
  monkey.scale = 0.3;

  bananagroup = new Group();
  stonegroup = new Group();
  count = 0
  score = 0;
}

function draw() {
  background("yellow");
  drawSprites();

  if (gameState === "play") {
    backGround.velocityX = -5;
    camera.y = monkey.y
   
    if (backGround.x < 300) {
      backGround.x = 600;
    }
    
    ground.velocityX = -5;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    
    if (keyDown("space") && monkey.y > 250) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;

    Food();
    spawnObstacles();
    
    if (monkey.isTouching(bananagroup)) {
      score = score + 1;
      switch (score) {
        case 5:
          monkey.scale = 0.2;
          break;
        case 10:
          monkey.scale = 0.3;
          break;
        case 15:
          monkey.scale = 0.4;
          break;
      }
      bananagroup.destroyEach();
    }

    if (stonegroup.isTouching(monkey)) {
      count = count + 1;
      
      stonegroup.destroyEach()
      monkey.scale = 0.1;
    }
    if(count === 1){
        gameState = "end";
      }
  }
  else if(gameState === "end"){
 stroke("black")
    strokeWeight(4)
  fill("red")
  textSize(25);
  text("GAME OVER",300,300);
    
    backGround.velocityX  = 0;
    ground.velocityX = 0
    monkey.destroy()
    bananagroup.setVelocityXEach(0);
    stonegroup.setVelocityXEach(0);
    
    bananagroup.setLifetimeEach(-1);
    stonegroup.setLifetimeEach(-1);

}


  monkey.collide(ground);
  
  console.log(count)

  stroke("black");
  textSize(20);
  fill("black");
  text("Score =" + score, 400, 50);

}


function Food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, Math.round(random(100, 400)), 20, 20);
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.lifetime = 120;
    bananagroup.add(banana);
    banana.debug = false
    banana.setCollider("circle", 0, 0, 40);
  }
}

function spawnObstacles() {
  if (frameCount % 80 === 0) {
    stone = createSprite(600, 520, 20, 20);
    stone.velocityX = -5;
    stone.addImage(stoneimg);
    stone.scale = 0.2;
    stone.lifetime = 120;
    stonegroup.add(stone);
    stone.debug = false;
    stone.setCollider("circle", 0, 0, 30);
  }
}