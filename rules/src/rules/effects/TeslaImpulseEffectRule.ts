import { RuleId } from '../RuleId'
import { AbstractEffectRule } from './AbstractEffectRule'

export class TeslaImpulseEffectRule extends AbstractEffectRule {
  getMoves() {
    if (!this.rivalKeepCards.length) return []
    return [this.startRule(RuleId.TeslaImpulse)]
  }
}