import Player from "./Player";
import * as PIXI from "pixi.js";
import { Directions, Sprites } from "../utils/globals";

export interface IBullet {
  projectileFacing: Directions;
}
export default class Bullet {
  app: PIXI.Application<PIXI.ICanvas>;
  #bullet: PIXI.Sprite;
  #config: IBullet;
  origin: Player;

  constructor(app: PIXI.Application<PIXI.ICanvas>, origin: Player) {
    const bullet = PIXI.Sprite.from(Sprites.Bullet);

    this.origin = origin;
    this.#config = { projectileFacing: this.origin.getFacingDirection() };

    this.app = app;

    bullet.anchor.set(0.42, 0.5);
    bullet.x = origin.getPosition().x;
    bullet.y = origin.getPosition().y;

    this.#bullet = bullet;
    app.stage.addChild(bullet);
  }
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
}
