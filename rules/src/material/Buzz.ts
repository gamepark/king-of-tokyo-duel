import { getEnumValues } from '@gamepark/rules-api'

export enum Buzz {
  CatSmash = 1,
  PandaDice,
  TheKingBuzz,
  FishHeal,
  TigerEnergy,
  LizardSmashDice,
  AnubisEnergyHeal,
  DragonEnergySmashHeal,
  AlienShortcut,
  PumpkinHealSmash2Heal,
  PhantomExtendHeal,
  PenguinExtendSmash,
}

export const allBuzz = getEnumValues(Buzz)
export const commonBuzz = allBuzz.filter((buzz) => buzz !== Buzz.TheKingBuzz)

// TODO: use effects data structure that already exists
enum BuzzEffect {
  Smash, Heal, Energy, DiceToken, TheKing, DoubleSmash
}

type BuzzDescription = {
  changeTrack?: number
  extraSpaceEffect?: BuzzEffect
  effects: (BuzzEffect | null)[]
}

export const buzzDescriptions: Record<Buzz, BuzzDescription> = {
  [Buzz.CatSmash]: { effects: [BuzzEffect.Smash] },
  [Buzz.PandaDice]: { effects: [BuzzEffect.DiceToken] },
  [Buzz.TheKingBuzz]: { effects: [BuzzEffect.TheKing] },
  [Buzz.FishHeal]: { effects: [BuzzEffect.Heal] },
  [Buzz.TigerEnergy]: { effects: [BuzzEffect.Energy] },
  [Buzz.LizardSmashDice]: { effects: [BuzzEffect.Smash, BuzzEffect.DiceToken] },
  [Buzz.AnubisEnergyHeal]: { effects: [BuzzEffect.Energy, BuzzEffect.Heal] },
  [Buzz.DragonEnergySmashHeal]: { effects: [BuzzEffect.Energy, BuzzEffect.Smash, BuzzEffect.Heal] },
  [Buzz.AlienShortcut]: { changeTrack: -1, effects: [null, null, null] },
  [Buzz.PumpkinHealSmash2Heal]: { effects: [BuzzEffect.Heal, BuzzEffect.DoubleSmash, BuzzEffect.Heal] },
  [Buzz.PhantomExtendHeal]: { changeTrack: +1, extraSpaceEffect: BuzzEffect.Heal, effects: [null, null] },
  [Buzz.PenguinExtendSmash]: { changeTrack: +1, extraSpaceEffect: BuzzEffect.Smash, effects: [null, null] }
}