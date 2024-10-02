import { RuleMove } from '@gamepark/rules-api'
import { BuyRule } from './BuyRule'
import { RuleId } from './RuleId'

export class MadeInALabRule extends BuyRule {
  getNextRule(): RuleMove {
    return this.startRule(RuleId.RollDice)
  }

  // TODO: do effect and then call this.nextRuleMove
}