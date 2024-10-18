import { Pawn } from '../../material/Pawn'

export enum EffectType {
  PullPawn = 1,
  FreeTurn,
  Smash,
  Heal,
  GainEnergy,
  Dominate,
  ThePartyIsOver,
  TeslaImpulse,
  GetWhiteDiceToken,
  OperationMedia,
  UnstableDna,
  InShape,
  SuperConductor,
  Rebooting
}

export type Effect = (PullPawn | Heal | FreeTurn | Smash | GainEnergy | GainWhiteDiceToken | InShape | { type: EffectType }) & { rival?: boolean, count?: number };


export type PullPawn = {
  type: EffectType.PullPawn,
  count: number,
  pawn: Pawn
}

export type Heal = {
  type: EffectType.Heal,
  count: number
}

export type FreeTurn = {
  type: EffectType.FreeTurn,
}

export type Smash = {
  type: EffectType.Smash,
  count: number
}

export type GainEnergy = {
  type: EffectType.GainEnergy,
  count: number,
}

export type InShape = {
  type: EffectType.InShape,
  count: number,
}

export type GainWhiteDiceToken = {
  type: EffectType.GetWhiteDiceToken,
  count: number,
}