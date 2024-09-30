import { MaterialMove, PlayerTurnRule, RuleMove, RuleStep } from '@gamepark/rules-api'
import { isStartingRule } from './IsChangingRule'
import { Memory } from './Memory'

export class RebootingRule extends PlayerTurnRule {
  onRuleStart(move: RuleMove, previousRule?: RuleStep): MaterialMove[] {
    if (isStartingRule(move)) this.memorize(Memory.PreviousRule,  { ...previousRule })
    return []
  }

  // TODO: do effect and then call this.nextRuleMove
}