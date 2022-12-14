import * as PIXI from "pixi.js";
import { Directions, PlayerConfig } from "../utils/globals";
import Tile from "./Tile";

interface IPlayer {
  initialTile: Tile;
  sprite: string;
  currentRow: number;
  currentColumn: number;
  facing: Directions;
}

export default class Player {
  #player: PIXI.Sprite;
  #config: IPlayer;

  constructor(pt: { app: PIXI.Application<PIXI.ICanvas>; initialTile: Tile; sprite: string }) {
    this.#config = {
      initialTile: pt.initialTile,
      sprite: pt.sprite,
      currentColumn: PlayerConfig.InitialCol,
      currentRow: PlayerConfig.InitialRow,
      facing: "right",
    };

    const playerEntity = PIXI.Sprite.from(this.#config.sprite);
    playerEntity.anchor.set(0.42, 0.5);

    playerEntity.x = this.#config.initialTile.getPosition().x;
    playerEntity.y = this.#config.initialTile.getPosition().y;

    this.#player = playerEntity;
    pt.app.stage.addChild(this.#player);
  }

  move({ direction, tiles }: { direction: string; tiles: Array<Tile[]> }) {
    const { currentColumn: curCol, currentRow: curRow } = this.#config;

    const flipTexture = () => {
      if (this.#player.scale.x !== -1) {
        this.#player.angle = 0;
        this.#player.scale.x *= -1;
      }
    };

    const unflipTexture = () => (this.#player.scale.x === -1 ? (this.#player.scale.x = 1) : null);
    const isNextTilePassable = (Tile: Tile) => {
      if (Tile.getTileType() != 0) return false;
      else return true;
    };

    switch (direction) {
      case "left": {
        const nextTile = tiles[curCol][curRow - 1];

        if (curRow - 1 < 0) break;
        if (!isNextTilePassable(nextTile)) break;

        this.#player.x = nextTile.getPosition().x;
        this.#config.currentRow = this.#config.currentRow - 1;
        this.#config.facing = "left";
        flipTexture();
        break;
      }

      case "right": {
        const nextTile = tiles[curCol][curRow + 1];

        if (curRow + 1 < 0) break;
        if (!isNextTilePassable(nextTile)) break;

        this.#player.x = nextTile.getPosition().x;
        this.#config.currentRow = this.#config.currentRow + 1;
        this.#player.angle = 0;
        this.#config.facing = "right";
        unflipTexture();
        break;
      }

      case "down": {
        const nextTile = tiles[curCol + 1][curRow];

        if (curCol + 1 < 0) break;
        if (!isNextTilePassable(nextTile)) break;

        this.#player.y = nextTile.getPosition().y;
        this.#config.currentColumn = this.#config.currentColumn + 1;
        this.#player.angle = 90;
        this.#config.facing = "down";
        unflipTexture();
        break;
      }

      case "up": {
        const nextTile = tiles[curCol - 1][curRow];

        if (curCol - 1 < 0) break;
        if (!isNextTilePassable(nextTile)) break;

        this.#player.y = nextTile.getPosition().y;
        this.#config.currentColumn = this.#config.currentColumn - 1;
        this.#player.angle = -90;
        this.#config.facing = "up";
        unflipTexture();
        break;
      }
    }
  }

  getRootObject() {
    return this.#player;
  }

  getFacingDirection() {
    return this.#config.facing;
  }

  getPosition() {
    return { x: this.#player.x, y: this.#player.y };
  }
}
