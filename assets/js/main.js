const startBtn = document.getElementById('start-btn');
const canvas = document.getElementById('canvas');
const startScreen = document.querySelector('.start-screen');
const checkpointScreen = document.querySelector('.checkpoint-screen');
const checkpointMessage = document.querySelector('.checkpoint-screen > p');


const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 0.5;

let isCheckpointCollisionDetectionActive = true;

//Make sure internal elements are proportional across different screen sizes.
const proportionalSize = (size)=>{
    //Calculando la proporcion de los elementos internos  en base al innerHeight.
    return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
}

class Player {
    contructor(){
        this.position = {
            x: proportionalSize(10),
            y: proportionalSize(400)
        };
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = proportionalSize(40),
        this.height = proportionalSize(40)
    }
    //Metodo responsable dibujar usando el ancho, alto y aplicar relleno de color. 
    draw(){
        ctx.fillStyle = "#99c9ff",
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    //Metodo responsable de actualizar la posicion y velocidad del jugador a medida que se mueve.
    update(){
        this.draw();
    }
}