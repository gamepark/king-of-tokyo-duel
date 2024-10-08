import { RuleMove } from '@gamepark/rules-api'
import { BuyRule } from './BuyRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MadeInALabRule extends BuyRule {
  onRuleStart() {
    const moves = super.onRuleStart()
    this.memorize(Memory.Phase, RuleId.RollDice)
    return moves
  }

  getNextRule(): RuleMove {
    return this.startRule(RuleId.RollDice)
  }

  // TODO: do effect and then call this.nextRuleMove
}