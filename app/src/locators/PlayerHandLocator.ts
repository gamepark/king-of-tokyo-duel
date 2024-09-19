import { FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'

export class PlayerHandLocator extends FlexLocator {
  lineSize = 2
  lineGap = { x: diceDescription.width + 0.7 }
  gap = { y: diceDescription.width + 0.7 }

  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: -27, y: 4.6, z: 0 }
    }

    return { x: 17, y: 4.6, z: 0 }
  }

  protected getAreaCoordinates(location: Location<number, number>, context: MaterialContext<number, number, number>): Partial<Coordinates> {
    return this.getCoordinates(location, context)
  }
}

export const playerHandLocator = new PlayerHandLocator()