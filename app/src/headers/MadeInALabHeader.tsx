/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'

export const MadeInALabHeader = () => {
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  return (
    <>
      Buy a card or <PlayMoveButton move={pass}>PASS</PlayMoveButton>
    </>
  )
}
