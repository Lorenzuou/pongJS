export default function Bola(){ 
    this.bolaY = Math.floor(Math.random() * (tela.height - 2)) + 2; 
   
    console.log(Math.floor(Math.random()));

    this.desenharBola = () => { 
        contexto.fillStyle='yellow';
        contexto.beginPath();  
        contexto.arc(150,this.bolaY,2,0,Math.PI*2,true);
        contexto.fill();

    }

}

