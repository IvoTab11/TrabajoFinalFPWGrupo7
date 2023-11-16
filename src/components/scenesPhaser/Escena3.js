import Phaser from "phaser";


class Escena3 extends Phaser.Scene{

    constructor(){
        super("Escena3");
        this.platforms = null;
        this.scoreText= "";
        }

    init(data){
        this.score=data.score;
    }   

    preload(){
        this.load.image('nightSky','/img/night-02.jpg');
        this.load.image('ground', '/img/platform.png');
        this.load.image('star','/img/star.png');
        this.load.image('bomb', '/img/bomb.png'); 
        this.load.spritesheet('dude', '/img/dude.png', { frameWidth: 41.6, frameHeight: 58 });

    }
    create(){
        this.add.image(400, 300, 'nightSky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 582, 'ground').setScale(2).refreshBody();
        this.platforms.create(400, 300, 'ground');
        this.platforms.create(30, 150, 'ground');
        this.platforms.create(750, 430, 'ground');
        this.platforms.create(30, 430, 'ground'); 
        
        this.add.image(210,25, 'star');//cargamos una estrella al lado der nuestra puntuacion
        this.player = this.physics.add.sprite(100,100,'dude');//cargamos al personaje 

        
        this.player.setBounce(0.2);//damos la indicacion de que nuestro personaje tiene un rebote
        this.player.setCollideWorldBounds(true);//damos la indicacion de que nuestro personaje colisionara con los extremos del mundo


            this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
            });
            this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
            });
            this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
            });


            this.physics.add.collider(this.player, this.platforms);// hay colision entre el jugador y las plataformas

            this.cursors = this.input.keyboard.createCursorKeys();// indica que el movimiento de nuestro personaje sera mediante el teclado

            // Se agregan las estrellas
            this.stars = this.physics.add.group({
                key: 'star',
                repeat: 4, // cantidad de estrellas
                setXY: { x: 70, y: 0, stepX: 170, stepY:70 } 
                 });
            this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); 
            });
                   
            this.physics.add.collider(this.stars, this.platforms); //Habilita las colisiones de las entrellas con la plataforma
            this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
            this.scoreText = this.add.text(16, 16, 'score: 30', { fontSize: '32px', fill: '#FFFFFF' }); 

                //Para agregar las bombas
             this.bombs = this.physics.add.group({
                key: 'bomb',
                repeat: 3, // cantidad de estrellas
                setXY: { x: 250, y: 152, stepX: 150, stepY:97 } 
            });
            
            this.bombs.children.iterate(function (bomb) {
                bomb.setBounce(1); // Establece en 1 para que rebote completamente
                bomb.setCollideWorldBounds(true); // colisión con los límites del mundo
                bomb.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200)); // Velocidades iniciales aleatorias para las bombas
            });
            
            this.physics.add.collider(this.bombs, this.platforms);
             this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        }

        update() {
            if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
            }
            else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
            }
            else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
            }
            if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
            }
            }
            
        
        collectStar(player, star) { //Colisión entre el jugador y las estrellas
            star.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
                    if(this.score > 70){
                        this.scene.start('EscenaNueva',{score:this.score});
                        this.score = 0;
                    }
                }

        hitBomb(player, bomb) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            this.scene.start('Escena5');
          }
                    
}

export default Escena3;