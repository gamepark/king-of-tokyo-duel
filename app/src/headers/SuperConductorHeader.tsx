/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { CreateItem, isCreateItemType, isCustomMoveType } from '@gamepark/rules-api'

export const SuperConductorHeader = () => {
  const ignore = useLegalMove((move) => isCustomMoveType(CustomMoveType.Ignore)(move))
  const takeEnergy = useLegalMove<CreateItem>((move) => isCreateItemType(MaterialType.Energy)(move))
  return (
    <>
      <PlayMoveButton move={ignore}>Ignore</PlayMoveButton> OR <PlayMoveButton move={takeEnergy}>Gain {takeEnergy?.item.quantity ?? 0} Energy</PlayMoveButton>
    </>
  )
}
