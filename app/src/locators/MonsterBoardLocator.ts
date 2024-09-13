import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class MonsterBoardLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: -22, y: -2, z: 0.05 }
    }

    return { x: 22, y: -2, z: 0.05 }
  }
}

export const monsterBoardLocator = new MonsterBoardLocator()