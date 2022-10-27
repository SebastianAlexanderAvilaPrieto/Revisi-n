var nave, naveImg, espacio, espacioImg;
var m, m1Img, m2Img, m3Img, m4Img;
var nave2, nave2Img, proyectil, proyectilImg;
var score = 0;
var gameState = "PLAY";
var mGroup, pGroup;
var gameOver, gmImg;


function preload(){
    naveImg = loadImage("pngwing.com (33).png");
    espacioImg = loadImage("ESPACIO.jpg");
    m1Img = loadImage("pngwing.com (34).png");
    m2Img = loadImage("pngwing.com (37).png");
    m3Img = loadImage("pngwing.com (38).png");
    m4Img = loadImage("pngwing.com (39).png");
    nave2Img = loadImage("pngwing.com (35).png");
    proyectilImg = loadImage("pngwing.com (36).png");
    gmImg = loadImage("gameOver.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    nave = createSprite(windowWidth/2, windowHeight-30, 1, 1);
    nave.addImage("nave", naveImg);
    nave.scale = 0.05;

    espacio = createSprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    espacio.addImage("espacio", espacioImg);
    mGroup = createGroup();
    pGroup = createGroup();

    gameOver = createSprite(windowWidth/2, windowHeight/2, 1, 1)
    gameOver.addImage("over", gmImg);
    gameOver.visible = false
}

function draw() {

    espacio.depth = nave.depth;
    nave.depth += 1;

    if (gameState == "PLAY") {
        createObs();
        espacio.velocityY= 4;
        if (keyDown("right")) {
            nave.x += 10;
        }
        if (keyDown("left")) {
            nave.x -= 10;
        }
        if (keyDown("up")) {
            nave.y -= 10;
        }
        if (keyDown("down")) {
            nave.y += 10;
        }
    
        if (espacio.y > windowHeight) {
            espacio.y = windowHeight/2;
        }
        if (keyDown("space")) {
            createP();
        }
        if (mGroup.isTouching(nave)) {
            gameState = "END";
        }
    }
    if (gameState == "END") {
        espacio.velocityY = 0;
        gameOver.visible = true;
        nave.destroy();
        mGroup.destroyEach();
        pGroup.destroyEach();
        gameOver.visible = true;
    }

    if (pGroup.isTouching(m)) {
        score += 5;
    }

    drawSprites();
    text("Puntuación: "+ score, windowWidth-150, 50);
}


function createObs() {
    if (frameCount % 60 == 0) {
        m = createSprite(Math.round(random (20, windowWidth - 20)), 200, 1, 1);
        
        var rand = Math.round(random(1, 4));
        switch(rand) {
            case 1: m.addImage(m1Img);
                    break;
            case 2: m.addImage(m2Img);
                    break;
            case 3: m.addImage(m3Img);
                    break;
            case 4: m.addImage(m4Img);
                    break;
            default: break;
          }

          m.velocityY = -4;
          m.scale = 0.03,
          m.lifetime = 200;
          mGroup.add(m);
    }
}



function createP() {
    proyectil = createSprite(100, 100, 1, 11);
    proyectil.x = nave.x;
    proyectil.y = nave.y;
    proyectil.addImage(proyectilImg);
    proyectil.velocityY = -4;
    proyectil.lifetime = 200;
    proyectil.scale = 0.3;
    pGroup.add(proyectil); 
  }