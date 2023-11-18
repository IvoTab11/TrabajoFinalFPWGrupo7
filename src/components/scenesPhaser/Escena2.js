import Phaser from "phaser";

// Definición de la clase Escena2 que extiende Phaser.Scene
class Escena2 extends Phaser.Scene {
    constructor() {
        // Llama al constructor de la clase padre Phaser.Scene y asigna el nombre 'Escena2' a esta escena
        super("Escena2");

        // Inicializa las propiedades platforms, scoreText y score
        this.platforms = null;
        this.scoreText = "";
        this.score = 0;
    }

    // Método preload(): Carga los recursos necesarios antes de que la escena sea creada
    preload() {
        // Carga imágenes y sprites necesarios
        this.load.image('sky', '/img/sky.png');
        this.load.image('ground', '/img/platform.png');
        this.load.image('star', '/img/star.png');
        this.load.image('bomb', '/img/bomb.png');
        this.load.spritesheet('dude', '/img/dude.png', { frameWidth: 41.6, frameHeight: 58 });
    }

    // Método create(): Se ejecuta una vez que los recursos han sido cargados, crea elementos en la escena
    create() {
        // Inicializa el puntaje
        this.score = 0;

        // Agrega una imagen de fondo en las coordenadas 
        this.add.image(400, 300, 'sky');

        // Crea un grupo de plataformas estáticas
        this.platforms = this.physics.add.staticGroup();

        // Crea plataformas y configura su escala y posición
        this.platforms.create(400, 582, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // Agrega una imagen de una estrella junto al puntaje
        this.add.image(210, 25, 'star');

        // Crea al jugador (sprite 'dude') en las coordenadas 
        this.player = this.physics.add.sprite(100, 100, 'dude');

        // Configura propiedades del jugador
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Configura animaciones para el jugador 
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
            repeat: 2,
            setXY: { x: 670, y: 0, stepX: 50, stepY: 200 }
        });
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Colisiones entre las estrellas y las plataformas
        this.physics.add.collider(this.stars, this.platforms);

        // Colisión entre el jugador y las estrellas, llamando a la función collectStar en colisión
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        // Muestra el puntaje en la esquina superior izquierda
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        // Crea un grupo de bombas y configura su comportamiento
        this.bombs = this.physics.add.group({
            key: 'bomb',
            repeat: 1,
            setXY: { x: 200, y: 300, stepX: 400, stepY: 0 }
        });
        this.bombs.children.iterate(function (bomb) {
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        });

        // Colisiones entre las bombas y las plataformas
        this.physics.add.collider(this.bombs, this.platforms);

        // Colisión entre el jugador y las bombas, llamando a la función hitBomb en colisión
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    // Método update(): Se ejecuta en cada fotograma, maneja la lógica del juego
    update() {
        // Lógica de movimiento del jugador con las teclas de flechas
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
        // Lógica de salto si el jugador está en el suelo y presiona la flecha hacia arriba
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    // Función llamada cuando el jugador recoge una estrella
    collectStar(player, star) {
        star.disableBody(true, true); // Desactiva la estrella
        this.score += 10; // Incrementa el puntaje
        this.scoreText.setText('Score: ' + this.score); // Actualiza el texto del puntaje

        // Si el puntaje supera 20, cambia a la Escena3 pasando el puntaje como parámetro
        if (this.score > 20) {
            this.scene.start('Escena3', { score: this.score });
        }
    }

    // Función llamada cuando el jugador colisiona con una bomba
    hitBomb(player, bomb) {
        this.physics.pause(); // Pausa la física
        this.score = 0; // Reinicia el puntaje
        player.setTint(0xff0000); // Cambia el color del jugador a rojo
        player.anims.play('turn'); // Ejecuta la animación de girar
        this.scene.start('Escena5'); // Cambia a la Escena5
    }
}

// Exporta la clase Escena2 para que pueda ser utilizada en otros archivos
export default Escena2;