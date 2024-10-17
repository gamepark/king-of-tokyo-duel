import { MaterialMove } from '@gamepark/rules-api'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { EffectType } from './effects/EffectType'
import { EffectWithSource } from './effects/EffectWithSource'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EffectRule extends BasePlayerTurnRule {
  onRuleStart() {
    const effects = this.effects
    if (!effects.length) return this.goToNextRule()
    const moves: MaterialMove[] = []
    const effectRuleMove = this.getEffectRuleMove()
    if (effectRuleMove) {
      moves.push(effectRuleMove)
      return moves
    }
    return moves
  }

  getEffectRuleMove(): MaterialMove | undefined {
    const effect = this.currentEffect
    const type: EffectType = effect.effect.type
    switch (type) {

      case EffectType.Smash:
        if (new KeepHelper(this.game).canPreventDamagesOn(effect.target)) {
          if (this.player === effect.target) return this.startRule(RuleId.PreventDamages)
          return this.startPlayerTurn(RuleId.PreventDamages, effect.target)
        }

        return this.startRule(RuleId.Smash)
      case EffectType.GainEnergy:
        return this.startRule(RuleId.GainEnergy)
      case EffectType.Heal:
        return this.startRule(RuleId.Heal)
      case EffectType.PullPawn:
        return this.startRule(RuleId.PullPawn)
      case EffectType.GetWhiteDiceToken:
        return this.startRule(RuleId.GainWhiteDiceToken)
      case EffectType.ThePartyIsOver:
        return this.startRule(RuleId.ThePartyIsOver)
      case EffectType.FreeTurn:
        return this.startRule(RuleId.FreeTurn)
      case EffectType.TeslaImpulse:
        return this.startRule(RuleId.TeslaImpulse)
      case EffectType.OperationMedia:
        return this.startRule(RuleId.OperationMedia)
      case EffectType.Dominate:
        this.memorize(Memory.Effects, (effects: EffectWithSource[]) => effects.slice(1))
        this.memorize(Memory.Dominate, true)
        return this.startRule(RuleId.Effect)
      case EffectType.UnstableDna:
        return this.startPlayerTurn(RuleId.UnstableDna, this.currentEffect.target);
      case EffectType.InShape:
        return this.startRule(RuleId.InShape);
      case EffectType.SuperConductor:
        return this.startPlayerTurn(RuleId.SuperConductor, this.currentEffect.target);
      case EffectType.Rebooting:
        return this.startRule(RuleId.Rebooting)
      default:
        return
    }
  }

  goToNextRule() {
    return [this.startRule(this.remind(Memory.Phase))]
  }
}