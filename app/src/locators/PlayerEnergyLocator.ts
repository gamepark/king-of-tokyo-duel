import { FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerEnergyLocator extends FlexLocator {
  gap = { x: 1.2, y: 0.6 }
  lineGap = { y: 1.2 }

  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: -29.2, y: -6.5, z: 0.05 }
    }

    return { x: 29.2, y: -6.5, z: 0.05 }
  }

  lineSize = 2
  maxLines = 21
}

export const playerEnergyLocator = new PlayerEnergyLocator()