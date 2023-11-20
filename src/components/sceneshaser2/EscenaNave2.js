import Phaser from 'phaser';
import React, { useEffect, useState } from 'react';

class EscenaNave2 extends Phaser.Scene {
  constructor() {
    super('EscenaNave2');
    this.platforms = null;
    this.lifeText = "";
    this.life = 100;
    this.scoreText = "";
    this.score = 0;

  }

  preload() {
    this.load.image('sky', '/img/sky.jpg')
    this.load.spritesheet('nave', '/img/nave.png', { frameWidth: 70, frameHeight: 62 });
    this.load.image('red', '/img/red.png')
    this.load.image('bullet', '/img/shoot.png')
    this.load.image('enemy', '/img/enemy.png')
    this.load.audio('disparo', '/sounds/disparo.mp3')
    this.load.image('001', '/img/001.png');
    this.load.image('002', '/img/002.png');
    this.load.image('003', '/img/003.png');
    this.load.image('004', '/img/004.png');
    this.load.image('005', '/img/005.png');
    this.load.image('006', 'img/006.png');
    this.load.image('007', '/img/007.png');
    this.load.image('008', '/img/008.png');
    this.load.image('009', '/img/009.png');
    this.load.image('0010', '/img/0010.png');
    this.load.image('0011', '/img/0011.png');
    this.load.image('0012', '/img/0012.png');
    this.load.image('0013', '/img/0013.png');
    this.load.image('0014', '/img/0014.png');
    this.load.image('0015', '/img/0015.png');
    this.load.image('0016', '/img/0016.png');
    this.load.image('0017', '/img/0017.png');
    this.load.image('0018', '/img/0018.png');
    this.load.image('0019', '/img/0019.png');
    this.load.image('0020', '/img/0020.png');
  }

  create() {
    this.add.image(400, 300, 'sky');
    this.sonidoDisparo = this.sound.add('disparo', {volume: 0.1});
    let particles = this.add.particles(0,0,'red',{
        speed:100,
        angle:{min:150,max:210},
        scale:{start:1,end:0},
        blendMode: 'ADD'
    });


this.player = this.physics.add.sprite(100,100,'nave');
particles.startFollow(this.player);
this.Shoot = this.physics.add.group();
this.time.addEvent({ //Indica la accion que se repetira cada 1500 milisegundos
    delay: 200,
    callback: () => {
        this.createEnemies();
    },
    callbackScope: this,
    repeat: -1,
});
        
this.anims.create({//Crea las animaciones del personaje
    key: 'left',
    frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
    frameRate: 10,
    repeat: -1
    });
    this.anims.create({
    key: 'down',
    frames: [ { key: 'nave', frame: 1 } ],
    frameRate: 20
    });
    this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
    frameRate: 10,
    repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('nave', { start: 2, end: 2 }),
        frameRate: 10,
        repeat: -1
        });

this.cursors = this.input.keyboard.createCursorKeys();
this.anims.create({
    key: 'explosion',
    frames: [
        { key: '001' },
        { key: '002' },
        { key: '003' },
        { key: '004' },
        { key: '005' },
        { key: '006' },
        { key: '007' },
        { key: '008' },
        { key: '009' },
        { key: '0010' },
        { key: '0011' },
        { key: '0012' },
        { key: '0013' },
        { key: '0014' },
        { key: '0015' },
        { key: '0016' },
        { key: '0017' },
        { key: '0018' },
        { key: '0019' },
        { key: '0020' },
        
    ],
    frameRate: 16, // Velocidad de la animación
    repeat: 0 // No se repetirá
 });

    
//Ubica y define el color y el tamaño de el puntaje y la vida del player en la pantalla 
this.lifeText = this.add.text(16, 16, 'life:' + this.life + '%' , { fontSize: '24px', fill: '#FFF' }); 
this.scoreText = this.add.text(16, 40, 'score: '+ this.score, { fontSize: '24px', fill: '#FFF' }); 
        let lastShootTime=0;
        const cooldown = 500;
this.input.keyboard.on('keydown-A', event =>//Indicamos que si se presiona la tecla 'A' el player va a disparar
{
    const currentTime = new Date().getTime();
    if( currentTime - lastShootTime >= cooldown){
    this.Shoot.create(this.player.x,this.player.y,'bullet').setVelocityX(300);
    this.sonidoDisparo.play();

    lastShootTime = currentTime;
}
    //sonidoDisparo.volume -= 0.5;
});

  }
createEnemies() {// Creador de enemigos, actualiza su posicion y los destruye
        let enemyGroup = this.physics.add.group();
        let enemiesHorizontalDistance = 790;
        for (let i = 0; i < 1; i++){
            let enemiesHeightPosition= Phaser.Math.Between(20,580);
            let enemies = enemyGroup.create(enemiesHorizontalDistance, enemiesHeightPosition, 'enemy');
            this.enemiesHorizontalDistance = enemiesHorizontalDistance + 300;
            enemies.body.velocity.x = -150;
            enemies.checkWorldBounds=true;
            enemies.on('outOfBounds',() =>{
            enemies.destroy();
                });
             }
            //Detecta la colision entre el player y las enemigos y la colision entre las balas y los enemigos
            this.physics.add.overlap(this.player, enemyGroup, this.impact, null, this);
            this.physics.add.overlap(this.Shoot, enemyGroup, this.collideShoot, null, this); 
        }



         update() {//Actualizacion de la posicion del personaje con su respectiva animacion
         if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
             this.player.anims.play('left', true);
                 }
             else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
                }
            else if (this.cursors.up.isDown ) {
            this.player.setVelocityY(-160);
            this.player.anims.play('up');
                }
            else if(this.cursors.down.isDown){
            this.player.setVelocityY(160);
            this.player.anims.play('down');
                }
            else{
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
            this.player.anims.play('right');
                }
     this.player.setCollideWorldBounds(true);
 
}




        collideShoot(Shoot, enemies) { //Colisión entre el disparo y los enemigos
            Shoot.disableBody(true, true);
            const explosion = this.add.sprite(enemies.x, enemies.y, '001');
            explosion.play('explosion');
            enemies.disableBody(true,true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            if(this.score > 250){
                this.life=100;
                this.score=0;
                this.scene.start('EscenaNave3', {sonidoDisparo:this.sonidoDisparo},{score:this.score}); //Celi esta pasa al level de Nico osea no la toques D:<

              }
        }

        impact(player, enemies){  // Colisión entre el player y los enemigos
         enemies.disableBody(true,true);
         const explosion = this.add.sprite(enemies.x, enemies.y, '001');
            explosion.play('explosion');
            this.life -= 25;
            this.lifeText.setText('life: ' + this.life + '%');
            if(this.life <= 0){
                this.life=100;
                this.score=0;
                this.sound.stopAll();
                this.scene.start('EscenaNave5');
                  }
            }       
}

  
export default EscenaNave2;