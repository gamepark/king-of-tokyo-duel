import { PlayerTurnRule } from "@gamepark/rules-api";
import { RuleId } from './RuleId'

export class EffectRule extends PlayerTurnRule {
  onRuleStart() {
    return [this.startRule(RuleId.Buy)]
  }
}