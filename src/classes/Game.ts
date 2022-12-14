import * as PIXI from "pixi.js";
import { Sprites, TileConfig, TilesetSchema } from "../utils/globals";
import Tile from "./Tile";

export interface ApplicationConfig {
  width: number;
  height: number;
  background: string;
}

type rows = number[] | Tile[];

export default class Game {
  app: PIXI.Application;
  #config: ApplicationConfig;
  map: Array<rows>;

  constructor(pt: { width: number; height: number; background: string }) {
    this.#config = pt;

    this.app = new PIXI.Application({
      width: this.#config.width,
      height: this.#config.height,
      backgroundColor: 0xaaaaaa,
      antialias: true,
    });

    this.map = TilesetSchema;
  }

  setup = (div: Element) => {
    // Appends to dom

    div.appendChild(this.app.view as any as Node);

    // Sets background
    this.setBackground(this.#config.background);
    this.app.stage.interactive = true;

    // Sets up the map tiles
    const getTileType = () => {};

    this.map.forEach((column, colIndex) => {
      let hayAmount = 0;

      column.forEach((row, rowIndex) => {
        let isHay = 0;
        let blockType = Math.random();
        if (blockType > 0.8 && hayAmount < TileConfig.MaxHaysPerRow) {
          isHay = 1;
          hayAmount++;
          console.log("hayAmount", hayAmount);
        }

        const block = new Tile({
          app: this.app,
          x: rowIndex * TileConfig.Padding + TileConfig.Margin,
          y: colIndex * TileConfig.Padding + TileConfig.Margin,
          sprite: isHay ? Sprites.Hay : Sprites.Grass,
          col: colIndex,
          row: rowIndex,
          type: isHay,
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
    return this.#config;
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
