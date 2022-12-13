import Player from "./Player";
import * as PIXI from "pixi.js";

interface BulletInterface {
  origin: Player;
}
export default class Bullet {
  app: PIXI.Application<PIXI.ICanvas>;
  bullet: PIXI.Sprite;
  origin: Player;
  constructor(app, origin) {
    console.log("Bullet created");
    const bullet = PIXI.Sprite.from("./assets/bullet.png");

    this.origin = origin;
    this.app = app;

    bullet.anchor.set(0.42, 0.5);
    bullet.x = origin.getPosition().x;
    bullet.y = origin.getPosition().y;

    this.bullet = bullet;
    app.stage.addChild(bullet);
  }
  setPosition() {
    this.bullet.y += 5;
  }
}
