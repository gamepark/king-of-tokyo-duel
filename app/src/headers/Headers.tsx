/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/king-of-tokyo-duel/rules/RuleId'
import { ComponentType } from 'react'
import { AlienoidHeader } from './AlienoidHeader'
import { BuyHeader } from './BuyHeader'
import { CamouflageHeader } from './CamouflageHeader'
import { ChangePlayerHeader } from './ChangePlayerHeader'
import { DominateHeader } from './DominateHeader'
import { GainEnergyHeader } from './GainEnergyHeader'
import { GainWhiteDiceTokenHeader } from './GainWhiteDiceTokenHeader'
import { GigazaurHeader } from './GigazaurHeader'
import { HealHeader } from './HealHeader'
import { HibernationHeader } from './HibernationHeader'
import { MadeInALabHeader } from './MadeInALabHeader'
import { MoveBuzzTokenHeader } from './MoveBuzzTokenHeader'
import { PullPawnHeader } from './PullPawnHeader'
import { RebootingHeader } from './RebootingHeader'
import { ResolveDiceHeader } from './ResolveDiceHeader'
import { RollDiceHeader } from './RollDiceHeader'
import { SmashHeader } from './SmashHeader'
import { SuperConductorHeader } from './SuperConductorHeader'
import { TeslaImpulseHeader } from './TeslaImpulseHeader'
import { TitanicBatteriesHeader } from './TitanicBatteriesHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.RollDice]: RollDiceHeader,
  [RuleId.ResolveDice]: ResolveDiceHeader,
  [RuleId.Smash]: SmashHeader,
  [RuleId.Heal]: HealHeader,
  [RuleId.GainEnergy]: GainEnergyHeader,
  [RuleId.PullPawn]: PullPawnHeader,
  [RuleId.Buy]: BuyHeader,
  [RuleId.MoveBuzzToken]: MoveBuzzTokenHeader,
  [RuleId.ChangePlayer]: ChangePlayerHeader,
  [RuleId.GainWhiteDiceToken]: GainWhiteDiceTokenHeader,
  [RuleId.Alienoid]: AlienoidHeader,
  [RuleId.Gigazaur]: GigazaurHeader,
  [RuleId.TheKing]: MoveBuzzTokenHeader,
  [RuleId.TitanicBatteries]: TitanicBatteriesHeader,
  [RuleId.SuperConductor]: SuperConductorHeader,
  [RuleId.Camouflage]: CamouflageHeader,
  [RuleId.Hibernation]: HibernationHeader,
  [RuleId.Dominate]: DominateHeader,
  [RuleId.MadeInALab]: MadeInALabHeader,
  [RuleId.Rebooting]: RebootingHeader,
  [RuleId.TeslaImpulse]: TeslaImpulseHeader
}