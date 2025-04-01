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
    if (effects.length) {
      const effect = effects.shift()!
      this.memorize(Memory.CurrentEffect, effect)
      return [this.getEffectRuleMove(effect)]
    } else {
      this.forget(Memory.CurrentEffect)
      return this.goToNextRule()
    }
  }

  getEffectRuleMove(effect: EffectWithSource): MaterialMove {
    const type: EffectType = effect.effect.type
    switch (type) {

      case EffectType.Smash:
        const keepHelper = new KeepHelper(this.game)
        if (keepHelper.canPreventDamagesOn(effect.target) || keepHelper.immune(effect.target)) {
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
        this.memorize(Memory.Dominate, true)
        return this.startRule(RuleId.Effect)
      case EffectType.UnstableDna:
        return this.startPlayerTurn(RuleId.UnstableDna, effect.target)
      case EffectType.InShape:
        return this.startRule(RuleId.InShape)
      case EffectType.SuperConductor:
        return this.startPlayerTurn(RuleId.SuperConductor, effect.target)
      case EffectType.Rebooting:
        return this.startRule(RuleId.Rebooting)
      case EffectType.EffectChoice:
        return this.startRule(RuleId.EffectChoice)
    }
  }

  goToNextRule() {
    return [this.startRule(this.remind(Memory.Phase))]
  }
}
