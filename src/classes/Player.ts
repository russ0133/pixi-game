import * as PIXI from "pixi.js";
import Tile from "./Tile";

interface PlayerConfig {
  initialTile: Tile;
  sprite: string;
  curRow: number;
  curCol: number;
}

export default class Player {
  player: PIXI.Sprite;
  config: PlayerConfig;

  constructor({ app, initialTile, sprite }) {
    this.config = { initialTile, sprite, curRow: 0, curCol: 0 };

    const player = PIXI.Sprite.from(sprite);
    player.anchor.set(0.5);

    player.x = this.config.initialTile.getPosition().x;
    player.y = this.config.initialTile.getPosition().y;

    this.player = player;
    app.stage.addChild(player);
  }

  move({ direction, tiles }: { direction: string; tiles: Array<Tile[]> }) {
    const { curCol, curRow } = this.config;

    switch (direction) {
      case "left":
        if (curRow - 1 < 0) break;
        this.player.x = tiles[curCol][curRow - 1].getPosition().x;
        this.config.curRow = this.config.curRow - 1;
        break;

      case "right":
        if (curRow + 1 < 0) break;
        this.player.x = tiles[curCol][curRow + 1].getPosition().x;
        this.config.curRow = this.config.curRow + 1;
        break;

      case "down":
        if (curCol + 1 < 0) break;
        this.player.y = tiles[curCol + 1][curRow].getPosition().y;
        this.config.curCol = this.config.curCol + 1;
        break;

      case "up":
        if (curCol - 1 < 0) break;
        this.player.y = tiles[curCol - 1][curRow].getPosition().y;
        this.config.curCol = this.config.curCol - 1;
        break;
    }
  }

  getPlayerObject() {
    return this.player;
  }
}
