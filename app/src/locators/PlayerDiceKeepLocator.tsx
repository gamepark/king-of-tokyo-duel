/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { RuleId } from '@gamepark/king-of-tokyo-duel/rules/RuleId'
import { DropAreaDescription, FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { diceDescription } from '../material/DiceDescription'
import { monsterBoardDescription } from '../material/MonsterBoardDescription'
import { monsterBoardLocator } from './MonsterBoardLocator'

export class PlayerDiceKeepLocator extends FlexLocator {

  locationDescription = new PlayerDiceKeepDescription()

  getLocations({ rules, player }: MaterialContext) {
    if (rules.getActivePlayer() === player && rules.game.rule?.id === RuleId.RollDice) {
      return [{ type: LocationType.PlayerDiceKeep, player }]
    }
    return []
  }

  lineSize = 5
  gap = { x: diceDescription.width + 0.8 }
  lineGap = { y: diceDescription.width + 0.8 }

  getCoordinates(location: Location, { rules }: MaterialContext) {
    return { x: location.player === rules.players[0] ? -26.6 : 17.4, y: 5 }
  }

  protected getAreaCoordinates(location: Location, context: MaterialContext) {
    const monsterBoardCoordinates = monsterBoardLocator.getCoordinates(location, context)
    return {
      x: monsterBoardCoordinates.x,
      y: monsterBoardCoordinates.y + monsterBoardDescription.height / 2 + this.locationDescription.height / 2 + 0.5
    }
  }
}

export class PlayerDiceKeepDescription extends DropAreaDescription {
  height = 5.5
  width = monsterBoardDescription.width
  borderRadius = 0.3

  extraCss = css`
    background: rgba(255, 225, 255, 0.2);
    display: flex;
    justify-content: center;
    padding-bottom: 0.1em;
    align-items: flex-end;

    > span {
      display: flex;
      font-size: 1.5em;
    }
  `

  content = () => <span><Trans defaults="keep-area"/></span>

  canLongClick() {
    return false
  }
}

export const playerDiceKeepLocator = new PlayerDiceKeepLocator()