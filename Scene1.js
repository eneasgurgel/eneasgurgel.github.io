class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/images/background.png");  

        this.load.spritesheet("player", "assets/spritesheets/carro.png", {
            frameWidth: 70,
            frameHeight: 55
        }); 
        this.load.spritesheet("police1", "assets/spritesheets/police.png", {
            frameWidth: 70,
            frameHeight: 55
        });
        this.load.spritesheet("police2", "assets/spritesheets/police2.png", {
            frameWidth: 70,
            frameHeight: 55
        });
        this.load.spritesheet("police3", "assets/spritesheets/police3.png", {
            frameWidth: 70,
            frameHeight: 55
        });
        this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
        //this.load.audio("music", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/sci-fi_platformer12.mp3"]);
        this.load.audio("music", ["assets/sounds/somJogo.ogg", "assets/sounds/somJogo.mp3"]);

    }

    create(){
        this.scene.start("playGame");

        this.anims.create({
            key: "police1_anim",
            frames: this.anims.generateFrameNumbers("police1", { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: "police2_anim",
            frames: this.anims.generateFrameNumbers("police2", { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: "police3_anim",
            frames: this.anims.generateFrameNumbers("police3", { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers("player", { start: 16, end: 19 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0
        });
    }
}