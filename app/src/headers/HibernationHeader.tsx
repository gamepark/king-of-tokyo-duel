/** @jsxImportSource @emotion/react */

import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'

export const HibernationHeader = () => {
  const ignore = useLegalMove((move) => isCustomMoveType(CustomMoveType.Ignore)(move))
  const discard = useLegalMove((move) => isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.Discard)
  return (
    <>
       <PlayMoveButton move={discard}>Discard</PlayMoveButton> OR <PlayMoveButton move={ignore}>Ignore</PlayMoveButton>
    </>
  )
}
