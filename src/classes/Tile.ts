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
  tile: PIXI.Sprite;
  config: TileConfig;

  constructor({ app, x, y, sprite, col, row, type }) {
    this.config = { x, y, sprite, col, row, type };

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
