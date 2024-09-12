/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from "@gamepark/rules-api"

export const RollDiceHeader = () => {
  const roll = useLegalMove((move) => isCustomMoveType(CustomMoveType.RollDice)(move))
  return (
    <PlayMoveButton move={roll}>Roll</PlayMoveButton>
  )
}
