import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Effect } from './effects/EffectType'

export class BasePlayerTurnEffectRule<E extends Effect = any> extends BasePlayerTurnRule<E> {
  onRuleEnd() {
    this.removeEffect()
    return []
  }
}