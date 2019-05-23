import 'phaser';
import { LevelData } from './LevelData';
import { Cameras } from 'phaser';

export class MainScene extends Phaser.Scene {

    walls: Phaser.Physics.Arcade.StaticGroup;
    bricks: Phaser.Physics.Arcade.StaticGroup;
    level: string[];
    ball: Phaser.Physics.Arcade.Image;
    bat: Phaser.Physics.Arcade.Image;
    ballOnBat: boolean;
    


    constructor() {
        super({
            key: 'MainScene'
        });
        var leveldata = new LevelData();
        //this.level = Phaser.Utils.Array.GetRandom(leveldata.levels);
        this.level = leveldata.level1;
        
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
    }

    create() {
        this.createWalls();
        this.ball = this.physics.add.image(415, 300, 'ball');
        this.ball.setCollideWorldBounds(true);
        //this.ball.body.velocity.x = -220;
        //this.ball.body.velocity.y = -220;
        this.ball.setBounce(1);
        this.physics.world.setBounds(40, 20, 720, 640);
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.bat = this.physics.add.image(400, 560, 'bat');
        this.bat.setImmovable();
        this.resetBall();
        
        this.createMoveEvent();
        this.createLaunchEvent();

        



        this.physics.add.collider(this.ball, this.walls);
        this.physics.add.collider(this.ball, this.bat, this.hitBat, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    }

    update() {
        if (this.ball.y > 620) {
            this.cameras.main.shake(200, 0.01);
            this.resetBall();
        }

        if (this.ballOnBat) {
            this.ball.x = this.bat.x;
        }
        //console.log(this.ball.body.velocity);
    }

    createWalls(): void {
        this.walls = this.physics.add.staticGroup();
        this.bricks = this.physics.add.staticGroup();
        for (let i = 0; i < this.level.length; i++) {
            for (let j = 0; j < this.level[i].length; j++) {
                if (this.level[i][j] == 'x') {
                    this.walls.create(40 * j + 20, 20 * i + 40, 'wall');
                }
                else if (this.level[i][j] == 'v') {
                    this.walls.create(40 * j + 20, 20 * i + 40, 'wall').setScale(-1, 1);
                }
                else if (this.level[i][j] == 'w') {
                    this.walls.create(40 * j + 20, 20 * i + 40, 'wall_c');
                }
                else if (this.level[i][j] == 'z') {
                    this.walls.create(40 * j + 20, 20 * i + 40, 'wall_c').setScale(-1,1);
                }
                else if (this.level[i][j] == 'y') {
                    this.walls.create(40 * j + 20, 20 * i + 40, 'wall_t');
                }
                else if (this.level[i][j] == 'o') {
                    this.bricks.create(40 * j + 20, 20 * i + 40, 'brick').setTint(0x00ff00);
                }
                else if (this.level[i][j] == '1') {
                    this.bricks.create(40 * j + 20, 20 * i + 40, 'brick').setTint(0xff0000);
                }
                else if (this.level[i][j] == '2') {
                    this.bricks.create(40 * j + 20, 20 * i + 40, 'brick').setTint(0xf9821a);
                }
                else if (this.level[i][j] == '3') {
                    this.bricks.create(40 * j + 20, 20 * i + 40, 'brick').setTint(0x00ff00);
                }
                else if (this.level[i][j] == '4') {
                    this.bricks.create(40 * j + 20, 20 * i + 40, 'brick')
                }
            }

        } 

    }

    hitBrick(ball: Phaser.Physics.Arcade.Image, brick: Phaser.Physics.Arcade.Sprite): void {
        brick.disableBody(true, true);
    }

    hitBat(ball: Phaser.Physics.Arcade.Image, bat: Phaser.Physics.Arcade.Image) {
        var xdiff = ball.x - bat.x;
        console.log("Difference: " + xdiff);
        //ball.body.velocity.x = Phaser.Math.Clamp(xdiff * 10, -350, 350);
        
        if (xdiff < 0) {
            var angle = -90 + (xdiff * 1.35);
            var speed = this.physics.velocityFromAngle(angle, 300);
            ball.setVelocity(speed.x, speed.y);
        }
        else if (xdiff >= 0) {
            var angle = -90 + (xdiff * 1.35);
            var speed = this.physics.velocityFromAngle(angle, 300);
            ball.setVelocity(speed.x, speed.y);
        }

        
    }

    resetBall(): void {
        this.ball.setVelocity(0);
        this.ball.setPosition(this.bat.x, this.bat.y - 50);
        this.ballOnBat = true;
        //this.ball.setVelocity(-220, -220);
    }

    createLaunchEvent(): void {
        this.input.on('pointerup', function(pointer: Phaser.Input.Pointer) {
            if (this.ballOnBat) {
                var speed = this.physics.velocityFromAngle(Math.floor(Math.random() * (61)) -120, 300);
                //var speed = this.physics.velocityFromAngle(-60, 250);
                //console.log('Speed: ' + speed);
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
}