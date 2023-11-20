import React, { useEffect } from 'react';
import Phaser from 'phaser';

class EscenaNave3 extends Phaser.Scene {
  constructor() {
    super("EscenaNave3");
    this.platforms = null;
    this.lifeText = "";
    this.life = 100;
    this.scoreText = "";
    this.score = 0;
    this.bossLifeText = "";
    this.bossLife = 700;
    this.powerUp = null;
    this.powerUpActive = false;
    this.newProjectileTexture = 'misil';
  }

  preload() {
    this.load.image('sky', '/img/sky.png');
    this.load.spritesheet('nave', '/img/nave.png', { frameWidth: 70, frameHeight: 62 });
    this.load.image('red', '/img/red.png');
    this.load.image('boss', '/img/enemyBoss.png');
    this.load.image('bullet', '/img/shoot.png');
    this.load.image('shootEnemy', '/img/shootEnemy.png');
    this.load.image('powerUp', '/img/powerUp.png');
    this.load.image('misil', '/img/misil1.png');
  }

  init(data) {
    this.sonidoDisparo = data.sonidoDisparo;
    this.score = data.score;
  }

  create() {
    this.add.image(400, 300, 'sky');
    this.time.delayedCall(10000, () => this.createPowerUp(), [], this); // Usa arrow function para conservar la referencia correcta de `this`

    let particles = this.add.particles(0, 0, 'red', {
      speed: 100,
      angle: { min: 150, max: 210 },
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });

    this.boss = this.physics.add.staticGroup();
    this.boss.create(600, 300, 'boss').setScale(0.75).setAngle(90).setSize(300, 450).setOffset(150, -40);
    this.player = this.physics.add.sprite(100, 100, 'nave');
    particles.startFollow(this.player);
    this.Shoot = this.physics.add.group();

    this.time.addEvent({
      delay: 200,
      callback: () => {
        this.createBossShoots();
      },
      callbackScope: this,
      repeat: -1,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: [{ key: 'nave', frame: 1 }],
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

    this.lifeText = this.add.text(16, 16, 'life:' + this.life, { fontSize: '24px', fill: '#FFF' });
    this.bossLifeText = this.add.text(550, 16, 'boss life:' + this.bossLife, { fontSize: '24px', fill: '#FFF' });
    this.physics.add.overlap(this.player, this.boss, this.collide, null, this);
    this.physics.add.overlap(this.Shoot, this.boss, this.collideShoot, null, this);

    let lastShootTime = 0;
    const cooldown = 300;
    this.input.keyboard.on('keydown-A', event => {
      const currentTime = new Date().getTime();
      if (currentTime - lastShootTime >= cooldown) {
        if (this.powerUpActive) {
            // Si el power-up está activo, dispara dos proyectiles
            const bullet1 = this.Shoot.create(this.player.x , this.player.y- 70, 'bullet').setVelocityX(300);
            const bullet2 = this.Shoot.create(this.player.x , this.player.y + 70, 'bullet').setVelocityX(300);
            const bullet3 = this.Shoot.create(this.player.x, this.player.y, 'bullet').setVelocityX(300);

          } else {
            // Si el power-up no está activo, dispara un solo proyectil
            this.Shoot.create(this.player.x, this.player.y, 'bullet').setVelocityX(300);
          }
      
        this.sonidoDisparo.play();
        lastShootTime = currentTime;
      }
    });
  }

  createBossShoots() {
    let bossShootGroup = this.physics.add.group();
    let shootHorizontalDistance = 500;
    for (let i = 0; i < 1; i++) {
      let shootHeightPosition = Phaser.Math.Between(100, 500);
      let bossShoot = bossShootGroup.create(shootHorizontalDistance, shootHeightPosition, 'shootEnemy');
      this.shootHorizontalDistance = shootHorizontalDistance + 300;
      bossShoot.body.velocity.x = -150;
      bossShoot.checkWorldBounds = true;
      bossShoot.on('outOfBounds', () => {
        bossShoot.destroy();
      });
    }
    this.physics.add.overlap(this.player, bossShootGroup, this.impact, null, this);
  }

  update() {
    if (this.powerUpActive) {
        this.Shoot.getChildren().forEach((bullet) => {
          bullet.setTexture(this.newProjectileTexture);
        });
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play('up');
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play('down');
    } else {
      this.player.setVelocityY(0);
      this.player.setVelocityX(0);
      this.player.anims.play('right');
    }
    this.player.setCollideWorldBounds(true);
  }

  collide(player, boss) {
    this.life -= 0.5;
    this.lifeText.setText('life: ' + this.life);
    if (this.life <= 0) {
      this.bossLife = 700;
      this.life = 100;
      this.score = 0;
      this.sound.stopAll();
      this.scene.start('Escena5');
    }
  }

  collideShoot(Shoot, boss) {
    Shoot.disableBody(true, true);
    this.bossLife -= 10;
    this.bossLifeText.setText('boss life: ' + this.bossLife);
    if (this.bossLife <= 0) {
      this.bossLife = 700;
      this.life = 100;
      this.score = 0;
      this.sound.stopAll();
      this.scene.start('EscenaNave4');
    }
  }

  impact(player, bossShoot) {
    bossShoot.disableBody(true, true);
    this.life -= 5;
    this.lifeText.setText('life: ' + this.life);
    if (this.life <= 0) {
      this.bossLife = 700;
      this.life = 100;
      this.score = 0;
      this.sound.stopAll();
      this.scene.start('EscenaNave5');
    }
  }

  createPowerUp() {
    // Crear el power-up y permitir que caiga
    this.powerUp = this.physics.add.sprite(Phaser.Math.Between(100, 700), 0, 'powerUp');
    this.powerUp.setVelocityY(100);
    this.powerUp.setScale(0.2); // Cambiar el tamaño del power-up
    this.physics.world.enable(this.powerUp); // Colisión con el jugador para recoger el power-up
    this.physics.add.overlap(this.player, this.powerUp, this.collectPowerUp, null, this);
     
  }

  collectPowerUp(player, powerUp) {
    // Eliminar el power-up y activar el nuevo disparo
    powerUp.destroy();
    this.powerUpActive = true;
    this.Shoot.getChildren().forEach((bullet) => {
    bullet.setTexture(this.newProjectileTexture);
    bullet.setScale(0.2);

    
  });
  // Desactivar el power-up después de un tiempo (10 segundos)
  this.time.delayedCall(10000, () => {
    this.powerUpActive = false;
  });
  }

}

export default EscenaNave3;