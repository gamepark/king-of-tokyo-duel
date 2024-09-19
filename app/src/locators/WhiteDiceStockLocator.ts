import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'

export class WhiteDiceStockLocator extends ListLocator {

  gap = { x: diceDescription.width + 0.5 }

  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: -27.2, y: -10.5, z: 0.05 }
    }

    return { x: 25, y: -10.5, z: 0.05 }
  }
}

export const whiteDiceStockLocator = new WhiteDiceStockLocator()