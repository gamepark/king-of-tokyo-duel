import { LocationType } from '../material/LocationType'

export enum Memory {
  Round = 1,
  RollCount,
  BoughtCards,
  Effects,
  FreeTurn,
  KeepCardPlayed,
  Phase,
  RivalSmashCount,
  SetDiceApart,
  TitanicBatteries,
  DiceFacesSolved,
  CamouflageRolledDiceCount,
  Immune,
  ActivePlayer,
  Dominate,
  SkipReboot,
  ConsumedPower,
  RefillRiver,
  AlienoidExtra
}

export type SetDiceOn = {
  location: LocationType,
  parent: number
}