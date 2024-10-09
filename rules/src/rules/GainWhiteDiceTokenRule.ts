import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { GainWhiteDiceToken } from './effects/EffectType'
import { RuleId } from './RuleId'

export class GainWhiteDiceTokenRule extends BasePlayerTurnEffectRule<GainWhiteDiceToken> {
  onRuleStart() {
    // TODO: Implements
    return [
      this.startRule(RuleId.Effect)
    ]
  }
}