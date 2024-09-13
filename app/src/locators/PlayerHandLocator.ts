import { FlexLocator, isItemContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'

export class PlayerHandLocator extends FlexLocator {
  lineSize = 2
  lineGap = { x: diceDescription.width + 0.7 }
  gap = { y: diceDescription.width + 0.7 }

  getCoordinates(location: Location, context: MaterialContext) {
    console.log(location)
    if (!isItemContext(context)) return {}
    if (location.player === context.rules.players[0]) {
      return { x: -25.1, y: 5, z: 0 }
    }

    return { x: 20.5, y: 5, z: 0 }
  }
}

export const playerHandLocator = new PlayerHandLocator()