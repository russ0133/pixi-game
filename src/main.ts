import "./style.css";
import * as PIXI from "pixi.js";
import Game from "./classes/Game";
import Player from "./classes/Player";
import Tile from "./classes/Tile";
import { Config } from "./utils/globals";
import Bullet from "./classes/Bullet";

const gameHtmlElement = document.querySelector("#app");

const game = new Game({
  width: gameHtmlElement!.clientWidth,
  height: gameHtmlElement!.clientHeight,
  background: Config.Background,
});

const app = game.getRootObject();
const map = game.getTiles() as Array<Tile[]>;

const PLAYER_INITIAL_POSITION = map[0][0];
const bullets: Array<Bullet> = [];

function gameLoop() {
  if (bullets.length > 0)
    bullets.forEach((bullet) => {
      bullet.move();
    });
}

function play() {
  const player = new Player({
    app,
    initialTile: PLAYER_INITIAL_POSITION,
    sprite: Config.PlayerSprite,
  });

  function handleMovement(event: KeyboardEvent) {
    console.log(event.key);
    const key = event.key.toLowerCase();
    if (key == "a" || key == "arrowleft") player.move({ direction: "left", tiles: map });
    else if (key == "d" || key == "arrowright") player.move({ direction: "right", tiles: map });
    else if (key == "s" || key == "arrowdown") player.move({ direction: "down", tiles: map });
    else if (key == "w" || key == "arrowup") player.move({ direction: "up", tiles: map });
  }

  function handleFireBullet() {
    let bullet = new Bullet(app, player);
    bullets.push(bullet);
  }

  window.addEventListener("keydown", (e) => handleMovement(e));
  app.stage.on("pointerdown", handleFireBullet);
  app.ticker.add(gameLoop);
}

window.onload = () => {
  game.setup(gameHtmlElement!);
  play();
};
