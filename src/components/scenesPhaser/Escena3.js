import Phaser from "phaser";

// Definición de la clase Escena3 que extiende Phaser.Scene
class Escena3 extends Phaser.Scene {
    constructor() {
        // Llama al constructor de la clase padre Phaser.Scene y asigna el nombre 'Escena3' a esta escena
        super("Escena3");

        // Inicializa las propiedades platforms y scoreText
        this.platforms = null;
        this.scoreText = "";
    }

    // Método init(data): Inicializa la escena con datos pasados como parámetros en este caso recibe el puntaje de la escena 2
    init(data) {
        this.score = data.score;
    }

    // Método preload(): Carga los recursos necesarios antes de que la escena sea creada
    preload() {
        // Carga imágenes y sprites necesarios
        this.load.image('nightSky', '/img/night-02.jpg');
        this.load.image('ground', '/img/platform.png');
        this.load.image('star', '/img/star.png');
        this.load.image('bomb', '/img/bomb.png');
        this.load.spritesheet('dude', '/img/dude.png', { frameWidth: 41.6, frameHeight: 58 });
    }

    // Método create(): Se ejecuta una vez que los recursos han sido cargados, crea elementos en la escena
    create() {
        // Agrega una imagen del cielo nocturno en las coordenadas 
        this.add.image(400, 300, 'nightSky');

        // Crea un grupo de plataformas estáticas
        this.platforms = this.physics.add.staticGroup();

        // Crea plataformas y configura su escala y posición
        this.platforms.create(400, 582, 'ground').setScale(2).refreshBody();  // Plataforma principal
        this.platforms.create(400, 300, 'ground');  // Plataforma 2
        this.platforms.create(30, 150, 'ground');  // Plataforma 3
        this.platforms.create(750, 430, 'ground');  // Plataforma 4
        this.platforms.create(30, 430, 'ground');  // Plataforma 5

        // Agrega una imagen de una estrella junto al puntaje
        this.add.image(210, 25, 'star');

        // Crea al jugador (sprite 'dude') en las coordenadas 
        this.player = this.physics.add.sprite(100, 100, 'dude');

        // Configura propiedades del jugador
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Configura animaciones para el jugador (izquierda, derecha, girar)
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Colisiones entre el jugador y las plataformas
        this.physics.add.collider(this.player, this.platforms);

        // Configura teclas de flechas para el movimiento del jugador
        this.cursors = this.input.keyboard.createCursorKeys();

        // Crea un grupo de estrellas y configura su comportamiento
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 4, // cantidad de estrellas
            setXY: { x: 70, y: 0, stepX: 170, stepY: 70 }
        });
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Colisiones entre las estrellas y las plataformas
        this.physics.add.collider(this.stars, this.platforms);

        // Colisión entre el jugador y las estrellas, llamando a la función collectStar en colisión
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        // Muestra el puntaje en la esquina superior izquierda
        this.scoreText = this.add.text(16, 16, 'score: 30', { fontSize: '32px', fill: '#FFFFFF' });

        // Crea un grupo de bombas y configura su comportamiento
        this.bombs = this.physics.add.group({
            key: 'bomb',
            repeat: 3, // cantidad de estrellas
            setXY: { x: 250, y: 152, stepX: 150, stepY: 97 }
        });

        this.bombs.children.iterate(function (bomb) {
            bomb.setBounce(1); // Establece en 1 para que rebote completamente
            bomb.setCollideWorldBounds(true); // colisión con los límites del mundo
            bomb.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200)); // Velocidades iniciales aleatorias para las bombas
        });

        // Colisiones entre las bombas y las plataformas
        this.physics.add.collider(this.bombs, this.platforms);

        // Colisión entre el jugador y las bombas, llamando a la función hitBomb en colisión
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    // Método update(): Se llama en cada fotograma, actualiza la lógica del juego
    update() {
        // Maneja el movimiento del jugador basado en las teclas de flechas
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        // Salta si la tecla de flecha arriba está presionada y el jugador toca el suelo
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    // Función llamada cuando el jugador colisiona con una estrella
    collectStar(player, star) {
        // Desactiva la estrella y actualiza el puntaje
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        // Cambia a la EscenaNueva si el puntaje supera 70
        if (this.score > 70) {
            this.scene.start('EscenaNueva', { score: this.score });
            this.score = 0;
        }
    }

    // Función llamada cuando el jugador colisiona con una bomba
    hitBomb(player, bomb) {
        // Pausa la física, cambia el color del jugador y cambia a la Escena5
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.start('Escena5');
    }
}

// Exporta la clase Escena3 para que pueda ser utilizada en otros archivos
export default Escena3;