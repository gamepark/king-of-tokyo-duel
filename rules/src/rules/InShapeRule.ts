import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { RuleId } from './RuleId'

// TODO
export class InShapeRule extends BasePlayerTurnRule {
  onRuleStart() {
    return [this.startPlayerTurn(RuleId.ChangePlayer, this.rival)]
  }

}