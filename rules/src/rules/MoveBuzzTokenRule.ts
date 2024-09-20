import { PlayerTurnRule } from "@gamepark/rules-api";
import { RuleId } from './RuleId'

export class MoveBuzzTokenRule extends PlayerTurnRule {
  onRuleStart() {
    // TODO: don't go to the buy rule immediately, but allow the player :
    // 1. Place the token if it is not already placed
    // 2. Move the token if it is already on board
    return [this.startRule(RuleId.Effect)]
  }
}