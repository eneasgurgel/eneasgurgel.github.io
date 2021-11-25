class Menu extends Phaser.Scene {
    constructor(){
        super('Menu');
    }

    preload(){
        this.load.image('menuBackg', 'assets/images/backgroundMenu.png');
        //this.load.image('logo', 'assets/logo.png');
        this.load.image('jogar', 'assets/images/play_button.jpg');
        
    } 
    
    create() {
        this.add.text(310, 100, "A Fuga ", {
            font: "48px Arial"
        }).setDepth(1);

        //this.cursors = this.input.keyboard.createCursorKeys();
        this.add.image(0, 0, 'menuBackg').setOrigin(0, 0).setScale(1.2);
        
        this.add.image(390, 250, 'jogar').setScale(0.3).setDepth(1).setInteractive( {useHandCursor: true}).on('pointerdown', () => this.scene.start('bootGame'));

        
    }
}