import "./style.css";
import * as PIXI from "pixi.js";
import Game from "./classes/Game";
import Player from "./classes/Player";
import Tile from "./classes/Tile";
import { PlayerConfig, Sprites } from "./utils/globals";
import Bullet from "./classes/Bullet";
import { fnBulletLogic } from "./logic/BulletLogic";

const gameHtmlElement = document.querySelector("#app");

const game = new Game({
  width: gameHtmlElement!.clientWidth,
  height: gameHtmlElement!.clientHeight,
  background: Sprites.Background,
});

export const app = game.getRootObject();
export const map = game.getTiles() as Array<Tile[]>;

export let bullets: Array<Bullet> = [];

function gameLoop() {
  fnBulletLogic();
}

function play() {
  const PLAYER_INITIAL_POSITION = map[PlayerConfig.InitialCol][PlayerConfig.InitialRow];

  const player = new Player({
    app,
    initialTile: PLAYER_INITIAL_POSITION,
    sprite: Sprites.Player,
  });

  function handleKeyboard(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    if (key == "a" || key == "arrowleft") player.move({ direction: "left", tiles: map });
    else if (key == "d" || key == "arrowright") player.move({ direction: "right", tiles: map });
    else if (key == "s" || key == "arrowdown") player.move({ direction: "down", tiles: map });
    else if (key == "w" || key == "arrowup") player.move({ direction: "up", tiles: map });
    else if (key == "w" || key == "arrowup") player.move({ direction: "up", tiles: map });
    else if (key == "t") player.transform();
    else if (key == " ") player.fire();
  }

  function handleMouse() {
    player.fire();
  }

  window.addEventListener("keydown", handleKeyboard);
  app.stage.on("pointerdown", handleMouse);
  app.ticker.add(gameLoop);
}

window.onload = () => {
  game.setup(gameHtmlElement!);
  play();
};
