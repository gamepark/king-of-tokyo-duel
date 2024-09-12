import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Memory } from '@gamepark/king-of-tokyo-duel/rules/Memory'
import { FlexLocator, isItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, MaterialRules } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'

export class PlayerDiceLocator extends FlexLocator {

  lineSize = 4
  lineGap = { y: diceDescription.width + 0.7 }
  gap = { x: diceDescription.width + 0.7 }

  getCoordinates(location: Location, context: MaterialContext) {
    if (!isItemContext(context)) return {}
    const { rules } = context
    const item = rules.material(MaterialType.Dice).getItem(context.index)!
    let additionalX = ((item.id === DiceColor.White && !item.selected) || this.mustSetDiceApart(item, rules))? -(diceDescription.width + 2): 0
    if (location.player === (context.player ?? context.rules.players[0])) {
      return { x: -23.5 + additionalX, y: 5, z: 0 }
    }

    return { x: 23.5 + additionalX, y: 5, z: 0 }
  }

  mustSetDiceApart(item: MaterialItem, rules: MaterialRules) {
    if (item.id !== DiceColor.Red || item.location.x !== 1) return false
    return rules.getActivePlayer() === rules.players[0] && rules.remind(Memory.Round) === 1
  }
}

export const playerDiceLocator = new PlayerDiceLocator()