import Phaser from "phaser";

// Definición de la clase Escena4 que extiende Phaser.Scene
class Escena4 extends Phaser.Scene {
    constructor() {
        // Llama al constructor de la clase padre Phaser.Scene y asigna el nombre 'Escena4' a esta escena
        super("Escena4");

        // Inicializa la propiedad platforms
        this.platforms = null;
    }

    // Método preload(): Carga los recursos necesarios antes de que la escena sea creada
    preload() {
        // Carga la imagen para la escena de victoria 
        this.load.image('ganar', '/img/win.jpg');
    }

    // Método create(): Se ejecuta una vez que los recursos han sido cargados, crea elementos en la escena
    create() {
        // Agrega una imagen de victoria en las coordenadas 
        this.add.image(400, 300, 'ganar');

        // Configura un evento para la tecla SPACE que reinicia la Escena2 al ser presionada
        this.input.keyboard.on('keydown-SPACE', function () {
            // Cambiar a la Escena2 (restart)
            this.scene.start('Escena2');
        }, this);
    }
}

// Exporta la clase Escena4 para que pueda ser utilizada en otros archivos
export default Escena4;