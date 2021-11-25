class GameOver extends Phaser.Scene{
    constructor(){
        super('GameOver');
    }

    preload(){
        this.load.image('GameOver', 'assets/images/gameover.png');
        this.load.image('restart', 'assets/images/restart_button.png');
        this.load.image('menu', 'assets/images/menu_button.png');
        console.log("Score: " + gameSettings.score);
        
    }

    create(){
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(290, 280, 'Score: ' + gameSettings.score, {
            font: "50px Arial",
            fill: "red"
        });
        if (gameSettings.score > gameSettings.recorde){
            this.add.text(340,340, "NOVO RECORDE!", {
                font: "14px Arial"
            });
            gameSettings.recorde = gameSettings.score;
            
        }
        console.log(gameSettings.recorde);
        this.add.image(180, 0, 'GameOver').setOrigin(0, 0).setScale(0.3).setDepth(1);
        this.add.image(400, 400, 'restart').setScale(0.08).setDepth(1).setInteractive( {useHandCursor: true}).on('pointerup', () => this.scene.start('bootGame'));
        this.add.image(400, 500, 'menu').setScale(0.05).setDepth(1).setInteractive( {useHandCursor: true}).on('pointerup', () => this.scene.start('Menu'));



    }
}
