import { Effect, EffectType } from '../../rules/effects/EffectType'
import { Buzz } from '../Buzz'
import { EnergyCard } from './EnergyCard'
import { Timing } from './Timing'

export type CardCharacteristics = {
  cost: number,
  timing: Timing
  buzz?: Buzz,
  effects?: Effect[]
}

export const energyCardCharacteristics: Record<EnergyCard, CardCharacteristics> = {
  [EnergyCard.AcidAttack]: {
    cost: 6,
    timing: Timing.Keep,
    buzz: Buzz.Buzz5
  },
  [EnergyCard.AdrenalineAugment]: {
    cost: 5,
    timing: Timing.Keep
  },
  [EnergyCard.AlienMetabolism]: {
    cost: 2,
    timing: Timing.Keep,
    buzz: Buzz.Buzz7
  },
  [EnergyCard.AntimatterPellets]: {
    cost: 5,
    timing: Timing.Keep
  },
  [EnergyCard.ArmorPlating]: {
    cost: 6,
    timing: Timing.Keep,
    buzz: Buzz.Buzz1
  },
  [EnergyCard.BreakingNews]: {
    cost: 6,
    timing: Timing.Keep,
    buzz: Buzz.Buzz8
  },
  [EnergyCard.Camouflage]: {
    cost: 4,
    timing: Timing.Keep
  },
  [EnergyCard.CannonBall]: {
    cost: 7,
    timing: Timing.Discard,
    buzz: Buzz.Buzz7,
    effects: [
      { type: EffectType.PullFame, count: 1 },
      { type: EffectType.Smash, rival: 1 },
      { type: EffectType.GainEnergy, count: 4 },
    ]
  },
  [EnergyCard.Dominate]: {
    cost: 3,
    timing: Timing.Discard,
    buzz: Buzz.Buzz10,
    effects: [
      { type: EffectType.Dominate }
    ]
  },
  [EnergyCard.ElectricalAura]: {
    cost: 4,
    timing: Timing.Keep,
    buzz: Buzz.Buzz6
  },
  [EnergyCard.Energize]: {
    cost: 10,
    timing: Timing.Discard,
    buzz: Buzz.Buzz6,
    effects: [
      { type: EffectType.GainEnergy, count: 8 },
      { type: EffectType.WhiteDiceToken, count: 1 },
    ]
  },
  [EnergyCard.ExtraHead]: {
    cost: 7,
    timing: Timing.Keep
  },
  [EnergyCard.EyeOfTheStorm]: {
    cost: 2,
    timing: Timing.Keep,
    buzz: Buzz.Buzz8
  },
  [EnergyCard.Frenzy]: {
    cost: 6,
    timing: Timing.Discard,
    effects: [
      { type: EffectType.FreeTurn }
    ]
  },
  [EnergyCard.GentleGiant]: {
    cost: 5,
    timing: Timing.Keep,
    buzz: Buzz.Buzz4
  },
  [EnergyCard.GiantBrain]: {
    cost: 4,
    timing: Timing.Keep
  },
  [EnergyCard.Hibernation]: {
    cost: 5,
    timing: Timing.Keep
  },
  [EnergyCard.HorsDOeuvre]: {
    cost: 3,
    timing: Timing.Discard,
    buzz: Buzz.Buzz1,
    effects: [
      { type: EffectType.Smash, me: 2 },
      { type: EffectType.PullDestruction, count: 2 },
    ]
  },
  [EnergyCard.InShape]: {
    cost: 4,
    timing: Timing.Keep
  },
  [EnergyCard.InTheShadows]: {
    cost: 5,
    timing: Timing.Keep,
    buzz: Buzz.Buzz9
  },
  [EnergyCard.JetsScrambled]: {
    cost: 5,
    timing: Timing.Discard,
    buzz: Buzz.Buzz12,
    effects: [
      { type: EffectType.Smash, me: 5, rival: 5 },
    ]
  },
  [EnergyCard.Kaijutsu]: {
    cost: 5,
    timing: Timing.Discard,
    buzz: Buzz.Buzz10,
    effects: [
      { type: EffectType.PullDestruction, count: 1 },
      { type: EffectType.Smash, rival: 2 },
    ]
  },
  [EnergyCard.LightingSpeed]: {
    cost: 4,
    timing: Timing.Keep,
    buzz: Buzz.Buzz9
  },
  [EnergyCard.MadeInALab]: {
    cost: 2,
    timing: Timing.Keep,
    buzz: Buzz.Buzz5
  },
  [EnergyCard.MomentOfRespite]: {
    cost: 4,
    timing: Timing.Discard,
    buzz: Buzz.Buzz9,
    effects: [
      { type: EffectType.Heal, count: 2 },
      { type: EffectType.WhiteDiceToken, count: 1 },
    ]
  },
  [EnergyCard.MonsterCoaster]: {
    cost: 7,
    timing: Timing.Discard,
    effects: [
      { type: EffectType.PullDestruction, count: 3 },
    ]
  },
  [EnergyCard.Monumental]: {
    cost: 5,
    timing: Timing.Discard,
    buzz: Buzz.Buzz2,
    effects: [
      { type: EffectType.PullDestruction, count: 1 },
      { type: EffectType.PullFame, count: 1 },
    ]
  },
  [EnergyCard.NaturalSelection]: {
    cost: 4,
    timing: Timing.Keep
  },
  [EnergyCard.OperationMedia]: {
    cost: 6,
    timing: Timing.Discard,
    buzz: Buzz.Buzz7,
    effects: [
      { type: EffectType.OperationMedia }
    ]
  },
  [EnergyCard.Photoshoot]: {
    cost: 2,
    timing: Timing.Discard,
    buzz: Buzz.Buzz4,
    effects: [
      { type: EffectType.PullFame, count: 1 },
    ]
  },
  [EnergyCard.Rebooting]: {
    cost: 3,
    timing: Timing.Keep,
    buzz: Buzz.Buzz1
  },
  [EnergyCard.Regeneration]: {
    cost: 4,
    timing: Timing.Keep
  },
  [EnergyCard.SackTheStadium]: {
    cost: 8,
    timing: Timing.Discard,
    buzz: Buzz.Buzz11,
    effects: [
      { type: EffectType.PullDestruction, count: 2 },
      { type: EffectType.PullFame, count: 2 },
    ]
  },
  [EnergyCard.Scrappy]: {
    cost: 2,
    timing: Timing.Keep,
    buzz: Buzz.Buzz6
  },
  [EnergyCard.SeismicTest]: {
    cost: 5,
    timing: Timing.Discard,
    effects: [
      { type: EffectType.PullDestruction, count: 2 }
    ]
  },
  [EnergyCard.SignatureMove]: {
    cost: 6,
    timing: Timing.Keep,
    buzz: Buzz.Buzz11
  },
  [EnergyCard.SnackTime]: {
    cost: 3,
    timing: Timing.Discard,
    effects: [
      { type: EffectType.Heal, count: 3 }
    ]
  },
  [EnergyCard.SpikedTail]: {
    cost: 4,
    timing: Timing.Keep
  },
  [EnergyCard.Superconductor]: {
    cost: 2,
    timing: Timing.Keep
  },
  [EnergyCard.TeslaImpulse]: {
    cost: 6,
    timing: Timing.Discard,
    buzz: Buzz.Buzz12,
    effects: [
      { type: EffectType.TeslaImpulse }
    ]
  },
  [EnergyCard.ThePartyIsOver]: {
    cost: 4,
    timing: Timing.Discard,
    buzz: Buzz.Buzz11,
    effects: [
      { type: EffectType.ThePartyIsOver }
    ]
  },
  [EnergyCard.ThermonuclearCooking]: {
    cost: 7,
    timing: Timing.Discard,
    buzz: Buzz.Buzz2,
    effects: [
      { type: EffectType.PullDestruction, count: 1 },
      { type: EffectType.Heal, count: 2 },
      { type: EffectType.GainEnergy, count: 2 },
    ]
  },
  [EnergyCard.ThunderStomp]: {
    cost: 4,
    timing: Timing.Keep
  },
  [EnergyCard.TitanicBatteries]: {
    cost: 4,
    timing: Timing.Keep,
    buzz: Buzz.Buzz10
  },
  [EnergyCard.TooCute]: {
    cost: 3,
    timing: Timing.Discard,
    buzz: Buzz.Buzz4,
    effects: [
      { type: EffectType.Smash, rival: 2 }
    ]
  },
  [EnergyCard.TrendSetter]: {
    cost: 3,
    timing: Timing.Keep,
    buzz: Buzz.Buzz8
  },
  [EnergyCard.Unchained]: {
    cost: 3,
    timing: Timing.Keep,
    buzz: Buzz.Buzz12
  },
  [EnergyCard.UnstableDna]: {
    cost: 3,
    timing: Timing.Keep,
    buzz: Buzz.Buzz5
  },
  [EnergyCard.Unstoppable]: {
    cost: 3,
    timing: Timing.Keep
  },
  [EnergyCard.UtterDestruction]: {
    cost: 4,
    timing: Timing.Keep,
    buzz: Buzz.Buzz2
  }
}