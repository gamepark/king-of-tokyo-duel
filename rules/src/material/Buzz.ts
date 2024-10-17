import { axialToEvenQ, getEnumValues, getPolyhexSpaces, HexGridSystem, hexRotate, Location, MaterialItem, oddQToAxial } from '@gamepark/rules-api'
import { Effect, EffectType, GainEnergy, GainWhiteDiceToken, Heal, Smash } from '../rules/effects/EffectType'
import { LocationType } from './LocationType'

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

const smash: Smash = { type: EffectType.Smash, count: 1 }
const smash2: Smash = { type: EffectType.Smash, count: 2 }
const gainDiceToken: GainWhiteDiceToken = { type: EffectType.GetWhiteDiceToken, count: 1 }
const heal: Heal = { type: EffectType.Heal, count: 1 }
const gainEnergy: GainEnergy = { type: EffectType.GainEnergy, count: 1 }

type BuzzDescription = {
  changeTrack?: number
  extraSpaceEffect?: Effect
  effects: (Effect | null)[]
}

export const buzzDescriptions: Record<Buzz, BuzzDescription> = {
  [Buzz.CatSmash]: { effects: [smash] },
  [Buzz.PandaDice]: { effects: [gainDiceToken] },
  [Buzz.TheKingBuzz]: { effects: [null] },
  [Buzz.FishHeal]: { effects: [heal] },
  [Buzz.TigerEnergy]: { effects: [gainEnergy] },
  [Buzz.LizardSmashDice]: { effects: [smash, gainDiceToken] },
  [Buzz.AnubisEnergyHeal]: { effects: [gainEnergy, heal] },
  [Buzz.DragonEnergySmashHeal]: { effects: [gainEnergy, smash, heal] },
  [Buzz.AlienShortcut]: { changeTrack: -1, effects: [null, null, null] },
  [Buzz.PumpkinHealSmash2Heal]: { effects: [heal, smash2, heal] },
  [Buzz.PhantomExtendHeal]: { changeTrack: +1, extraSpaceEffect: heal, effects: [null, null] },
  [Buzz.PenguinExtendSmash]: { changeTrack: +1, extraSpaceEffect: smash, effects: [null, null] }
}

export function getBuzzShape(buzz: Buzz) {
  return buzzDescriptions[buzz].effects.map((_, x) => ({ x, y: 0 }))
}

export function getBuzzSpaces(location: Location, buzz: Buzz) {
  if (location.type === LocationType.FameTrack) {
    const shape = getBuzzShape(buzz).map(oddQToAxial).map(axialToEvenQ)
    return getPolyhexSpaces(shape, location, HexGridSystem.EvenQ)
  } else {
    return getPolyhexSpaces(getBuzzShape(buzz), location, HexGridSystem.OddQ)
  }
}

export function getBuzzEffect(buzzItem: MaterialItem, location: Location): Effect | undefined {
  if (location.x! - Math.floor(location.x!) === 0.5) {
    return buzzDescriptions[buzzItem.id!].extraSpaceEffect
  }
  const vector = { x: location.x! - buzzItem.location.x!, y: 0 }
  const coordinates = hexRotate(vector, buzzItem.location.rotation, location.type === LocationType.FameTrack ? HexGridSystem.EvenQ : HexGridSystem.OddQ)
  return buzzDescriptions[buzzItem.id!].effects[coordinates.x] ?? undefined
}