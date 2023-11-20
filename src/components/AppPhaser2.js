import Phaser from 'phaser';
import React, { useEffect, useRef } from 'react';
import EscenaNave1 from './sceneshaser2/EscenaNave1';
import EscenaNave2 from './sceneshaser2/EscenaNave2';
import EscenaNave3 from './sceneshaser2/EscenaNave3';
import EscenaNave4 from './sceneshaser2/EscenaNave4';
import EscenaNave5 from './sceneshaser2/EscenaNave5';


const AppPhaser2 = () => {
  const phaserRef = useRef(null);

  useEffect(() => {
    const config = {
        type: Phaser.AUTO,
        width: 820,
        height: 622,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: [EscenaNave1, EscenaNave2, EscenaNave3, EscenaNave4, EscenaNave5],
      };

    // Crear el juego Phaser
    phaserRef.current = new Phaser.Game(config);

    return () => {
      // Limpia el juego cuando el componente se desmonta
      if (phaserRef.current) {
        phaserRef.current.destroy(true); // true para borrar también el DOM
      }
    };
  }, []);

  return <div id="phaser-container" />;
};

export default AppPhaser2;