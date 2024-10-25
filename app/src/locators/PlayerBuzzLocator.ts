import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerBuzzLocator extends DeckLocator {
  getCoordinates(location: Location, { rules }: MaterialContext) {
    return { x: location.player === rules.players[0] ? -16.7 : 16.7, y: -8.8 }
  }
}

export const playerBuzzLocator = new PlayerBuzzLocator()