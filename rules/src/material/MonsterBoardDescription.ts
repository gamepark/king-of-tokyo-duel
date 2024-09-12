import { MonsterBoard } from './MonsterBoard'

export type MonsterBoardDescription = {
  health: number,
  // TODO: EFFECTS
}

export const monsterBoardDescriptions: Record<MonsterBoard, MonsterBoardDescription> = {
  [MonsterBoard.Alienoid]: { health: 14},
  [MonsterBoard.CyberKitty]: { health: 13},
  [MonsterBoard.Gigazaur]: { health: 14},
  [MonsterBoard.MekaDragon]: { health: 12},
  [MonsterBoard.SpacePenguin]: { health: 13},
  [MonsterBoard.TheKing]: { health: 15},
}