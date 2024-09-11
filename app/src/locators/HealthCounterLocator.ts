import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class HealthCounterLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === (context.player ?? context.rules.players[0])) {
      return { x: -22.5, y: -4.5, z: 0 }
    }

    return { x: 22.5, y: -4.5, z: 0 }
  }

  getRotateZ(location: Location) {
    return -((20 - (location.rotation)) * 17.6)
  }
}

export const healthCounterLocator = new HealthCounterLocator()