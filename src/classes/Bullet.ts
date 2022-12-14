import Player from "./Player";
import * as PIXI from "pixi.js";
import { Config } from "../utils/globals";

export interface IBullet {
  origin: Player;
  app: PIXI.Application<PIXI.ICanvas>;
}
export default class Bullet {
  app: PIXI.Application<PIXI.ICanvas>;
  #bullet: PIXI.Sprite;
  origin: Player;

  constructor(app: PIXI.Application<PIXI.ICanvas>, origin: Player) {
    console.log("Bullet created");
    const bullet = PIXI.Sprite.from(Config.BulletSprite);

    this.origin = origin;
    this.app = app;

    bullet.anchor.set(0.42, 0.5);
    bullet.x = origin.getPosition().x;
    bullet.y = origin.getPosition().y;

    this.#bullet = bullet;
    app.stage.addChild(bullet);
  }
  move() {
    this.#bullet.y += 5;
  }
}
