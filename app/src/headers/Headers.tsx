/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/king-of-tokyo-duel/rules/RuleId'
import { ComponentType } from 'react'
import { PlayerTurnHeader } from './PlayerTurnHeader'
import { RollDiceHeader } from './RollDiceHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.RollDice]: RollDiceHeader,
  [RuleId.MovePawns]: PlayerTurnHeader,
  [RuleId.GainEnergy]: () => <>Gain Energy</>,
  [RuleId.Smash]: () => <>Smash</>,
  [RuleId.Buy]: () => <>Buy</>
}