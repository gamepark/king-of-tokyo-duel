/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from "@gamepark/rules-api"

export const BuyHeader = () => {
  const stop = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))
  return (
    <>
      <PlayMoveButton move={stop}>Gain 1 Energy</PlayMoveButton>
    </>
  )
}
