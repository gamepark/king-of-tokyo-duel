import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class BuyAreaLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: -23, y: 14.3, z: 5 }
    }

    return { x: 21, y: 14.3, z: 5 }
  }
}

export const buyAreaLocator = new BuyAreaLocator()