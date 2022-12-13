import "./style.css";
import * as PIXI from "pixi.js";
import Game from "./classes/Game";
import { Keys } from "./utils/keycodes";
import Player from "./classes/Player";
import Tile from "./classes/Tile";

const gameHtmlElement = document.querySelector("#app");

const game = new Game({
  width: gameHtmlElement.clientWidth,
  height: gameHtmlElement.clientHeight,
  background: "./assets/background.jpg",
});

const play = () => {
  const app = game.getApplication();
  const map = game.getTiles() as Array<Tile[]>;

  const player = new Player({
    app,
    initialTile: map[0][0],
    sprite: "./assets/tank.png",
  });

  function movement(event) {
    console.log(event.keyCode);
    if (event.keyCode === Keys.A) player.move({ direction: "left", tiles: map });
    else if (event.keyCode === Keys.D) player.move({ direction: "right", tiles: map });
    else if (event.keyCode === Keys.S) player.move({ direction: "down", tiles: map });
    else if (event.keyCode === Keys.W) player.move({ direction: "up", tiles: map });
  }

  window.addEventListener("keydown", movement);
};

window.onload = () => {
  game.setup(gameHtmlElement);
  play();
};
