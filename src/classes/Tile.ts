import * as PIXI from "pixi.js";

interface TileConfig {
  x: number;
  y: number;
  sprite: string;
  col: number;
  row: number;
  type: number;
}

export default class Tile {
  #tile: PIXI.Sprite;
  #config: TileConfig;

  constructor(pt: {
    app: PIXI.Application<PIXI.ICanvas>;
    x: number;
    y: number;
    sprite: string;
    col: number;
    row: number;
    type: number;
  }) {
    this.#config = { x: pt.x, y: pt.y, sprite: pt.sprite, col: pt.col, row: pt.row, type: pt.type };

    const tile = PIXI.Sprite.from(this.#config.sprite);
    tile.anchor.set(0.5);
    tile.x = this.#config.x;
    tile.y = this.#config.y;

    this.#tile = tile;
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
}
