import React, { useEffect } from 'react';
import Phaser from 'phaser';

class EscenaNave1 extends Phaser.Scene {
  constructor() {
    super("EscenaNave1");
  }

  preload() {
    this.load.image('inicio', '/img/spacerivals.jpg', { frameWidth: 200, frameHeight: 200 });
    this.load.audio('sonido', '/sounds/musica_fondo.mp3');
  }

  create() {
    this.add.image(400, 300, 'inicio');
    let audio = this.sound.add('sonido', { loop: true });

    this.input.keyboard.on('keydown-SPACE', function () {
      this.scene.start('EscenaNave2');
      audio.play();
    }, this);
  }

  handleSpaceKey(event) {
    if (event.code === 'Space') {
      console.log('Presionada tecla SPACE');
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleSpaceKey);

    // Limpia los eventos cuando el componente se desmonta
    return () => {
      document.removeEventListener('keydown', this.handleSpaceKey);
    };
  }

  render() {
    return <div id="phaser-container" />;
  }
}

export default EscenaNave1;