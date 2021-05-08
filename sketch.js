var backImage,backgr;
var player, player_running;
var ground,ground_img;
var FoodGroup, ObstacleGroup;
var score = 0;
var END =0;
var PLAY =1;
var gameState = PLAY;
var gameOverImage;
var gameOver;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banananImage = loadImage("banana.png")
  stoneImage = loadImage("stone.png")
  gameOverImage=loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  // background
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  //player
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  //ground
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

   gameOver=createSprite(400,200,10,20);
   gameOver.addImage("silas",gameOverImage)

  FoodGroup = new Group();
  ObstacleGroup = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  //reset background
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach()
    score = score + 2
    player.scale+= + 0.1
  }
    gameOver.visible = false
    
  //collideing player to ground 
    player.collide(ground);
    spawnFood();
    spawnObstical();

    // player jump
    if(keyDown("space") ) {
     player.velocityY = -12;
   }
    //making gravity effect
    player.velocityY = player.velocityY + 0.8;
  }

  //starting of gamestate End
   if(ObstacleGroup.isTouching(player)){
     gameState = END;
   }
    if(gameState === END){
     backgr.velocityX = 0;
     player.visible = false;
     FoodGroup.destroyEach();
     ObstacleGroup.destroyEach();
     gameOver.visible=true
     
      
   }


  drawSprites();
}

function spawnFood(){
  if (frameCount%80 === 0){
    var bananan = createSprite(600,250,40,10);
    bananan.y = random(120,200);
    bananan.addImage(banananImage);
    bananan.scale = 0.08;
    bananan.velocityX = -4;

    bananan.lifetime = 300;
    player.depth = bananan.depth + 1;
    FoodGroup.add(bananan);
  }
}


function spawnObstical(){
  if (frameCount%160 === 0){
     var stone = createSprite(300,300,40,10);
   
     stone.addImage(stoneImage);
     stone.scale = 0.2;
     stone.velocityX = -4
     console.log(stone.x);
     player.depth = stone.depth + 1;
     stone.lifetime = 600
     ObstacleGroup.add(stone);
  }
}