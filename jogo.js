
        //basicamente seria uma função de setup, que somente se inicializa quando toda a página carregar 
        var jog; 
        var cima = false; 
        var baixo = false; 
        
        
        window.onload = function(){ 
            tela = document.getElementById("tela"); 
            contexto = tela.getContext('2d'); 
            iniciarGame(); 

            setInterval(() => { 
               calcular(); 
               desenhar(); 
            },1000/60);           
            document.addEventListener('keyup',jogador_para);
            document.addEventListener('keydown',jogador_anda);
    
       }

       
       
       
       
       
       
       
       
        function calcular(){ 
            bola.movimentoBola(); 
            jog.movimentoJogador(); 
            jog2.movimentoIA();
            bola.colisaoBola();
           
            

            


       }
      


        function desenhar(){ 
            contexto.fillStyle = "black";
            contexto.fillRect(0,0,tela.width,tela.height); 
            jog.desenharJogador(); 
            jog2.desenharJogador();
            bola.desenharBola();

      }
       



        function Jogador(jogX,jogY){ 

            this.jogX = jogX;
            this.jogY = jogY;
            this.jogW = 6; 
            this.jogH = 65; 
            this.cima=false;
            this.baixo= false; 
            console.log("Jogador criado") ;
            this.desenharJogador = () => {
                contexto.fillStyle='white';
                contexto.fillRect(this.jogX,this.jogY,this.jogW,this.jogH);
               
            }
            
            this.movimentoJogador = () => { 
                    
                if (cima && this.jogY > 0 ) this.jogY -= 4;
                else if (baixo && this.jogY + this.jogH < tela.height) this.jogY += 4;


            }
            
            this.movimentoIA = () => { 
                
                let dado = Math.floor(Math.random() * 5)  ;
                let desconto = 0; 
                desconto = 5*dado; 
            
                
                
                if(bola.bolaY> this.jogY + this.jogH && this.jogY + this.jogH < tela.height ) this.jogY += 4;
                else if(this.jogY > 0 )    this.jogY -= 4;

            }
            
            
           

    



      }


        function iniciarGame(){ 
            
            jog = new Jogador(50,30); 
            jog2 = new Jogador(tela.width - 56,30); 
            bola = new Bola();
            jogo = new Jogo(); 

      }

     
        function jogador_para(evt){
            if (evt.keyCode == 38) cima = false;
            else if (evt.keyCode == 40) baixo = false;
        }
        function jogador_anda(evt){
            if (evt.keyCode == 38) cima = true;
            else if (evt.keyCode == 40) baixo = true;
            
        }

        function Bola(){ 
            this.bolaY = Math.floor(Math.random() * (tela.height - 2)) + 2; 
            this.direcaoX = Math.round(Math.random() * 1); 
            this.direcaoY = Math.round(Math.random() * 1); 
            this.bolaX = 290;
            this.raio = 5; 
            this.desenharBola = () => { 
                contexto.fillStyle='yellow';
                contexto.beginPath();  
                contexto.arc(this.bolaX,this.bolaY,this.raio,0,Math.PI*2,true);
                contexto.fill();

            }

            this.movimentoBola = () => { 
                if(this.direcaoX)this.bolaX += 4; 
                else             this.bolaX -= 4; 
                if(this.direcaoY)this.bolaY += 4; 
                else             this.bolaY -= 4; 
              
            } 


            this.colisaoBola = () => {
                  
                if(this.bolaX<=this.raio) this.direcaoX = true;     
                if(this.bolaX>=tela.width - this.raio) this.direcaoX = false;  
                if(this.bolaY<=this.raio) this.direcaoY = true;   
                if(this.bolaY>=tela.height - this.raio) this.direcaoY = false;   
                var j = []; 
                j[0] = jog ; 
                j[1] = jog2; 
                let i = 0; 
               
                while(i < 2){ 
                    if(this.bolaX>=j[i].jogX && this.bolaX < j[i].jogX + j[i].jogW && this.bolaY >= j[i].jogY && this.bolaY <= j[i].jogY + j[i].jogH  ) this.direcaoX = !this.direcaoX;     
                 
                    i++; 
                }
 
              
                if(this.bolaX>=tela.width - this.raio) jogo.pontuar(1);
                if(this.bolaX<=this.raio) jogo.pontuar(0); 

            }

        }




        function Jogo(){ 

            this.jog1Placar = 0; 
            this.jog2Placar = 0; 
       

            this.pontuar = (ponto) => { 
                console.log("chama")
                console.log(ponto)
                if(ponto){ 
                    this.jog1Placar += 1; 
                }
                else this.jog2Placar +=1; 
                
                bola = new Bola();
                
                this.desenharPlacar();

            
            }


            this.desenharPlacar = () => { 
                placar = document.getElementById("placar");
                placar.innerHTML = this.jog1Placar + " X " + this.jog2Placar; 
            }


            this.desenharPlacar(); 

        }