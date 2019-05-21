import 'phaser';

export class MainScene extends Phaser.Scene {

    walls: Phaser.Physics.Arcade.StaticGroup;
    bricks: Phaser.Physics.Arcade.StaticGroup;
    level: string[];
    ball: Phaser.Physics.Arcade.Image;
    bat: Phaser.Physics.Arcade.Image;
    


    constructor() {
        super({
            key: 'MainScene'
        });
        this.level = [
            'xxxxxxxxxxxxxxxxxxxx',
            'x                  x',
            'x    oooooooooo    x',
            'x   oooooooooooo   x',
            'x   oooooooooooo   x',
            'x   oo  oooo  oo   x',
            'x   oo  oooo  oo   x',
            'x   oooooooooooo   x',
            'x     oooooooo     x',
            'x     oooooooo     x',
            'x      oooooo      x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x',
            'x                  x'
        ];

    }

    init() {

    }

    preload() {
        this.load.image('brick', '../../assets/brick.png');
        this.load.image('ball', '../../assets/ball.png');
        this.load.image('bat', '../../assets/bat.png');
    }

    create() {
        this.createWalls();
        this.ball = this.physics.add.image(415, 300, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.body.velocity.x = -220;
        this.ball.body.velocity.y = -220;
        this.ball.setBounce(1);
        this.physics.world.setBounds(40, 20, 720, 640);
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.bat = this.physics.add.image(400, 560, 'bat');
        this.bat.setImmovable();
        
        this.input.on('pointermove', function (pointer: Phaser.Input.Pointer) {
            this.bat.x = Phaser.Math.Clamp(pointer.x, 70, 730);
        }, this);



        this.physics.add.collider(this.ball, this.walls);
        this.physics.add.collider(this.ball, this.bat, this.hitBat, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    }

    update() {
        if (this.ball.y > 620) {
            this.resetBall();
        }
    }

    createWalls(): void {
        this.walls = this.physics.add.staticGroup();
        this.bricks = this.physics.add.staticGroup();
        for (let i = 0; i < this.level.length; i++) {
            for (let j = 0; j < this.level[i].length; j++) {
                if (this.level[i][j] == 'x') {
                    this.walls.create(40 * j + 20, 20 * i + 10, 'brick');
                }
                else if (this.level[i][j] == 'o') {
                    this.bricks.create(40 * j + 20, 20 * i + 10, 'brick');
                }
            }

        } 

    }

    hitBrick(ball: Phaser.Physics.Arcade.Image, brick: Phaser.Physics.Arcade.Sprite): void {
        brick.disableBody(true, true);
    }

    hitBat(ball: Phaser.Physics.Arcade.Image, bat: Phaser.Physics.Arcade.Image) {
        //this.ball.setVelocityY(-1 * ball.body.velocity.y);
    }

    resetBall(): void {
        this.ball.setVelocity(0);
        this.ball.setPosition(415, 300);
        this.ball.setVelocity(-220, -220);
    }
}