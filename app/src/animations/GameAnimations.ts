import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()


gameAnimations
  .when()
  .move((move, context) => {
      return isMoveItemType(MaterialType.Dice)(move) &&
        move.location.type === LocationType.PlayerHand &&
        context.rules.game.items[MaterialType.Dice]![move.itemIndex].location.type === LocationType.PlayerRolledDice
    }
  )
  .mine()
  .duration(0.1)