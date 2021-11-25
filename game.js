//import Menu from 'Menu.js';

var gameSettings = {
    score: 0,
    vidas: 5,
    recorde: 0
} 

var config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Menu, Scene1, Scene2, GameOver],
    pixelArt: true,
    autoCenter: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
    }
}

var game = new Phaser.Game(config); /*
game.scene.add('Menu');
game.scene.add('Scene1');
game.scene.add('Scene2');*/

