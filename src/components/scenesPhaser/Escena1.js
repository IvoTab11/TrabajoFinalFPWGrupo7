import Phaser from "phaser";


class Escena1 extends Phaser.Scene{
    constructor(){
        super("Escena1");
        this.platforms = null;
    }

    preload(){
        this.load.image('inicio', '/img/start-01.jpg', {frameWidth: 200, frameHeight: 200})

    }

    create(){
        this.add.image(400, 300, 'inicio');
        this.input.keyboard.on('keydown-SPACE', function () {
            // Cambiar a la Escena2
            this.scene.start('Escena2');
        }, this);
    }

    // update(){
    //     if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
    //         this.scene.start('Escena2');
    //     }
    // }
}
export default Escena1;