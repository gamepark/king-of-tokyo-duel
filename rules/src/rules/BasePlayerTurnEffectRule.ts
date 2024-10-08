import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Effect } from './effects/EffectType'
import { EffectWithSource } from './effects/EffectWithSource'
import { Memory } from './Memory'

export class BasePlayerTurnEffectRule<E extends Effect = any> extends BasePlayerTurnRule<E> {
  onRuleEnd() {
    this.memorize(Memory.Effects, (effects: EffectWithSource[]) => effects.slice(1))
    return []
  }
}