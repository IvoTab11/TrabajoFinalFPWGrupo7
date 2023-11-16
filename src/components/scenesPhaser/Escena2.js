import Phaser from "phaser";


class Escena2 extends Phaser.Scene{

    constructor(){
        super("Escena2");
        this.platforms = null;
        this.scoreText= "";
        this.score=0;

        }

        
    preload(){
        this.load.image('sky','/img/sky.png');
        this.load.image('ground', '/img/platform.png');
        this.load.image('star','/img/star.png');
        this.load.image('bomb', '/img/bomb.png'); 
        this.load.spritesheet('dude', '/img/dude.png', { frameWidth: 41.6, frameHeight: 58 });

    }
    create(){
        this.score=0;
        this.add.image(400, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 582, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground'); 
        
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
            repeat: 2, // cantidad de estrellas
            setXY: { x: 670, y: 0, stepX: 50, stepY:200 } // empieza en la posición x e y, se repite cada 70 en x
                 });


                 this.stars.children.iterate(function (child) {
                    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); 
                    });
                    
                   
                    this.physics.add.collider(this.stars, this.platforms); //Habilita las colisiones de las entrellas con la plataforma

                    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
                   
                    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' }); 

                    //Para agregar las bombas
                    this.bombs = this.physics.add.group({
                        key: 'bomb',
                        repeat: 1, // cantidad de estrellas
                        setXY: { x: 200, y: 300, stepX: 400, stepY:0 } // empieza en la posición x e y, se repite cada 70 en x
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
           /* //Para las bombas
            if (this.stars.countActive(true) === 0) { 
            this.stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
            });
            let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : // Esta parte no se utilizo se colocaron a las bombas en posiciones especificas
            Phaser.Math.Between(0, 400);                                  y con una velocidad de movimiento alterada al comenzar la partida
            let bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                    }*/
                    if(this.score > 20){

                        this.scene.start('Escena3',{score:this.score});

                    }
                }

        hitBomb(player, bomb) {
            this.physics.pause();
            this.score=0;
            player.setTint(0xff0000);
            player.anims.play('turn');
            this.scene.start('Escena5');
          }
                    
}

export default Escena2;