/*


    Autor: Matheus de Camargo Marques
    Email: mmarques.1997@alunos.utfpr.edu.br
    Engenharia da Computação - UTFPR 

    


*/

var quantidade = 1250;
var Bola = [];
var tam; //DIAMETRO
var contcontagio = 0;
var PlotP = [];
var plot = false;
var ctx;




function setup() {
  PlotP.pop(0, 0);
  //frameRate(60);
  createCanvas(windowWidth, windowHeight);
  frameRate(120);
  for (i = 0; i < quantidade; i++) {
    tam = 6;
    Bola[i] = new Ball(random(width - tam, tam),
      random(height - tam, tam),
      random(-2, 2),
      random(-2, 2),
      tam
    );
  }

  Bola[0].contagio = 1;
  Bola[149].contagio = 1;
  Bola[299].contagio = 1;
}

function draw() {
  background(0);



  if (contcontagio == quantidade && plot == false) {
    /* for(i=0;i<quantidade;i++)
     {
       Bola[i].contagio = 0;
       Bola[i].verificado = 0;
       Bola[i].R = 0;
                 Bola[i].G = 255;
                 Bola[i].B = 0;
                 contcontagio = 0;
                 Bola[1].contagio = 1;
     }*/
    for (i = 0; i < PlotP.length; i++) {
      console.log();
    }
    plot = true;


  }




  for (i = 0; i < quantidade; i++) {
    Bola[i].desenha();
    Bola[i].wallcollide();

    if (Bola[i].contagio == 1 && Bola[i].verificado == 0) {

      contcontagio++;

      x = millis();
      y = contcontagio;
      PlotP.push(new Points(x, y));
      Bola[i].verificado = 1;
      //chart.render();

    }

  }



  //
  //mmarques.1997@alunos.utfpr.edu.br
  var textsize = (300 * 15) / 300;
  strokeWeight(5);
  stroke('black');
  fill('green');
  textSize(textsize);
  text('Autor: Matheus de Camargo Marques', 10, textsize + 2);
  text('Email: mmarques.1997@alunos.utfpr.edu.br', 10, textsize * 2 + 2);
  text('Curso: Engenharia da Computação - UTFPR', 10, textsize * 3 + 2);
  fill('red');
  text('COVID-19 SIMULATOR', 10, textsize * 4 + 2);
  text('Infectados: ' + contcontagio, 10, textsize * 5 + 2);
  fill('green');
  text('Sadios: ' + (quantidade - contcontagio), 10, textsize * 6 + 2);
  fill('green');
  text("FPS " + int(getFrameRate()), width - textsize * 10, 20);
  noStroke();

  colisao();


}

function colisao() {

  var distancia_centros;
  var x, y;

  let boundary = new Rectangle(windowWidth / 2, windowHeight / 2, windowHeight, windowHeight);
  let qtree = new QuadTree(boundary, 4);
  //console.log(Bola);
  for (let i of Bola) {
    let point = new Point(i.posx, i.posy, i);
    qtree.insert(point);
  }
  //console.log(qtree);

  //return;
  for (let p of Bola) {
    //console.log(p);
    let range = new Circle(p.posx, p.posy, p.tam * 2);
    let points = qtree.query(range);

    //console.log(points);
    for (let po of points) {

      let p2 = po.userData;
      x = p.posx - p2.posx;
      y = p.posy - p2.posy;

      distancia_centros = x * x + y * y;
      // alert(distancia_centros);

      if (p !== p2 && distancia_centros <= (p.tam / 2 * p2.tam / 2) * 4) {

        if (p.contagio == 1 || p2.contagio == 1) {
          p.R = 255;
          p.G = 0;
          p.B = 0;

          p2.R = 255;
          p2.G = 0;
          p2.B = 0;

          p.contagio = 1;
          p2.contagio = 1;
        }


        //Atualiza vel

        var colisao = distancia_centros;
        var pvx1 = ((p.velx * x) + (p.vely * y)) * x / colisao;
        var pvy1 = ((p.velx * x) + (p.vely * y)) * y / colisao;
        var pvx2 = ((p2.velx * x) + (p2.vely * y)) * x / colisao;
        var pvy2 = ((p2.velx * x) + (p2.vely * y)) * y / colisao;




        p.velx -= (pvx1 - pvx2);
        p.vely -= (pvy1 - pvy2);

        p2.velx -= (pvx2 - pvx1);
        p2.vely -= (pvy2 - pvy1);

        if (x != 0 && y != 0) {

          p.posx += x / Math.abs(x);
          p.posy += y / Math.abs(y);

          p2.posx -= x / Math.abs(x);
          p2.posy -= y / Math.abs(y);

        }
      }

    }
  }
}

function Ball(posx, posy, velx, vely, tam) {
  var i, j;

  this.contagio = 0;
  this.verificado = 0;

  this.posy = posy;
  this.posx = posx;

  this.velx = velx;
  this.vely = vely;

  this.tam = tam;

  this.R = 0;
  this.G = 255;
  this.B = 0;

  this.desenha = function () {

    this.posx = this.posx + this.velx;
    this.posy = this.posy + this.vely;

    fill(this.R, this.G, this.B);
    ellipse(this.posx, this.posy, this.tam);

  }

  this.wallcollide = function () {

    if (this.posx + this.tam / 2 > width || this.posx - this.tam / 2 < 0) {
      this.velx *= (-1);
    }

    if (this.posy + this.tam / 2 > height || this.posy - this.tam / 2 < 0) {
      this.vely *= (-1);
    }


  }




}


function Points(x, y) {
  this.x = x;
  this.y = y;
}
