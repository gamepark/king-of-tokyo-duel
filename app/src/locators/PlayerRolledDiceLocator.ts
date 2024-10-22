import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { FlexLocator, isItemContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'

export class PlayerRolledDiceLocator extends FlexLocator {
  parentItemType = MaterialType.MonsterBoard

  getParentItem(location: Location, context: MaterialContext) {
    return context.rules.material(MaterialType.MonsterBoard).player(location.player).getItem()
  }

  getPositionOnParent(location: Location, context: MaterialContext) {
    return isItemContext(context) ? super.getPositionOnParent(location, context) : { x: 50, y: 50 }
  }

  protected getAreaCoordinates() {
    return {}
  }

  lineSize = 2
  lineGap = { y: diceDescription.width + 0.5 }
  gap = { x: diceDescription.width + 0.5 }

  positionOnParent = {
    x: 10,
    y: 15
  }
}

export const playerRolledDiceLocator = new PlayerRolledDiceLocator()