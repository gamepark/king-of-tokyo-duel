import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class HealthCounterLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: -22, y: -3.2, z: 0 }
    }

    return { x: 22, y: -3.2, z: 0 }
  }
}

export const healthCounterLocator = new HealthCounterLocator()