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
  loadSpriteSheet(
    `${name}_doublejump`,
    `assets/characters/${name}/doublejump.png`
  );
  loadSpriteSheet(`${name}_drone`, `assets/characters/${name}/drone.png`);
  loadSpriteSheet(`${name}_fall`, `assets/characters/${name}/fall.png`);
  loadSpriteSheet(`${name}_hang`, `assets/characters/${name}/hang.png`);
  loadSpriteSheet(`${name}_pullup`, `assets/characters/${name}/pullup.png`);
  loadSpriteSheet(`${name}_hurt`, `assets/characters/${name}/hurt.png`);
  loadSpriteSheet(`${name}_punch`, `assets/characters/${name}/punch.png`);
  loadSpriteSheet(`${name}_sitdown`, `assets/characters/${name}/sitdown.png`);
  loadSpriteSheet(`${name}_talk`, `assets/characters/${name}/talk.png`);
  loadSpriteSheet(`${name}_use`, `assets/characters/${name}/use.png`);
  loadSpriteSheet(
    `${name}_run_attack`,
    `assets/characters/${name}/run_attack.png`
  );
  loadSpriteSheet(
    `${name}_walk_attack`,
    `assets/characters/${name}/walk_attack.png`
  );
};

export const preload = function () {
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
  this.load.image(
    "overlay",
    "assets/green_zone/background/overlay_illumination.png"
  );

  this.load.image("tiles", "assets/green_zone/tiles.png");

  loadSpriteSheet = loadSpriteSheet.bind(this);
  loadPlayers("biker");
  loadPlayers("punk");
  loadPlayers("cyborg");
};
