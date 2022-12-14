import * as PIXI from "pixi.js";
import { PlayerConfig, Sprites, TileConfig, TilesetSchema, TileTypes } from "../utils/globals";
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

  /** @method setup - Appends the PIXI.Application to @param div and then sets background and generates tiles. */
  setup = (div: Element) => {
    div.appendChild(this.app.view as any as Node);
    this.setBackground(this.#config.background);
    this.app.stage.interactive = true;

    /** Returns the correct tile type.*/
    const getTileType = (type: TileTypes) => {
      if (type == TileTypes.Hay) return Sprites.Hay;
      if (type == TileTypes.Wall) return Sprites.Wall;
      return Sprites.Grass;
    };

    let globalHayAmount = 0;
    let globalWallAmount = 0;
    this.map.forEach((column, colIndex) => {
      let columnHayAmount = 0;
      let columnWallAmount = 0;

      column.forEach((row, rowIndex) => {
        let tileType = TileTypes.Grass;

        //  Randomizes the tile type. Takes into account maximum amount of 'Hay' and 'Wall' tiles per row/column and globally..
        const random = Math.random();
        if (random > TileConfig.RandomGenerationLikeliness) {
          if (
            columnHayAmount < TileConfig.MaxHaysPerRow ||
            globalHayAmount < TileConfig.hayQuantityModifier
          ) {
            tileType = TileTypes.Hay;
            columnHayAmount++;
            globalHayAmount++;
          }
        } else if (random < TileConfig.RandomGenerationLikeliness * 0.2) {
          if (columnWallAmount < TileConfig.wallQuantityModifier) {
            tileType = TileTypes.Wall;
            columnWallAmount++;
            globalWallAmount++;
          }
        }

        //  Makes sure the initial player position is always a Grass
        if (rowIndex == PlayerConfig.InitialRow && colIndex == PlayerConfig.InitialCol)
          tileType = 0;

        const block = new Tile({
          app: this.app,
          x: rowIndex * TileConfig.Padding + TileConfig.Margin,
          y: colIndex * TileConfig.Padding + TileConfig.Margin,
          sprite: getTileType(tileType),
          col: colIndex,
          row: rowIndex,
          type: tileType,
        });

        this.map[colIndex][rowIndex] = block;
      });
    });

    console.log("App and tileset initialized.");
  };

  /** Returns the PIXI.Application object. */
  getRootObject = () => {
    return this.app;
  };

  /** Returns the Game configuration. */
  getData = () => {
    return this.#config;
  };

  /** Returns the Game Tiles. */
  getTiles = () => {
    return this.map;
  };

  /** Gets a texture path as string and sets the Background sprite. */
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
