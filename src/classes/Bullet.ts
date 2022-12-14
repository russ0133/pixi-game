import Player from "./Player";
import * as PIXI from "pixi.js";
import { Directions, Sprites, TileTypes } from "../utils/globals";
import Tile from "./Tile";

export interface IBullet {
  // ! Direction and Damage must be set locally here in case the origin player/object changes facing or tank type while the bullet is flying.
  projectileFacing: Directions;
  bulletDamageValue: number;
}

export default class Bullet {
  /** @param app - The Canvas/PIXI application. */
  app: PIXI.Application<PIXI.ICanvas>;

  /** @param bullet - The bullet sprite. @private */
  #bullet: PIXI.Sprite;

  /** @param config - Internal configuration, contains the projectile facing direction used for rotating the sprite. @private */
  #config: IBullet;

  /** @param dead - Is set to true when the object has collided, for cleaning purposes. */
  dead: boolean;

  /** @param origin - The Player class who fired the bullet. Used to . */
  origin: Player;

  /** @param target - The target is an array of tiles that is in the same column or row as the origin */
  target!: (Tile | undefined)[];

  constructor(app: PIXI.Application<PIXI.ICanvas>, origin: Player, tiles: Array<Tile[]>) {
    const bullet = PIXI.Sprite.from(Sprites.Bullet);

    this.origin = origin;
    this.#config = {
      projectileFacing: this.origin.getFacingDirection(),
      bulletDamageValue: this.origin.getDamageValue(),
    };
    this.dead = false;

    //  Logic for finding valid targets. (Hays and Walls)
    if (this.#config.projectileFacing == "right" || this.#config.projectileFacing == "left") {
      //  In case projectile is facing right or left, maps over all tiles in the horizontal direction.
      const collidableTiles = tiles[origin.getPosition().column].map((tile) => {
        if (tile.getType() == TileTypes.Hay || tile.getType() == TileTypes.Wall) return tile;
      });

      this.target = collidableTiles;
    } else {
      // In case projectile is facing up or down, maps over all tiles in the vertical direction.
      const collidableTiles = tiles.map((column) => {
        const type = column[origin.getPosition().row].getType();
        if (type == TileTypes.Hay || type == TileTypes.Wall)
          return column[origin.getPosition().row];
      });

      this.target = collidableTiles;
    }

    this.app = app;

    bullet.anchor.set(0.42, 0.5);
    bullet.x = origin.getPosition().x;
    bullet.y = origin.getPosition().y;

    this.#bullet = bullet;
    app.stage.addChild(bullet);
  }

  /** @method tick - Handles collision logic with collidable tiles. */
  tick() {
    this.target.forEach((tile) => {
      if (tile === undefined) return;
      if (this.#bullet.getBounds().contains(tile.getPosition().x, tile.getPosition().y)) {
        tile.damage(this.#config.bulletDamageValue);
        this.dead = true;
      }
    });
  }

  /** @method move - Moves the bullet sprite in a certain direction depending on the direction the origin: Player was facing when object was instantiated. */
  move() {
    switch (this.#config.projectileFacing) {
      case "down": {
        this.#bullet.y += 5;
        break;
      }
      case "right": {
        this.#bullet.angle = 90;
        this.#bullet.x += 5;
        break;
      }
      case "left": {
        this.#bullet.angle = 90;
        this.#bullet.x -= 5;
        break;
      }
      case "up": {
        this.#bullet.y -= 5;
        break;
      }
    }
  }

  /** @method getRootObject - Returns the bullet's PIXI.Sprite object. */
  getRootObject() {
    return this.#bullet;
  }
}
