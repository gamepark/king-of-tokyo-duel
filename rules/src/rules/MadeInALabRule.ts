import { MaterialMove, RuleMove, RuleStep } from '@gamepark/rules-api'
import { BuyRule } from './BuyRule'
import { isStartingRule } from './IsChangingRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MadeInALabRule extends BuyRule {
  onRuleStart(move: RuleMove, previousRule?: RuleStep): MaterialMove[] {
    if (isStartingRule(move)) this.memorize(Memory.PreviousRule,  { ...previousRule })
    return []
  }

  getNextRule(): RuleMove {
    return this.startRule(RuleId.RollDice)
  }

  // TODO: do effect and then call this.nextRuleMove
}