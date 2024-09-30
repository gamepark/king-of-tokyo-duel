import { MaterialMove, PlayerTurnRule, RuleMove, RuleStep } from '@gamepark/rules-api'
import { isStartingRule } from './IsChangingRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class UnstableDnaRule extends PlayerTurnRule {
  onRuleStart(move: RuleMove, previousRule?: RuleStep): MaterialMove[] {
    if (isStartingRule(move)) this.memorize(Memory.PreviousRule,  { ...previousRule })
    return []
  }

  getNextRule(): RuleId {
    return RuleId.RollDice
  }

  // TODO: do effect and then call this.nextRuleMove
}