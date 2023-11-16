import Phaser from "phaser";
import { useEffect, useState } from "react";
import Escena1 from "./scenesPhaser/Escena1";
import Escena2 from "./scenesPhaser/Escena2"
import Escena3 from "./scenesPhaser/Escena3";
import Escena4 from "./scenesPhaser/Escena4";
import Escena5 from "./scenesPhaser/Escena5";
import EscenaNueva from "./scenesPhaser/EscenaNueva";

function AppPhaser(){

    const Escenas = [Escena1,Escena2,Escena3,Escena4,Escena5,EscenaNueva];
    const crearEscena = Scene => new Scene();
    const iniciarEscena = () => Escenas.map(crearEscena);

    const[listo, setListo] = useState (false);

useEffect(() =>{
    let config = {

        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics:{
            default: 'arcade',
            arcade: {
                gravity: {y:300},
                debug: false
            }
        },
    
        scene: iniciarEscena()
    
    };

    let game = new Phaser.Game(config)
    game.events.on("LISTO",setListo)
    
    return ()=> {
        setListo(false);
        game.destroy(true);
    }

}, [listo]);


}

export default AppPhaser;