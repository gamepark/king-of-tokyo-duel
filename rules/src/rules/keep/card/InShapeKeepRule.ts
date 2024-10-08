import { EffectType } from '../../effects/EffectType'
import { KeepRule } from '../KeepRule'

export class InShapeKeepRule extends KeepRule {
  atEndOfTurn() {
    if (this.getActivePlayer() === this.cardPlayer) return
    this.pushEffect({
      type: EffectType.InShape,
    }, this.cardPlayer)
  }
}