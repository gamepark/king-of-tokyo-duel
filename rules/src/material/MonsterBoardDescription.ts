import { Monster } from './Monster'

export type MonsterBoardDescription = {
  health: number,
  // TODO: EFFECTS
}

export const monsterBoardDescriptions: Record<Monster, MonsterBoardDescription> = {
  [Monster.Alienoid]: { health: 14},
  [Monster.CyberKitty]: { health: 13},
  [Monster.Gigazaur]: { health: 14},
  [Monster.MekaDragon]: { health: 12},
  [Monster.SpacePenguin]: { health: 13},
  [Monster.TheKing]: { health: 15},
}