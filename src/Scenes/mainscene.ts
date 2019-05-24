/// <reference path="../../defs/phaser.d.ts" />
import 'phaser';
import { LevelData } from './LevelData';
import { Cameras } from 'phaser';

export class MainScene extends Phaser.Scene {

    walls: Phaser.Physics.Arcade.StaticGroup;
    bricks: Phaser.Physics.Arcade.StaticGroup;
    currentLevel: string[];
    currentLevelNo: number = 0;
    ball: Phaser.Physics.Arcade.Image;
    bat: Phaser.Physics.Arcade.Image;
    ballOnBat: boolean;
    score: number = 0;
    scoreText: Phaser.GameObjects.Text;
    lives: number = 3;
    livesText: Phaser.GameObjects.Text;
    gameOver: boolean = false;
    gameFinished: boolean = false;
    gameOverText: Phaser.GameObjects.Text;
    gameCompleteText: Phaser.GameObjects.Text;
    againButton: Phaser.Physics.Arcade.Sprite;
    levelData: LevelData;
    brickCount: number = 0;

    constructor() {
        super({
            key: 'MainScene'
        });
    }

    init() {

    }

    preload() {
        // Load every sprite during preload.
        this.load.image('brick', '../../assets/brick.png');
        this.load.image('wall', '../../assets/wall.png');
        this.load.image('wall_c', '../../assets/wall_corner.png');
        this.load.image('wall_t', '../../assets/wall_top.png');
        this.load.image('ball', '../../assets/ball.png');
        this.load.image('bat', '../../assets/bat.png');
        this.load.spritesheet('tryagain', '../../assets/tryagain.png', {frameWidth: 200, frameHeight: 50});
    }

    create() {
        this.levelData = new LevelData();
        this.currentLevel = this.levelData.levels[this.currentLevelNo];
        this.createWalls();
        this.scoreText = this.add.text(10, 3, 'SCORE: 000000', { fontFamily: 'VT323', fontSize: 25 });
        this.livesText = this.add.text(710, 3, 'LIVES: 3', {fontFamily: 'VT323', fontSize: 25});
        this.gameOverText = this.add.text(250, 250, 'GAME OVER', { fontFamily: 'VT323', fontSize: 80 });
        this.gameOverText.visible = false;
        this.gameCompleteText = this.add.text(150, 250, 'A WINNER IS YOU!', { fontFamily: 'VT323', fontSize: 80 });
        this.gameCompleteText.visible = false;
        this.ball = this.physics.add.image(415, 300, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.physics.world.setBounds(40, 20, 720, 640);
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.bat = this.physics.add.image(400, 560, 'bat');
        this.bat.setImmovable();
        this.resetBall();
        this.createMoveEvent();
        this.createLaunchEvent();
        this.againButton = this.physics.add.sprite(400, 400, 'tryagain').setInteractive();
        this.againButton.disableBody(true, true);
        this.createButtonEvents();
        this.physics.add.collider(this.ball, this.walls);
        this.physics.add.collider(this.ball, this.bat, this.hitBat, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    }

    update() {
        this.checkForGameOver();
        this.checkForLevelComplete();
        console.log(this.currentLevelNo);
    }

    createWalls(): void {

        var bufferX = 20;
        var multiX = 40;
        var bufferY = 40;
        var multiY = 20;

        this.walls = this.physics.add.staticGroup();
        this.bricks = this.physics.add.staticGroup();
        for (let i = 0; i < this.currentLevel.length; i++) {
            for (let j = 0; j < this.currentLevel[i].length; j++) {
                if (this.currentLevel[i][j] == 'x') {
                    this.walls.create((j * multiX) + bufferX, (i * multiY) + bufferY, 'wall');
                }
                else if (this.currentLevel[i][j] == 'v') {
                    this.walls.create((j * multiX) + bufferX, (i * multiY) + bufferY, 'wall').setScale(-1, 1);
                }
                else if (this.currentLevel[i][j] == 'w') {
                    this.walls.create((j * multiX) + bufferX, (i * multiY) + bufferY, 'wall_c');
                }
                else if (this.currentLevel[i][j] == 'z') {
                    this.walls.create((j * multiX) + bufferX, (i * multiY) + bufferY, 'wall_c').setScale(-1,1);
                }
                else if (this.currentLevel[i][j] == 'y') {
                    this.walls.create((j * multiX) + bufferX, (i * multiY) + bufferY, 'wall_t');
                }
                else if (this.currentLevel[i][j] == 'o') {
                    this.bricks.create((j * multiX) + bufferX, (i * multiY) + bufferY, 'brick').setTint(0x00ff00);
                    this.brickCount++;
                }
                else if (this.currentLevel[i][j] == '1') {
                    this.bricks.create((j * multiX) + bufferX, (i * multiY) + bufferY, 'brick').setTint(0xff0000);
                    this.brickCount++;
                }
                else if (this.currentLevel[i][j] == '2') {
                    this.bricks.create((j * multiX) + bufferX, (i * multiY) + bufferY, 'brick').setTint(0xf9821a);
                    this.brickCount++;
                }
                else if (this.currentLevel[i][j] == '3') {
                    this.bricks.create((j * multiX) + bufferX, (i * multiY) + bufferY, 'brick').setTint(0x00ff00);
                    this.brickCount++;
                }
                else if (this.currentLevel[i][j] == '4') {
                    this.bricks.create((j * multiX) + bufferX, (i * multiY) + bufferY, 'brick')
                    this.brickCount++;
                }
            }
        } 
    }

    hitBrick(ball: Phaser.Physics.Arcade.Image, brick: Phaser.Physics.Arcade.Sprite): void {
        brick.disableBody(true, true);
        this.brickCount--;
        this.score += 100;
        var scorestring = this.score.toString();
        var prezeros = '';
        for (let i = 0; i < 6 - scorestring.length; i++) { prezeros += '0';}

        scorestring = prezeros + scorestring;
        this.scoreText.setText('SCORE: ' + scorestring);
    }

    hitBat(ball: Phaser.Physics.Arcade.Image, bat: Phaser.Physics.Arcade.Image) {
        var xdiff = ball.x - bat.x;
        var angle = -90 + (xdiff * 1.35);
        var speed = this.physics.velocityFromAngle(angle, 300);
        ball.setVelocity(speed.x, speed.y);
    }

    resetBall(): void {
        this.ball.setVelocity(0);
        this.ball.setPosition(this.bat.x, this.bat.y - 50);
        this.ballOnBat = true;
    }

    checkForLevelComplete(): void {
        if (this.brickCount == 0) {
            this.currentLevelNo++;
            this.onProgressLevel();
        }
    }

    checkForGameOver(): void {
        if (this.ball.y > 620 && !this.gameOver) {
            this.onBallOutOfBounds();
        }

        if (this.ballOnBat) {
            this.ball.x = this.bat.x;
        }
    }

    onBallOutOfBounds(): void {
        this.cameras.main.shake(200, 0.01);

        if (this.lives > 0) {
            this.lives -= 1;
            this.livesText.setText('LIVES: ' + this.lives);
            this.resetBall();
        }
        else {
            this.onGameOver();
        }
    }

    onProgressLevel(): void {
        if (this.currentLevelNo + 1 <= this.levelData.levels.length) {
            this.currentLevel = this.levelData.levels[this.currentLevelNo];
            this.createWalls();
            this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
            this.resetBall();
        }
        else {
            this.onGameComplete();
        }
        
        
    }

    onGameComplete(): void {
        this.gameFinished = true;
        this.gameCompleteText.visible = true;
        this.againButton.enableBody(false, 400, 400, true, true);
        this.againButton.setFrame(0);
        this.currentLevelNo = 0;
    }

    onGameOver(): void {
        this.gameOver = true;
        this.gameOverText.visible = true;
        this.againButton.enableBody(false, 400, 400, true, true);
        this.againButton.setFrame(0);
        
    }

    onResetGame(): void {
        this.againButton.disableBody(true, true);
        this.gameOverText.visible = false;
        this.gameCompleteText.visible = false;
        this.brickCount = 0;
        this.bricks.getChildren().forEach((child:Phaser.Physics.Arcade.Sprite) => {
            child.disableBody(true, true);
        });
        this.currentLevelNo = 0;
        this.currentLevel = this.levelData.levels[this.currentLevelNo];
        this.createWalls();
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
        this.lives = 3;
        this.score = 0;
        this.livesText.setText('LIVES: ' + this.lives);
        this.resetBall();
        this.gameOver = false;
        this.gameFinished = false;
        
    }

    createLaunchEvent(): void {
        this.input.on('pointerup', function(pointer: Phaser.Input.Pointer) {
            if (this.ballOnBat && !this.gameOver) {
                var speed = this.physics.velocityFromAngle(Math.floor(Math.random() * (61)) -120, 300);
                this.ball.setVelocity(speed.x, speed.y);
                this.ballOnBat = false;
            }
        }, this);
    }

    createMoveEvent(): void {
        this.input.on('pointermove', function (pointer: Phaser.Input.Pointer) {
            this.bat.x = Phaser.Math.Clamp(pointer.x, 70, 730);
        }, this);
    }

    createButtonEvents(): void {
        this.againButton.on('pointerout', function (pointer: Phaser.Input.Pointer) {
            this.againButton.setFrame(0);
        }, this);

        this.againButton.on('pointerover', function (pointer: Phaser.Input.Pointer) {
            this.againButton.setFrame(1);
        }, this);
        
        this.againButton.on('pointerup', function (pointer: Phaser.Input.Pointer) { 
            this.againButton.setFrame(2);
            this.onResetGame();
        }, this);
    }
}