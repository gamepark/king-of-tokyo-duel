import { Buzz } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { tokenSizes } from '../material/BuzzTokenDescription'

export class PlayerBuzzLocator extends ListLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: -16.7, y: 4.6, z: 0.05 }
    }

    return { x: 16.7, y: 4.6, z: 0.05 }
  }

  gap = { y: tokenSizes[Buzz.TheKingBuzz].height + 0.2 }
}

export const playerBuzzLocator = new PlayerBuzzLocator()