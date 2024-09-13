import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'

export class WhiteDiceStockLocator extends ListLocator {

  gap = { x: diceDescription.width + 0.7 }

  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === (context.player ?? context.rules.players[0])) {
      return { x: -27, y: -12, z: 0.05 }
    }

    return { x: 27, y: -12, z: 0.05 }
  }
}

export const whiteDiceStockLocator = new WhiteDiceStockLocator()