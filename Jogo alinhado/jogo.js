let xBolinha = 300;
let yBolinha = 200;
let diametro = 35;
let velocidadeX = 9;
let velocidadeY = 9;
let xRaquete = 0;
let yRaquete = 200;
let largRaquete = 10;
let comprRaquete = 90;
let x2Raquete = 590;
let y2Raquete = 200;
let largRaquete2 = 10;
let comprRaquete2 = 90;
let placar = 0;
let placar1 = 0;
let jogoPausado = false;

function setup() {
    createCanvas(600, 400);
  }
  
  function draw() {
    if (jogoPausado) {
      background(0);
      fill(255);
      textSize(25);
      text("Jogo pausado. Pressione espaço para continuar.", width / 4 - 150, height / 4);
    }else if(placar>9){
      background(0);
      fill(66, 108, 245);
      textSize(25);
      text("O jogador azul ganhou!!", width / 2 - 150, height / 3);
    }
    else if(placar1>9){
      background(0);
      fill(255,0,0);
      textSize(25);
      text("O jogador vermelho ganhou!!", width / 2.2 - 150, height / 3);
    }
    else{
    
      background(0);
      textFont('Bold');
      textSize(30);
      text(placar, 310, 30);
      fill(255, 255, 255);
      text('-', 299, 30);
      circle(xBolinha,yBolinha,diametro);

      //xBolinha esta adicionando 1 a velocidade
      xBolinha += velocidadeX;
      yBolinha += velocidadeY;
      
      if(xBolinha+17.5 > width || xBolinha-17.5 < 0){
        // || = ou
        // && = e
        velocidadeX *= -1;
      }
      if(yBolinha+17.5 > height || yBolinha-17.5 < 0){
        velocidadeY *= -1;
      }

    // x y largura comprimento
    fill(255, 0, 0); // Vermelho
    text(placar1, 280, 30);
      
    
    rect(xRaquete,yRaquete,largRaquete,comprRaquete);

    if (keyIsDown(87) === true) {
      yRaquete -=12;
    }

    if (keyIsDown(83) === true) {
      yRaquete += 12;
    }
    yRaquete = constrain(yRaquete, 0, height - comprRaquete);
    fill(66, 108, 245);
    rect(x2Raquete,y2Raquete,largRaquete2,comprRaquete2);
    if (keyIsDown(UP_ARROW) === true) {
      y2Raquete -= 12;
    }

    if (keyIsDown(DOWN_ARROW) === true) {
      y2Raquete += 12;
    }
    y2Raquete= constrain(y2Raquete, 0, height - comprRaquete2);
      // Verificar colisão com a raquete 1
    if (xBolinha - 17.5 < xRaquete + largRaquete &&
      xBolinha + 17.5 > xRaquete &&
      yBolinha - 17.5 < yRaquete + comprRaquete &&
      yBolinha + 17.5 > yRaquete) {
      velocidadeX *= -1;
      
      
    }

      // Verificar colisão com a raquete 2
    if (xBolinha - 17.5 < x2Raquete + largRaquete2 &&
        xBolinha + 17.5 > x2Raquete &&
        yBolinha - 17.5 < y2Raquete + comprRaquete2 &&
        yBolinha + 17.5 > y2Raquete) {
        velocidadeX *= -1;
        
    }
    if(xBolinha+17.5 > width){
      placar1+=1;
      xBolinha=300;
      yBolinha=200;
      velocidadeY*=-1
  
      
    }
    if(xBolinha-17.5 < 0){
      placar+=1;
      xBolinha=300;
      yBolinha=200;
      velocidadeY*=-1
    }
    }
    }
    function keyPressed() {
      if (keyCode === 32) { // espaço
        jogoPausado = !jogoPausado;
      }
    }