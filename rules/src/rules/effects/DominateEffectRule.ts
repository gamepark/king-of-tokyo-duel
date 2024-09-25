import { RuleId } from '../RuleId'
import { AbstractEffectRule } from './AbstractEffectRule'

export class DominateEffectRule extends AbstractEffectRule {
  getMoves() {
    if (this.rivalKeepCards.length) {
      return [this.startPlayerTurn(RuleId.Dominate, this.rival)]
    }

    return []
  }

}