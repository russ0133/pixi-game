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

  MaxHays = 50,
  MaxHaysPerRow = TileConfig.MaxHays / TilesetSchema.length / 2,

  MaxWalls = 50,
  MaxWallsPerRow = TileConfig.MaxWalls / TilesetSchema.length,

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
