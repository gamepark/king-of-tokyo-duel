import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import { DropAreaDescription, FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'
import { monsterBoardDescription } from '../material/MonsterBoardDescription'
import { monsterBoardLocator } from './MonsterBoardLocator'

export class PlayerHandLocator extends FlexLocator {
  lineSize = 2
  lineGap = { x: diceDescription.width + 0.7 }
  gap = { y: diceDescription.width + 0.7 }

  getCoordinates(location: Location, context: MaterialContext) {
    let coordinates = { x: 17, y: 4.6, z: 0 }
    if (location.player === context.rules.players[0]) {
      coordinates = { x: -27, y: 4.6, z: 0 }
    }

    if (location.player === Monster.TheKing) {
      coordinates.x += 2.5
    }

    return coordinates
  }

  protected getAreaCoordinates(location: Location, context: MaterialContext) {
    const monsterBoardCoordinates = monsterBoardLocator.getCoordinates(location, context)
    return {
      x: monsterBoardCoordinates.x,
      y: monsterBoardCoordinates.y + monsterBoardDescription.height / 2 + this.locationDescription.height / 2 + 0.3,
    }
  }

  locationDescription = new PlayerHandDescription()
}

class PlayerHandDescription extends DropAreaDescription {
  height = (diceDescription.width * 2) + (0.7 * 2);
  width = monsterBoardDescription.width
  borderRadius = 0.3
}

export const playerHandLocator = new PlayerHandLocator()