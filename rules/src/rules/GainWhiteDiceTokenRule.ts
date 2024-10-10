import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { DiceColor } from '../material/DiceColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { GainWhiteDiceToken } from './effects/EffectType'
import { RuleId } from './RuleId'

export class GainWhiteDiceTokenRule extends BasePlayerTurnEffectRule<GainWhiteDiceToken> {
  onRuleStart() {
    const whiteDice = this.actualWhiteDice
    const moves: MaterialMove[] = []
    if (whiteDice.length < 2) {
      moves.push(
        ...this
          .reserveWhiteDice
          .limit(this.currentEffect.effect.count)
          .moveItems({
            type: MaterialType.Dice
          })
      )
    }

    moves.push(this.startRule(RuleId.Effect))
    return moves
  }

  get reserveWhiteDice() {
    return this
      .material(MaterialType.Dice)
      .id(DiceColor.White)
      .location(LocationType.WhiteDiceStock)
  }

  get actualWhiteDice() {
    return this
      .material(MaterialType.Dice)
      .id(DiceColor.White)
      .location(LocationType.PlayerHand)
  }
}