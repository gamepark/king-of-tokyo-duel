/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { RuleId } from '@gamepark/king-of-tokyo-duel/rules/RuleId'
import { FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { diceDescription } from '../material/DiceDescription'
import { monsterBoardLocator } from './MonsterBoardLocator'
import { PlayerDiceKeepDescription } from './PlayerDiceKeepLocator'

class PlayerDiceRollLocator extends FlexLocator {

  locationDescription = new PlayerDiceRollDescription()

  getLocations({ rules, player }: MaterialContext) {
    if (rules.getActivePlayer() === player && rules.game.rule?.id === RuleId.RollDice) {
      return [{ type: LocationType.PlayerDiceRoll, player }]
    }
    return []
  }

  lineSize = 5
  gap = { x: diceDescription.width + 0.8 }
  lineGap = { y: diceDescription.width + 0.8 }

  getCoordinates(location: Location, { rules }: MaterialContext) {
    if (location.player === undefined) {
      return { x: -3, y: 10 }
    }
    return { x: location.player === rules.players[0] ? -26.6 : 17.4, y: 12.2 }
  }

  protected getAreaCoordinates(location: Location, context: MaterialContext) {
    const monsterBoardCoordinates = monsterBoardLocator.getCoordinates(location, context)
    return {
      x: monsterBoardCoordinates.x,
      y: 14.7
    }
  }
}

class PlayerDiceRollDescription extends PlayerDiceKeepDescription {
  height = 8.5

  content = () => <span><Trans defaults="roll-area"/></span>
}

export const playerDiceRollLocator = new PlayerDiceRollLocator()
