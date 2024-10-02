import { getEnumValues } from '@gamepark/rules-api'

export enum Buzz {
  //
  Buzz1 = 1,
  Buzz2,
  TheKingBuzz,
  Buzz4,
  Buzz5,
  Buzz6,
  Buzz7,
  Buzz8,
  Buzz9,
  Buzz10,
  Buzz11,
  Buzz12,
}

export const allBuzz = getEnumValues(Buzz)
export const commonBuzz = allBuzz.filter((buzz) => buzz !== Buzz.TheKingBuzz)
export const theKingBuzz = allBuzz.find((buzz) => buzz === Buzz.TheKingBuzz)

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
  [Buzz.Buzz1]: { effects: [BuzzEffect.Smash] },
  [Buzz.Buzz2]: { effects: [BuzzEffect.DiceToken] },
  [Buzz.TheKingBuzz]: { effects: [BuzzEffect.TheKing] },
  [Buzz.Buzz4]: { effects: [BuzzEffect.Heal] },
  [Buzz.Buzz5]: { effects: [BuzzEffect.Energy] },
  [Buzz.Buzz6]: { effects: [BuzzEffect.Smash, BuzzEffect.DiceToken] },
  [Buzz.Buzz7]: { effects: [BuzzEffect.Energy, BuzzEffect.Heal] },
  [Buzz.Buzz8]: { effects: [BuzzEffect.Energy, BuzzEffect.Smash, BuzzEffect.Heal] },
  [Buzz.Buzz9]: { changeTrack: -1, effects: [null, null, null] },
  [Buzz.Buzz10]: { effects: [BuzzEffect.Heal, BuzzEffect.DoubleSmash, BuzzEffect.Heal] },
  [Buzz.Buzz11]: { changeTrack: +1, extraSpaceEffect: BuzzEffect.Heal, effects: [null, null] },
  [Buzz.Buzz12]: { changeTrack: +1, extraSpaceEffect: BuzzEffect.Smash, effects: [null, null] }
}