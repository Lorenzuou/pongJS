
        export default function Jogador(jogX,jogY){ 

            this.jogX = jogX;
            this.jogY = jogY;
            this.jogW = 5; 
            this.jogH = 30; 
            this.cima=false;
            this.baixo= false; 
            console.log("Jogador criado") ;
            this.desenharJogador = () => {
                contexto.fillStyle='white';
                contexto.fillRect(this.jogX,this.jogY,this.jogW,this.jogH);
               
            }
            
            this.movimentoJogador = () => { 
                    
                    if (cima && this.jogY > 0 ) this.jogY -= 2;
                    
                    
                    else if (baixo && this.jogY + this.jogH < tela.height) this.jogY += 2;


            }
            
            
            
           

    



         }