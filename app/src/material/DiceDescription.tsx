import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { CubicDiceDescription, ItemContext } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import Red_Claw from '../images/dice/red/Red_Claw.png'
import Red_Destruction from '../images/dice/red/Red_Destruction.png'
import Red_Energy from '../images/dice/red/Red_Energy.png'
import Red_Heart from '../images/dice/red/Red_Heart.png'
import Red_Power from '../images/dice/red/Red_Power.png'
import Red_Star from '../images/dice/red/Red_Star.png'
import White_Claw from '../images/dice/white/White_Claw.png'
import White_Destruction from '../images/dice/white/White_Destruction.png'
import White_Energy from '../images/dice/white/White_Energy.png'
import White_Heart from '../images/dice/white/White_Heart.png'
import White_Power from '../images/dice/white/White_Power.png'
import White_Star from '../images/dice/white/White_Star.png'

export class DiceDescription extends CubicDiceDescription {
  getColor(itemId: DiceColor): string {
    return itemId === DiceColor.Red? '#ed5c65': '#fae8c6'
  }

  images = {
    [DiceColor.Red]: [
      Red_Claw,
      Red_Destruction,
      Red_Energy,
      Red_Heart,
      Red_Power,
      Red_Star,
    ],
    [DiceColor.White]: [
      White_Claw,
      White_Destruction,
      White_Energy,
      White_Heart,
      White_Power,
      White_Star,
    ]
  }

  canShortClick(move: MaterialMove, context: ItemContext) {
    if (!isMoveItemType(MaterialType.Dice)(move) || move.location.type !== LocationType.PlayerHand) return false
    const item = context.rules.material(MaterialType.Dice).getItem(move.itemIndex)!
    if (item.location.type !== LocationType.PlayerRolledDice
      && item.location.type !== LocationType.DiceToSolve) return false
    return move.itemIndex === context.index
  }

  getRotations(item: MaterialItem, context: ItemContext) {
    return ['rotate3d(1, -1, 0, 15deg)', 'translateZ(1em)', ...super.getRotations(item, context)]
  }
}

export const diceDescription = new DiceDescription()