import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AfterDiceResolutionRule extends BasePlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.Phase, RuleId.AfterDiceResolution)
    new KeepHelper(this.game).afterResolvingDice()
    if (!this.effects.length) return [this.startRule(RuleId.Buy)]
    return [this.startRule(RuleId.Effect)]
  }
}