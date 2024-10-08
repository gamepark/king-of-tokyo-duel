import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends BasePlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.Phase, RuleId.EndOfTurn)
    new KeepHelper(this.game).atEndOfTurn()
    if (this.effects.length) {
      this.memorize(Memory.Phase, RuleId.ChangePlayer)
      return [this.startRule(RuleId.Effect)]
    }
    return [this.startRule(RuleId.ChangePlayer)]
  }
}