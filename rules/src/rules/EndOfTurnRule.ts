import { PlayerTurnRule } from '@gamepark/rules-api'
import { isChangingRule } from './IsChangingRule'
import { KeepHelper } from './helper/KeepHelper'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends PlayerTurnRule {
  onRuleStart() {
    const moves = new KeepHelper(this.game).atEndOfTurn()
    if (moves.some(isChangingRule)) return moves
    moves.push(this.startRule(RuleId.ChangePlayer))
    return moves
  }
}