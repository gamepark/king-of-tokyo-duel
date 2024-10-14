import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { DiceColor } from '../material/DiceColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { GainWhiteDiceToken } from './effects/EffectType'
import { RuleId } from './RuleId'

export class GainWhiteDiceTokenRule extends BasePlayerTurnEffectRule<GainWhiteDiceToken> {
  onRuleStart() {
    const countTokens = this.countTokens
    const moves: MaterialMove[] = []
    if (countTokens < 2) {
      moves.push(
        this
          .material(MaterialType.DiceToken)
          .createItem({
            location: {
              type: LocationType.PlayerDiceToken,
              player: this.currentEffect.target
            },
            quantity: this.currentEffect.effect.count
          })
      )
    }

    moves.push(this.startRule(RuleId.Effect))
    return moves
  }

  get countTokens() {
    return this
      .material(MaterialType.Dice)
      .id(DiceColor.White)
      .location(LocationType.PlayerHand)
      .getQuantity()
  }
}