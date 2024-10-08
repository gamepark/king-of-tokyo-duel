import { EffectType } from '../../effects/EffectType'
import { KeepRule } from '../KeepRule'

export class NaturalSelectionKeepRule extends KeepRule {
  get additionalDice(): number {
    if (this.getActivePlayer() !== this.cardPlayer) return 0
    return 1
  }

  afterRollingDice() {
    if (this.getActivePlayer() !== this.cardPlayer) return
    if (this.maxNumberOfAKind < 4) return
    this.pushEffect({
      type: EffectType.Smash,
      count: 10
    }, this.cardPlayer)
  }
}