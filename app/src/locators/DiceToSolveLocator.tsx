/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { RuleId } from '@gamepark/king-of-tokyo-duel/rules/RuleId'
import { DropAreaDescription, FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'

export class DiceToSolveLocator extends FlexLocator {
  lineSize = 2
  lineGap = { x: diceDescription.width + 0.7 }
  gap = { y: diceDescription.width + 0.7 }

  getCoordinates(location: Location, context: MaterialContext) {

    if (location.player === context.rules.players[0]) {
      return { x: -27, y: 4.6, z: 0 }
    }

    return { x: 17, y: 4.6, z: 0 }
  }

  protected getAreaCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.rules.players[0]) {
      return { x: -22, y: 5.6, z: 0 }
    }

    return { x: 22, y: 5.6, z: 0 }
  }

  getLocations(context: MaterialContext) {
    const { rules } = context
    return context.rules.players.flatMap((p) => {
      if (rules.game.rule?.id !== RuleId.ResolveDice || rules.game.rule?.player !== p) return []
      return [{
        type: LocationType.DiceToSolve,
        player: p
      }]
    })
  }

  locationDescription = new DiceToSolveDescription()
}

class DiceToSolveDescription extends DropAreaDescription {
  height = 4.7
  width = diceDescription.width * 8
  borderRadius = 0.3

  extraCss = css`
    background-color: rgba(255, 165, 0, 0.2);
    border: 0.1em solid orange;
  `
}

export const diceToSolveLocator = new DiceToSolveLocator()