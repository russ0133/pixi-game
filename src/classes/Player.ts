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

  /** Moves the player in a selected direction if not obstructed; rotates the sprite onto that direction. */
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
      if (Tile.getType() != 0) return false;
      else return true;
    };

    switch (direction) {
      case "left": {
        if (curRow - 1 < 0) break;
        const nextTile = tiles[curCol][curRow - 1];
        if (!isNextTilePassable(nextTile)) break;

        this.#player.x = nextTile.getPosition().x;
        this.#config.currentRow = this.#config.currentRow - 1;
        this.#config.facing = "left";
        flipTexture();
        break;
      }

      case "right": {
        if (curRow + 1 < 0) break;
        const nextTile = tiles[curCol][curRow + 1];
        if (!isNextTilePassable(nextTile)) break;

        this.#player.x = nextTile.getPosition().x;
        this.#config.currentRow = this.#config.currentRow + 1;
        this.#player.angle = 0;
        this.#config.facing = "right";
        unflipTexture();
        break;
      }

      case "down": {
        if (curCol + 1 < 0) break;
        const nextTile = tiles[curCol + 1][curRow];
        if (!isNextTilePassable(nextTile)) break;

        this.#player.y = nextTile.getPosition().y;
        this.#config.currentColumn = this.#config.currentColumn + 1;
        this.#player.angle = 90;
        this.#config.facing = "down";
        unflipTexture();
        break;
      }

      case "up": {
        if (curCol - 1 < 0) break;
        const nextTile = tiles[curCol - 1][curRow];
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

  /** Returns the PIXI.Sprite object. */
  getRootObject() {
    return this.#player;
  }

  /** Returns the direction the player is facing. */
  getFacingDirection() {
    return this.#config.facing;
  }

  /** Returns the tile's X and Y position as a object x, y. */
  getPosition() {
    return { x: this.#player.x, y: this.#player.y };
  }
}
