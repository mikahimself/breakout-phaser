/// <reference path="../../defs/phaser.d.ts" />
import 'phaser';


export class MenuScene extends Phaser.Scene {

    startText: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: 'MenuScene'
        });
    }

    create(): void {

        var centerX = this.cameras.main.centerX;
        var centerY = this.cameras.main.centerY;
        var boxW = 320;
        var boxH = 50;
        var barW = 300;
        var barH = 30;

        this.add.image(centerX, centerY, 'menubg');
        this.startText = this.add.text(centerX, centerY + 100, 'START GAME', {fontFamily: 'VT323', fontSize: 50}).setInteractive();
        this.startText.setOrigin(0.5, 0.5);

        this.startText.on('pointerout', function (pointer: Phaser.Input.Pointer) {
            this.startText.setTint(0xffffff);
        }, this);

        this.startText.on('pointerover', function (pointer: Phaser.Input.Pointer) {
            this.startText.setTint(0xb2b200);
        }, this);
        
        this.startText.on('pointerup', function (pointer: Phaser.Input.Pointer) { 
            this.startText.setTint(0xffff99);
            this.scene.start('MainScene');

        }, this);

    }
}