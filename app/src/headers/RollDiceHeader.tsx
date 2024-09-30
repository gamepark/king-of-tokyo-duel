/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'

export const RollDiceHeader = () => {
  const roll = useLegalMove((move) => isCustomMoveType(CustomMoveType.Roll)(move))
  const rerollEverything = useLegalMove((move) => isCustomMoveType(CustomMoveType.RollAll)(move))
  const stop = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))
  return (
    <>
      <PlayMoveButton move={roll}>Roll</PlayMoveButton> OR <PlayMoveButton move={stop}>Stop</PlayMoveButton> OR <PlayMoveButton move={rerollEverything}>Reroll all</PlayMoveButton>
    </>
  )
}
