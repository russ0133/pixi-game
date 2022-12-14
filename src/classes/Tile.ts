import * as PIXI from "pixi.js";
import { HealthColors, TileTypes } from "../utils/globals";

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
  #tile: PIXI.Sprite;
  #config: TileConfig;
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

  /** Returns the tile's X and Y position as a object x, y. */
  getPosition() {
    return { x: this.#tile.x, y: this.#tile.y };
  }

  /** Returns the PIXI.Sprite object. */
  getRootObject() {
    return this.#tile;
  }

  /** Returns the Tile type. */
  getType() {
    return this.#config.type;
  }

  damage(dmg: number) {
    const setHealthColor = () => {
      const health = this.#config.health;
      console.log(health);
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
        const texture = PIXI.Texture.from("./assets/grass.png");
        this.#tile.tint = 0xffffff;
        this.#tile.texture = texture;
        this.#config.type = TileTypes.Grass;
      }
    }
  }
}
