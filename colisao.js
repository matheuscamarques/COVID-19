/*


    Autor: Matheus de Camargo Marques
    Email: mmarques.1997@alunos.utfpr.edu.br
    Engenharia da Computação - UTFPR 

    


*/

var quantidade = 300;
var Bola = [];
var tam; //DIAMETRO
var contcontagio = 0;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  for(i=0;i<quantidade;i++)
  {
    tam = random(7,7);
    Bola[i] = new Ball(random(width-tam,tam),
                       random(height-tam,tam),
                       random(-2,2),
                       random(-2,2),
                       tam
                      );
   } 

}

function draw() {
  background(0);
  Bola[1].contagio = 1;
 
  
  if(contcontagio == quantidade){
    for(i=0;i<quantidade;i++)
    {
      Bola[i].contagio = 0;
      Bola[i].verificado = 0;
      Bola[i].R = 0;
                Bola[i].G = 255;
                Bola[i].B = 0;
                contcontagio = 0;
                Bola[1].contagio = 1;
    }
  }
  
 
 for(i=0;i<quantidade;i++)
  {
    Bola[i].desenha();
    Bola[i].wallcollide();

    if(Bola[i].contagio == 1 && Bola[i].verificado == 0){

        contcontagio++;
        Bola[i].verificado = 1;
    }
 
  }  
  
  colisao();
  //mmarques.1997@alunos.utfpr.edu.br
  var textsize = 20;
  strokeWeight(5); 
  stroke('black'); 
  fill('green');
  textSize(textsize);
  text('Autor: Matheus de Camargo Marques', 10, textsize+2);
  text('Email: mmarques.1997@alunos.utfpr.edu.br', 10, textsize*2+2);
  text('Curso: Engenharia da Computação - UTFPR', 10, textsize*3+2);
  fill('red');
  text('COVID-19 SIMULATOR', 10, textsize*4+2);
  text('Infectados: '+contcontagio, 10, textsize*5+2);
  fill('green');
  text('Sadios: '+(quantidade-contcontagio), 10, textsize*6+2);
  fill('green');
   //text("FPS " +  int(getFrameRate()), width-textsize*10, 20); 
   noStroke();

  
}

function colisao(){

  var distancia_centros;
  var x,y;

  
  for(i=0;i<quantidade;i++){
    for(j=i+1;j<quantidade;j++)
      {
          x = Bola[i].posx - Bola[j].posx ;
          y = Bola[i].posy - Bola[j].posy ;
          distancia_centros = x*x + y*y ;
         // alert(distancia_centros);
          
          if(distancia_centros <= (Bola[i].tam/2*Bola[j].tam/2)*4)
           {
             if(Bola[i].contagio == 1 || Bola[j].contagio == 1)
             {
                Bola[i].R = 255;
                Bola[i].G = 0;
                Bola[i].B = 0;
                
                Bola[j].R = 255;
                Bola[j].G = 0;
                Bola[j].B = 0;

                Bola[i].contagio = 1;
                Bola[j].contagio = 1;
             }
             

              //Atualiza vel
              var colisao = distancia_centros;
              
              var pvx1 = ((Bola[i].velx * x) + (Bola[i].vely * y)) * x/colisao;
              var pvy1 = ((Bola[i].velx * x) + (Bola[i].vely * y)) * y/colisao;
              var pvx2 = ((Bola[j].velx * x) + (Bola[j].vely * y)) * x/colisao;
              var pvy2 = ((Bola[j].velx * x) + (Bola[j].vely * y)) * y/colisao;
            
              Bola[i].velx -= (pvx1 - pvx2);
              Bola[i].vely -= (pvy1 - pvy2);
              
              Bola[j].velx -= (pvx2 - pvx1);
              Bola[j].vely -= (pvy2 - pvy1);
              
              if(x != 0 && y !=0){
                  
                Bola[i].posx += x / Math.abs(x);
                Bola[i].posy += y / Math.abs(y);
              
                Bola[j].posx -= x / Math.abs(x);
                Bola[j].posy -= y / Math.abs(y);
                
              }
           }
          
      } 
  }
}

function Ball(posx,posy,velx,vely,tam){
  var i ,  j;
  
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
  
  this.desenha =  function() {
    
    this.posx= this.posx + this.velx;
    this.posy= this.posy + this.vely ;
    
    fill(this.R,this.G,this.B);
    ellipse(this.posx,this.posy,this.tam);
    
  }
  
  this.wallcollide = function(){
    
    if(this.posx + this.tam/2 > width   ||  this.posx - this.tam/2 < 0)
    {
      this.velx *= (-1);
    }
    
    if(this.posy + this.tam/2 > height  ||   this.posy - this.tam/2 < 0)
    {
      this.vely *= (-1);
    }
    
    
  }
  
  
 
  
}
