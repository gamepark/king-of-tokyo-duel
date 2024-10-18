import { LocationType } from '../material/LocationType'

export enum Memory {
  Round = 1,
  ActivePlayer,
  RollCount,
  BoughtCards,
  Effects,
  CurrentEffect,
  FreeTurn,
  KeepCardPlayed,
  Phase,
  RivalSmashCount,
  SetDiceApart,
  TitanicBatteries,
  DiceFacesSolved,
  Immune,
  Dominate,
  SkipReboot,
  ConsumedPower,
  RefillRiver,
  AlienoidExtra,
  ExtraDiceFaces
}

export type SetDiceOn = {
  location: LocationType,
  parent: number
}