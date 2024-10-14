/** @jsxImportSource @emotion/react */

import { Pawn } from '@gamepark/king-of-tokyo-duel/material/Pawn'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'

export const GigazaurHeader = () => {
  const pullFame = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pull)(move) && move.data === Pawn.Fame)
  const pullDestruction = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pull)(move) && move.data === Pawn.Destruction)
  return (
    <>
      <PlayMoveButton move={pullFame}>Pull Fame</PlayMoveButton> OR <PlayMoveButton move={pullDestruction}>Pull Destruction</PlayMoveButton>
    </>
  )
}
