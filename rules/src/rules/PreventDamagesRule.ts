import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { Monster } from '../material/Monster'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Smash } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'
import { KeepRule } from './keep/KeepRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PreventDamagesRule extends BasePlayerTurnRule<Smash> {
  onRuleStart() {
    if (!this.smashEffect.effect.count || new KeepHelper(this.game).immune(this.smashEffect.target)) {
      return this.cancelEffect()
    }

    const effects: KeepRule[] = this.preventDamagesKeepEffect
    for (const keepRule of effects) {
      if (!this.smashEffect.effect.count) break
      const moves = keepRule.preventDamages()
      if (moves.length) return moves
    }

    if (!this.smashEffect.effect.count) {
      return this.cancelEffect()
    }

    const activePlayer = this.remind<Monster>(Memory.ActivePlayer)
    if (this.player !== activePlayer) {
      return [this.startPlayerTurn(RuleId.Smash, activePlayer)]
    }
    return [this.startRule(RuleId.Smash)]

  }

  cancelEffect() {
    const moves: MaterialMove[] = []
    const activePlayer = this.remind<Monster>(Memory.ActivePlayer)
    if (this.player !== activePlayer) {
      moves.push(this.startPlayerTurn(RuleId.Effect, activePlayer))
    } else {
      moves.push(this.startRule(RuleId.Effect))
    }
    return moves
  }

  get preventDamagesKeepEffect() {
    return new KeepHelper(this.game).getPreventKeepEffects(this.smashEffect.target)
  }

  get smashEffect() {
    return this.currentEffect
  }
}