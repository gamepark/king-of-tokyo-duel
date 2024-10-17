import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { KeepHelper } from './helper/KeepHelper'
import { KeepRule } from './keep/KeepRule'
import { RuleId } from './RuleId'

export class PreventDamagesRule extends BasePlayerTurnRule {
  onRuleStart() {
    if (!this.smashEffect.effect.count || new KeepHelper(this.game).immune(this.smashEffect.target)) {
      return this.cancelEffect()
    }

    const effects: KeepRule[] = this.preventDamagesKeepEffect
    for (const keepRule of effects) {
      if (!this.smashEffect.effect.count) break;
      const moves = keepRule.preventDamages()
      if (moves.length) return moves
    }

    if (!this.smashEffect.effect.count) {
      return this.cancelEffect()
    }

    if (this.smashEffect.effect.rival) return [this.startPlayerTurn(RuleId.Smash, this.rival)]
    return [this.startRule(RuleId.Smash)]

  }

  cancelEffect() {
    const moves: MaterialMove[] = []
    if (this.smashEffect.effect.rival) {
      moves.push(this.startPlayerTurn(RuleId.Effect, this.rival))
    } else {
      moves.push(this.startRule(RuleId.Effect))
    }
    this.removeEffect()
    return moves
  }

  get preventDamagesKeepEffect() {
    return new KeepHelper(this.game).getPreventKeepEffects(this.smashEffect.target)
  }

  get smashEffect() {
    return this.currentEffect
  }
}