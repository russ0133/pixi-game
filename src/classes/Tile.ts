import * as PIXI from "pixi.js";

interface PlayerConfig {
  x: number;
  y: number;
  sprite: string;
  col: number;
  row: number;
}

export default class Tile {
  player: PIXI.Sprite;
  config: PlayerConfig;
  constructor({ app, x, y, sprite, col, row }) {
    this.config = { x, y, sprite, col, row };

    const player = PIXI.Sprite.from(sprite);
    player.anchor.set(0.5);
    player.x = x;
    player.y = y;

    this.player = player;
    app.stage.addChild(player);
  }

  move({ direction, positive, amount }: { direction: string; positive: boolean; amount: number }) {
    if (positive) this.player[direction] += amount;
    else this.player[direction] -= amount;
  }

  getPosition() {
    return { x: this.player.x, y: this.player.y };
  }

  getRow() {
    return this.config.row;
  }

  getCol() {
    return this.config.col;
  }

  getPlayer() {
    return this.player;
  }
}
