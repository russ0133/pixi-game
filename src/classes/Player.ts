import * as PIXI from "pixi.js";
import { bullets, map } from "../main";
import { Directions, PlayerConfig, TankTypes } from "../utils/globals";
import Bullet from "./Bullet";
import Tile from "./Tile";

interface IPlayer {
  initialTile: Tile;
  sprite: string;
  currentRow: number;
  currentColumn: number;
  facing: Directions;
  type: TankTypes;
}

export default class Player {
  #player: PIXI.Sprite;
  #config: IPlayer;
  app: PIXI.Application<PIXI.ICanvas>;

  constructor(pt: { app: PIXI.Application<PIXI.ICanvas>; initialTile: Tile; sprite: string }) {
    this.#config = {
      initialTile: pt.initialTile,
      sprite: pt.sprite,
      currentColumn: PlayerConfig.InitialCol,
      currentRow: PlayerConfig.InitialRow,
      facing: "right",
      type: "green",
    };

    const playerEntity = PIXI.Sprite.from(this.#config.sprite);
    playerEntity.anchor.set(0.42, 0.5);

    playerEntity.x = this.#config.initialTile.getPosition().x;
    playerEntity.y = this.#config.initialTile.getPosition().y;

    this.app = pt.app;
    this.#player = playerEntity;
    pt.app.stage.addChild(this.#player);
  }

  transform() {
    switch (this.#config.type) {
      case "green":
        this.#player.tint = 0xff0000;
        this.#config.type = "red";
        break;
      case "blue":
        this.#player.tint = 0xffffff;
        this.#config.type = "green";
        break;
      case "red":
        this.#player.tint = 0x277ffc;
        this.#config.type = "blue";
        break;
    }
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
        this.#config.facing = "left";
        flipTexture();

        const nextTile = tiles[curCol][curRow - 1];
        if (!isNextTilePassable(nextTile)) break;

        this.#player.x = nextTile.getPosition().x;
        this.#config.currentRow = this.#config.currentRow - 1;
        break;
      }

      case "right": {
        if (curRow + 1 < 0) break;
        this.#player.angle = 0;
        this.#config.facing = "right";
        unflipTexture();
        const nextTile = tiles[curCol][curRow + 1];
        if (!isNextTilePassable(nextTile)) break;

        this.#player.x = nextTile.getPosition().x;
        this.#config.currentRow = this.#config.currentRow + 1;
        break;
      }

      case "down": {
        if (curCol + 1 < 0) break;
        this.#player.angle = 90;
        this.#config.facing = "down";
        unflipTexture();
        const nextTile = tiles[curCol + 1][curRow];
        if (!isNextTilePassable(nextTile)) break;

        this.#player.y = nextTile.getPosition().y;
        this.#config.currentColumn = this.#config.currentColumn + 1;
        break;
      }

      case "up": {
        if (curCol - 1 < 0) break;
        this.#player.angle = -90;
        this.#config.facing = "up";
        unflipTexture();
        const nextTile = tiles[curCol - 1][curRow];
        if (!isNextTilePassable(nextTile)) break;

        this.#player.y = nextTile.getPosition().y;
        this.#config.currentColumn = this.#config.currentColumn - 1;
        break;
      }
    }
  }

  fire() {
    const getBulletQuantity = () => {
      if (this.#config.type == "red") return 1;
      else if (this.#config.type == "blue") return 2;
      else return 2;
    };

    let bullet = new Bullet(this.app, this, map);
    bullets.push(bullet);

    if (this.#config.type != "green") {
      let bulletsFired = 0;
      const bulletInterval = setInterval(() => {
        bulletsFired++;
        let bullet = new Bullet(this.app, this, map);
        bullets.push(bullet);
        if (bulletsFired >= getBulletQuantity()) window.clearInterval(bulletInterval);
      }, 200);
    }
  }

  /** Returns the PIXI.Sprite object. */
  getRootObject() {
    return this.#player;
  }

  getDamageValue() {
    switch (this.#config.type) {
      case "blue":
        return 20;
      case "red":
        return 10;
      case "green":
        return 25;
      default:
        return 10;
    }
  }
  /** Returns the direction the player is facing. */
  getFacingDirection() {
    return this.#config.facing;
  }

  /** Returns the sprite's X and Y position as a object x, y. Along with the object current row (index) and current column (index) */
  getPosition() {
    return {
      x: this.#player.x,
      y: this.#player.y,
      row: this.#config.currentRow,
      column: this.#config.currentColumn,
    };
  }
}
