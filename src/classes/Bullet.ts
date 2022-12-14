import Player from "./Player";
import * as PIXI from "pixi.js";
import { Directions, Sprites, TileTypes } from "../utils/globals";
import Tile from "./Tile";

export interface IBullet {
  projectileFacing: Directions;
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
    this.#config = { projectileFacing: this.origin.getFacingDirection() };
    this.dead = false;

    //  Gets valid, collidable targets depending on origin's facing direction and stores them in this.target variable.
    if (this.#config.projectileFacing == "right" || this.#config.projectileFacing == "left") {
      const collidableTiles = tiles[origin.getPosition().column].map((tile) => {
        if (tile.getType() == TileTypes.Hay || tile.getType() == TileTypes.Wall) return tile;
      });

      this.target = collidableTiles;
    } else {
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
    this.target.forEach((t) => {
      if (t === undefined) return;
      if (this.#bullet.getBounds().contains(t.getPosition().x, t.getPosition().y)) {
        t.setTint();
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
