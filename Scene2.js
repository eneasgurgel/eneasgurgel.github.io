class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }

    create(){
        gameSettings.score = 0;
        gameSettings.vidas = 5;

        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0); 

       this.scoreText = this.add.text(0, 0, 'Score: ' + gameSettings.score, {
            font: "20px Arial",
            fill: "black"
        });
        this.scoreText2 = this.add.text(0, 20, 'Vidas: ' + gameSettings.vidas, {
            font: "20px Arial",
            fill: "black"
        });
        this.add.text(0, 40, 'Recorde: ' + gameSettings.recorde, {
            font: "20px Arial", 
            fill: "black"
        });

        /*
        this.police1 = this.add.sprite(300, 0, "police1");
        this.police2 = this.add.sprite(400, 0, "police2");
        this.police3 = this.add.sprite(500, 0, "police3");
        this.police4 = this.add.sprite(350, 0, "police1");
        this.police5 = this.add.sprite(450, 0, "police2");
        this.police6 = this.add.sprite(550, 0, "police3");
        */

        this.police1 = this.add.sprite(Phaser.Math.Between(200, 650), 0, "police1");
        this.police2 = this.add.sprite(Phaser.Math.Between(200, 650), 0, "police2");
        this.police3 = this.add.sprite(Phaser.Math.Between(200, 650), 0, "police3");
        this.police4 = this.add.sprite(Phaser.Math.Between(200, 650), 0, "police1");
        this.police5 = this.add.sprite(Phaser.Math.Between(200, 650), 0, "police2");
       // this.police6 = this.add.sprite(Phaser.Math.Between(200, 650), 0, "police3");
    
        this.enemies = this.physics.add.group();
        this.enemies.add(this.police1);
        this.enemies.add(this.police2);
        this.enemies.add(this.police3);
        this.enemies.add(this.police4);
        this.enemies.add(this.police5);
        //this.enemies.add(this.police6);

        this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
        this.player.play("thrust");
        this.cursorKeys = this.input.keyboard.createCursorKeys();    
        this.player.setCollideWorldBounds(true);

        this.police1.play("police1_anim");
        this.police2.play("police2_anim");
        this.police3.play("police3_anim");
        this.police4.play("police1_anim");
        this.police5.play("police2_anim");
        //this.police6.play("police3_anim");

        this.police1.setInteractive();
        this.police2.setInteractive();
        this.police3.setInteractive();
        this.police4.setInteractive();
        this.police5.setInteractive();
        //this.police6.setInteractive();

        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

        this.explosionSound = this.sound.add("audio_explosion");

        this.music = this.sound.add("music");
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.music.play(musicConfig);

        this.physics.add.collider(this.police1, this.police2);
        this.physics.add.collider(this.police1, this.police3);
        this.physics.add.collider(this.police1, this.police4);
        this.physics.add.collider(this.police1, this.police5);
        //this.physics.add.collider(this.police1, this.police6);
        
    }

    update(){
        this.movePolice(this.police1, 4);
        this.movePolice(this.police2, 5);
        this.movePolice(this.police3, 4);
        this.movePolice(this.police4, 4);
        this.movePolice(this.police5, 5);
        //this.movePolice(this.police6, 4);
        
        this.background.tilePositionY -= 3.5;

        this.movePlayer();

    }

    movePolice(police, speed){
        police.y += speed;
        if (police.y > config.height){
            this.resetPolicePos(police);
            gameSettings.score +=1;
            this.scoreText.setText("Score: " + gameSettings.score);
        }
        
    }

    resetPolicePos(police){
        police.y = 0;
        var randomX = Phaser.Math.Between(200, 650);
        police.x = randomX;
    }

    movePlayer(){
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-200);
            
        }else if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(200);
        } else {
            this.player.setVelocityX(0);
        }
    
    }

    hurtPlayer(player, enemy){
        this.resetPolicePos(enemy);
     
        if(this.player.alpha < 1){
            return;
        }

        var explosion = new Explosion(this, player.x, player.y);
        this.explosionSound.play();
        

        player.disableBody(true, true);
        
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });

        gameSettings.vidas -= 1;
        this.scoreText2.setText("Vidas: " + gameSettings.vidas);
        if (gameSettings.vidas < 0){
            this.scene.start('GameOver', this);
            console.log("Game Over!");
            this.music.stop();
        }
        console.log(this.vidas);
    }

    resetPlayer(){
        var x = config.width / 2 - 8;
        var y = config.height + 64;
        this.player.enableBody(true, x, y, true, true);

        this.player.alpha = 0.5;

        var tween = this.tweens.add({
            targets: this.player,
            y: config.height - 64,
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: function(){
                this.player.alpha = 1;
            },
            callbackScope: this
        });
    }
}