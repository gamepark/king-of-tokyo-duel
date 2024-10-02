import { MaterialMove, RuleMove, RuleStep } from '@gamepark/rules-api'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { isStartingRule } from './IsChangingRule'
import { Memory } from './Memory'

export class CamouflageRule extends BasePlayerTurnRule {
  onRuleStart(move: RuleMove, previousRule?: RuleStep): MaterialMove[] {
    if (isStartingRule(move)) this.memorize(Memory.PreviousRule,  { ...previousRule })
    return []
  }

  // TODO: do effect and then call this.nextRuleMove
}