import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { CubicDiceDescription, ItemContext } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import RedDestruction from '../images/dice/red/RedDestruction.jpg'
import RedEnergy from '../images/dice/red/RedEnergy.jpg'
import RedFame from '../images/dice/red/RedFame.jpg'
import RedHeal from '../images/dice/red/RedHeal.jpg'
import RedPower from '../images/dice/red/RedPower.jpg'
import RedSmash from '../images/dice/red/RedSmash.jpg'
import WhiteDestruction from '../images/dice/white/WhiteDestruction.jpg'
import WhiteEnergy from '../images/dice/white/WhiteEnergy.jpg'
import WhiteFame from '../images/dice/white/WhiteFame.jpg'
import WhiteHeal from '../images/dice/white/WhiteHeal.jpg'
import WhitePower from '../images/dice/white/WhitePower.jpg'
import WhiteSmash from '../images/dice/white/WhiteSmash.jpg'

export class DiceDescription extends CubicDiceDescription {
  getColor(itemId: DiceColor): string {
    return itemId === DiceColor.Red ? '#ed5c65' : '#fae8c6'
  }

  borderRadius = 0.1

  images = {
    [DiceColor.Red]: [
      RedSmash,
      RedDestruction,
      RedEnergy,
      RedHeal,
      RedPower,
      RedFame
    ],
    [DiceColor.White]: [
      WhiteSmash,
      WhiteDestruction,
      WhiteEnergy,
      WhiteHeal,
      WhitePower,
      WhiteFame
    ]
  }

  canShortClick(move: MaterialMove, context: ItemContext) {
    if (!isMoveItemType(MaterialType.Dice)(move) || (move.location.type !== LocationType.PlayerDiceRoll && move.location.type !== LocationType.PlayerDiceKeep && move.location.type !== LocationType.OnPowerCard)) return false
    const item = context.rules.material(MaterialType.Dice).getItem(move.itemIndex)!
    if (item.location.type !== LocationType.PlayerDiceKeep && item.location.type !== LocationType.PlayerDiceRoll) return false
    return move.itemIndex === context.index
  }

  getRotations(item: MaterialItem, context: ItemContext) {
    return ['rotate3d(1, -1, 0, 15deg)', 'translateZ(1em)', ...super.getRotations(item, context)]
  }
}

export const diceDescription = new DiceDescription()