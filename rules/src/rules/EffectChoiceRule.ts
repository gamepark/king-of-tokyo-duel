import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { EffectChoice } from './effects/EffectType'
import { RuleId } from './RuleId'

export class EffectChoiceRule extends BasePlayerTurnRule<EffectChoice> {
  getPlayerMoves() {
    return this.currentEffect.effect.effects.map(effect => this.customMove(CustomMoveType.ChooseEffect, effect))
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.ChooseEffect)(move)) return []
    this.unshiftEffect(move.data)
    return [this.startRule(RuleId.Effect)]
  }
}