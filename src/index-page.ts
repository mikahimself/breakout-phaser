/// <reference path="../defs/phaser.d.ts" />

import "phaser";
import { MainScene }  from './Scenes/MainScene';

const config: Phaser.Types.Core.GameConfig = {
    title: 'Phaser Breakout',
    width: 800,
    height: 600,
    parent: 'game',
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

export class PhaserBreakout extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.onload = () => {
    var game = new PhaserBreakout(config);
}