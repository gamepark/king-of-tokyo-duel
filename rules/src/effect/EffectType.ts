export enum EffectType {
  PullFame = 1,
  PullDestruction,
  FreeTurn,
  Smash,
  Heal,
  GainEnergy,
  Dominate,
  ThePartyIsOver,
  TeslaImpulse,
  WhiteDiceToken,
  OperationMedia
}

export type Effect = PullFame | PullDestruction | FreeTurn | Smash | GainEnergy;

export type PullFame = {
  type: EffectType.PullFame,
  count: number
}

export type PullDestruction = {
  type: EffectType.PullDestruction,
  count: number
}

export type Heal = {
  type: EffectType.Heal,
  count: number
}

export type FreeTurn = {
  type: EffectType.FreeTurn
}

export type Smash = {
  type: EffectType.Smash,
  smash?: number,
  rivalSmash?: number
}

export type GainEnergy = {
  type: EffectType.GainEnergy,
  count: number,
}