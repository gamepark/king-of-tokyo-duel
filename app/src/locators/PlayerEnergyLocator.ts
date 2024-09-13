import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerEnergyLocator extends PileLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: -22, y: 6, z: 0.05 }
    }

    return { x: 22, y: 6, z: 0.05 }
  }
  radius = 2
}

export const playerEnergyLocator = new PlayerEnergyLocator()