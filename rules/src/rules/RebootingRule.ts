import { MaterialMove, RuleMove } from '@gamepark/rules-api'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'

export class RebootingRule extends BasePlayerTurnRule {
  onRuleStart(_move: RuleMove): MaterialMove[] {
    // TODO: let the player choose
    return []
  }

  // this.startRule(RuleId.ResolveDice)
  // TODO: do effect and then call this.nextRuleMove
}