import { MaterialMove, RuleMove, RuleStep } from '@gamepark/rules-api'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Memory } from './Memory'

export class UnstableDnaRule extends BasePlayerTurnRule {
  onRuleStart(_move: RuleMove, previousRule?: RuleStep): MaterialMove[] {
    this.memorize(Memory.PreviousRule, { ...previousRule })
    return []
  }

  getNextRuleMove(): MaterialMove | undefined {
    const previousRule = this.remind(Memory.PreviousRule)
    if (this.player === previousRule.player) {
      return this.startRule(previousRule.id)
    }
    return this.startPlayerTurn(previousRule.id, previousRule.player)

    return
  }

  // TODO: do effect and then call this.nextRuleMove
}