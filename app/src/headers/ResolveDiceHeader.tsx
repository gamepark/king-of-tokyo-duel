/** @jsxImportSource @emotion/react */

import { RuleId } from '@gamepark/king-of-tokyo-duel/rules/RuleId'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isStartRule } from '@gamepark/rules-api'

export const ResolveDiceHeader = () => {
  const gainEnergy = useLegalMove((move) => isStartRule(move) && move.id === RuleId.GainEnergy)
  const smash = useLegalMove((move) => isStartRule(move) && move.id === RuleId.Smash)
  const pullFamePawn = useLegalMove((move) => isStartRule(move) && move.id === RuleId.PullFamePawn)
  const pullDestructionPawn = useLegalMove((move) => isStartRule(move) && move.id === RuleId.PullDestructionPawn)
  const heal = useLegalMove((move) => isStartRule(move) && move.id === RuleId.Heal)
  return (
    <>
      <PlayMoveButton move={gainEnergy}>Gain Energy</PlayMoveButton> OR <PlayMoveButton move={smash}>Smash</PlayMoveButton> OR <PlayMoveButton move={pullFamePawn}>Pull fame</PlayMoveButton> OR <PlayMoveButton move={pullDestructionPawn}>Pull destruction</PlayMoveButton> OR <PlayMoveButton move={heal}>Heal</PlayMoveButton>
    </>
  )
}
