import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerEnergyLocator extends ListLocator {
  gap = { y: 1.2}
  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: -29.2, y: -6.5, z: 0.05 }
    }

    return { x: 29.2, y: -6.5, z: 0.05 }
  }
  radius = 2
}

export const playerEnergyLocator = new PlayerEnergyLocator()