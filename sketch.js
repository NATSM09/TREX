var trex, trex_running, edges;
var groundImage;
var chao;
var chao_invisivel;
var nuvem_imagem;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var score;
var grupodecactos;
var grupodenuvens;
var play = 1;
var end = 0;
var estadodejogo = play;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  nuvem_imagem = loadImage("cloud.png")
  cacto1 = loadImage("obstacle1.png")
  cacto2 = loadImage("obstacle2.png")
  cacto3 = loadImage("obstacle3.png")
  cacto4 = loadImage("obstacle4.png")
  cacto5 = loadImage("obstacle5.png")
  cacto6 = loadImage("obstacle6.png")
}

function setup(){
  createCanvas(600,200);
  score = 0;
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  grupodecactos = new Group()
  grupodenuvens = new Group()
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  chao = createSprite(200, 180, 400, 20);

  chao.addImage(groundImage);

  chao_invisivel = createSprite (200, 190, 400, 10);
  chao_invisivel.visible = false;
}


function draw(){
  //definir a cor do plano de fundo 
  background(180);
 
  text("pontuaçao: " + score, 500, 50);
  if(estadodejogo === play){
 score = score + Math.round(frameCount/60);
  if(keyDown("space") && trex.y>=100){
    trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.5;
  chao.velocityX = -2;
    if(chao.x <0){
    chao.x = chao.width/2;
  }
    criar_nuvens();

criar_cactos();
if(grupodecactos.isTouching(trex)){
  estadodejogo = end;
}
  }
  else if(estadodejogo === end){
 chao.velocityX = 0;
 grupodecactos.setVelocityXEach(0);
 grupodenuvens.setVelocityXEach(0);
  }
  
 //impedir que o trex caia
  trex.collide(chao_invisivel);

  drawSprites();

}

function criar_nuvens(){

  if(frameCount%60 === 0){

nuvem = createSprite(600, 100, 40, 10);
nuvem.y = Math.round(random(10, 60));
grupodenuvens.add(nuvem)
nuvem.velocityX = -3;
nuvem.addImage(nuvem_imagem);
nuvem.scale = 0.5;
nuvem.depth = trex.depth;
trex.depth += 1;
nuvem.lifetime = 200;
}


}
function criar_cactos(){
  if(frameCount%60 === 0){
    cacto = createSprite(600, 165, 10, 40);
    cacto.velocityX = -6;
    cacto.scale = 0.5;
    cacto.lifetime = 100;
    grupodecactos.add(cacto)
    var sorteio = Math.round(random(1,6));
    switch(sorteio){
      case 1: cacto.addImage(cacto1);
      break;
      case 2: cacto.addImage(cacto2);
      break;
      case 3: cacto.addImage(cacto3);
      break;
      case 4: cacto.addImage(cacto4);
      break; 
      case 5: cacto.addImage(cacto5);
      break;
      case 6: cacto.addImage(cacto6);
      break;
default: break;

    }
  };
}