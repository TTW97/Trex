//This creates the variables for the trex, ground, invisible ground, and clouds

var PLAY = 1;
var END = 0;
var gameState = PLAY;

let checkpoint, die, jump;

var trex, trex_running, trex_collided, ground, invis_ground, ground_img, cloud, cloud_img, cloud_group, ob1, ob2, ob3, ob4, ob5, ob6, obstaclegroup, score,game_over, over_img, restart, restart_img;

//This is the function preload which loads sound and images
function preload() {
  
  //this loads and animation for the trex so the 3 images will play
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  //These 3 lines will load the image for the trex, groud, and cloud
  trex_collided = loadImage("trex_collided.png");
  
  ground_img = loadImage("ground2.png");
  
  cloud_img = loadImage("cloud.png");
  
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  
  restart_img = loadImage("restart.png");
  
  over_img = loadImage("gameOver.png");
  
  checkpoint = loadSound('checkPoint.mp3');
  
  die = loadSound('die.mp3');
  
  jump = loadSound('jump.mp3');

  
}


//This is the function setup which does everything once before the draw function
function setup() {
  //This creates the Canvas size
  createCanvas(600, 200);
  
  //The trex is now a sprite, with an animation, and scale
  trex = createSprite(50,175,20,20);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide", trex_collided);
  trex.scale = 0.5;
  
  //The ground is now a sprite with an animation
  ground = createSprite(300,190,10,10);
  ground.addAnimation("ground", ground_img);
  
  //The invisible ground is now a sprite with an animation
  invis_ground = createSprite(300,199,600,1);
  invis_ground.visible = false;
  
  //This creates a group for the clouds to be in
  cloud_group = new Group();
  
  obstaclegroup = new Group();
  
  score = 0;
  
  restart = createSprite(300,100,20,20);
  restart.addImage(restart_img);
  restart.scale = 0.5;
  restart.visible = false;
  
  game_over = createSprite(300,50,20,20);
  game_over.addImage(over_img);
  game_over.scale = 0.5;
  game_over.visible = false;
  
}

//This is the function draw
function draw() {
  
  //This makes the background a different color 
  background('white');
  
  if (gameState === PLAY) {
    
    score = score + (Math.round(getFrameRate() / 60));
    
    if (keyDown("space") && trex.y > 174) { 
    
    trex.velocityY = -12;
    
    jump.play();
    
    }
    
    //This adds gravity to the trex
    trex.velocityY = trex.velocityY + 0.5;
    
    //This add velocity to the ground and makes it go faster
    ground.velocityX = -(6 + ((score / 100) * 2));
    
    if (ground.x < 0) {
    
    ground.x = ground.width / 2;
    
    }
  
    //This call the spawnClouds function
    spawnClouds();
  
    spawnObstacles();
    
    if (score % 100 === 0 && score > 0) {
      
      checkpoint.play();
      
    }
    
    if (obstaclegroup.isTouching(trex)) {
      
      die.play();
      
      gameState = END;
      
      
    }
  
  }
  
  else if (gameState === END) {
    
    restart.visible = true;
    game_over.visible = true;
    
    trex.changeAnimation("collide", trex_collided);
    
    ground.velocityX = 0;
    
    obstaclegroup.setVelocityXEach(0);
    
    cloud_group.setVelocityXEach(0);
    
    trex.velocityY = 0;
    
    obstaclegroup.setLifetimeEach(-1);
    
    cloud_group.setLifetimeEach(-1);
    
    if (mousePressedOver(restart)) {
      
      reset();
    
    }
    
  
  }
  
  text("Score:" + score, 530,20);
  
  trex.collide(invis_ground);
  
 
  //This draws the sprites onto the canvas
  drawSprites();
  
}

//This is the spawnclouds function
function spawnClouds() {
  
  //This executes code every 80 frames
  if (frameCount % 80 === 0) {
    
   // This creats the cloud sprits and adds an image and scales it
    var cloud = createSprite(650,random(50,100),20,20);
    cloud.addImage(cloud_img);
    cloud.scale = 0.5;
    
    //This gives the clouds velocity
    cloud.velocityX = -(6 + ((score / 100) * 3));
    
    //This gives the clouds lifetime
    cloud.lifetime = 600/5 + 20;
    
    //This makes the trex in front of the clouds
    cloud.depth = trex.depth - 1;
    
    //This adds the clouds to the group
    cloud_group.add(cloud);
    
  }
  
  
}

function spawnObstacles() {
  
  if (frameCount % 60 === 0) {
    
    var obstacle = createSprite(650,175,20,20);
    
    var num = Math.round(random(1,6));
    
    //This makes a random obstacle animation here.
    switch(num) {
      
      case 1: obstacle.addImage(ob1);
              break;
      case 2: obstacle.addImage(ob2);
              break;
      case 3: obstacle.addImage(ob3);
              break;
      case 4: obstacle.addImage(ob4);
              break;
      case 5: obstacle.addImage(ob5);
              break;
      case 6: obstacle.addImage(ob6);
              break;
      default: break;
        
    }
    
    obstacle.scale = 0.5;
    
    obstacle.velocityX = -(6 + ((score / 100) * 3));
    
    obstacle.lifetime = 600/5 + 20;
    
    obstaclegroup.add(obstacle);
    
  }
  
  
}

function reset() {
  
  gameState = PLAY;
  
  score = 0;
  
  obstaclegroup.destroyEach();
  cloud_group.destroyEach();
  
  game_over.visible = false;
  restart.visible = false;
  
  trex.changeAnimation("running", trex_running);
  
}
















