import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { AnimationStep } from '@gamepark/react-client'
import { MaterialGameAnimationContext, MaterialGameAnimations } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, isMoveItemTypeAtOnce, isRollItemType, MaterialMove } from '@gamepark/rules-api'

class KingOfTokyoDuelAnimations extends MaterialGameAnimations {
  getDuration(move: MaterialMove, context: MaterialGameAnimationContext): number {
    if (isCustomMoveType(CustomMoveType.Smash)(move) && context.step === AnimationStep.BEFORE_MOVE) return ((move.data.effect.count - 1) * 0.5) + 1
    return super.getDuration(move, context)
  }
}


export const gameAnimations = new KingOfTokyoDuelAnimations()

gameAnimations
  .configure((move) => isMoveItemType(MaterialType.Buzz)(move) && move.location.rotation !== undefined)
  .duration(100)

gameAnimations
  .configure((move) => isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.PowerCardOnBoard)
  .duration(400)


gameAnimations
  .configure((move) => isRollItemType(MaterialType.Dice)(move) && (move.location.type === LocationType.PlayerDiceRoll || move.location.type === LocationType.PlayerDiceKeep))
  .duration(400)

gameAnimations
  .configure((move) =>
    isMoveItemTypeAtOnce(MaterialType.Dice)(move) && move.location.type === LocationType.PlayerDiceRoll
    && move.location.player === undefined
  )
  .duration(400)

gameAnimations
  .configure((move) => isMoveItemType(MaterialType.Dice)(move) && move.location.type === LocationType.PlayerDiceKeep
  )
  .duration(200)

gameAnimations
  .configure((move) => isMoveItemType(MaterialType.Dice)(move) && move.location.type === LocationType.PlayerDiceRoll)
  .duration(200)
