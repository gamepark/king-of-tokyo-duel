import { PlayerTurnRule } from '@gamepark/rules-api'
import { EffectHelper } from './helper/EffectHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MoveBuzzTokenRule extends PlayerTurnRule {
  onRuleStart() {
    // TODO: don't go to the buy rule immediately, but allow the player :
    // 1. Place the token if it is not already placed
    // 2. Move the token if it is already on board

    const effectMoves = new EffectHelper(this.game, this.player).applyEffectMoves()
    if (effectMoves.length) return effectMoves
    return [this.startRule(RuleId.Buy)]
  }

  onRuleEnd() {
    this.forget(Memory.Buzz)
    return []
  }
}