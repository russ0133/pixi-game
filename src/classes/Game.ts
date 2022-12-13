import * as PIXI from "pixi.js";
import { Constants, MAX_HAYS_PER_ROW, player_initial_position, TILESET } from "../utils/constants";
import Tile from "./Tile";

export interface ApplicationConfig {
  width: number;
  height: number;
  background: string;
}

type rows = number[] | Tile[];

export default class Game {
  app: PIXI.Application;
  config: ApplicationConfig;
  map: Array<rows>;

  constructor({ width, height, background }) {
    this.config = { width, height, background };

    this.app = new PIXI.Application({
      width: width,
      height: height,
      backgroundColor: 0xaaaaaa,
      antialias: true,
    });

    this.map = TILESET;
  }

  setup = (div: Element) => {
    // Appends to dom

    div.appendChild(this.app.view as any as Node);

    // Sets background
    this.setBackground(this.config.background);
    this.app.stage.interactive = true;

    // Sets up the map tiles
    const getTileType = () => {};

    this.map.forEach((column, colIndex) => {
      let hayAmount = 0;

      column.forEach((row, rowIndex) => {
        let isHay = 0;
        let blockType = Math.random();
        if (blockType > 0.8 && hayAmount < MAX_HAYS_PER_ROW) {
          isHay = 1;
          hayAmount++;
          4;
          console.log("hayAmount", hayAmount);
        }

        const block = new Tile({
          app: this.app,
          x: rowIndex * Constants.BLOCK_SPACING + Constants.INITIAL_SPACING,
          y: colIndex * Constants.BLOCK_SPACING + Constants.INITIAL_SPACING,
          sprite: isHay ? "./assets/hay.png" : "./assets/grass.png",
          col: colIndex,
          row: rowIndex,
          type: blockType,
        });

        this.map[colIndex][rowIndex] = block;
      });
    });

    console.log("App and tileset initialized.");
  };

  getRootObject = () => {
    return this.app;
  };

  getData = () => {
    return this.config;
  };

  getTiles = () => {
    return this.map;
  };

  setBackground = (texture: string) => {
    const bgTexture = PIXI.Texture.from(texture);
    const bgSprite = new PIXI.TilingSprite(
      bgTexture,
      this.app.screen.width,
      this.app.screen.height
    );

    this.app.stage.addChild(bgSprite);
  };
}
