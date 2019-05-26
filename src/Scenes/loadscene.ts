/// <reference path="../../defs/phaser.d.ts" />
import 'phaser';


export class LoadScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'LoadScene'
        });
    }

    preload() {
        var centerX = this.cameras.main.centerX;
        var centerY = this.cameras.main.centerY;
        var boxW = 320;
        var boxH = 50;
        var barW = 300;
        var barH = 30;

        var progressBar: Phaser.GameObjects.Graphics = this.add.graphics();
        var progressBox: Phaser.GameObjects.Graphics = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(centerX - boxW / 2, centerY - boxH / 2, boxW, boxH);
        var loadingText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'Loading...', { fontFamily: 'VT323', fontSize: 25 });
        loadingText.setOrigin(0.5, 0.5);

        // Fill Progress Bar based on progress events
        this.load.on('progress', function(value){
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(centerX - barW / 2, centerY - barH / 2, barW * value, barH);
        });

        // Start Main scene after everything has been loaded
        this.load.on('complete', function(){
            this.scene.start('MenuScene');
            
        }, this);

        // Load graphics
        this.load.image('menubg', '../../assets/menuscreen.png');
        this.load.image('brick', '../../assets/brick.png');
        this.load.image('wall', '../../assets/wall.png');
        this.load.image('wall_c', '../../assets/wall_corner.png');
        this.load.image('wall_t', '../../assets/wall_top.png');
        this.load.image('ball', '../../assets/ball.png');
        this.load.image('bat', '../../assets/bat.png');
        this.load.spritesheet('tryagain', '../../assets/tryagain.png', {frameWidth: 200, frameHeight: 50});
        this.load.spritesheet('mainmenu', '../../assets/mainmenu.png', {frameWidth: 200, frameHeight: 50});
    }
}