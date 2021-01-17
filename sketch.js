const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var plinkos = [];
var divisions = [];

var particles;
var divisionHeight=300;
var score = 0;
var turn = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;



function setup() {

  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  //creating ground
  ground = new Ground(width/2,height,width,20);

  //creating divisions
   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //1st row of plinkos
  for (var j = 75; j <=width; j=j+50) {
      
    plinkos.push(new Plinko(j,75));
  }

  //2nd row of plinkos
  for (var j = 50; j <=width-10; j=j+50) {

    plinkos.push(new Plinko(j,175));    
  }

  //3rd row of plinkos
  for (var j = 75; j <=width; j=j+50) {

    plinkos.push(new Plinko(j,275));   
  }

  //4th row of plinkos
  for (var j = 50; j <=width-10; j=j+50) {

    plinkos.push(new Plinko(j,375));  
  }
    
}
 


function draw() {

  Engine.update(engine);

  background("black");

  //text
  push();
  textSize(30)
  fill ("white")
  textFont("monoscope")
  text("400",15,550);
  text("400",95,550);
  text("300",95+80,550);
  text("300",95+160,550);
  text("200",95+240,550);
  text("200",95+240+80,550);
  text("500",95+240+160,550);
  text("500",95+320+160,550);
  text("100",95+320+240,550);
  text("100",95+320+320,550);
  text("Score : "+score,20,30);
  pop();
  
  //display ground
  ground.display();
  
  //display divisions
  for (var k = 0; k < divisions.length; k++) {
     
    divisions[k].display();
  }

  //display plinkos
  for (var i = 0; i < plinkos.length; i++) {

    plinkos[i].display();
  }

  //score increases for as per division, gameState changes to END after 5 turns 
  if(particles!=null) {

    particles.display();

    if(particles.body.position.y>760) {

      //score 400.........
      if(particles.body.position.x <170) {
        score=score+400;
        if(turn === 5) {
          gameState=END;
        }
      }
     
      //score 300..........
      if(particles.body.position.x >170 && particles.body.position.x <330) {
         score=score+300;

         if(turn===5) {
           gameState=END;
         }
      }

      //score 200............
      if(particles.body.position.x >330 && particles.body.position.x <490) {
        score=score+200;
        if(turn===5) {
          gameState=END;
        }
      }

      //score 500............
      if(particles.body.position.x >490 && particles.body.position.x <650) {
        score=score+500;
        if(turn===5) {
          gameState=END;
        }
      }

      //score 100............
      if(particles.body.position.x >650) {
        score=score+100;
        if(turn===5) {
          gameState=END;
        }
      }
      particles=null;
    }
  }

  //if gameState changes to END
  if(gameState === END) {
    push();
    textSize(60);
    textFont("monoscope");
    fill("LightGreen");
    stroke("yellow");
    text("GAME OVER",200,250);
    textSize(50);
    textFont("monoscope");
    text("Press Space Key to Restart",100,340)
    pop();
  }


}



//function for falling particles if mouse is pressed 
function mousePressed(){
  if (gameState!== END){
    turn = turn + 1;
    particles=new Particle(mouseX, 10, 10, 10);
  }
}


//function for changing gamestate from END to PLAY
function keyPressed() {
  if(keyCode===32) {
    score=0;
    turn=0;
    gameState=PLAY;
  }
}

