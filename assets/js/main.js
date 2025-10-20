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

class Platform {
    constructor(x, y){
     this.position = {
        x, y
     }
    }
}
class Player {
    constructor(){
        this.position = {
            x: proportionalSize(10),
            y: proportionalSize(400),
        };
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.width = proportionalSize(40);
        this.height = proportionalSize(40);
    }
    //Metodo responsable de dibujar usando el ancho, alto y aplicar relleno de color. 
    draw(){
        ctx.fillStyle = "#99c9ff";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    //Método responsable de actualizar la posición y velocidad del jugador en cada frame.
    update(){
        //// Dibuja el rectángulo del jugador en su posición actual.
        this.draw();
        // Actualiza la posición horizontal y vertical según la velocidad actual.
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        //Verifica si el jugador sigue dentro del canvas por la parte inferior.
        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            //Verifica si el jugador se ha salido por la parte superior del canvas.
            if(this.position.y < 0){
                //Reubica al jugador dentro del canvas (parte superior).
                this.position.y = 0;
                //Reinicia la velocidad vertical para que empiece a caer.
                this.velocity.y = gravity;
            }
            //Si está dentro del canvas, acumula gravedad para simular caída.
            this.velocity.y += gravity;
        }else {
            //Si se pasó del borde inferior, detiene la caída.
            this.velocity.y = 0;
        }

        //Estableciendo el limite de la izquierda si la posicion x es menor que el ancho del player es porque se esta saliendo una parte del player.
        if(this.position.x < this.width){
            this.position.x = this.width;//Sera la posicion x el mismo size del ancho del player.
        }
        //Estableciendo el limite de la derecha restandole dos veces su ancho para dejar un borde del doble del ancho.
        if(this.position.x >= canvas.width - this.width * 2){
            this.position.x = canvas.width - this.width * 2;
        }
    }
}

const player = new Player();

const startGame = ()=> {
    canvas.style.display = 'block';
    startScreen.style.display = 'none';
    animate();
}

//Funcion encargada de la logica de animación.
const animate = ()=> {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();

    //Valido el estado de rightKey y ajusto la proporcion de pantalla si la posicion es menor a 400.
    if(keys.rightKey.pressed && player.position.x < proportionalSize(400)){
        player.velocity.x = 5;
    }else if(keys.leftKey.pressed && player.position.x > proportionalSize(100)){
        player.velocity.x = -5;
    }else {
        player.velocity.x = 0;
    }
}

//Guardar los valores de la teclas.
const keys = {
    rightKey: {
        pressed: false,
    },
    leftKey: {
        pressed: false,
    }
};

//Funcion encargada de mover el jugador por la pantalla.
const movePlayer = (key, xVelocity, isPressed)=>{ 
    if(!isCheckpointCollisionDetectionActive){
        player.velocity.x = 0;
        player.velocity.y = 0;
        return;
    }

    //Opciones de control de keys.
    switch(key){
        case 'ArrowLeft':
            keys.leftKey.pressed = isPressed;
            if(xVelocity === 0){
                player.velocity.x = xVelocity;
            }
            player.velocity.x -= xVelocity;
        break;
        case 'ArrowUp':
        case ' ':
        case 'Spacebar':
            player.velocity.y -= 8;
        break;
        case "ArrowRight":
            keys.rightKey.pressed = isPressed;
            if(xVelocity === 0){
                player.velocity.x = xVelocity;
            }
            player.velocity.x += xVelocity;
        break;
    }
};

//Evento click sobre el boton startBtn
startBtn.addEventListener('click', startGame);
//Evento keydown sobre el objeto global padre window para reconocer las tecla.
window.addEventListener('keydown', ({key})=>{
    movePlayer(key, 8, true);
});
//Evento keyup sobre el objeto global padre window para reconocer las teclas.
window.addEventListener('keyup', ({key})=>{
    movePlayer(key, 0, false);
});