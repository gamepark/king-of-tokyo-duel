import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()


gameAnimations
  .when()
  .move((move) => {
      return isMoveItemType(MaterialType.Dice)(move) &&
        (move.location.type === LocationType.PlayerHand || move.location.type === LocationType.PlayerRolledDice)
    }
  )
  .mine()
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