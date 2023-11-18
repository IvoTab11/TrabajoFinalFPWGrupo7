import Phaser from "phaser";


// Definición de la clase EscenaNueva que extiende Phaser.Scene
class EscenaNueva extends Phaser.Scene {
    constructor() {
        // Llama al constructor de la clase padre Phaser.Scene y asigna el nombre 'EscenaNueva' a esta escena
        super("EscenaNueva");

        // Inicializa las propiedades platforms, scoreText, timer y timerText
        this.platforms = null;
        this.scoreText = "";
        this.timer = null;
        this.timerText = "";
    }

    // Método init(data): Inicializa la escena con datos pasados como parámetros en este caso recibe el puntaje de la escena 3
    init(data) {
        this.score = data.score;
    }

    // Método preload(): Carga los recursos necesarios antes de que la escena sea creada
    preload() {
        // Carga imágenes y sprites necesarios
        this.load.image('castle', '/img/castle.jpg');
        this.load.image('ground', '/img/platform.png');
        this.load.image('star', '/img/star.png');
        this.load.image('bomb', '/img/bomb.png');
        this.load.spritesheet('dude', '/img/dude.png', { frameWidth: 41.6, frameHeight: 58 });
        this.load.image('peach', '/img/peach.png');
    }

    // Método create(): Se ejecuta una vez que los recursos han sido cargados, crea elementos en la escena
    create() {
        // Agrega una imagen de un castillo en las coordenadas 
        this.add.image(400, 300, 'castle');

        // Agrega una imagen de Peach en las coordenadas 
        this.add.image(530, 42, 'peach');

        // Crea un grupo de plataformas estáticas
        this.platforms = this.physics.add.staticGroup();

        // Crea plataformas y configura su escala y posición
        this.platforms.create(400, 582, 'ground').setScale(2).refreshBody();  // Plataforma principal
        this.platforms.create(350, 480, 'ground').setScale(1.5, 1).refreshBody();  // Plataforma 2
        this.platforms.create(480, 390, 'ground').setScale(1.5, 1).refreshBody();  // Plataforma 3
        this.platforms.create(550, 300, 'ground').setScale(0.5, 1).refreshBody();  // Plataforma 4
        this.platforms.create(300, 300, 'ground').setScale(0.2, 1).refreshBody();  // Plataforma 4b
        this.platforms.create(520, 200, 'ground').setScale(0.4, 1).refreshBody();  // Plataforma 5
        this.platforms.create(500, 100, 'ground').setScale(0.2, 1).refreshBody();  // Plataforma 6

        // Agrega una imagen de una estrella junto al puntaje
        this.add.image(210, 25, 'star');

        // Crea al jugador (sprite 'dude') en las coordenadas 
        this.player = this.physics.add.sprite(100, 500, 'dude');

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
            repeat: 4, // cantidad de estrellas
            setXY: { x: 500, y: 0, stepX: 0, stepY: 100 }
        });
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Colisiones entre las estrellas y las plataformas
        this.physics.add.collider(this.stars, this.platforms);

        // Colisión entre el jugador y las estrellas, llamando a la función collectStar en colisión
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        // Muestra el puntaje en la esquina superior izquierda
        this.scoreText = this.add.text(16, 16, 'score: 80', { fontSize: '32px', fill: '#FFFFFF' });

        // Crea un grupo de bombas y configura su comportamiento
        this.bombs = this.physics.add.group({
            key: 'bomb',
            repeat: 4, // cantidad de estrellas
            setXY: { x: 10, y: 0, stepX: 189, stepY: 0 }
        });
        this.bombs.children.iterate(function (bomb) {
            bomb.setBounce(1); // Establece en 1 para que rebote completamente
            bomb.setCollideWorldBounds(true); // colisión con los límites del mundo
            bomb.setVelocity(Phaser.Math.Between(0, 0), Phaser.Math.Between(-200, 200)); // Velocidades iniciales aleatorias para las bombas
        });

        // Colisiones entre las bombas y las plataformas
        this.physics.add.collider(this.bombs, this.platforms);

        // Colisión entre el jugador y las bombas, llamando a la función hitBomb en colisión
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        // Configura el temporizador y muestra el texto del temporizador
        this.timerText = this.add.text(16, 50, '', { fontSize: '32px', fill: '#FFFFFF' });

        this.timer = this.time.addEvent({
            delay: 35000, // 35 segundos
            callback: this.timeUp, // Función a llamar cuando se agote el tiempo
            callbackScope: this
        });
    }

    // Función que se ejecuta cuando se agota el tiempo
    timeUp() {
        // Cambia a la Escena5
        this.scene.start('Escena5');
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

        // Calcula el tiempo restante y actualiza el texto del temporizador
        const remainingTime = Math.ceil((this.timer.delay - this.timer.getElapsed()) / 1000);
        this.timerText.setText('Time: ' + remainingTime);
    }

    // Función que se llama cuando el jugador colisiona con una estrella
    collectStar(player, star) {
        // Desactiva la estrella y actualiza el puntaje
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        // Cambia a la Escena4 si el puntaje supera 120
        if (this.score > 120) {
            this.scene.start('Escena4');
            this.score = 0;
        }
    }

    // Función que se llama cuando el jugador colisiona con una bomba
    hitBomb(player, bomb) {
        // Pausa la física, cambia el color del jugador y cambia a la Escena5
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.start('Escena5');
    }
}

// Exporta la clase EscenaNueva para que pueda ser utilizada en otros archivos
export default EscenaNueva;