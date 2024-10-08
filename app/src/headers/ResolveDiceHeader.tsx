/** @jsxImportSource @emotion/react */

import { DiceFace } from '@gamepark/king-of-tokyo-duel/material/DiceFace'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'

export const ResolveDiceHeader = () => {
  const gainEnergy = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Energy)
  const smash = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Claw)
  const pullFamePawn = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Fame)
  const pullDestructionPawn = useLegalMove((move) =>isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Destruction)
  const heal = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Heal)
  return (
    <>
      <PlayMoveButton move={gainEnergy}>Gain Energy</PlayMoveButton> OR <PlayMoveButton move={smash}>Smash</PlayMoveButton> OR <PlayMoveButton move={pullFamePawn}>Pull fame</PlayMoveButton> OR <PlayMoveButton move={pullDestructionPawn}>Pull destruction</PlayMoveButton> OR <PlayMoveButton move={heal}>Heal</PlayMoveButton>
    </>
  )
}
