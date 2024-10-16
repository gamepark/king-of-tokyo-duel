/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/king-of-tokyo-duel/rules/RuleId'
import { ComponentType } from 'react'
import { BuyHeader } from './BuyHeader'
import { DominateHeader } from './DominateHeader'
import { GainEnergyHeader } from './GainEnergyHeader'
import { GigazaurHeader } from './GigazaurHeader'
import { HibernationHeader } from './HibernationHeader'
import { MadeInALabHeader } from './MadeInALabHeader'
import { MoveBuzzTokenHeader } from './MoveBuzzTokenHeader'
import { OnStartHeader } from './OnStartHeader'
import { PullPawnHeader } from './PullPawnHeader'
import { ResolveDiceHeader } from './ResolveDiceHeader'
import { RollDiceHeader } from './RollDiceHeader'
import { SmashHeader } from './SmashHeader'
import { SuperConductorHeader } from './SuperConductorHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.RollDice]: RollDiceHeader,
  [RuleId.ResolveDice]: ResolveDiceHeader,
  [RuleId.Smash]: SmashHeader,
  [RuleId.GainEnergy]: GainEnergyHeader,
  [RuleId.PullPawn]: PullPawnHeader,
  [RuleId.Buy]: BuyHeader,
  [RuleId.MoveBuzzToken]: MoveBuzzTokenHeader,
  [RuleId.SuperConductor]: SuperConductorHeader,
  [RuleId.Hibernation]: HibernationHeader,
  [RuleId.Dominate]: DominateHeader,
  [RuleId.OnStartTurn]: OnStartHeader,
  [RuleId.MadeInALab]: MadeInALabHeader,
  [RuleId.Gigazaur]: GigazaurHeader
}