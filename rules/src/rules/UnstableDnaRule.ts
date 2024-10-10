import { MaterialMove } from '@gamepark/rules-api'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { RuleId } from './RuleId'

// TODO
export class UnstableDnaRule extends BasePlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    return [this.startPlayerTurn(RuleId.Effect, this.rival)]
  }

  // TODO: do effect and then call this.nextRuleMove
}