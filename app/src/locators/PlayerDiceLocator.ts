import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { FlexLocator, isItemContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'

export class PlayerDiceLocator extends FlexLocator {

  lineSize = 4
  lineGap = { y: diceDescription.width + 0.7 }
  gap = { x: diceDescription.width + 0.7 }

  getCoordinates(location: Location, context: MaterialContext) {
    if (!isItemContext(context)) return {}
    const item = context.rules.material(MaterialType.Dice).getItem(context.index)!
    const additionalX = item.id === DiceColor.White && !item.selected? -(diceDescription.width + 0.7): 0
    if (location.player === (context.player ?? context.rules.players[0])) {
      return { x: -23.5 + additionalX, y: 5, z: 0 }
    }

    return { x: 23.5 + additionalX, y: 5, z: 0 }
  }
}

export const playerDiceLocator = new PlayerDiceLocator()