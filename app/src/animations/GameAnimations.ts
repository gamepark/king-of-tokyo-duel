import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType, isRollItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()


gameAnimations
  .when()
  .move((move, context) => {
      return isMoveItemType(MaterialType.Dice)(move) &&
        (move.location.type === LocationType.PlayerHand || move.location.type === LocationType.PlayerRolledDice) &&
        context.rules.material(move.itemType).getItem(move.itemIndex)!.location.type !== LocationType.WhiteDiceStock
    }
  )
  .mine()
  .none()

gameAnimations
  .when()
  .move((move) => isMoveItemType(MaterialType.Buzz)(move) && move.location.rotation !== undefined)
  .duration(0.1)


gameAnimations
  .when()
  .move((move, context) => {
      return isMoveItemType(MaterialType.Dice)(move) &&
        (move.location.type === LocationType.PlayerHand || move.location.type === LocationType.PlayerRolledDice) &&
        context.player !== context.action.playerId
    }
  )
  .duration(0.4)

gameAnimations
  .when()
  .move((move, context) => {
      return isRollItemType(MaterialType.Dice)(move) &&
        (move.location.type === LocationType.PlayerHand || move.location.type === LocationType.PlayerRolledDice) &&
        context.player !== context.action.playerId
    }
  )
  .duration(0.6)