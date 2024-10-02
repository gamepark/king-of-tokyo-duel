/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/king-of-tokyo-duel/rules/RuleId'
import { ComponentType } from 'react'
import { BuyHeader } from './BuyHeader'
import { PlayerTurnHeader } from './PlayerTurnHeader'
import { ResolveDiceHeader } from './ResolveDiceHeader'
import { RollDiceHeader } from './RollDiceHeader'
import { SuperConductorHeader } from './SuperConductorHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.RollDice]: RollDiceHeader,
  [RuleId.PullFamePawn]: PlayerTurnHeader,
  [RuleId.GainEnergy]: () => <>Gain Energy</>,
  [RuleId.Smash]: () => <>Smash</>,
  [RuleId.Buy]: BuyHeader,
  [RuleId.SuperConductor]: SuperConductorHeader,
  [RuleId.ResolveDice]: ResolveDiceHeader
}