import { MaterialMove } from '@gamepark/rules-api'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { EffectType } from './effects/EffectType'
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

    console.log(this.currentEffect)
    const type: EffectType = this.currentEffect.effect.type
    switch (type) {

      case EffectType.Smash:
        if (new KeepHelper(this.game).canPreventDamagesOn(this.rival)) {
          return this.startPlayerTurn(RuleId.PreventDamages, this.rival)
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
        return this.startRule(RuleId.Dominate)
      case EffectType.UnstableDna:
        return this.startRule(RuleId.UnstableDna);
      case EffectType.InShape:
        return this.startRule(RuleId.InShape);
      default:
        return
    }
  }

  goToNextRule() {
    return [this.startRule(this.remind(Memory.Phase))]
  }
}