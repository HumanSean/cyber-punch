(function () {
  'use strict';

  let createAnims = function (key, frameRate = 4, repeat = -1, duration) {
      this.anims.create({
          key,
          frames: key,
          frameRate,
          repeat,
          duration,
      });
  };
  const createPlayers = function (name) {
      createAnims(`${name}_idle`, 2);
      createAnims(`${name}_idle2`);
      createAnims(`${name}_walk`);
      createAnims(`${name}_run`, 8);
      createAnims(`${name}_angry`, 8);
      createAnims(`${name}_happy`);
      createAnims(`${name}_attack`, 8, 0);
      createAnims(`${name}_attack2`, 8, 0);
      createAnims(`${name}_attack3`, 8, 0);
      createAnims(`${name}_climb`);
      createAnims(`${name}_dash`, 6, 0);
      createAnims(`${name}_death`);
      createAnims(`${name}_jump`, 6, 0);
      createAnims(`${name}_doublejump`, 8, 0);
      createAnims(`${name}_drone`);
      createAnims(`${name}_fall`);
      createAnims(`${name}_hang`);
      createAnims(`${name}_pullup`);
      createAnims(`${name}_hurt`, 2);
      createAnims(`${name}_punch`);
      createAnims(`${name}_sitdown`);
      createAnims(`${name}_talk`);
      createAnims(`${name}_use`);
      createAnims(`${name}_run_attack`, 8);
      createAnims(`${name}_walk_attack`);
  };
  const loadAnimation = function () {
      createAnims = createAnims.bind(this);
      createPlayers("biker");
      createPlayers("punk");
      createPlayers("cyborg");
  };

  let loadSpriteSheet = function (key, path) {
      this.load.spritesheet(key, path, {
          frameWidth: 32,
          frameHeight: 48,
          spacing: 16,
      });
  };
  const loadPlayers = function (name) {
      loadSpriteSheet(`${name}_idle`, `assets/characters/${name}/idle.png`);
      loadSpriteSheet(`${name}_idle2`, `assets/characters/${name}/idle2.png`);
      loadSpriteSheet(`${name}_walk`, `assets/characters/${name}/walk.png`);
      loadSpriteSheet(`${name}_run`, `assets/characters/${name}/run.png`);
      loadSpriteSheet(`${name}_angry`, `assets/characters/${name}/angry.png`);
      loadSpriteSheet(`${name}_happy`, `assets/characters/${name}/happy.png`);
      loadSpriteSheet(`${name}_attack`, `assets/characters/${name}/attack.png`);
      loadSpriteSheet(`${name}_attack2`, `assets/characters/${name}/attack2.png`);
      loadSpriteSheet(`${name}_attack3`, `assets/characters/${name}/attack3.png`);
      loadSpriteSheet(`${name}_climb`, `assets/characters/${name}/climb.png`);
      loadSpriteSheet(`${name}_dash`, `assets/characters/${name}/dash.png`);
      loadSpriteSheet(`${name}_death`, `assets/characters/${name}/death.png`);
      loadSpriteSheet(`${name}_jump`, `assets/characters/${name}/jump.png`);
      loadSpriteSheet(`${name}_doublejump`, `assets/characters/${name}/doublejump.png`);
      loadSpriteSheet(`${name}_drone`, `assets/characters/${name}/drone.png`);
      loadSpriteSheet(`${name}_fall`, `assets/characters/${name}/fall.png`);
      loadSpriteSheet(`${name}_hang`, `assets/characters/${name}/hang.png`);
      loadSpriteSheet(`${name}_pullup`, `assets/characters/${name}/pullup.png`);
      loadSpriteSheet(`${name}_hurt`, `assets/characters/${name}/hurt.png`);
      loadSpriteSheet(`${name}_punch`, `assets/characters/${name}/punch.png`);
      loadSpriteSheet(`${name}_sitdown`, `assets/characters/${name}/sitdown.png`);
      loadSpriteSheet(`${name}_talk`, `assets/characters/${name}/talk.png`);
      loadSpriteSheet(`${name}_use`, `assets/characters/${name}/use.png`);
      loadSpriteSheet(`${name}_run_attack`, `assets/characters/${name}/run_attack.png`);
      loadSpriteSheet(`${name}_walk_attack`, `assets/characters/${name}/walk_attack.png`);
  };
  const preload = function () {
      this.load.tilemapTiledJSON("map", "assets/green_zone/map.json");
      this.load.image("night_bg1", "assets/green_zone/background/night/1.png");
      this.load.image("night_bg2", "assets/green_zone/background/night/2.png");
      this.load.image("night_bg3", "assets/green_zone/background/night/3.png");
      this.load.image("night_bg4", "assets/green_zone/background/night/4.png");
      this.load.image("night_bg5", "assets/green_zone/background/night/5.png");
      this.load.image("day_bg1", "assets/green_zone/background/day/1.png");
      this.load.image("day_bg2", "assets/green_zone/background/day/2.png");
      this.load.image("day_bg3", "assets/green_zone/background/day/3.png");
      this.load.image("day_bg4", "assets/green_zone/background/day/4.png");
      this.load.image("day_bg5", "assets/green_zone/background/day/5.png");
      this.load.image("overlay", "assets/green_zone/background/overlay_illumination.png");
      this.load.image("tiles", "assets/green_zone/tiles.png");
      loadSpriteSheet = loadSpriteSheet.bind(this);
      loadPlayers("biker");
      loadPlayers("punk");
      loadPlayers("cyborg");
  };

  const gameWidth = 960;
  const gameHeight = 540;
  class Main {
      constructor() {
          this._startGame();
      }
      _startGame() {
          const config = {
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
      constructor() {
          super({
              key: "PlayGame",
          });
          this.playerController = {
              matterSprite: null,
              character: Math.random() < 0.4 ? "punk" : Math.random() < 0.5 ? "cyborg" : "biker",
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
      init() { }
      preload() {
          preload.call(this);
      }
      create() {
          loadAnimation.call(this);
          this.keys = this.input.keyboard.addKeys("W,A,S,D,SHIFT,J,K,SPACE");
          const map = this.make.tilemap({
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
          this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels - 4);
          this.matter.world.createDebugGraphic();
          this.matter.world.drawDebug = true;
          this.matter.world.debugGraphic.visible = false;
          this.playerController.matterSprite = this.matter.add.sprite(0, 0, `${this.playerController.character}_idle`);
          var M = Phaser.Physics.Matter.Matter;
          var w = this.playerController.matterSprite.width;
          var h = this.playerController.matterSprite.height;
          var sx = w / 2;
          var sy = h / 2;
          var playerBody = M.Bodies.rectangle(sx, sy + 7, w * 0.5, h * 0.7, {
              chamfer: { radius: 5 },
          });
          this.playerController.sensors.bottom = M.Bodies.rectangle(sx, h + 3, sx, 5, {
              isSensor: true,
          });
          this.playerController.sensors.left = M.Bodies.rectangle(sx - w * 0.35, sy, 5, h * 0.25, { isSensor: true });
          this.playerController.sensors.right = M.Bodies.rectangle(sx + w * 0.35, sy, 5, h * 0.25, { isSensor: true });
          var compoundBody = M.Body.create({
              parts: [
                  playerBody,
                  this.playerController.sensors.bottom,
                  this.playerController.sensors.left,
                  this.playerController.sensors.right,
              ],
              friction: 0.01,
              restitution: 0.05,
          });
          this.playerController.matterSprite.setExistingBody(compoundBody);
          this.playerController.matterSprite
              .setFixedRotation()
              .setPosition(30, gameHeight - 72);
          this.cam = this.cameras.main;
          this.cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels - 4);
          this.smoothMoveCameraTowards(this.playerController.matterSprite);
          this.input.on("pointerdown", function () {
              this.matter.world.debugGraphic.visible =
                  !this.matter.world.debugGraphic.visible;
          }, this);
          this.matter.world.on("collisionactive", function (event) {
              const playerBody = this.playerController.matterSprite.body;
              const bottom = this.playerController.sensors.bottom;
              for (var i = 0; i < event.pairs.length; i++) {
                  var bodyA = event.pairs[i].bodyA;
                  var bodyB = event.pairs[i].bodyB;
                  if (bodyA === playerBody || bodyB === playerBody) {
                      continue;
                  }
                  else if (bodyA === bottom || bodyB === bottom) {
                      this.playerController.touchFloor = true;
                  }
              }
          }, this);
          this.matter.world.on("beforeupdate", function () {
              this.playerController.canJump = false;
              this.playerController.touchFloor = false;
          }, this);
          this.matter.world.on("afterupdate", function () {
              if (this.playerController.touchFloor) {
                  this.playerController.canJump = true;
                  this.playerController.canDoubleJump = true;
              }
              else {
                  this.playerController.canJump = false;
              }
          }, this);
      }
      playerAction(key, ...args) {
          const player = this.playerController.matterSprite;
          player.anims.play(`${this.playerController.character}_${key}`, ...args);
      }
      update(time, delta) {
          const player = this.playerController.matterSprite;
          if (this.keys.A.isDown || this.keys.D.isDown) {
              this.playerController.speed = this.keys.SHIFT.isDown ? 3 : 1;
          }
          else {
              this.playerController.speed = 0;
          }
          if (this.keys.A.isDown) {
              player.setFlipX(true);
              this.playerController.direction = -1;
              player.setVelocityX(1 * this.playerController.speed * this.playerController.direction);
          }
          else if (this.keys.D.isDown) {
              player.setFlipX(false);
              this.playerController.direction = 1;
              player.setVelocityX(1 * this.playerController.speed * this.playerController.direction);
          }
          else {
              player.setVelocityX(0);
          }
          let moveAnim = this.keys.SHIFT.isDown ? "run" : "walk";
          if (this.keys.J.isDown)
              moveAnim += "_attack";
          if (Phaser.Input.Keyboard.JustDown(this.keys.W)) {
              if (this.playerController.canJump) {
                  player.setVelocityY(-6);
                  this.playerAction("jump");
              }
              else if (this.playerController.canDoubleJump) {
                  player.setVelocityY(-6);
                  this.playerController.canDoubleJump = false;
                  this.playerAction("doublejump");
              }
          }
          if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE) &&
              time - this.playerController.lastDodge > 2000) {
              this.playerAction("dash", true);
          }
          if (this.keys.S.isDown) {
              this.playerAction("death", true);
          }
          else if (this.keys.J.isDown) {
              this.playerAction("attack2", true);
          }
          else if (this.keys.K.isDown) {
              this.playerAction("attack3", true);
          }
          else if (this.keys.A.isDown || this.keys.D.isDown) {
              if (!player.anims.isPlaying || player.anims.repeat === -1)
                  this.playerAction(moveAnim, true);
          }
          else {
              if (!player.anims.isPlaying || player.anims.repeat === -1)
                  this.playerAction("idle", true);
          }
          this.smoothMoveCameraTowards(player);
          const bgSpeed = [0.01, 0.05, 0.1, 1, 0.2];
          this.bg.forEach((bg, i) => {
              if (player.x > this.cam.centerX &&
                  this.map.widthInPixels - player.x > this.cam.centerX) {
                  bg.setX(player.x - this.cam.centerX);
              }
              bg.tilePositionX +=
                  bgSpeed[i] *
                      (i === 3
                          ? 1
                          : this.playerController.direction * this.playerController.speed);
          });
      }
      smoothMoveCameraTowards(target, smoothFactor = 0) {
          this.cam.scrollX =
              smoothFactor * this.cam.scrollX +
                  (1 - smoothFactor) * (target.x - this.cam.width * 0.5);
          this.cam.scrollY =
              smoothFactor * this.cam.scrollY +
                  (1 - smoothFactor) * (target.y - this.cam.height * 0.5);
      }
  }
  new Main();

}());
//# sourceMappingURL=bundle.js.map
