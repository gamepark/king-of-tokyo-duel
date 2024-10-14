/** @jsxImportSource @emotion/react */

import { DiceFace } from '@gamepark/king-of-tokyo-duel/material/DiceFace'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { EffectType } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectType'
import { ResolveDiceRule } from '@gamepark/king-of-tokyo-duel/rules/ResolveDiceRule'
import { PlayMoveButton, useGame, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType, MaterialGame } from '@gamepark/rules-api'

export const ResolveDiceHeader = () => {
  const game= useGame<MaterialGame>()!
  const gainEnergy = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Energy)
  const smash = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Claw)
  const pullFamePawn = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Fame)
  const pullDestructionPawn = useLegalMove((move) =>isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Destruction)
  const heal = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Heal)
  const power = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Power)
  const resolveDiceRule = new ResolveDiceRule(game)
  return (
    <>
      <PlayMoveButton move={gainEnergy}>Gain Energy</PlayMoveButton> OR <PlayMoveButton move={smash}>Smash x {resolveDiceRule.buildEffect(EffectType.Smash, DiceFace.Claw, resolveDiceRule.rival)?.effect?.count ?? 0}</PlayMoveButton> OR <PlayMoveButton move={pullFamePawn}>Pull fame</PlayMoveButton> OR <PlayMoveButton move={pullDestructionPawn}>Pull destruction</PlayMoveButton> OR <PlayMoveButton move={heal}>Heal</PlayMoveButton> OR <PlayMoveButton move={power}>Power</PlayMoveButton>
    </>
  )
}
