import "./style.css";
import * as PIXI from "pixi.js";
import Game from "./classes/Game";
import { Keys } from "./utils/keycodes";
import Player from "./classes/Player";
import Tile from "./classes/Tile";
import { Constants } from "./utils/constants";
import Bullet from "./classes/Bullet";

const gameHtmlElement = document.querySelector("#app");
const bullets = [];

const game = new Game({
  width: gameHtmlElement.clientWidth,
  height: gameHtmlElement.clientHeight,
  background: "./assets/background.jpg",
});

const app = game.getRootObject();
const map = game.getTiles() as Array<Tile[]>;

const gameLoop = () => {
  bullets.forEach((bullet) => {
    bullet.setPosition();
  });
};

const play = () => {
  const player = new Player({
    app,
    initialTile: map[0][0],
    sprite: "./assets/tank.png",
  });

  function handleMovement(event) {
    if (event.keyCode === Keys.A) player.move({ direction: "left", tiles: map });
    else if (event.keyCode === Keys.D) player.move({ direction: "right", tiles: map });
    else if (event.keyCode === Keys.S) player.move({ direction: "down", tiles: map });
    else if (event.keyCode === Keys.W) player.move({ direction: "up", tiles: map });
  }

  function handleFireBullet() {
    let bullet = new Bullet(app, player);
    bullets.push(bullet);
  }

  window.addEventListener("keydown", handleMovement);
  app.stage.on("pointerdown", handleFireBullet);
  app.ticker.add(gameLoop);
};

window.onload = () => {
  game.setup(gameHtmlElement);
  play();
};
