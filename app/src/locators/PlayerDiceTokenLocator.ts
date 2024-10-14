import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { diceTokenDescription } from '../material/DiceTokenDescription'

export class PlayerDiceTokenLocator extends ListLocator {
  gap = { x: diceTokenDescription.width + 0.2 }

  getGap(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: diceTokenDescription.width + 0.2 }
    }

    return { x: -(diceTokenDescription.width + 0.2) }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: -29.2, y: -8.1, z: 0.05 }
    }

    return { x: 29.2, y: -8.1, z: 0.05 }
  }
}

export const playerDiceTokenLocator = new PlayerDiceTokenLocator()