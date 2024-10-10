/** @jsxImportSource @emotion/react */

import { RuleId } from '@gamepark/king-of-tokyo-duel/rules/RuleId'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isStartRule } from '@gamepark/rules-api'

export const OnStartHeader = () => {
  const madeInALab = useLegalMove((move) => isStartRule(move) && move.id === RuleId.MadeInALab)
  const hibernation = useLegalMove((move) => isStartRule(move) && move.id === RuleId.Hibernation)
  const ignore = useLegalMove((move) => isStartRule(move) && (move.id === RuleId.RollDice || move.id === RuleId.Dominate))
  return (
    <>
      <PlayMoveButton move={madeInALab}>Made in a lab </PlayMoveButton>, <PlayMoveButton move={hibernation}>Hibernation</PlayMoveButton>, <PlayMoveButton move={ignore}>Ignore</PlayMoveButton>
    </>
  )
}
