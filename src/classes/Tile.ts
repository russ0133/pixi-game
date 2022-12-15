import * as PIXI from "pixi.js";
import { HealthColors, Sprites, TileTypes } from "../utils/globals";

interface TileConfig {
  x: number;
  y: number;
  sprite: string;
  col: number;
  row: number;
  type: number;
  health: number;
}

export default class Tile {
  /** @param player - The tile PIXI.Sprite object. @private */
  #tile: PIXI.Sprite;

  /** @param config - Internal configuration, contains all necessary data.  @private */
  #config: TileConfig;

  /** @param app - The Canvas PIXI.Application object. */
  app: PIXI.Application<PIXI.ICanvas>;

  constructor(pt: {
    app: PIXI.Application<PIXI.ICanvas>;
    x: number;
    y: number;
    sprite: string;
    col: number;
    row: number;
    type: number;
  }) {
    this.#config = {
      x: pt.x,
      y: pt.y,
      sprite: pt.sprite,
      col: pt.col,
      row: pt.row,
      type: pt.type,
      health: 100,
    };

    const tile = PIXI.Sprite.from(this.#config.sprite);

    tile.anchor.set(0.5);
    tile.x = this.#config.x;
    tile.y = this.#config.y;

    this.#tile = tile;
    this.app = pt.app;
    pt.app.stage.addChild(tile);
  }

  /** @method getPosition - Returns the tile's X and Y position as a object x, y. */
  getPosition() {
    return { x: this.#tile.x, y: this.#tile.y };
  }

  /** @method getRootObject - Returns the PIXI.Sprite object. */
  getRootObject() {
    return this.#tile;
  }

  /** @method getType - Returns the Tile type. */
  getType() {
    return this.#config.type;
  }

  /** @method damage - Reduces the tile's HP by paramater dmg, sets tint according to remaining HP and if 0, sets sprite to grass */
  damage(dmg: number) {
    const setHealthColor = () => {
      const health = this.#config.health;
      console.log("Health:", health);
      if (health >= 80) this.#tile.tint = HealthColors[0];
      if (health >= 60 && health < 80) this.#tile.tint = HealthColors[1];
      if (health >= 40 && health < 59) this.#tile.tint = HealthColors[2];
      if (health >= 20 && health < 40) this.#tile.tint = HealthColors[3];
      if (health >= 1 && health < 20) this.#tile.tint = HealthColors[4];
    };
    if (this.#config.type == TileTypes.Hay) {
      this.#config.health -= dmg;
      setHealthColor();

      if (this.#config.health < 1) {
        const texture = PIXI.Texture.from(Sprites.Grass);
        this.#tile.tint = 0xffffff;
        this.#tile.texture = texture;
        this.#config.type = TileTypes.Grass;
      }
    }
  }
}
