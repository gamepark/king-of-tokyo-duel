import { BasePlayerTurnEffectRule } from '../BasePlayerTurnEffectRule'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { FreeTurn } from './EffectType'

export class FreeTurnEffectRule extends BasePlayerTurnEffectRule<FreeTurn> {
  onRuleStart() {
    this.memorize(Memory.FreeTurn, true)
    return [this.startRule(RuleId.Effect)]
  }
}