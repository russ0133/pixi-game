import * as PIXI from "pixi.js";

interface PlayerConfig {
  x: number;
  y: number;
  sprite: string;
  col: number;
  row: number;
}

export default class Tile {
  tile: PIXI.Sprite;
  config: PlayerConfig;

  constructor({ app, x, y, sprite, col, row }) {
    this.config = { x, y, sprite, col, row };

    const tile = PIXI.Sprite.from(sprite);
    tile.anchor.set(0.5);
    tile.x = x;
    tile.y = y;

    this.tile = tile;
    app.stage.addChild(tile);
  }

  getPosition() {
    return { x: this.tile.x, y: this.tile.y };
  }

  getTileObject() {
    return this.tile;
  }
}
