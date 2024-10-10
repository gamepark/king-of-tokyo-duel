/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'

export const DominateHeader = () => {
  const dominated = useLegalMove(isCustomMoveType(CustomMoveType.Dominated))
  return (
    <>
      Discard keep card or be <PlayMoveButton move={dominated}>DOMINATED</PlayMoveButton>
    </>
  )
}
