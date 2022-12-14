export const TilesetSchema = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export enum PlayerConfig {
  InitialRow = 0,
  InitialCol = 0,
}

export enum TileConfig {
  Margin = 25,
  Padding = 50,

  hayQuantityModifier = 50,
  MaxHaysPerRow = TileConfig.hayQuantityModifier / TilesetSchema.length / 2,

  wallQuantityModifier = 50,
  MaxWallsPerRow = TileConfig.wallQuantityModifier / TilesetSchema.length,

  RandomGenerationLikeliness = 0.76,
}

export enum Sprites {
  Background = "./assets/background.jpg",
  Player = "./assets/tank.png",
  Bullet = "./assets/bullet.png",
  Hay = "./assets/hay.png",
  Grass = "./assets/grass.png",
  Wall = "./assets/wall.png",
}

export enum TileTypes {
  Grass = 0,
  Hay = 1,
  Wall = 2,
}

export type Directions = "right" | "up" | "left" | "down";
export type TankTypes = "red" | "blue" | "green";

export const HealthColors = [0x11ff00, 0xffef08, 0xff8800, 0xff2200, 0xff0000];
