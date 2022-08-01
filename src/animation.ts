let createAnims = function (
  key: string,
  frameRate: number = 4,
  repeat: number = -1,
  duration?: number
) {
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

export const loadAnimation = function () {
  createAnims = createAnims.bind(this);
  createPlayers("biker");
  createPlayers("punk");
  createPlayers("cyborg");
};
