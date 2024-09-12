import { Buzz } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { tokenSizes } from '../material/BuzzTokenDescription'

export class PlayerBuzzLocator extends ListLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === (context.player ?? context.rules.players[0])) {
      return { x: -30, y: -3.8, z: 0.05 }
    }

    return { x: 30, y: -3.8, z: 0.05 }
  }

  gap = { y: tokenSizes[Buzz.TheKingBuzz].height + 0.5 }
}

export const playerBuzzLocator = new PlayerBuzzLocator()