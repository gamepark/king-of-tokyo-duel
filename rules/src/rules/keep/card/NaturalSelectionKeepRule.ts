import { diceFaces } from '../../../material/DiceFace'
import { EffectType } from '../../effects/EffectType'
import { RollHelper } from '../../helper/RollHelper'
import { KeepRule } from '../KeepRule'

export class NaturalSelectionKeepRule extends KeepRule {
  get additionalDice(): number {
    if (this.getActivePlayer() !== this.cardPlayer) return 0
    return 1
  }

  beforeResolvingDice() {
    if (this.getActivePlayer() !== this.cardPlayer) return
    const rollHelper = new RollHelper(this.game, this.cardPlayer)
    if (diceFaces.some(face => rollHelper.countFace(face) >= 4) && !this.isConsumed) {
      this.markKeepCardConsumed()
      this.pushEffect({
        type: EffectType.Smash,
        count: 10
      }, this.cardPlayer)
    }
  }
}