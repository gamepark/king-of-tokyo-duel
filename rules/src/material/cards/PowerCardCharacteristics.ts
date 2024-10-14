import { Effect, EffectType } from '../../rules/effects/EffectType'
import { Buzz } from '../Buzz'
import { Pawn } from '../Pawn'
import { PowerCard } from './PowerCard'
import { Timing } from './Timing'

export type CardCharacteristics = {
  cost: number,
  timing: Timing
  buzz?: Buzz,
  effects?: Effect[]
}

export const powerCardCharacteristics: Record<PowerCard, CardCharacteristics> = {
  [PowerCard.AcidAttack]: {
    cost: 6,
    timing: Timing.Keep,
    buzz: Buzz.TigerEnergy
  },
  [PowerCard.AdrenalineAugment]: {
    cost: 5,
    timing: Timing.Keep
  },
  [PowerCard.AlienMetabolism]: {
    cost: 2,
    timing: Timing.Keep,
    buzz: Buzz.AnubisEnergyHeal
  },
  [PowerCard.AntimatterPellets]: {
    cost: 5,
    timing: Timing.Keep
  },
  [PowerCard.ArmorPlating]: {
    cost: 6,
    timing: Timing.Keep,
    buzz: Buzz.CatSmash
  },
  [PowerCard.BreakingNews]: {
    cost: 6,
    timing: Timing.Keep,
    buzz: Buzz.DragonEnergySmashHeal
  },
  [PowerCard.Camouflage]: {
    cost: 4,
    timing: Timing.Keep
  },
  [PowerCard.CannonBall]: {
    cost: 7,
    timing: Timing.Discard,
    buzz: Buzz.AnubisEnergyHeal,
    effects: [
      { type: EffectType.PullPawn, pawn: Pawn.Fame, count: 1 },
      { type: EffectType.Smash, rival: true, count: 1 },
      { type: EffectType.GainEnergy, count: 4 },
    ]
  },
  [PowerCard.Dominate]: {
    cost: 3,
    timing: Timing.Discard,
    buzz: Buzz.PumpkinHealSmash2Heal,
    effects: [
      { type: EffectType.Dominate }
    ]
  },
  [PowerCard.ElectricalAura]: {
    cost: 4,
    timing: Timing.Keep,
    buzz: Buzz.LizardSmashDice
  },
  [PowerCard.Energize]: {
    cost: 10,
    timing: Timing.Discard,
    buzz: Buzz.LizardSmashDice,
    effects: [
      { type: EffectType.GainEnergy, count: 8 },
      { type: EffectType.GetWhiteDiceToken, count: 2 },
    ]
  },
  [PowerCard.ExtraHead]: {
    cost: 7,
    timing: Timing.Keep
  },
  [PowerCard.EyeOfTheStorm]: {
    cost: 2,
    timing: Timing.Keep,
    buzz: Buzz.DragonEnergySmashHeal
  },
  [PowerCard.Frenzy]: {
    cost: 6,
    timing: Timing.Discard,
    effects: [
      { type: EffectType.FreeTurn }
    ]
  },
  [PowerCard.GentleGiant]: {
    cost: 5,
    timing: Timing.Keep,
    buzz: Buzz.FishHeal
  },
  [PowerCard.GiantBrain]: {
    cost: 4,
    timing: Timing.Keep
  },
  [PowerCard.Hibernation]: {
    cost: 5,
    timing: Timing.Keep
  },
  [PowerCard.HorsDOeuvre]: {
    cost: 3,
    timing: Timing.Discard,
    buzz: Buzz.CatSmash,
    effects: [
      { type: EffectType.Smash, count: 3 },
      { type: EffectType.PullPawn, pawn: Pawn.Destruction, count: 2 },
    ]
  },
  [PowerCard.InShape]: {
    cost: 4,
    timing: Timing.Keep
  },
  [PowerCard.InTheShadows]: {
    cost: 5,
    timing: Timing.Keep,
    buzz: Buzz.AlienShortcut
  },
  [PowerCard.JetsScrambled]: {
    cost: 5,
    timing: Timing.Discard,
    buzz: Buzz.PenguinExtendSmash,
    effects: [
      { type: EffectType.Smash, count: 5 },
      { type: EffectType.Smash, rival: true, count: 5 },
    ]
  },
  [PowerCard.Kaijutsu]: {
    cost: 5,
    timing: Timing.Discard,
    buzz: Buzz.PumpkinHealSmash2Heal,
    effects: [
      { type: EffectType.PullPawn, pawn: Pawn.Destruction, count: 1 },
      { type: EffectType.Smash, rival: true, count: 2 },
    ]
  },
  [PowerCard.LightingSpeed]: {
    cost: 4,
    timing: Timing.Keep,
    buzz: Buzz.AlienShortcut
  },
  [PowerCard.MadeInALab]: {
    cost: 2,
    timing: Timing.Keep,
    buzz: Buzz.TigerEnergy
  },
  [PowerCard.MomentOfRespite]: {
    cost: 4,
    timing: Timing.Discard,
    buzz: Buzz.AlienShortcut,
    effects: [
      { type: EffectType.Heal, count: 2 },
      { type: EffectType.GetWhiteDiceToken, count: 1 },
    ]
  },
  [PowerCard.MonsterCoaster]: {
    cost: 7,
    timing: Timing.Discard,
    effects: [
      { type: EffectType.PullPawn, pawn: Pawn.Destruction, count: 3 },
    ]
  },
  [PowerCard.Monumental]: {
    cost: 5,
    timing: Timing.Discard,
    buzz: Buzz.PandaDice,
    effects: [
      { type: EffectType.PullPawn, pawn: Pawn.Destruction, count: 1 },
      { type: EffectType.PullPawn, pawn: Pawn.Fame, count: 1 },
    ]
  },
  [PowerCard.NaturalSelection]: {
    cost: 4,
    timing: Timing.Keep,
    effects: [
      { type: EffectType.GainEnergy, count: 4 },
      { type: EffectType.Heal, count: 4 }
    ]
  },
  [PowerCard.OperationMedia]: {
    cost: 6,
    timing: Timing.Discard,
    buzz: Buzz.AnubisEnergyHeal,
    effects: [
      { type: EffectType.OperationMedia }
    ]
  },
  [PowerCard.Photoshoot]: {
    cost: 2,
    timing: Timing.Discard,
    buzz: Buzz.FishHeal,
    effects: [
      { type: EffectType.PullPawn, pawn: Pawn.Fame, count: 1 },
    ]
  },
  [PowerCard.Rebooting]: {
    cost: 3,
    timing: Timing.Keep,
    buzz: Buzz.CatSmash
  },
  [PowerCard.Regeneration]: {
    cost: 4,
    timing: Timing.Keep
  },
  [PowerCard.SackTheStadium]: {
    cost: 8,
    timing: Timing.Discard,
    buzz: Buzz.PhantomExtendHeal,
    effects: [
      { type: EffectType.PullPawn, pawn: Pawn.Destruction, count: 2 },
      { type: EffectType.PullPawn, pawn: Pawn.Fame, count: 2 },
    ]
  },
  [PowerCard.Scrappy]: {
    cost: 2,
    timing: Timing.Keep,
    buzz: Buzz.LizardSmashDice
  },
  [PowerCard.SeismicTest]: {
    cost: 5,
    timing: Timing.Discard,
    effects: [
      { type: EffectType.PullPawn, pawn: Pawn.Destruction, count: 2 }
    ]
  },
  [PowerCard.SignatureMove]: {
    cost: 6,
    timing: Timing.Keep,
    buzz: Buzz.PhantomExtendHeal
  },
  [PowerCard.SnackTime]: {
    cost: 3,
    timing: Timing.Discard,
    effects: [
      { type: EffectType.Heal, count: 3 }
    ]
  },
  [PowerCard.SpikedTail]: {
    cost: 4,
    timing: Timing.Keep
  },
  [PowerCard.Superconductor]: {
    cost: 2,
    timing: Timing.Keep
  },
  [PowerCard.TeslaImpulse]: {
    cost: 6,
    timing: Timing.Discard,
    buzz: Buzz.PenguinExtendSmash,
    effects: [
      { type: EffectType.TeslaImpulse }
    ]
  },
  [PowerCard.ThePartyIsOver]: {
    cost: 4,
    timing: Timing.Discard,
    buzz: Buzz.PhantomExtendHeal,
    effects: [
      { type: EffectType.ThePartyIsOver }
    ]
  },
  [PowerCard.ThermonuclearCooking]: {
    cost: 7,
    timing: Timing.Discard,
    buzz: Buzz.PandaDice,
    effects: [
      { type: EffectType.PullPawn, pawn: Pawn.Destruction, count: 1 },
      { type: EffectType.Heal, count: 2 },
      { type: EffectType.GainEnergy, count: 2 },
    ]
  },
  [PowerCard.ThunderStomp]: {
    cost: 4,
    timing: Timing.Keep
  },
  [PowerCard.TitanicBatteries]: {
    cost: 4,
    timing: Timing.Keep,
    buzz: Buzz.PumpkinHealSmash2Heal
  },
  [PowerCard.TooCute]: {
    cost: 3,
    timing: Timing.Discard,
    buzz: Buzz.FishHeal,
    effects: [
      { type: EffectType.Smash, rival: true, count: 2 }
    ]
  },
  [PowerCard.TrendSetter]: {
    cost: 3,
    timing: Timing.Keep,
    buzz: Buzz.DragonEnergySmashHeal
  },
  [PowerCard.Unchained]: {
    cost: 3,
    timing: Timing.Keep,
    buzz: Buzz.PenguinExtendSmash
  },
  [PowerCard.UnstableDna]: {
    cost: 3,
    timing: Timing.Keep,
    buzz: Buzz.TigerEnergy
  },
  [PowerCard.Unstoppable]: {
    cost: 3,
    timing: Timing.Keep
  },
  [PowerCard.UtterDestruction]: {
    cost: 4,
    timing: Timing.Keep,
    buzz: Buzz.PandaDice
  }
}