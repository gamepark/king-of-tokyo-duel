import { MaterialMove, RuleMove, RuleStep } from '@gamepark/rules-api'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Memory } from './Memory'

export class UnstableDnaRule extends BasePlayerTurnRule {
  onRuleStart(_move: RuleMove, previousRule?: RuleStep): MaterialMove[] {
    this.memorize(Memory.PreviousRule, { ...previousRule })
    return []
  }

  // TODO: do effect and then call this.nextRuleMove
}