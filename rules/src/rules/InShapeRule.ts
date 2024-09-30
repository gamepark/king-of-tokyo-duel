import { MaterialMove, RuleMove, RuleStep } from '@gamepark/rules-api'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { isStartingRule } from './IsChangingRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class InShapeRule extends BasePlayerTurnRule {
  onRuleStart(move: RuleMove, previousRule?: RuleStep): MaterialMove[] {
    if (isStartingRule(move)) this.memorize(Memory.PreviousRule,  { ...previousRule })
    return []
  }

  getNextRule(): RuleMove {
    return this.startPlayerTurn(RuleId.ChangePlayer, this.rival)
  }

  // TODO: do effect and then call this.nextRuleMove
}