/// <reference path="../defs/phaser.d.ts" />

import 'phaser';
import { MainScene }  from './Scenes/mainscene';
import { LoadScene } from './Scenes/loadscene';
import { MenuScene } from './Scenes/menuscene';

const config: Phaser.Types.Core.GameConfig = {
    title: 'Phaser Breakout',
    width: 800,
    height: 600,
    parent: 'game',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ LoadScene, MenuScene, MainScene ]
}

export class PhaserBreakout extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.onload = () => {
    var game = new PhaserBreakout(config);
}