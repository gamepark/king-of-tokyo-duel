import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { GainWhiteDiceToken } from './effects/EffectType'

export class GainWhiteDiceTokenRule extends BasePlayerTurnEffectRule<GainWhiteDiceToken> {
  onRuleStart() {
    return []
  }
}