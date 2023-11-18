import Phaser from "phaser";

// Definición deEscena1 
class Escena1 extends Phaser.Scene {
    constructor() {
    // Llama al constructor de la clase padre Phaser.Scene y asigna el nombre 'Escena1' a esta escena
        super("Escena1");
        
    // Inicializa la propiedad 'platforms' como null
        this.platforms = null;
    }

    // Método preload(): Carga los recursos necesarios antes de que la escena sea creada
    preload() {
        // Carga una imagen llamada 'inicio' desde la ruta '/img/start-01.jpg'
        this.load.image('inicio', '/img/start-01.jpg');
    }

    // Método create(): Se ejecuta una vez que los recursos han sido cargados, crea elementos en la escena
    create() {
        // Añade la imagen en las coordenadas indicadad
        this.add.image(400, 300, 'inicio');

        // Configura un evento de teclado para detectar la pulsación de la tecla SPACE
        this.input.keyboard.on('keydown-SPACE', function () {
            // Cambiar a la Escena2 cuando se presiona la tecla SPACE
            this.scene.start('Escena2');
        }, this);
    }
}

// Exporta la clase Escena1 para que pueda ser utilizada en otros archivos
export default Escena1;