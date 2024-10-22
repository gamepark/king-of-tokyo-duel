import { FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerEnergyLocator extends FlexLocator {
  getCoordinates(location: Location, { rules }: MaterialContext) {
    return {
      x: location.player === rules.players[0] ? -29.2 : 29.2,
      y: -6.5
    }
  }

  getGap(location: Location, { rules }: MaterialContext) {
    return { x: location.player === rules.players[0] ? -1.2 : 1.2, y: 0.6 }
  }

  lineSize = 2
  lineGap = { y: 1.2 }

  maxLines = 21
}

export const playerEnergyLocator = new PlayerEnergyLocator()