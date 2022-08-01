import { loadAnimation } from "./animation";
import { preload } from "./preload";

const gameWidth = 960;
const gameHeight = 540;

class Main {
  constructor() {
    this._startGame();
  }
  private _startGame() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      render: {
        pixelArt: true,
      },
      physics: {
        default: "matter",
        matter: {
          gravity: { y: 1 },
          debug: true,
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gameWidth,
        height: gameHeight,
      },
      scene: [PlayGame],
    };

    var game = new Phaser.Game(config);
  }
}

const landscape = Math.random() > 0.5 ? "day" : "night";

class PlayGame extends Phaser.Scene {
  bg: Phaser.GameObjects.TileSprite[];
  keys: Record<string, any>;
  playerController: {
    matterSprite: Phaser.Physics.Matter.Sprite;
    character: string;
    speed: number;
    direction: -1 | 1;
    sensors: { bottom: any; left: any; right: any };
    touchFloor: boolean;
    canJump: boolean;
    canDoubleJump: boolean;
    lastDodge: number;
  };
  cam: Phaser.Cameras.Scene2D.Camera;
  map: Phaser.Tilemaps.Tilemap;

  constructor() {
    super({
      key: "PlayGame",
    });
    this.playerController = {
      matterSprite: null,
      character:
        Math.random() < 0.4 ? "punk" : Math.random() < 0.5 ? "cyborg" : "biker",
      speed: 1,
      direction: 1,
      sensors: {
        bottom: null,
        left: null,
        right: null,
      },
      touchFloor: false,
      canJump: true,
      canDoubleJump: false,
      lastDodge: -2000,
    };
  }
  init() {}
  preload() {
    preload.call(this);
  }
  create() {
    // Animation
    loadAnimation.call(this);

    // Keyboard
    this.keys = this.input.keyboard.addKeys("W,A,S,D,SHIFT,J,K,SPACE");

    // World
    const map = this.make.tilemap({
      // data: level,
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });
    this.bg = [
      this.add
        .tileSprite(0, 0, 576, 324, `${landscape}_bg1`)
        .setScale(1.7, 1.5)
        .setOrigin(0, 0),
      this.add
        .tileSprite(0, 0, 576, 324, `${landscape}_bg2`)
        .setScale(1.7, 1.5)
        .setOrigin(0, 0),
      this.add
        .tileSprite(0, 0, 576, 324, `${landscape}_bg3`)
        .setScale(1.7, 1.5)
        .setOrigin(0, 0),
      this.add
        .tileSprite(0, 0, 576, 324, `${landscape}_bg4`)
        .setScale(1.7, 1.5)
        .setOrigin(0, 0),
      this.add
        .tileSprite(0, 0, 576, 324, `${landscape}_bg5`)
        .setScale(1.7, 1.5)
        .setOrigin(0, 0),
    ];

    this.map = map;
    const tiles = map.addTilesetImage("green", "tiles");
    const groundLayer = map.createLayer(0, tiles, 0, 0);
    groundLayer.setCollisionByProperty({ collides: true });

    this.matter.world.convertTilemapLayer(groundLayer);
    this.matter.world.setBounds(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels - 4
    );
    this.matter.world.createDebugGraphic();
    this.matter.world.drawDebug = true;
    this.matter.world.debugGraphic.visible = false;

    // Player
    this.playerController.matterSprite = this.matter.add.sprite(
      0,
      0,
      `${this.playerController.character}_idle`
    );
    // @ts-ignore
    var M = Phaser.Physics.Matter.Matter;
    var w = this.playerController.matterSprite.width;
    var h = this.playerController.matterSprite.height;

    // Move the sensor to player center
    var sx = w / 2;
    var sy = h / 2;

    // The player's body is going to be a compound body.
    var playerBody = M.Bodies.rectangle(sx, sy + 7, w * 0.5, h * 0.7, {
      chamfer: { radius: 5 },
    });

    this.playerController.sensors.bottom = M.Bodies.rectangle(
      sx,
      h + 3,
      sx,
      5,
      {
        isSensor: true,
      }
    );
    this.playerController.sensors.left = M.Bodies.rectangle(
      sx - w * 0.35,
      sy,
      5,
      h * 0.25,
      { isSensor: true }
    );
    this.playerController.sensors.right = M.Bodies.rectangle(
      sx + w * 0.35,
      sy,
      5,
      h * 0.25,
      { isSensor: true }
    );
    var compoundBody = M.Body.create({
      parts: [
        playerBody,
        this.playerController.sensors.bottom,
        this.playerController.sensors.left,
        this.playerController.sensors.right,
      ],
      friction: 0.01,
      restitution: 0.05, // Prevent body from sticking against a wall
    });

    this.playerController.matterSprite.setExistingBody(compoundBody);
    this.playerController.matterSprite
      .setFixedRotation()
      .setPosition(30, gameHeight - 72);

    this.cam = this.cameras.main;
    this.cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels - 4);
    this.smoothMoveCameraTowards(this.playerController.matterSprite);

    this.input.on(
      "pointerdown",
      function () {
        this.matter.world.debugGraphic.visible =
          !this.matter.world.debugGraphic.visible;
      },
      this
    );

    this.matter.world.on(
      "collisionactive",
      function (event) {
        const playerBody = this.playerController.matterSprite.body;
        const bottom = this.playerController.sensors.bottom;

        for (var i = 0; i < event.pairs.length; i++) {
          var bodyA = event.pairs[i].bodyA;
          var bodyB = event.pairs[i].bodyB;
          if (bodyA === playerBody || bodyB === playerBody) {
            continue;
          } else if (bodyA === bottom || bodyB === bottom) {
            this.playerController.touchFloor = true;
          }
        }
      },
      this
    );

    this.matter.world.on(
      "beforeupdate",
      function () {
        this.playerController.canJump = false;
        this.playerController.touchFloor = false;
      },
      this
    );

    this.matter.world.on(
      "afterupdate",
      function () {
        if (this.playerController.touchFloor) {
          this.playerController.canJump = true;
          this.playerController.canDoubleJump = true;
        } else {
          this.playerController.canJump = false;
        }
      },
      this
    );
  }

  playerAction(key, ...args) {
    const player = this.playerController.matterSprite;
    player.anims.play(`${this.playerController.character}_${key}`, ...args);
  }

  update(time: number, delta: number): void {
    const player = this.playerController.matterSprite;
    // if (!player) return;

    // speed
    if (this.keys.A.isDown || this.keys.D.isDown) {
      this.playerController.speed = this.keys.SHIFT.isDown ? 3 : 1;
    } else {
      this.playerController.speed = 0;
    }
    // direction
    if (this.keys.A.isDown) {
      player.setFlipX(true);
      this.playerController.direction = -1;
      player.setVelocityX(
        1 * this.playerController.speed * this.playerController.direction
      );
    } else if (this.keys.D.isDown) {
      player.setFlipX(false);
      this.playerController.direction = 1;
      player.setVelocityX(
        1 * this.playerController.speed * this.playerController.direction
      );
    } else {
      player.setVelocityX(0);
    }
    // moveAnimation
    let moveAnim = this.keys.SHIFT.isDown ? "run" : "walk";
    if (this.keys.J.isDown) moveAnim += "_attack";

    // actions
    // 需按紧触发的，play的第二个参数得设为true，代表不会打断正在播放的动画重头开始
    if (Phaser.Input.Keyboard.JustDown(this.keys.W)) {
      if (this.playerController.canJump) {
        player.setVelocityY(-6);
        this.playerAction("jump");
      } else if (this.playerController.canDoubleJump) {
        player.setVelocityY(-6);
        this.playerController.canDoubleJump = false;
        this.playerAction("doublejump");
      }
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.keys.SPACE) &&
      time - this.playerController.lastDodge > 2000
    ) {
      this.playerAction("dash", true);
    }

    if (this.keys.S.isDown) {
      this.playerAction("death", true);
    } else if (this.keys.J.isDown) {
      this.playerAction("attack2", true);
    } else if (this.keys.K.isDown) {
      this.playerAction("attack3", true);
    } else if (this.keys.A.isDown || this.keys.D.isDown) {
      if (!player.anims.isPlaying || player.anims.repeat === -1)
        this.playerAction(moveAnim, true);
    } else {
      if (!player.anims.isPlaying || player.anims.repeat === -1)
        this.playerAction("idle", true);
    }

    // Camera
    this.smoothMoveCameraTowards(player);

    // bg
    const bgSpeed = [0.01, 0.05, 0.1, 1, 0.2];
    this.bg.forEach((bg, i) => {
      if (
        player.x > this.cam.centerX &&
        this.map.widthInPixels - player.x > this.cam.centerX
      ) {
        bg.setX(player.x - this.cam.centerX);
      }
      bg.tilePositionX +=
        bgSpeed[i] *
        (i === 3
          ? 1
          : this.playerController.direction * this.playerController.speed);
    });
  }

  smoothMoveCameraTowards(target, smoothFactor: number = 0) {
    this.cam.scrollX =
      smoothFactor * this.cam.scrollX +
      (1 - smoothFactor) * (target.x - this.cam.width * 0.5);
    this.cam.scrollY =
      smoothFactor * this.cam.scrollY +
      (1 - smoothFactor) * (target.y - this.cam.height * 0.5);
  }
}

new Main();
