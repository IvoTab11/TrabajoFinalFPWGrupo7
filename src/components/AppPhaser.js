import Phaser from "phaser";
import { useEffect, useState } from "react";
import Escena1 from "./scenesPhaser/Escena1";
import Escena2 from "./scenesPhaser/Escena2"
import Escena3 from "./scenesPhaser/Escena3";
import Escena4 from "./scenesPhaser/Escena4";
import Escena5 from "./scenesPhaser/Escena5";
import EscenaNueva from "./scenesPhaser/EscenaNueva";

// Función componente AppPhaser que utiliza React hooks (useState, useEffect)
function AppPhaser() {
    // Definición de las escenas que se utilizarán en el juego
    const Escenas = [Escena1, Escena2, Escena3, Escena4, Escena5, EscenaNueva];

    // Función para crear una instancia de una escena
    const crearEscena = Scene => new Scene();

    // Función para iniciar todas las escenas y retornar un arreglo de instancias de escenas
    const iniciarEscena = () => Escenas.map(crearEscena);

    // Estado para indicar si el juego está listo
    const [listo, setListo] = useState(false);

    // Efecto de React que se ejecuta después de que el componente se monta
    useEffect(() => {
        // Configuración del juego con Phaser
        let config = {
            type: Phaser.AUTO,
            width: 800,
            height: 620,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: iniciarEscena()
        };

        // Creación de la instancia del juego
        let game = new Phaser.Game(config);

        // Configuración de un evento que se dispara cuando el juego está listo
        game.events.on("LISTO", setListo);

        // Función que se ejecuta al desmontar el componente
        return () => {
            // Reinicia el estado a false y destruye el juego
            setListo(false);
            game.destroy(true);
        };
    }, [listo]); // La dependencia listo hace que el efecto se ejecute cuando listo cambia

}

// Exporta la función componente AppPhaser para que pueda ser utilizada en otros archivos
export default AppPhaser;